export type ManualEntry = {
  id: number;
  documentId: string;
  title: string;
  largeCategory: {
    documentId: string;
    title: string;
    code: string;
  } | null;
  mediumCategory: {
    documentId: string;
    title: string;
    code: string;
  } | null;
  smallCategory: {
    documentId: string;
    title: string;
    code: string;
  } | null;
  subCategory: string | null;
  sortOrder: number | null;
  content: unknown;
};

export type ManualTreeItem = {
  label: string;
  children: ManualTreeItem[];
  entries: ManualEntry[];
};
