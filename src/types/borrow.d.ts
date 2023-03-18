import { BORROW_STATUS } from "@/constants";

import { BookType } from "./book";
import { UserType } from "./user";

export interface BorrowQueryType {
  current: number;
  pageSize: number;
  book?: string;
  user?: string;
  author?: string;
  status?: BORROW_STATUS;
}

export interface BorrowOptionType {
  label: string;
  stock: number;
  value: string;
}

export interface BorrowType {
  _id?: string;
  book: BookType;
  user: UserType;
  status: BORROW_STATUS;
}

export interface BorrowFormType {
  title: string;
}
