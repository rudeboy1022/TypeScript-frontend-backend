import axios, { AxiosResponse } from "axios";

import { Request, Response } from "./types";

/**
 * フリータグ編集
 */
export const SignUpFetcher = async (data: Request) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const endpoint = `${baseURL}/api/users/signup`;

    // APIを叩く
    const res: AxiosResponse = await axios.post(
      endpoint,
      {
        username: data.username,
        email: data.email,
        password: data.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return {
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // react queryで使うため、必ずthrowする

      if (error.response) {
        // responseがある場合はそれをthrowする
        throw error.response;
      } else {
        return Promise.reject(new Error(error.message));
      }
    }
    throw error;
  }
};
