import React, { Fragment, useState } from 'react';
import { CContainer, CImage } from '@coreui/react';
import { useGetSign } from './hooks';
import { PathParam, useParams } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { Hiero } from '../../components/hiero';
import { SignForm } from './form';
import { SignDto } from '../../types/types';

export const SignPage: React.FC = () => {
  const { id: signId } = useParams<PathParam<typeof ROUTES.SIGN>>();
  const { data } = useGetSign(signId);
  const [values, setValues] = useState<Partial<SignDto>>();

  const classificationLines = React.useMemo(
    () => values?.classification?.split('\n') ?? [],
    [values?.classification],
  );

  if (!signId || !data?.data) {
    return null;
  }

  return (
    <CContainer fluid>
      <div className="d-flex">
        <CImage src={data?.data?.image} />
        <div className="d-flex flex-row-reverse">
          {classificationLines.map((line, n) => (
            <Fragment key={line}>
              <Hiero text={line} dir="vrl" fontSize={65} />
              <div
                className="mx-1"
                style={{
                  borderRight: '3px solid #ccc', // Толщина 4px
                  height: '100%',
                }}
              />
            </Fragment>
          ))}
        </div>
      </div>
      <SignForm signId={signId} data={data.data} onValuesChanged={setValues} />
    </CContainer>
  );
};

SignPage.displayName = 'Sign';
