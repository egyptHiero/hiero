import * as React from 'react';
import { CFormInput, CFormTextarea, CRow } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { RosettaPartDto } from '../../types/types';
import { StyledCCol } from '../../components/styled';
import { HieroFormSelector } from '../../components/hiero-form-selector';

export const RosettaPartFormControls: React.FC = () => {
  const { t } = useTranslation();
  const { register, watch } = useFormContext<RosettaPartDto>();
  const image = `/rosetta/${watch('image')}`;

  return (
    <>
      <StyledCCol md={6}>
        <CFormInput
          {...register('id', { required: true })}
          label={t('sign.name')}
        />
      </StyledCCol>
      <StyledCCol xs={6}>
        <CFormTextarea
          rows={4}
          {...register('gardinerCodes', { required: true })}
          label={t('sign.gardinerCodes')}
        />
      </StyledCCol>
      <CRow>
        <HieroFormSelector name="gardinerCodes" image={image} fontSize={400} />
      </CRow>
    </>
  );
};

RosettaPartFormControls.displayName = 'RosettaPartFormControls';
