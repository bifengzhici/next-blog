export type BlogRouteParams = {
  category?: string;
};

export type BlogSearchParams = {
  search?: string;
  sort?: "latest" | "hot";
};

export type BlogItem = {
  id: string;
  documentId: string;
  title: string;
  cover: {
    url: string;
  };
  view: number;
};
