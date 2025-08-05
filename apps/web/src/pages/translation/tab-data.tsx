import * as React from 'react';
import { CCol, CFormInput, CFormTextarea, CRow } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { TranslationVO } from './types';
import styled from '@emotion/styled';

const StyledCCol = styled(CCol)({
  '& >.form-label': {
    marginBottom: 0,
  },
  marginBottom: '1rem',
});

export const TranslationTabData: React.FC = () => {
  const { t } = useTranslation();
  const { register } = useFormContext<TranslationVO>();

  return (
    <>
      <CRow>
        <StyledCCol md={6}>
          <CFormInput
            {...register('name', { required: true })}
            id="name"
            label={t('translation.name')}
          />
        </StyledCCol>
        <StyledCCol md={6}>
          <CFormInput
            readOnly
            {...register('sign')}
            id="sign"
            label={t('translation.sign')}
          />
        </StyledCCol>
      </CRow>
      <CRow>
        <StyledCCol md={6}>
          <CFormTextarea
            rows={4}
            {...register('description')}
            id="description"
            label={t('translation.description')}
          />
        </StyledCCol>
        <StyledCCol md={6}>
          <CFormTextarea
            rows={4}
            {...register('signData.classification')}
            id="classification"
            label={t('translation.description')}
          />
        </StyledCCol>
      </CRow>
      <CRow>
        <StyledCCol>
          <CFormTextarea
            rows={4}
            {...register('signData.translation')}
            id="translation"
            label={t('translation.translation')}
          />
        </StyledCCol>
      </CRow>
    </>
  );
};

TranslationTabData.displayName = 'TranslationFormControls';
