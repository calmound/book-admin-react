import request from "@/utils/request";
import qs from "qs";

import { BorrowQueryType, BorrowType } from "./../types/borrow.d";

export const getBorrowList = (params: BorrowQueryType) => {
  return request.get(`/api/borrows?${qs.stringify(params)}`);
};

export const getBorrowDetail = (id: string) => {
  return request.get(`/api/borrows/${id}`);
};

export const borrowAdd = (params: BorrowType) => {
  return request.post(`/api/borrows`, params);
};

export const borrowDelete = (id: string) => {
  return request.delete(`/api/borrows/${id}`);
};
export const borrowUpdate = (id: string, params: BorrowType) => {
  return request.post(`/api/borrows/${id}`, params);
};

export const borrowBack = (id: string) => {
  return request.put(`/api/borrows/back/${id}`);
};
