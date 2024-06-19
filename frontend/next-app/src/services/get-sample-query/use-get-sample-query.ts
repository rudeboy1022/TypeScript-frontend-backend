import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  queryOptions,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
} from "@tanstack/react-query";

import { getSample } from "./fetcher";

import type { Response, Request, Error } from "./types";

const queryKey = (request: Request) => ["getLoggedInUsersQuery", [request]];

//queryKeyとqueryFnを識別にする
export const sampleQueryOptions = (request: Request) => {
  return queryOptions({
    queryKey: queryKey(request),
    queryFn: () => getSample(),
  });
};

// export const useGetSampleQuery = (
//   request: Request,
//   options?: DefinedInitialDataOptions<Response, Error>
// ): DefinedUseQueryResult<Response, Error> => {
//   return useQuery<Response, Error>(
//     {
//       ...sampleQueryOptions(request),
//       ...options
//     }
//   );
// };
