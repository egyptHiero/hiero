import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { InfiniteTable } from '../../components/infinite-table';
import { useAppContext } from '../../app/context/app-context';
import { useGetRosettaPartsList } from './hooks';
import { generatePath, useNavigate } from 'react-router-dom';
import { RosettaPartDto } from '../../types/types';
import { columnNames } from './columns';
import { CImage } from '@coreui/react';
import { useDoubleClick } from '../../hooks/double-click';
import { ROUTES } from '../../app/routes';
import { Hiero } from '../../components/hiero';
import { ColumnNames } from './types';
import { CustomControls } from './custom-controls';

export const RosettaPage: React.FC = () => {
  const { t } = useTranslation();
  const scrollData = useGetRosettaPartsList();
  const navigate = useNavigate();
  const { setCustomControls } = useAppContext();

  React.useEffect(() => {
    setCustomControls(<CustomControls />, 'search');

    return () => setCustomControls(undefined);
  }, [setCustomControls]);

  const getColumnLabel = React.useCallback(
    (key: ColumnNames) => {
      switch (key) {
        case 'id':
          return t(`rosetta.columns.id`);
        case 'image':
          return t(`rosetta.columns.image`);
        case 'hieroes':
          return t(`rosetta.columns.hieroes`);
        case 'gardinerCodes':
          return t(`rosetta.columns.codes`);
        case 'translation':
          return t(`rosetta.columns.translation`);
        case 'transliteration':
          return t(`rosetta.columns.transliteration`);
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

  const doubleClickHandler = useDoubleClick({
    onClick: React.useCallback(
      (row: RosettaPartDto) => {
        navigate(generatePath(ROUTES.ROSETTA_PART, { id: row.id }));
      },
      [navigate],
    ),
    onDoubleClick: React.useCallback((row: RosettaPartDto) => {
      window.open(generatePath(ROUTES.ROSETTA_PART, { id: row.id }), '_blank');
    }, []),
  });

  const items = React.useMemo(
    () =>
      scrollData.items.map((item) => ({
        ...item,
        image: <CImage src={`rosetta/${item.image}`} height="50px" />,
        hieroes: <Hiero text={item.gardinerCodes} fontSize={45} />,
        gardinerCodes: item.gardinerCodes ?? '',
        _props: {
          ...doubleClickHandler(item),
          style: { cursor: 'pointer' },
        },
      })),
    [scrollData.items, doubleClickHandler],
  );

  return (
    <div>
      <InfiniteTable hover columns={columns} {...scrollData} items={items} />
    </div>
  );
};

RosettaPage.displayName = 'RosettaPage';
