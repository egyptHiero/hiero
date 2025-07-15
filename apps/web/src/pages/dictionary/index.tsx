import React from 'react';
import {useTranslation} from "react-i18next";
import {PathParam, useParams} from "react-router-dom";
import {ROUTES} from "../../app/routes";
import {columnNames} from "./columns";
import {CTable} from "@coreui/react";
import {useGetDictionary} from "./hooks";
import {DictionaryItemVO} from "./types";
import styled from "@emotion/styled";

const Description = styled.span({
  fontSize: "small",
  fontStyle: "italic",
  fontWeight: "bolder"
})

export const DictionaryPage: React.FC = () => {
  const {name: dictionaryName} = useParams<PathParam<typeof ROUTES.DICTIONARY>>();
  const {data} = useGetDictionary(dictionaryName);
  const {t} = useTranslation();

  const getColumnLabel = React.useCallback((key: keyof DictionaryItemVO) => {
    switch (key) {
      case 'id':
        return t(`dictionaries.columns.id`);
    }
  }, [t]);

  const items =
    React.useMemo(() => data?.map((item) => ({
      ...item,
      text: item.i.map(item => (<div>{Object.keys(item)} <Description>{Object.values(item)}</Description></div>))
    })), [data]);

  const columns = React.useMemo(() => (columnNames.map(key => ({
    key,
    label: getColumnLabel(key)
  }))), [getColumnLabel]);

  return (
    <div>
      <CTable hover columns={columns} items={items}/>
    </div>
  );
};

DictionaryPage.displayName = 'DictionaryPage';
