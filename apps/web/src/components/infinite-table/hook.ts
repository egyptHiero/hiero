import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

type Infinitable<T> = {
  data?: {
    items: T[];
    next?: string;
  };
};

type UseInfinityScrollParams<T, R> = Pick<
  UseInfiniteQueryOptions<
    Infinitable<T>,
    Error,
    InfiniteData<Infinitable<T>>,
    string[],
    string
  >,
  'queryKey' | 'queryFn' | 'enabled'
> & {
  mapper?: (item: T) => R;
};
export const useInfinityScroll = <T, R>(
  params: UseInfinityScrollParams<T, R>,
) => {
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    ...params,
    getPreviousPageParam: () => {
      return null;
    },
    getNextPageParam: (page) => {
      return page?.data?.next;
    },
    initialPageParam: '',
  });

  const items =
    data?.pages?.flatMap((page) => {
      return (
        page?.data?.items?.map(
          (item) => (params.mapper ? params.mapper(item) : item) || [],
        ) || []
      );
    }) || [];

  return {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    items,
  };
};
