import { CategoryType } from "@/types";
import request from "@/utils/request";
import qs from "qs";

export const getCategoryList = (params?: { level?: number; all?: boolean }) => {
  return request.get(`/api/categories?${qs.stringify(params)}`);
};

export const categoryAdd = (params: CategoryType) => {
  return request.post("/api/categories", params);
};

export const categoryUpdate = (id: string, params: CategoryType) => {
  return request.put(`/api/categories/${id}`, params);
};

export const categoryDelete = (id: string) => {
  return request.delete(`/api/categories/${id}`);
};
