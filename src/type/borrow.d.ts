import { BookType } from "./book";

export interface BorrowQueryType {
  name?: string;
  author?: string;
  category?: number;
  current?: number;
  pageSize?: number;
}

export interface BorrowType {
  book: BookType;
  borrowAt: number;
  backAt: number;
  // todo user ts
  user: any;
}
