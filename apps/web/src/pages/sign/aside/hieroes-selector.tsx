import React from 'react';
import { CButton, CButtonGroup } from '@coreui/react';
import { Hiero } from '../../../components/hiero';
import { Divider } from './divider';
import { useTranslation } from 'react-i18next';
import { useSignContext } from '../context';
import { useFormContext } from 'react-hook-form';
import { SignDto } from '../../../types/types';
import { TDir } from '../../../types';
import styled from '@emotion/styled';

const StyledButton = styled(CButton)({
  minWidth: '70px',
  minHeight: '70px',
});

export const HieroesSelector: React.FC = () => {
  const { t } = useTranslation();
  const { lines, current, changeHiero, shiftCurrent } = useSignContext();
  const [currentLine, currentPos] = current ?? [-1, -1, -1];
  const { watch } = useFormContext<SignDto>();
  const dir = watch('dir') as TDir | undefined;

  return (
    <div className="d-flex row text-center">
      <div className="d-flex justify-content-center">
        <div className="text-end flex-shrink-0">
          <StyledButton
            type="button"
            className="btn-outline"
            onClick={() => {
              shiftCurrent(-1);
            }}
          >
            <Hiero
              dir={dir}
              text={lines[currentLine]?.hieroes[currentPos - 1]}
              fontSize={45}
            />
          </StyledButton>
          <Divider
            value={lines[currentLine]?.delimiters[currentPos - 1]}
            setDivider={(value) => changeHiero(value, 'left')}
          />
        </div>
        <div style={{ width: 'min-content' }}>
          <StyledButton type="button" color="success">
            <Hiero
              dir={dir}
              text={lines[currentLine]?.hieroes[currentPos]}
              fontSize={45}
              color="white"
            />
          </StyledButton>
        </div>
        <div className="text-start flex-shrink-0">
          <Divider
            value={lines[currentLine]?.delimiters[currentPos]}
            setDivider={(value) => changeHiero(value, 'right')}
          />
          <StyledButton
            type="button"
            className="btn-outline"
            onClick={() => {
              shiftCurrent(1);
            }}
          >
            <Hiero
              dir={dir}
              text={lines[currentLine]?.hieroes[currentPos + 1]}
              fontSize={45}
            />
          </StyledButton>
        </div>
      </div>
      <CButtonGroup vertical>
        <CButtonGroup className="pt-2">
          <CButton className="btn-outline">{t('btn.insertLeft')}</CButton>
          <CButton className="btn-outline">{t('btn.delete')}</CButton>
          <CButton className="btn-outline">{t('btn.insertRight')}</CButton>
        </CButtonGroup>
        <CButtonGroup className="">
          <CButton className="btn-outline">{t('btn.redo')}</CButton>
          <CButton className="btn-outline">{t('btn.undo')}</CButton>
        </CButtonGroup>
      </CButtonGroup>
    </div>
  );
};

HieroesSelector.displayName = 'HieroesSelector';
