import React from 'react';
import {CButton, CCol, CContainer, CForm, CFormInput, CFormTextarea} from '@coreui/react'
import {useTranslation} from "react-i18next";
import {useForm} from 'react-hook-form';
import {SignDto} from "../../types/types";

export const SignPage: React.FC = () => {
  const {t} = useTranslation();
  const {register, handleSubmit} = useForm();

  const onSubmit = (values: Partial<SignDto>) => {
    console.log(values);
  }

  return (
    <CContainer fluid>
      <CForm noValidate className="row g-3" onSubmit={handleSubmit(onSubmit)}>
        <CCol md={6}>
          <CFormInput {...register('name', {required: true})} label={t('sign.name')}/>
        </CCol>
        <CCol xs={6}>
          <CFormTextarea {...register('description')}  label={t('sign.description')}/>
        </CCol>
        <CCol xs={6}>
          <CFormInput {...register('image')}  label={t('sign.image')} required/>
        </CCol>
        <CCol xs={6}>
          <CFormTextarea {...register('classification', {required: true})}  label={t('sign.classification')}/>
        </CCol>
        <CCol xs={12}>
          <CContainer fluid className="gap-2 d-flex justify-content-lg-end p-0">
            <CButton color="primary" type="submit">
              {t('btn.save')}
            </CButton>
            <CButton type="button" className="btn-outline">
              {t('btn.cancel')}
            </CButton>
          </CContainer>
        </CCol>
      </CForm>
    </CContainer>
  );
};

SignPage.displayName = 'Sign';
