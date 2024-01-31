import {
  allActiveCountiesQuery,
  allActiveTopicsQuery,
  settingsQuery,
} from "@/sanity/lib/queries";
import {
  CountyListItemPayload,
  SettingsPayload,
  TopicListItemPayload,
} from "@/types";
import {
  type QueryParams,
  type QueryResponseInitial,
  type UseQueryOptionsDefinedInitial,
} from "@sanity/react-loader";
import * as queryStore from "@sanity/react-loader";

export const useQuery = <
  QueryResponseResult = unknown,
  QueryResponseError = unknown,
>(
  query: string,
  params?: QueryParams,
  options?: UseQueryOptionsDefinedInitial<QueryResponseResult>,
) => {
  const snapshot = queryStore.useQuery<QueryResponseResult, QueryResponseError>(
    query,
    params,
    options,
  );

  if (snapshot.error) {
    throw snapshot.error;
  }

  return snapshot;
};

export function useSettings(initial: QueryResponseInitial<SettingsPayload>) {
  return useQuery<SettingsPayload>(settingsQuery, {}, { initial });
}

export function useAllCounties(
  initial: QueryResponseInitial<CountyListItemPayload[]>,
) {
  return useQuery<CountyListItemPayload[]>(
    allActiveCountiesQuery,
    {},
    { initial },
  );
}

export function useAllTopics(
  initial: QueryResponseInitial<TopicListItemPayload[]>,
) {
  return useQuery<TopicListItemPayload[]>(
    allActiveTopicsQuery,
    {},
    { initial },
  );
}
