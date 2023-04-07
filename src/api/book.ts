import request from "@/utils/request";
import qs from "qs";

import { BookQueryType, BookType } from "./../type";

export async function getBookList(params?: BookQueryType) {
  return request.get(`/api/books?${qs.stringify(params)}`);
}

export async function bookAdd(params: BookType) {
  return request.post("/api/books", params);
}
