import React from 'react';
import { CButton, CCol, CContainer, CForm } from '@coreui/react';
import { TranslationDto } from '../../types/types';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { useSaveMutation } from './hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TranslationFormControls } from './form-controls';

interface IFormProps {
  translationId: string;
  sign: string;
  data?: TranslationDto;
}

export const TranslationForm: React.FC<IFormProps> = ({
  translationId,
  data,
  sign,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const saveTranslation = useSaveMutation();

  const formMethods = useForm<TranslationDto>({
    values: { sign, ...(data ?? {}) } as TranslationDto,
  });

  const onSubmit = (values: TranslationDto) => {
    saveTranslation.mutateAsync(values, {
      onSuccess: () => navigate(generatePath(ROUTES.TRANSLATION_LIST)),
    });
  };

  const onCancel = () => {
    navigate(generatePath(ROUTES.TRANSLATION_LIST));
  };

  const onDelete = () => {
    //
  };

  return (
    <FormProvider {...formMethods}>
      <CForm
        noValidate
        className="row g-3"
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <TranslationFormControls />
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
              <CButton type="button" className="btn-outline" onClick={onCancel}>
                {t('btn.cancel')}
              </CButton>
            </div>
          </CContainer>
        </CCol>
      </CForm>
    </FormProvider>
  );
};

TranslationForm.displayName = 'TranslationForm';
