import React from 'react';
import { CFormSwitch, CNavLink } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../app/context/app-context';
import styled from '@emotion/styled';
import CIcon from '@coreui/icons-react';
import { cilSave } from '@coreui/icons';

const StyledLabel = styled.div({
  whiteSpace: 'nowrap',
});

export const CustomControls: React.FC = () => {
  const { t } = useTranslation();
  const { setCustomControlsParam } = useAppContext();
  const handleBlankOnly: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) =>
    setCustomControlsParam('blankOnly', target.checked ? 'true' : undefined);

  return (
    <>
      <CFormSwitch
        id="switch-rosetta-blank-only"
        size="xl"
        label={<StyledLabel>{t('rosetta.topbar.blankOnly')}</StyledLabel>}
        onChange={handleBlankOnly}
      />
      <CNavLink
        className="mx-2"
        title={t('btn.export')}
        href={`/api/rosetta/part/export`}
        target="_blank"
        download
        onClick={(e) => e.stopPropagation()}
      >
        <CIcon icon={cilSave} size="lg" />
      </CNavLink>
    </>
  );
};

CustomControls.displayName = 'CustomControls';
