import React from 'react';
import { useGetDictionaryList } from './hooks';
import { useTranslation } from 'react-i18next';
import { columnNames } from './columns';
import { DictionaryInfoDto } from '../../types';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { InfiniteTable } from '../../controls/infinite-table';
import { useAppContext } from '../../app/context/app-context';
import { TColumnName } from './types';
import { CNavLink } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSave } from '@coreui/icons';

export const DictionaryListPage: React.FC = () => {
  const { t } = useTranslation();
  const scrollData = useGetDictionaryList();
  const navigate = useNavigate();
  const { setCustomControls } = useAppContext();

  React.useEffect(() => {
    setCustomControls(undefined, 'search');

    return () => setCustomControls(undefined);
  }, [setCustomControls]);

  const getColumnLabel = React.useCallback(
    (key: TColumnName) => {
      switch (key) {
        case 'id':
          return t(`dictionaries.columns.id`);
        case 'description':
          return t(`dictionaries.columns.description`);
        case 'link':
          return t(`dictionaries.columns.link`);
        case 'language':
          return t(`dictionaries.columns.language`);
        case 'size':
          return t(`dictionaries.columns.size`);
        case 'action':
          return t(`dictionaries.columns.action`);
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
    (row: DictionaryInfoDto) => {
      navigate(generatePath(ROUTES.DICTIONARY, { name: row.id }));
    },
    [navigate],
  );

  const items = React.useMemo(
    () =>
      scrollData.items.map((item) => ({
        ...item,
        action: (
          <CNavLink
            title={t('btn.export')}
            href={`/api/dictionary/${item.id}/export`}
            target="_blank"
            download
            onClick={(e) => e.stopPropagation()}
          >
            <CIcon icon={cilSave} size="lg" />
          </CNavLink>
        ),
        _props: {
          onClick: () => handleRowClick(item),
          style: { cursor: 'pointer' },
        },
      })),
    [scrollData.items, t, handleRowClick],
  );

  return (
    <div>
      <InfiniteTable hover columns={columns} {...scrollData} items={items} />
    </div>
  );
};

DictionaryListPage.displayName = 'DictionaryListPage';
