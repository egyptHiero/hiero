import React from 'react';
import classNames from 'classnames';
import { Hiero } from '../hiero';
import styled from '@emotion/styled';
import { TDir } from '../../types';
import { Property } from 'csstype';
import { useHieroSelectorContext } from './context';
import { CButton } from '@coreui/react';
import { Aside } from './aside';

interface StyledHieroContainerProps {
  $dir?: TDir;
}

function getFlowDirection(dir?: TDir): Property.FlexDirection {
  switch (dir) {
    case 'hlr':
      return 'column';
    case 'hrl':
      return 'column-reverse';
    case 'vlr':
      return 'row';
    case 'vrl':
      return 'row-reverse';
    default:
      return 'inherit';
  }
}

const StyledHieroContainer = styled.div<StyledHieroContainerProps>(
  {
    display: 'flex',
    '* > svg > text': {
      cursor: 'pointer',
      ':hover': {
        fill: 'red',
        outline: '1px dashed red',
      },
    },
  },
  ({ $dir }) => ({
    flexDirection: getFlowDirection($dir),
    width: $dir?.startsWith('v') ? 'fit-content' : '100%',
  }),
);

export const HieroesSelector: React.FC = () => {
  const { lines, current, dir, fontSize, setCurrent, setAsideVisible } =
    useHieroSelectorContext();

  const handleClick = (lineIndex: number, hieroIndex: number) => {
    setCurrent([lineIndex, hieroIndex]);
    setAsideVisible(true);
  };

  const insertHiero = () => {
    setAsideVisible(true);
  };

  return (
    <>
      <StyledHieroContainer $dir={dir}>
        {lines.map((line, lineIndex) => (
          <div
            key={line.codes}
            className={classNames('p-1', {
              selected: lineIndex === current?.[0],
            })}
            style={{
              borderRight: '2px solid #ccc',
              borderBottom: '2px solid #ccc',
            }}
          >
            <Hiero
              text={line.codes}
              dir={dir}
              fontSize={fontSize}
              onClick={(hieroIndex: number) =>
                handleClick(lineIndex, hieroIndex)
              }
              selectedPos={current?.[0] === lineIndex ? current[1] : undefined}
            />
          </div>
        ))}
      </StyledHieroContainer>
      <div className="d-flex align-items-center">
        <CButton variant="outline" onClick={insertHiero}>
          Insert
        </CButton>
      </div>
      <Aside />
    </>
  );
};

HieroesSelector.displayName = 'Hieroes';
