import React from 'react';
import {
  CFormInput,
  CFormSelect,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs,
} from '@coreui/react';
import { useSelectorAsideContext } from './context';
import { GARDINER_CLASSIFICATION } from '../../../constants';
import { useTranslation } from 'react-i18next';
import { TActiveTab } from './types';

export const QuerySelector: React.FC = () => {
  const { t } = useTranslation();
  const { category, setCategory } = useSelectorAsideContext();
  const { activeTab, setActiveTab, query, setQuery } =
    useSelectorAsideContext();

  const hieroGroupOptions = React.useMemo(
    () =>
      GARDINER_CLASSIFICATION.map((value) => ({
        value,
        label: value + ' - ' + t(`dynamic.gardinerCodes.${value}`),
      })),
    [t],
  );

  return (
    <CTabs
      className="w-100"
      defaultActiveItemKey={activeTab}
      onChange={(tab) => setActiveTab(tab as TActiveTab)}
    >
      <CTabList
        variant="enclosed-pills"
        className="d-flex justify-content-between"
      >
        <CTab itemKey="select">{t('aside.hiero.tab.select.caption')}</CTab>
        <CTab itemKey="search">{t('aside.hiero.tab.search.caption')}</CTab>
      </CTabList>
      <CTabContent className="my-2">
        <CTabPanel itemKey="select">
          <CFormSelect
            options={hieroGroupOptions}
            value={category}
            onChange={({ target }) => setCategory(target.value)}
          />
        </CTabPanel>
        <CTabPanel itemKey="search">
          <CFormInput
            placeholder={t('aside.hiero.tab.search.placeholder')}
            value={query}
            onChange={({ target }) => setQuery(target.value)}
          />
        </CTabPanel>
      </CTabContent>
    </CTabs>
  );
};

QuerySelector.displayName = 'AsideHeader';
