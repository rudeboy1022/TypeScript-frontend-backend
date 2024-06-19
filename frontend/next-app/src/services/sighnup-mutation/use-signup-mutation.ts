import {
  useMutation,
  type MutationFunction,
  type UseMutationResult,
  type UseMutationOptions,
  type MutationOptions,
  QueryClient,
} from "@tanstack/react-query";

import { SignUpFetcher } from "./fetcher";

import type { Response, Request, Error } from "./types";

// fetcherに渡すパラメーターの型を定義
type MutationFn = MutationFunction<Response, Request>;

/**
 * フリータグの更新行うカスタムフック
 *
 * useMutationを使用してAPIを呼び出すフックを定義している
 * UseMutationResultは、useMutationから返されるオブジェクトの型を表すジェネリック型で、返されるデータ、エラー、パラメーター、API呼び出しを行う関数をそれぞれ定義している
 *
 * @returns
 *
 * @example
 * ```
const {
  mutate,
  error,
  isLoading,
} = usePutUserSearchConditionsMutate()

const onSubmit: SubmitHandler<SearchForm> = async () => {
  mutate(search_id, {
    onError() {
      // エラー時の処理
    },
    onSuccess() {
      // 成功時の処理
    },
  })
};
 *
 */
export const useSignUpMutation = (
  options?: UseMutationOptions<Response, Error, Request, MutationFn>
): UseMutationResult<Response, Error, Request, MutationFn> => {
  return useMutation<Response, Error, Request, MutationFn>(
    // useMutationに渡す関数を定義
    {
      mutationFn: async (variables: Request) => {
        return SignUpFetcher(variables);
      },
      ...options,
    }
  );
};
