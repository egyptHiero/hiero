import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetTranslationList } from './hooks';
import { useAppContext } from '../../app/context/app-context';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { TranslationDto } from '../../types';
import { columnNames } from './columns';
import { InfiniteTable } from '../../controls/infinite-table';

export const TranslationListPage: React.FC = () => {
  const { t } = useTranslation();
  const scrollData = useGetTranslationList();
  const { setCustomControls } = useAppContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    setCustomControls(null, 'search');
    return () => setCustomControls(undefined);
  }, [navigate, setCustomControls, t]);

  const getColumnLabel = React.useCallback(
    (key: keyof TranslationDto) => {
      switch (key) {
        case 'name':
          return t(`translation.columns.name`);
        case 'description':
          return t(`translation.columns.description`);
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

  const handleRowClick = React.useCallback(
    (row: TranslationDto) => {
      navigate(generatePath(ROUTES.TRANSLATION, { id: row.id, sign: null }));
    },
    [navigate],
  );

  const items = React.useMemo(
    () =>
      scrollData.items.map((item) => ({
        ...item,
        _props: {
          onClick: () => handleRowClick(item),
          style: { cursor: 'pointer' },
        },
      })),
    [scrollData.items, handleRowClick],
  );

  return (
    <div>
      <InfiniteTable hover columns={columns} {...scrollData} items={items} />
    </div>
  );
};

TranslationListPage.displayName = 'TranslationListPage';
