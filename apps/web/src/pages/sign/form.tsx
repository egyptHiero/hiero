import React from 'react';
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormTextarea,
} from '@coreui/react';
import { useConfirmDelete } from './confirm-delete';
import { SignDto } from '../../types/types';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { useDeleteMutation, useSaveMutation } from './hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ShowHieroes } from './show-hieroes';
import { Dir } from './dir';
import { FontSize } from './font-size';
import { Aside } from './aside';
import { SignContextProvider } from './context';

interface IFormProps {
  signId: string;
  data: SignDto;
}

export const SignForm: React.FC<IFormProps> = ({ signId, data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { ConfirmDelete, showConfirmation } = useConfirmDelete();
  const saveSign = useSaveMutation();
  const deleteSign = useDeleteMutation();

  const formMethods = useForm<SignDto>({
    values: data,
  });

  const onSubmit = (values: SignDto) => {
    saveSign.mutateAsync(values, {
      onSuccess: () => navigate(generatePath(ROUTES.SIGN_LIST)),
    });
  };

  const onCancel = () => {
    navigate(generatePath(ROUTES.SIGN_LIST));
  };

  const onDelete = () => {
    signId &&
      showConfirmation().then(() =>
        deleteSign.mutateAsync(signId, {
          onSuccess: () => navigate(generatePath(ROUTES.SIGN_LIST)),
        }),
      );
  };

  return (
    <FormProvider {...formMethods}>
      <SignContextProvider watch={formMethods.watch}>
        <CForm
          noValidate
          className="row g-3"
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <CCol md={6}>
            <div className="d-flex gap-2 align-items-center">
              <Dir />
              <FontSize />
            </div>
          </CCol>
          <CCol md={12}>
            <ShowHieroes />
          </CCol>
          <CCol md={6}>
            <CFormInput
              {...formMethods.register('name', { required: true })}
              label={t('sign.name')}
            />
          </CCol>
          <CCol xs={6}>
            <CFormTextarea
              {...formMethods.register('description')}
              label={t('sign.description')}
            />
          </CCol>
          <CCol xs={6}>
            <CFormInput
              {...formMethods.register('image')}
              label={t('sign.image')}
              required
            />
          </CCol>
          <CCol xs={6}>
            <CFormTextarea
              {...formMethods.register('classification', { required: true })}
              label={t('sign.classification')}
            />
          </CCol>
          <CCol xs={12}>
            <CContainer
              fluid
              className="d-flex justify-content-between w-100 p-0"
            >
              <CButton
                type="button"
                color="secondary"
                className="btn-outline"
                onClick={onDelete}
              >
                {t('btn.delete')}
              </CButton>
              <div className="gap-2 d-flex justify-content-end">
                <CButton color="primary" type="submit">
                  {t('btn.save')}
                </CButton>
                <CButton
                  type="button"
                  className="btn-outline"
                  onClick={onCancel}
                >
                  {t('btn.cancel')}
                </CButton>
              </div>
            </CContainer>
          </CCol>
          <ConfirmDelete />
        </CForm>
        <Aside />
      </SignContextProvider>
    </FormProvider>
  );
};

SignForm.displayName = 'SignForm';
