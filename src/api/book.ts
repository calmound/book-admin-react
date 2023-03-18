import { BookType } from "@/types";
import request from "@/utils/request";
import qs from "qs";

export const getBookList = (
  params: Partial<Pick<BookType, "name" | "category" | "author">> & {
    current?: number;
    pageSize?: number;
    all?: boolean;
  }
) => {
  return request.get(`/api/books?${qs.stringify(params)}`);
};

export const bookUpdate = (id: string, params: BookType) => {
  return request.put(`/api/books/${id}`, params);
};

export const bookAdd = (params: BookType) => {
  return request.post("/api/books", params);
};

export const getBookDetail = (id: string) => {
  return request.get(`/api/books/${id}`);
};

export const bookDelete = (id: string) => {
  return request.delete(`/api/books/${id}`);
};
