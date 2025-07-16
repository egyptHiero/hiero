import CIcon from '@coreui/icons-react';
import {
  CNavItem,
  CNavTitle,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
} from '@coreui/react';
import { cilBarcode, cilHome, cilText } from '@coreui/icons';
import { useAppContext } from '../context/app-context';
import { ROUTES } from '../routes';
import { useTranslation } from 'react-i18next';

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
        <CNavTitle>Nav Title</CNavTitle>
        <CNavItem href={ROUTES.SIGN_LIST}>
          <CIcon customClassName="nav-icon" icon={cilBarcode} />
          {t('app.sidebar.signs')}
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilText} />
          {t('app.sidebar.translations')}
        </CNavItem>
        <CNavItem href={ROUTES.DICTIONARY_LIST}>
          <CIcon customClassName="nav-icon" icon={cilText} />
          {t('app.sidebar.dictionaries')}
        </CNavItem>
        <CNavItem href={ROUTES.ABOUT}>
          <CIcon customClassName="nav-icon" icon={cilHome} />
          {t('app.sidebar.about')}
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

Sidebar.displayName = 'Sidebar';
