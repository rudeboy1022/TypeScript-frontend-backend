import axios, { AxiosResponse } from "axios";

import type { ResponseData, Request } from "./types";

/**
 * 企業詳細を取得します
 *
 * @returns {Promise<{ status: number; data: ResponseData }>} APIの応答情報
 *
 */
export const getNotes = async () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const endpoint = `${baseURL}/api/notes`;

    // APIを叩く
    const res: AxiosResponse<ResponseData> = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    /**
     *
     * isAxiosErrorによる型ガード
     * @see {@link https://dev.classmethod.jp/articles/typescript-typing-exception-objects-in-axios-trycatch/}
     *
     */
    // react queryで使うため、必ずthrowする
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // responseがある場合はそれをthrowする
        return Promise.reject(error.response);
      } else {
        return Promise.reject(new Error(error.message));
      }
    }
    return Promise.reject(error);
  }
};
