import { useEffect, useState } from "react";
import api from "../../lib/axios";
import type { ManualEntry } from "../../types/manual";

export const useGetManualDetail = (documentId: string) => {
  const [node, setNode] = useState<ManualEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!documentId) {
      setNode(null);
      setLoading(false);
      return;
    }

    const fetchDetail = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/manual-entries/${documentId}`, {
          params: {
            "populate[largeCategory][fields][0]": "title",
            "populate[largeCategory][fields][1]": "code",
            "populate[mediumCategory][fields][0]": "title",
            "populate[mediumCategory][fields][1]": "code",
            "populate[smallCategory][fields][0]": "title",
            "populate[smallCategory][fields][1]": "code",
          },
        });
        setNode(response.data.data ?? null);
      } catch (error) {
        console.error(error);
        setNode(null);
      } finally {
        setLoading(false);
      }
    };

    void fetchDetail();
  }, [documentId]);

  return { node, loading };
};
