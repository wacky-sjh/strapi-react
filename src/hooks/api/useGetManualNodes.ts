import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../../lib/axios";
import type { ManualEntry, ManualTreeItem } from "../../types/manual";

const sortByOrderThenTitle = <T extends { sortOrder: number | null; title: string }>(a: T, b: T) => {
  const ao = a.sortOrder ?? 0;
  const bo = b.sortOrder ?? 0;
  if (ao !== bo) return ao - bo;
  return a.title.localeCompare(b.title, "ko");
};

const getOrCreate = (parent: Map<string, ManualTreeItem>, key: string): ManualTreeItem => {
  const existing = parent.get(key);
  if (existing) return existing;
  const created: ManualTreeItem = { label: key, children: [], entries: [] };
  parent.set(key, created);
  return created;
};

export const buildManualTree = (entries: ManualEntry[]): ManualTreeItem[] => {
  const root = new Map<string, ManualTreeItem>();
  for (const entry of [...entries].sort(sortByOrderThenTitle)) {
    if (!entry.largeCategory || !entry.mediumCategory || !entry.smallCategory) continue;

    const largeLabel = `${entry.largeCategory.code} ${entry.largeCategory.title}`;
    const mediumLabel = `${entry.mediumCategory.code} ${entry.mediumCategory.title}`;
    const smallLabel = `${entry.smallCategory.code} ${entry.smallCategory.title}`;

    const largeNode = getOrCreate(root, largeLabel);

    const mediumMap = new Map(largeNode.children.map((item) => [item.label, item]));
    const mediumNode = getOrCreate(mediumMap, mediumLabel);
    largeNode.children = [...mediumMap.values()];

    const smallMap = new Map(mediumNode.children.map((item) => [item.label, item]));
    const smallNode = getOrCreate(smallMap, smallLabel);
    mediumNode.children = [...smallMap.values()];

    /** subCategory는 표시용 옵션뿐 — 트리 깊이는 대·중·소까지만 두고 문서는 항상 소분류 노드에 연결 */
    smallNode.entries.push(entry);
  }

  const sortRecursive = (node: ManualTreeItem) => {
    node.entries.sort(sortByOrderThenTitle);
    node.children.sort((a, b) => a.label.localeCompare(b.label, "ko"));
    node.children.forEach(sortRecursive);
  };

  const top = [...root.values()];
  top.sort((a, b) => a.label.localeCompare(b.label, "ko"));
  top.forEach(sortRecursive);

  return top;
};

export const useGetManualNodes = () => {
  const [entries, setEntries] = useState<ManualEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchNodes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/manual-entries", {
        params: {
          "pagination[pageSize]": 1000,
          "populate[largeCategory][fields][0]": "documentId",
          "populate[largeCategory][fields][1]": "title",
          "populate[largeCategory][fields][2]": "code",
          "populate[mediumCategory][fields][0]": "documentId",
          "populate[mediumCategory][fields][1]": "title",
          "populate[mediumCategory][fields][2]": "code",
          "populate[smallCategory][fields][0]": "documentId",
          "populate[smallCategory][fields][1]": "title",
          "populate[smallCategory][fields][2]": "code",
          sort: "sortOrder:asc",
        },
      });
      setEntries(response.data.data ?? []);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchNodes();
  }, [fetchNodes]);

  const tree = useMemo(() => buildManualTree(entries), [entries]);
  const entryMap = useMemo(() => new Map(entries.map((entry) => [entry.documentId, entry])), [entries]);

  return { entries, entryMap, tree, loading, error, refetch: fetchNodes };
};
