import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CButton, CForm } from '@coreui/react';
import { RosettaBlockFormControls } from './form-controls';
import { useTranslation } from 'react-i18next';
import { useUpdateImagesMutation } from './hooks';
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
  const saveRosettaBlockImages = useUpdateImagesMutation();

  const formMethods = useForm<RosettaBlocksDto>({
    values: data,
  });

  const onSubmit = (values: RosettaBlocksDto) => {
    saveRosettaBlockImages.mutateAsync({ id: blockId, images: values.images });
  };

  return (
    <FormProvider {...formMethods}>
      <CForm
        noValidate
        className="row g-3 my-2"
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <RosettaBlockFormControls />
        <CButton variant="outline" type="submit">
          {t('btn.save')}
        </CButton>
      </CForm>
    </FormProvider>
  );
};

RosettaBlockForm.displayName = 'RosettaBlockForm';
