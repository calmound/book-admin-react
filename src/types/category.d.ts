export interface CategoryType {
  _id?: string;
  name: string;
  level: number;
  parentLevel: string;
}

export interface CategoryQueryType {
  name?: string;
  level?: number;
}
