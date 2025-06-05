import { useEffect, useState } from "react";
import api from "../../lib/axios";
import type { NoticeDetail } from "../../types/notice";

export const useGetNoticeDetail = (documentId: string) => {
  const [notice, setNotice] = useState<NoticeDetail | null>(null);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        const response = await api.get(`/notices/${documentId}`);
        setNotice(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNoticeDetail();
  }, [documentId]);

  return { notice };
};
