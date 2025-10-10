import React from 'react';
import { ROUTES } from '../../app/routes';
import { PathParam, useParams } from 'react-router-dom';
import { CContainer } from '@coreui/react';
import { useGetRosettaBlock } from './hooks';
import { RosettaBlockForm } from './form';

export const RosettaBlockPage: React.FC = () => {
  const { id: blockId } = useParams<PathParam<typeof ROUTES.ROSETTA_BLOCK>>();
  const { data, isFetching } = useGetRosettaBlock(blockId);

  if (!blockId || isFetching) {
    return null;
  }

  return (
    <CContainer className="p-0">
      <RosettaBlockForm data={data?.data} blockId={blockId} />
    </CContainer>
  );
};

RosettaBlockPage.displayName = 'RosettaBlockPage';
