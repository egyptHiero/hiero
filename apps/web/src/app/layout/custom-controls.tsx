import React from 'react';
import { CForm, CFormInput } from '@coreui/react';
import { LanguageSwitcher } from '../../components/language-switcher';
import { useFormContext } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { useAppContext } from '../context/app-context';

export const NavbarCustomControls: React.FC = () => {
  const { setCustomControlsParam, customControls, customControlNames } =
    useAppContext();

  const showSearch = customControlNames?.has('search');

  const { register } = useFormContext();

  const [searchValue, setSearchValue] = React.useState<string | null>(null);
  const [debouncedSearch] = useDebounce(searchValue, 300);

  React.useEffect(() => {
    if (debouncedSearch !== null) {
      setCustomControlsParam('search', debouncedSearch);
      setSearchValue(null);
    }
  }, [debouncedSearch, setCustomControlsParam]);

  return (
    <CForm className="d-flex align-items-center">
      {showSearch && (
        <CFormInput
          type="search"
          className="me-2"
          placeholder="Search"
          {...register('search')}
          onChange={({ target }) => {
            setSearchValue(target.value);
          }}
        />
      )}
      {customControls}
      <LanguageSwitcher />
    </CForm>
  );
};

NavbarCustomControls.displayName = 'NavbarCustomControls';
