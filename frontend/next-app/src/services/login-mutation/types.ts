/**
 *
 * ログインに関するデータ型
 *
 */

export type ResponseData = {
  email: string;
  password: string;
  username: string;
  _v: number;
  _id: string;
};

// レスポンスの型
export type Response = {
  status: number;
  data: ResponseData;
};

// リクエストの型
export type Request = {
  username: string;
  email: string;
  password: string;
};

// エラーの型
export type Error = {
  status: number;
  data: Errors;
};

//不正ファイルアップ時のために、エラーを型定義
export type Errors = {
  error: string;
};
