export interface BookType {
  _id?: string; // mongo数据库的id
  name: string;
  author: string;
  description: string;
  createdAt: string;
  publishAt: number; // 出版日期
  bookNo: string; // 图书编号
  cover: string; // 封面
  stock: number; // 库存
  category: string; // 分类
}

export interface BookQueryType {
  name: string;
  category: string;
  author: string;
}

export interface BookFormType {
  title: string;
  editData?: BookType;
}
