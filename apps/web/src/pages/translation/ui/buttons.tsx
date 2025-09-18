import * as React from 'react';
import { CButton, CContainer } from '@coreui/react';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../app/routes';
import { useTranslation } from 'react-i18next';

export const TranslationButtons: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onCancel = () => {
    navigate(generatePath(ROUTES.TRANSLATION_LIST));
  };

  const onDelete = () => {
    //
  };

  return (
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
  );
};

TranslationButtons.displayName = 'TranslationButtons';
