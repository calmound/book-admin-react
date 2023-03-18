export interface CategoryType {
  _id?: string;
  name: string;
  level: number;
  parentLevel: string;
  parent: CategoryType;
  children: CategoryType[];
}

export interface CategoryQueryType {
  name?: string;
  level?: number;
}
