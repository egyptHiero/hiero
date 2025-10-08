import React from 'react';
import { ROUTES } from '../../app/routes';
import { PathParam, useParams } from 'react-router-dom';
import { CContainer } from '@coreui/react';
import { useGetRosettaPart } from './hooks';
import { RosettaPartForm } from './form';

export const RosettaPartPage: React.FC = () => {
  const { id: partId } = useParams<PathParam<typeof ROUTES.ROSETTA_PART>>();
  const { data, isFetching } = useGetRosettaPart(partId);

  if (!partId || isFetching) {
    return null;
  }

  return (
    <CContainer fluid>
      <RosettaPartForm data={data?.data} partId={partId} />
    </CContainer>
  );
};

RosettaPartPage.displayName = 'RosettaPartPage';
