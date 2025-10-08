import React from 'react';
import { PathParam, useParams } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { useGetTranslation } from './hooks';
import { CContainer } from '@coreui/react';
import { TranslationForm } from './form';
import { useGetSign } from '../sign/hooks';

export const TranslationPage: React.FC = () => {
  const { id: translationId, sign: signId } =
    useParams<PathParam<typeof ROUTES.TRANSLATION>>();
  const { data, isFetching } = useGetTranslation(translationId);
  const { data: signData, isFetching: isSignFetching } = useGetSign(
    signId || data?.data.sign,
  );

  if (!translationId || isFetching || isSignFetching) {
    return null;
  }

  return (
    <CContainer fluid>
      <TranslationForm
        translationId={translationId}
        data={data?.data}
        signData={signData?.data}
      />
    </CContainer>
  );
};

TranslationPage.displayName = 'TranslationPage';
