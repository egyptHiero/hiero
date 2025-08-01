import React from 'react';
import { InfiniteTable } from '../../components/infinite-table';
import { useTranslation } from 'react-i18next';
import { useGetSignList } from './hooks';
import { columnNames } from './columns';
import { SignDto } from '../../types/types';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { CButton } from '@coreui/react';
import { useAppContext } from '../../app/context/app-context';

export const SignListPage: React.FC = () => {
  const { t } = useTranslation();
  const scrollData = useGetSignList();
  const { setCustomControls } = useAppContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleCreate = () => {
      navigate(generatePath(ROUTES.SIGN, { id: 'new' }));
    };

    setCustomControls(
      <CButton color="primary" onClick={handleCreate} className="text-nowrap">
        {t('btn.create')}
      </CButton>,
      'search',
    );

    return () => setCustomControls(undefined);
  }, [navigate, setCustomControls, t]);

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

  const handleRowClick = React.useCallback(
    (row: SignDto) => {
      navigate(generatePath(ROUTES.SIGN, { id: row.id }));
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

SignListPage.displayName = 'SignList';
