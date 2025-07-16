import React from 'react';
import {useGetDictionaryList} from "./hooks";
import {useTranslation} from "react-i18next";
import {columnNames} from "./columns";
import {DictionaryInfoDto} from "../../types/types";
import {generatePath, useNavigate} from "react-router-dom";
import {ROUTES} from "../../app/routes";
import {InfiniteTable} from "../../components/infinite-table";

export const DictionaryListPage: React.FC = () => {
  const {t} = useTranslation();
  const scrollData = useGetDictionaryList();
  const navigate = useNavigate();

  const getColumnLabel = React.useCallback((key: keyof DictionaryInfoDto) => {
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
    }
  }, [t]);

  const handleRowClick = React.useCallback((row: DictionaryInfoDto) => {
    navigate(generatePath(ROUTES.DICTIONARY, {name: row.id}));
  }, [navigate]);

/*
  const items =
    React.useMemo(() => data?.map((item) => ({
      ...item,
      _props: {onClick: () => handleRowClick(item), style: {cursor: 'pointer'},},
    })), [data, handleRowClick]);
*/

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

DictionaryListPage.displayName = 'DictionaryListPage';
