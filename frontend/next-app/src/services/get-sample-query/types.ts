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
  price: string;
  name: string;
  rating: {
    average: number;
    reviews: number;
  };
  image: string;
  id: number;
}[];

// リクエスト
export type Request = {};

// エラーの型
export type Error = {
  status: number;
  data: any;
};
