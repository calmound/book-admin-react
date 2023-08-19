export interface UserQueryType {
  name?: string;
  status?: number;
  current?: number;
  pageSize?: number;
}

export interface UserType {
  _id?: string;
  name: string;
  password: string;
  status: "on" | "off";
  nickName: string;
  sex: USER_SEX;
  role: USER_ROLE;
  status: USER_STATUS;
}
