import request from "@/utils/request";
import axios from "axios";
import qs from "qs";

import { BookQueryType } from "./../type/book.d";

export async function getBookList(params?: BookQueryType) {
  return request.get(`/api/books?${qs.stringify(params)}`);
}
