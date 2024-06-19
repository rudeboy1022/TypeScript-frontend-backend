import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from "@tanstack/react-query";

import { getLoggedInUsers } from "./fetcher";

import type { Response, Request, Error } from "./types";

const queryKey = (request: Request) => ["getLoggedInUsersQuery", [request]];

/**
 * 企業詳細を取得するカスタムフック
 *
 * @param request 企業ID
 * @param options React Queryのオプションを指定することができる
 *
 * @returns useQueryの結果を返す
 * 
 * @example
 * ```
const { data } =
  useCompanyDetailsQuery(
    {
      path: {
        company_id: Number(companyId),
      },
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!company_id
      useErrorBoundary(error) {
        // 認証エラーの場合にErrorBoundaryを動作させる
        if (error.status === 401) {
          return true
        } else {
          return false
        }
      },
    }
  )
 * ```
 */

export const useGetLoggedInUsersQuery = (
  request: Request,
  options?: UseQueryOptions<Response, Error>
): UseQueryResult<Response, Error> => {
  return useQuery<Response, Error>({
    queryKey: queryKey(request),
    queryFn: () => getLoggedInUsers(),
    ...options,
  });
};
