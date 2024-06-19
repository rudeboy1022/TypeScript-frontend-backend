/**
 *
 * 企業詳細を取得の型情報です。
 *
 */

// レスポンスの型
export type Response = {
  data: ResponseData;
  status: number;
};

export type ResponseData = {
  _id: string;
  userId: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}[];

// リクエスト
export type Request = {};

// エラーの型
export type Error = {
  status: number;
  data: any;
};
