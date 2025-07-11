import * as React from 'react';
import {InfiniteTable} from "../../components/infinite-table";

export const DictionaryListPage: React.FC = () => {
  return (
    <div>
      <InfiniteTable />
    </div>
  );
};

DictionaryListPage.displayName = 'DictionaryListPage';
