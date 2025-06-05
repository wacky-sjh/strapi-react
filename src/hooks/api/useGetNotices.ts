import { useEffect, useState } from "react";
import api from "../../lib/axios";
import type { Notice } from "../../types/notice";

export const useGetNotices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await api.get("/notices");
        setNotices(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotices();
  }, []);

  return { notices };
};
