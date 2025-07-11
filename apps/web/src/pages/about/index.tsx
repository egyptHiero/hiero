import * as React from 'react';
import {useTranslation} from "react-i18next";

export const AboutPage: React.FC = () => {
  const {t} = useTranslation();

  return (
    <>
      {t('btn.add')}
    </>
  );
};

AboutPage.displayName = 'AboutPage';
