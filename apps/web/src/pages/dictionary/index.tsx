import React from 'react';
import { useTranslation } from 'react-i18next';
import { PathParam, useParams } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { InfiniteTable } from '../../components/infinite-table';
import { useGetDictionary } from './hooks';
import { DictionaryItemVO } from './types';
import { columnNames } from './columns';
import { DictionaryItemDto } from '../../types/types';
import {
  StyledDescription,
  StyledTranscription,
  StyledTranslation,
} from './styled';
import { Hiero } from '../../components/hiero';
import { useAppContext } from '../../app/context/app-context';
import { wrapWithBrackets } from '../../utils';

const transliterate = (text?: string) => {
  const translitMap = {
    A: 'ꜣ',
    a: 'ꜥ',
    T: 'ṯ',
    t: 'ṯ',
    D: 'ḏ',
    d: 'ḏ',
    H: 'ḥ',
    h: 'ḥ',
    X: 'ẖ',
    x: 'ẖ',
    S: 'š',
    s: 'š',
    K: 'ḳ',
    k: 'ḳ',
    I: 'ỉ',
    i: 'ỉ',
  };

  return text?.replace(
    new RegExp(`[${Object.keys(translitMap).join()}]`, 'g'),
    (char) => translitMap[char] || char,
  );
};

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
    text: item.i.map((v, i) => (
      <div key={`${item.id}-${i}`}>
        <StyledTranslation>{v[0]}</StyledTranslation>
        <StyledDescription>{wrapWithBrackets(v[1])}</StyledDescription>
      </div>
    )),
    hieroes: <Hiero text={item.id} fontSize={40} />,
    transcription: item.i.map((v, i) => (
      <div key={`${item.id}-${i}`}>
        <StyledTranscription>{transliterate(v[2])}</StyledTranscription>
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
