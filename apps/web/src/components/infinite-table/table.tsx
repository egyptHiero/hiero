import React from 'react';
import {InView} from "react-intersection-observer";
import {CTable} from "@coreui/react";
import {CTableProps} from "@coreui/react/src/components/table/CTable";
import {useInfinityScroll} from "./hook";

type InfiniteTableProps = ReturnType<typeof useInfinityScroll> & CTableProps;

export const InfiniteTable: React.FC<InfiniteTableProps> = ({
                                                    data,
                                                    isFetching,
                                                    fetchNextPage,
                                                    hasNextPage,
                                                    ...tableProps
                                                  }) => {
  const [inView, setInView] = React.useState(false)
  const [canFetch, setCanFetch] = React.useState(false)

  const updateInView = (value: boolean) => {
    setInView(value);
    setCanFetch(true);
  }

  React.useEffect(() => {
    if (canFetch && inView && hasNextPage && !isFetching) {
      setCanFetch(false);
      void fetchNextPage();
    }
  }, [canFetch, fetchNextPage, hasNextPage, inView, isFetching]);

  return (
    <div>
      <CTable {...tableProps}/>
      {!!data?.pages?.length &&
        <InView as="div" onChange={(inView) => updateInView(inView)} initialInView={true}/>
      }
    </div>
  );
};

InfiniteTable.displayName = 'InfiniteTable';
