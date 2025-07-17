import React, { ChangeEventHandler } from 'react';
import {
  CContainer,
  CFormInput,
  CHeaderToggler,
  CNavbar,
  CNavbarBrand,
} from '@coreui/react';
import { useAppContext } from '../context/app-context';
import CIcon from '@coreui/icons-react';
import { cilMenu } from '@coreui/icons';
import { LanguageSwitcher } from '../../components/language-switcher';

export const Navbar: React.FC = () => {
  const { setSidebarVisible, setQuery } = useAppContext();

  const handleSearch: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setQuery(target.value);

  return (
    <CNavbar>
      <CContainer fluid>
        <div>
          <CHeaderToggler
            className="me-2"
            onClick={() => setSidebarVisible((v) => !v)}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CNavbarBrand>Egypt Hieroes</CNavbarBrand>
        </div>
        <div className="d-flex">
          <CFormInput
            type="search"
            className="me-2"
            placeholder="Search"
            onChange={handleSearch}
          />
          <LanguageSwitcher />
        </div>
      </CContainer>
    </CNavbar>
  );
};

Navbar.displayName = 'Navbar';
