import React from 'react';
import { CContainer, CFormSwitch } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../app/context/app-context';

export const CustomControls: React.FC = () => {
  const { t } = useTranslation();
  const { setCustomControlsParam } = useAppContext();
  const handleBlankOnly: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) =>
    setCustomControlsParam('blankOnly', target.checked ? 'true' : undefined);

  return (
    <CContainer>
      <CFormSwitch
        id="switch-rosetta-blank-only"
        size="xl"
        label={t('rosetta.topbar.blankOnly')}
        onChange={handleBlankOnly}
      />
    </CContainer>
  );
};

CustomControls.displayName = 'CustomControls';
