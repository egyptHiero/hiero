import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RosettaPartDto } from '../../types/types';
import { CButton, CForm } from '@coreui/react';
import { RosettaPartFormControls } from './form-controls';
import { useTranslation } from 'react-i18next';
import { useUpdateCodesMutation } from './hooks';

interface IRosettaPartFormProps {
  partId: string;
  data?: RosettaPartDto;
}

export const RosettaPartForm: React.FC<IRosettaPartFormProps> = ({
  partId,
  data,
}) => {
  const { t } = useTranslation();
  const saveRosettaPartCodes = useUpdateCodesMutation();

  const formMethods = useForm<RosettaPartDto>({
    values: data,
  });

  const onSubmit = (values: RosettaPartDto) => {
    saveRosettaPartCodes.mutateAsync({
      id: values.id,
      codes: values.gardinerCodes,
    });
  };

  return (
    <FormProvider {...formMethods}>
      <CForm
        noValidate
        className="row g-3"
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <RosettaPartFormControls />
        <CButton variant="outline" type="submit">
          {t('btn.save')}
        </CButton>
      </CForm>
    </FormProvider>
  );
};

RosettaPartForm.displayName = 'RosettaPartForm';
