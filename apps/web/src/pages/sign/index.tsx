import React from 'react';
import { CContainer } from '@coreui/react';
import { useGetSign } from './hooks';
import { PathParam, useParams } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { SignForm } from './form';

export const SignPage: React.FC = () => {
  const { id: signId } = useParams<PathParam<typeof ROUTES.SIGN>>();
  const { data, isFetching } = useGetSign(signId);

  if (!signId || !data?.data || isFetching) {
    return null;
  }

  return (
    <CContainer fluid>
      <SignForm signId={signId} data={data.data} />
    </CContainer>
  );
};

SignPage.displayName = 'Sign';
