/**
 *
 * ログインに関するデータ型
 *
 */

// レスポンスの型
export type Response = {
  status: number;
  data: {
    result: string;
  };
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
