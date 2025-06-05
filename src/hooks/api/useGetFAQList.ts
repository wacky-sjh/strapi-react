import { useEffect, useState } from "react";
import api from "../../lib/axios";
import type { FAQ } from "../../types/faq";

export const useGetFAQList = () => {
  const [faqList, setFaqList] = useState<FAQ[]>([]);

  useEffect(() => {
    const fetchFAQList = async () => {
      try {
        const response = await api.get("/faqs");
        setFaqList(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFAQList();
  }, []);

  return { faqList };
};
