import React from 'react';
import {useTranslation} from "react-i18next";
import {PathParam, useParams} from "react-router-dom";
import {ROUTES} from "../../app/routes";
import {InfiniteTable} from "../../components/infinite-table";
import {useGetDictionary} from "./hooks";
import {DictionaryItemVO} from "./types";
import {columnNames} from "./columns";
import {DictionaryItemDto} from "../../types/types";
import {StyledDescription} from "./styled";

export const DictionaryPage: React.FC = () => {
  const {name: dictionaryName} = useParams<PathParam<typeof ROUTES.DICTIONARY>>();

  const {t} = useTranslation();

  const mapper = (item: DictionaryItemDto): DictionaryItemVO => ({
    id: item.id,
    text: item.i.map(item => (
      <div key={item.id}>{Object.keys(item)} <StyledDescription>{Object.values(item)}</StyledDescription></div>))
  });

  const scrollData = useGetDictionary(dictionaryName, mapper);

  const getColumnLabel = React.useCallback((key: keyof DictionaryItemVO) => {
    switch (key) {
      case 'id':
        return t(`dictionaries.columns.id`);
    }
  }, [t]);

  const columns = React.useMemo(() => (columnNames.map(key => ({
    key,
    label: getColumnLabel(key)
  }))), [getColumnLabel]);

  return (
    <div>
      <InfiniteTable hover columns={columns} {...scrollData}/>
    </div>
  );
};

DictionaryPage.displayName = 'DictionaryPage';
