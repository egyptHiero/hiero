import React from 'react';
import { useTranslation } from 'react-i18next';

export const ServerUnavailableErrorPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="col-md-12 text-center">
      <h1>500</h1>
      <h2>{t('error.500.header')}</h2>
      <p>{t('error.500.text')}</p>
    </div>
  );
};

ServerUnavailableErrorPage.displayName = 'ServerUnavailableErrorPage';
