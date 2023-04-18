import request from "@/utils/request";
import qs from "qs";

import { CategoryQueryType, CategoryType } from "../type";

export async function getCategoryList(params?: CategoryQueryType) {
  return request.get(`/api/categories?${qs.stringify(params)}`);
}

export async function categoryAdd(params: CategoryType) {
  return request.post("/api/categories", params);
}

export async function categoryDelete(id: string) {
  return request.delete(`/api/categories/${id}`);
}
