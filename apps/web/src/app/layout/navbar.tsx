import React from 'react'
import {CContainer, CHeaderToggler, CNavbar, CNavbarBrand} from '@coreui/react'
import {useAppContext} from "../context/app-context";
import CIcon from "@coreui/icons-react";
import {cilMenu} from "@coreui/icons";
import {LanguageSwitcher} from "../../components/language-switcher";

export const Navbar: React.FC = () => {
  const {setSidebarVisible} = useAppContext();

  return (
    <CNavbar>
      <CContainer fluid>
        <CHeaderToggler onClick={() => setSidebarVisible(v => !v)}>
          <CIcon icon={cilMenu} size="lg"/>
        </CHeaderToggler>
        <CNavbarBrand>Egypt Hieroes</CNavbarBrand>
        <LanguageSwitcher />
      </CContainer>
    </CNavbar>
  );
};

Navbar.displayName = 'Navbar';
