import * as React from 'react';
import { CFormInput, CFormTextarea, CRow } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { TranslationVO } from '../types';
import { StyledCCol } from '../../../components/styled';

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
            {...register('signData.gardinerCodes')}
            id="gardinerCodes"
            label={t('translation.gardinerCodes')}
            readOnly
          />
        </StyledCCol>
      </CRow>
      <CRow>
        <StyledCCol>
          <CFormTextarea
            rows={4}
            {...register('text')}
            id="translation"
            label={t('translation.text')}
          />
        </StyledCCol>
      </CRow>
    </>
  );
};

TranslationTabData.displayName = 'TranslationFormControls';
