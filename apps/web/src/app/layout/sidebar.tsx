import CIcon from '@coreui/icons-react';
import {
  CNavItem,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
} from '@coreui/react';
import { cilBarcode, cilHome, cilText } from '@coreui/icons';
import { useAppContext } from '../context/app-context';
import { ROUTES } from '../routes';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';

const StyledNavItem = styled(CNavItem)({
  '.nav-link': {
    gap: 8,
  },
});

export const Sidebar: React.FC = () => {
  const { isSidebarVisible, setSidebarVisible } = useAppContext();
  const { t } = useTranslation();

  return (
    <CSidebar
      visible={isSidebarVisible}
      onVisibleChange={(value) => setSidebarVisible(value)}
      className="c-sidebar"
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand>Egypt Hieroes</CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <StyledNavItem href={ROUTES.SIGN_LIST}>
          <CIcon icon={cilBarcode} size="xl" />
          {t('app.sidebar.signs')}
        </StyledNavItem>
        <StyledNavItem href={ROUTES.TRANSLATION_LIST}>
          <CIcon icon={cilText} size="xl" />
          {t('app.sidebar.translations')}
        </StyledNavItem>
        <StyledNavItem href={ROUTES.DICTIONARY_LIST}>
          <CIcon icon={cilText} size="xl" />
          {t('app.sidebar.dictionaries')}
        </StyledNavItem>
        <StyledNavItem href={ROUTES.ABOUT}>
          <CIcon icon={cilHome} size="xl" />
          {t('app.sidebar.about')}
        </StyledNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

Sidebar.displayName = 'Sidebar';
