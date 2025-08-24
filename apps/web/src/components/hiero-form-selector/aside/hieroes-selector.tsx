import React from 'react';
import { CButton, CButtonGroup } from '@coreui/react';
import { Hiero } from '../../hiero';
import { Divider } from './divider';
import { useTranslation } from 'react-i18next';
import { useHieroSelectorContext } from '../context';
import { useSelectorAsideContext } from './context';
import styled from '@emotion/styled';

const StyledButton = styled(CButton)({
  minWidth: '70px',
  minHeight: '70px',
});

export const HieroesSelector: React.FC = () => {
  const { t } = useTranslation();
  const { lines, current, shiftCurrent, dir } = useHieroSelectorContext();
  const { history, changeHiero, insertMode, setInsertMode } =
    useSelectorAsideContext();
  const [currentLine, currentPos] = current;

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
            setDivider={(value) => changeHiero(value, 'left-divider')}
          />
        </div>
        <div style={{ width: 'min-content' }}>
          <StyledButton type="button" color="primary">
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
            setDivider={(value) => changeHiero(value, 'right-divider')}
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
          <CButton
            className="btn-outline"
            color={insertMode === 'left' ? 'light' : undefined}
            onClick={() =>
              setInsertMode((v) => (v !== 'left' ? 'left' : undefined))
            }
          >
            {t('btn.insertLeft')}
          </CButton>
          <CButton className="btn-outline">{t('btn.delete')}</CButton>
          <CButton
            className="btn-outline"
            color={insertMode === 'right' ? 'light' : undefined}
            onClick={() =>
              setInsertMode((v) => (v !== 'right' ? 'right' : undefined))
            }
          >
            {t('btn.insertRight')}
          </CButton>
        </CButtonGroup>
        <CButtonGroup>
          <CButton
            className="btn-outline"
            disabled={!history.canRedo}
            onClick={() => history.redo()}
          >
            {t('btn.redo')}
          </CButton>
          <CButton
            className="btn-outline"
            disabled={!history.canUndo}
            onClick={() => history.undo()}
          >
            {t('btn.undo')}
          </CButton>
        </CButtonGroup>
      </CButtonGroup>
    </div>
  );
};

HieroesSelector.displayName = 'HieroesSelector';
