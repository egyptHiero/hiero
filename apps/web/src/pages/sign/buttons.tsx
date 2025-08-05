import * as React from 'react';
import { CButton, CContainer } from '@coreui/react';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../app/routes';
import { useConfirmDelete } from './confirm-delete';
import { useTranslation } from 'react-i18next';
import { useDeleteMutation } from './hooks';
import { useFormContext } from 'react-hook-form';
import { SignDto } from '../../types/types';

export const SignButtons: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { ConfirmDelete, showConfirmation } = useConfirmDelete();
  const deleteSign = useDeleteMutation();
  const { watch } = useFormContext<SignDto>();
  const signId = watch('id');

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

  const onAddTranslation = () => {
    navigate(
      generatePath(ROUTES.TRANSLATION, { id: 'new', sign: signId || null }),
    );
  };

  return (
    <CContainer fluid className="d-flex justify-content-between w-100 p-0">
      <div className="gap-2 d-flex justify-content-end">
        <CButton
          type="button"
          color="secondary"
          className="btn-outline"
          onClick={onDelete}
        >
          {t('btn.delete')}
        </CButton>
        <CButton
          type="button"
          color="light"
          className="btn-outline"
          onClick={onAddTranslation}
        >
          {t('sign.btn.create-translation')}
        </CButton>
      </div>
      <div className="gap-2 d-flex justify-content-end">
        <CButton color="primary" type="submit">
          {t('btn.save')}
        </CButton>
        <CButton type="button" className="btn-outline" onClick={onCancel}>
          {t('btn.cancel')}
        </CButton>
        <ConfirmDelete />
      </div>
    </CContainer>
  );
};

SignButtons.displayName = 'SignButtons';
