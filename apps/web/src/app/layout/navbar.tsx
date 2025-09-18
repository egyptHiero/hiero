import React from 'react';
import {
  CContainer,
  CHeaderToggler,
  CNavbar,
  CNavbarBrand,
} from '@coreui/react';
import { useAppContext } from '../context/app-context';
import CIcon from '@coreui/icons-react';
import { cilMenu } from '@coreui/icons';
import { useSearchParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { NavbarCustomControls } from './custom-controls';

export const Navbar: React.FC = () => {
  const { setSidebarVisible } = useAppContext();

  const [searchParams] = useSearchParams();
  const formMethods = useForm({
    values: Object.fromEntries(searchParams.entries()),
  });

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
        <FormProvider {...formMethods}>
          <NavbarCustomControls />
        </FormProvider>
      </CContainer>
    </CNavbar>
  );
};

Navbar.displayName = 'Navbar';
