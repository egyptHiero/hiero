import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CForm } from '@coreui/react';
import { RosettaBlockFormControls } from './form-controls';
import { useTranslation } from 'react-i18next';
import { useUpdateCodesMutation } from './hooks';
import { RosettaBlocksDto } from '../../types';

interface IRosettaBlockFormProps {
  blockId: string;
  data?: RosettaBlocksDto;
}

export const RosettaBlockForm: React.FC<IRosettaBlockFormProps> = ({
  blockId,
  data,
}) => {
  const { t } = useTranslation();
  const saveRosettaBlockCodes = useUpdateCodesMutation();

  const formMethods = useForm<RosettaBlocksDto>({
    values: data,
  });

  const onSubmit = (values: RosettaBlocksDto) => {
    //
  };

  return (
    <FormProvider {...formMethods}>
      <CForm
        noValidate
        className="row g-3"
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <RosettaBlockFormControls />
      </CForm>
    </FormProvider>
  );
};

RosettaBlockForm.displayName = 'RosettaBlockForm';
