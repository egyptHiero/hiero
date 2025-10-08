import React from 'react';
import { CFormInput, CFormTextarea, CRow } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { RosettaPartDto } from '../../types';
import { StyledCCol } from '../../controls/dictionary';
import { HieroFormSelector } from '../../components';

export const RosettaPartFormControls: React.FC = () => {
  const { t } = useTranslation();
  const { register, watch } = useFormContext<RosettaPartDto>();
  const image = `/rosetta/${watch('image')}`;

  return (
    <>
      <StyledCCol md={6}>
        <CFormInput
          {...register('id', { required: true })}
          label={t('rosetta.parts.name')}
          readOnly
        />
      </StyledCCol>
      <StyledCCol xs={6}>
        <CFormTextarea
          rows={4}
          {...register('gardinerCodes')}
          label={t('rosetta.parts.gardinerCodes')}
        />
      </StyledCCol>
      <StyledCCol xs={2}>
        <CFormInput
          readOnly
          {...register('transliteration')}
          label={t('rosetta.parts.transliteration')}
        />
      </StyledCCol>
      <StyledCCol xs={2}>
        <CFormInput
          readOnly
          {...register('translation')}
          label={t('rosetta.parts.translation')}
        />
      </StyledCCol>
      <CRow>
        <HieroFormSelector name="gardinerCodes" image={image} fontSize={400} />
      </CRow>
    </>
  );
};

RosettaPartFormControls.displayName = 'RosettaPartFormControls';
