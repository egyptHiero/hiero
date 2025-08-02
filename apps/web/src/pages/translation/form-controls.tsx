import * as React from 'react';
import { CCol, CFormInput, CFormTextarea } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { TranslationDto } from '../../types/types';

export const TranslationFormControls: React.FC = () => {
  const { t } = useTranslation();
  const { register } = useFormContext<TranslationDto>();

  return (
    <>
      <CCol md={6}>
        <CFormInput
          readOnly
          {...register('sign')}
          label={t('translation.sign')}
        />
      </CCol>
      <CCol md={6}>
        <CFormInput
          {...register('name', { required: true })}
          label={t('translation.name')}
        />
      </CCol>
      <CCol xs={6}>
        <CFormTextarea
          rows={4}
          {...register('description')}
          label={t('translation.description')}
        />
      </CCol>
    </>
  );
};

TranslationFormControls.displayName = 'TranslationFormControls';
