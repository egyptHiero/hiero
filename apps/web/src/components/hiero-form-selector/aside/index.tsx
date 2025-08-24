import React from 'react';
import {
  CCloseButton,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { QuerySelector } from './query-selector';
import { AsideContextProvider } from './context';
import { HieroesList } from './hieroes-list';
import { HieroesSelector } from './hieroes-selector';
import { useHieroSelectorContext } from '../context';

export const Aside: React.FC = () => {
  const { t } = useTranslation();
  const { asideVisible, setAsideVisible } = useHieroSelectorContext();

  return (
    <AsideContextProvider>
      <COffcanvas
        backdrop={false}
        placement="end"
        scroll={true}
        visible={asideVisible}
        onHide={() => setAsideVisible(false)}
      >
        <COffcanvasHeader>
          <COffcanvasTitle>{t('aside.hiero.caption')}</COffcanvasTitle>
          <CCloseButton
            className="text-reset"
            onClick={() => setAsideVisible(false)}
          />
        </COffcanvasHeader>
        <COffcanvasHeader className="pb-1">
          <HieroesSelector />
        </COffcanvasHeader>
        <COffcanvasHeader className="pb-0">
          <QuerySelector />
        </COffcanvasHeader>
        <COffcanvasBody>
          <HieroesList />
        </COffcanvasBody>
      </COffcanvas>
    </AsideContextProvider>
  );
};

Aside.displayName = 'Aside';
