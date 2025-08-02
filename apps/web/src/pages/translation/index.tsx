import * as React from 'react';
import { PathParam, useParams } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { useGetTranslation } from './hooks';
import { CContainer } from '@coreui/react';
import { TranslationForm } from './form';

export const TranslationPage: React.FC = () => {
  const { id: translationId, sign } =
    useParams<PathParam<typeof ROUTES.TRANSLATION>>();
  const { data, isFetching } = useGetTranslation(translationId);

  if (!translationId || isFetching) {
    return null;
  }

  return (
    <CContainer fluid>
      <TranslationForm
        translationId={translationId}
        data={data?.data}
        sign={sign}
      />
    </CContainer>
  );
};

TranslationPage.displayName = 'TranslationPage';
