import * as React from 'react';
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
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

interface IFormProps {
  signId: string;
  data: SignDto;
  onValuesChanged: React.Dispatch<
    React.SetStateAction<Partial<SignDto> | undefined>
  >;
}

export const SignForm: React.FC<IFormProps> = ({
  signId,
  data,
  onValuesChanged,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { ConfirmDelete, showConfirmation } = useConfirmDelete();
  const saveSign = useSaveMutation();
  const deleteSign = useDeleteMutation();

  const { register, handleSubmit, subscribe } = useForm({
    defaultValues: data,
  });

  useEffect(() => {
    onValuesChanged(data);
    subscribe({
      formState: { values: true },
      callback: ({ values }) => onValuesChanged(values),
    });
  }, [data, onValuesChanged, subscribe]);

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
    <CForm noValidate className="row g-3" onSubmit={handleSubmit(onSubmit)}>
      <CCol md={6}>
        <CFormInput
          {...register('name', { required: true })}
          label={t('sign.name')}
        />
      </CCol>
      <CCol xs={6}>
        <CFormTextarea
          {...register('description')}
          label={t('sign.description')}
        />
      </CCol>
      <CCol xs={6}>
        <CFormInput {...register('image')} label={t('sign.image')} required />
      </CCol>
      <CCol xs={6}>
        <CFormTextarea
          {...register('classification', { required: true })}
          label={t('sign.classification')}
        />
      </CCol>
      <CCol xs={12}>
        <CContainer fluid className="d-flex justify-content-between w-100 p-0">
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
            <CButton type="button" className="btn-outline" onClick={onCancel}>
              {t('btn.cancel')}
            </CButton>
          </div>
        </CContainer>
      </CCol>
      <ConfirmDelete />
    </CForm>
  );
};

SignForm.displayName = 'SignForm';
