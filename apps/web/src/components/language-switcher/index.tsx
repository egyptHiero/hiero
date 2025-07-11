import * as React from 'react';
import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from "@coreui/react";
import {useTranslation} from "react-i18next";

export const LanguageSwitcher: React.FC = () => {
  const {i18n} = useTranslation();

  return (
    <CDropdown>
      <CDropdownToggle>{i18n.language}</CDropdownToggle>
      <CDropdownMenu>
        {['en', 'ru'].map(lang => (
          <CDropdownItem key={lang} onClick={(value) => {
            i18n.changeLanguage(lang);
          }}>
            {lang}
          </CDropdownItem>
        ))}
      </CDropdownMenu>
    </CDropdown>
  );
};

LanguageSwitcher.displayName = 'LanguageSwitcher';
