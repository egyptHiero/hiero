import React from 'react';
import { CCol, CForm } from '@coreui/react';
import { SignDto } from '../../types';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { useSaveMutation } from './hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { Aside } from './aside';
import { SignContextProvider } from './context';
import { SignFormControls } from './form-controls';
import { SignButtons } from './buttons';

interface IFormProps {
  signId: string;
  data?: SignDto;
}

export const SignForm: React.FC<IFormProps> = ({ signId, data }) => {
  const navigate = useNavigate();
  const saveSign = useSaveMutation();

  const formMethods = useForm<SignDto>({
    values: data,
  });

  const onSubmit = (values: SignDto) => {
    saveSign.mutateAsync(values, {
      onSuccess: () => navigate(generatePath(ROUTES.SIGN_LIST)),
    });
  };

  return (
    <FormProvider {...formMethods}>
      <SignContextProvider>
        <CForm
          noValidate
          className="row g-3"
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <SignFormControls />
          <CCol xs={12}>
            <SignButtons />
          </CCol>
        </CForm>
        <Aside />
      </SignContextProvider>
    </FormProvider>
  );
};

SignForm.displayName = 'SignForm';
