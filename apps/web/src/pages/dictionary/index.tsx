import React from 'react';
import { useTranslation } from 'react-i18next';
import { PathParam, useParams } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { InfiniteTable } from '../../controls/infinite-table';
import { useGetDictionary } from './hooks';
import { DictionaryItemVO } from './types';
import { columnNames } from './columns';
import { DictionaryItemDto } from '../../types';
import {
  StyledDescription,
  StyledTranscription,
  StyledTranslation,
} from '../../controls/dictionary';
import { Hiero } from '../../controls/hiero';
import { useAppContext } from '../../app/context/app-context';
import { transliterate, wrapWithBrackets } from '../../utils';

export const DictionaryPage: React.FC = () => {
  const { name: dictionaryName } =
    useParams<PathParam<typeof ROUTES.DICTIONARY>>();
  const { setCustomControls } = useAppContext();
  const { t } = useTranslation();

  React.useEffect(() => {
    setCustomControls(undefined, 'search');

    return () => setCustomControls(undefined);
  }, [setCustomControls]);

  const mapper = (item: DictionaryItemDto): DictionaryItemVO => ({
    id: item.id,
    text: item.text.map((v, i) => (
      <div key={`${item.id}-${i}`}>
        <StyledTranslation>{v}</StyledTranslation>
        <StyledDescription>{wrapWithBrackets(v)}</StyledDescription>
      </div>
    )),
    hieroes: <Hiero text={item.id} fontSize={40} />,
    transcription: item.transcription?.map((v, i) => (
      <div key={`${item.id}-${i}`}>
        <StyledTranscription>{transliterate(v)}</StyledTranscription>
      </div>
    )),
  });

  const scrollData = useGetDictionary(dictionaryName, mapper);

  const getColumnLabel = React.useCallback(
    (key: keyof DictionaryItemVO) => {
      switch (key) {
        case 'id':
          return t(`dictionaries.columns.id`);
        case 'text':
          return t(`dictionaries.columns.text`);
        case 'hieroes':
          return t(`dictionaries.columns.hieroes`);
        case 'transcription':
          return t(`dictionaries.columns.transcription`);
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

DictionaryPage.displayName = 'DictionaryPage';
