import React from "react";
import {CTable} from '@coreui/react';
import {useClientContext} from "../app/context/client-context";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useInView} from 'react-intersection-observer'

export function InfiniteTable() {
  const {client} = useClientContext();

  const {data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['dictionaries'],
    queryFn: async ({pageParam}) => {
      console.log('pageParam', pageParam)
      return client.GET('/api/dictionary/{id}', {
        params: {path: {id: 'ancient'}, query: {from: pageParam}},
      }).then(response => {
        if (response?.data?.items) {
          response.data.items = response.data.items.map(({id, i}) => ({
            id,
            interpretation: Object.keys(i)[0],
            description: Object.values(i)[0]
          }))
        }

        return response;
      });
    },
    getNextPageParam: (page) => {
      const items = page?.data?.items;
      return items?.length ? items[items?.length - 1].id : '';
    },
    initialPageParam: '',
  });

  const {inView, ref} = useInView({initialInView: false});
  console.log('inView', inView)

  React.useEffect(() => {
    if (inView) {
      console.log('aaa fetchNextPage')
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  const items = React.useMemo(() => {
    return (data?.pages ?? []).reduce<any>((acc, page) => {
      if (page?.data?.items?.length) {
        acc.push(...page.data.items);
      }
      return acc;
    }, [])
  }, [data?.pages]);

  console.log(data?.pages)

  return (
    <div>
      <CTable
        items={items}
        className="border rounded h-100"
      />
      <div ref={ref}/>
    </div>
  );
}
