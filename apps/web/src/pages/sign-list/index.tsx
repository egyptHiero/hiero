import React from 'react';
import { InfiniteTable } from '../../components/infinite-table';
import { useTranslation } from 'react-i18next';
import { useGetSignList } from './hooks';
import { columnNames } from './columns';
import { SignDto } from '../../types/types';

export const SignListPage: React.FC = () => {
  const { t } = useTranslation();
  const scrollData = useGetSignList();

  const getColumnLabel = React.useCallback(
    (key: keyof SignDto) => {
      switch (key) {
        case 'name':
          return t(`sign.columns.name`);
        case 'description':
          return t(`sign.columns.description`);
      }
    },
    [t],
  );

  const columns = React.useMemo(
    () =>
      columnNames.map((key) => ({
        key,
        label: getColumnLabel(key),
      })),
    [getColumnLabel],
  );

  return (
    <div>
      <InfiniteTable hover columns={columns} {...scrollData} />
    </div>
  );
};

SignListPage.displayName = 'SignList';
