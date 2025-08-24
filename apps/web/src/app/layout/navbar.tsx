import React from 'react';
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
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

export const Navbar: React.FC = () => {
  const {
    setSidebarVisible,
    setCustomControlsData,
    customControls,
    customControlNames,
  } = useAppContext();

  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || undefined;

  const [searchValue, setSearchValue] = React.useState(search);
  const [debouncedSearch] = useDebounce(searchValue, 300);
  React.useEffect(() => {
    setCustomControlsData('search', debouncedSearch);
  }, [debouncedSearch, searchParams, setCustomControlsData]);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setSearchValue(target.value);

  const showSearch = customControlNames?.has('search');

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
          {showSearch && (
            <CFormInput
              type="search"
              className="me-2"
              placeholder="Search"
              defaultValue={search}
              onChange={handleSearch}
            />
          )}
          {customControls}
          <LanguageSwitcher />
        </div>
      </CContainer>
    </CNavbar>
  );
};

Navbar.displayName = 'Navbar';
