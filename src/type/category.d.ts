import { CategoryQueryType } from "@/type";

export interface CategoryQueryType {
  name?: string;
  level?: number;
  current?: number;
  pageSize?: number;
  all?: boolean;
}

export interface CategoryType {
  name: string;
  level: 1 | 2;
  parent: CategoryType;
  _id?: string;
}
