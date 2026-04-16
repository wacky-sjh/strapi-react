import { Link } from "react-router-dom";
import type { ManualTreeItem } from "@/types/manual";

/** 현재 문서가 이 노드(하위 포함)에 있으면 `<details>`를 펼칩니다. */
export const subtreeContainsActiveEntry = (node: ManualTreeItem, activeId: string): boolean => {
  if (!activeId) return false;
  if (node.entries.some((e) => e.documentId === activeId)) return true;
  return node.children.some((child) => subtreeContainsActiveEntry(child, activeId));
};

type TreeNodeProps = {
  node: ManualTreeItem;
  depth: number;
  activeId?: string;
};

const TreeNode = ({ node, depth, activeId }: TreeNodeProps) => {
  const hasChildren = node.children.length > 0;
  const hasEntries = node.entries.length > 0;
  /** 상세 보기에서 현재 문서가 포함된 가지만 펼침 고정, 그 외 `<details>`는 속성 생략으로 사용자 토글 허용 */
  const detailsOpenProps = (): { open?: boolean } => {
    if (activeId) {
      return subtreeContainsActiveEntry(node, activeId) ? { open: true } : {};
    }
    /** 대(0)·중(1)·소(2)까지 목차에서 기본 펼침 — 소분류도 `<details>`로 접기 가능 */
    return depth < 3 ? { open: true } : {};
  };
  const openProps = detailsOpenProps();

  if (hasChildren && hasEntries) {
    return (
      <li>
        <details {...openProps}>
          <summary className="cursor-pointer text-sm font-semibold">{node.label}</summary>
          <ul className="mt-1 ml-3 space-y-2">
            <li className="space-y-1">
              <ul className="space-y-1 ml-3">
                {node.entries.map((entry) => (
                  <li key={entry.documentId}>
                    <Link
                      to={`/manual/${entry.documentId}`}
                      className={
                        activeId && entry.documentId === activeId
                          ? "text-green-600 font-semibold text-sm"
                          : "text-sm text-primary hover:underline"
                      }
                    >
                      {entry.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {node.children.map((child) => (
              <TreeNode key={`${depth}-${child.label}`} node={child} depth={depth + 1} activeId={activeId} />
            ))}
          </ul>
        </details>
      </li>
    );
  }

  if (hasChildren) {
    return (
      <li>
        <details {...openProps}>
          <summary className="cursor-pointer text-sm font-semibold">{node.label}</summary>
          <ul className="mt-1 ml-3 space-y-2">
            {node.children.map((child) => (
              <TreeNode key={`${depth}-${child.label}`} node={child} depth={depth + 1} activeId={activeId} />
            ))}
          </ul>
        </details>
      </li>
    );
  }

  if (hasEntries) {
    return (
      <li>
        <details {...openProps}>
          <summary className="cursor-pointer text-sm font-semibold">{node.label}</summary>
          <ul className="mt-1 ml-3 space-y-1">
            {node.entries.map((entry) => (
              <li key={entry.documentId}>
                <Link
                  to={`/manual/${entry.documentId}`}
                  className={
                    activeId && entry.documentId === activeId
                      ? "text-green-600 font-semibold text-sm"
                      : "text-sm text-primary hover:underline"
                  }
                >
                  {entry.title}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </li>
    );
  }

  return null;
};

type ManualTreeNavProps = {
  tree: ManualTreeItem[];
  /** 있으면 해당 문서가 포함된 분기만 펼치고, 링크에 현재 항목 스타일 적용 */
  activeDocumentId?: string;
};

const ManualTreeNav = ({ tree, activeDocumentId }: ManualTreeNavProps) => (
  <ul className="space-y-2" key={activeDocumentId ?? "manual-tree-index"}>
    {tree.map((item) => (
      <TreeNode key={item.label} node={item} depth={0} activeId={activeDocumentId} />
    ))}
  </ul>
);

export default ManualTreeNav;
