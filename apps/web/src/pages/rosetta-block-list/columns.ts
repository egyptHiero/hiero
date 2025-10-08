import { ColumnNames } from './types';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const columnNames: Partial<ColumnNames>[] = ['id', 'translation'];

export const useGetColumns = () => {
  const { t } = useTranslation();

  const getColumnLabel = React.useCallback(
    (key: ColumnNames) => {
      switch (key) {
        case 'id':
          return t(`rosetta.columns.id`);
        case 'translation':
          return t(`rosetta.columns.translation`);
      }
    },
    [t],
  );

  return React.useMemo(
    () =>
      columnNames.map((key) => ({
        key,
        label: getColumnLabel(key),
      })),
    [getColumnLabel],
  );
};
