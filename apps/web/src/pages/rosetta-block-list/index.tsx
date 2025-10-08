import React from 'react';
import { InfiniteTable } from '../../components/infinite-table';
import { useGetColumns } from './columns';
import { useTranslation } from 'react-i18next';
import { useGetRosettaBlocksList } from './hooks';
import { useDoubleClick } from '../../hooks/double-click';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { RosettaBlocksDto } from '../../types';

export const RosettaBlockListPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const scrollData = useGetRosettaBlocksList();

  const columns = useGetColumns();

  const clickHandler = useDoubleClick({
    onClick: React.useCallback(
      (row: RosettaBlocksDto) => {
        navigate(generatePath(ROUTES.ROSETTA_BLOCK, { id: row.id }));
      },
      [navigate],
    ),
    onDoubleClick: React.useCallback((row: RosettaBlocksDto) => {
      window.open(generatePath(ROUTES.ROSETTA_BLOCK, { id: row.id }), '_blank');
    }, []),
  });

  const items = React.useMemo(
    () =>
      scrollData.items.map((item) => ({
        ...item,
        _props: {
          ...clickHandler(item),
          style: { cursor: 'pointer' },
        },
      })),
    [scrollData.items, clickHandler],
  );

  return (
    <div>
      <InfiniteTable hover columns={columns} {...scrollData} items={items} />
    </div>
  );
};

RosettaBlockListPage.displayName = 'RosettaBlockListPage';
