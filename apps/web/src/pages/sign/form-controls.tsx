import * as React from 'react';
import { CCol, CFormInput, CFormTextarea } from '@coreui/react';
import { Dir } from './dir';
import { FontSize } from './font-size';
import { ShowHieroes } from './show-hieroes';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { SignDto } from '../../types/types';
import { useSignContext } from './context';

export const SignFormControls: React.FC = () => {
  const { t } = useTranslation();
  const { register } = useFormContext<SignDto>();
  const { lines } = useSignContext();

  return (
    <>
      <CCol md={6}>
        <CFormInput
          {...register('name', { required: true })}
          label={t('sign.name')}
        />
      </CCol>
      <CCol xs={6}>
        <CFormInput {...register('image')} label={t('sign.image')} required />
      </CCol>
      <CCol xs={6}>
        <CFormTextarea
          rows={4}
          {...register('description')}
          label={t('sign.description')}
        />
      </CCol>
      <CCol xs={6}>
        <CFormTextarea
          rows={4}
          {...register('gardinerCodes', { required: true })}
          label={t('sign.gardinerCodes')}
        />
      </CCol>
      {!!lines.length && (
        <CCol md={6}>
          <div className="d-flex gap-2 align-items-center">
            <Dir />
            <FontSize />
          </div>
        </CCol>
      )}
      <CCol md={12}>
        <ShowHieroes />
      </CCol>
    </>
  );
};

SignFormControls.displayName = 'SignFormControls';
