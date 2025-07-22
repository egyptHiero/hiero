import React from 'react';
import { Hiero } from '../../components/hiero';
import { CContainer, CImage } from '@coreui/react';
import { useFormContext } from 'react-hook-form';
import { SignDto } from '../../types/types';
import styled from '@emotion/styled';
import { TDir } from '../../types';
import { Property } from 'csstype';
import { useSignContext } from './context';
import classNames from 'classnames';

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

interface StyledHieroContainerProps {
  $dir?: TDir;
  $imageIndex?: number;
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
  ({ $dir, $imageIndex = -1 }) => ({
    flexDirection: getFlowDirection($dir),
    width: $dir?.startsWith('v') ? 'fit-content' : '100%',
    '.selected svg >': {
      [`text:nth-of-type(${$imageIndex + 1})`]: {
        fill: 'green',
        outline: '1px dashed green',
      },
    },
  }),
);

export const ShowHieroes: React.FC = () => {
  const { lines, current, setCurrent, setAsideVisible } = useSignContext();
  const { watch } = useFormContext<SignDto>();
  const dir = watch('dir') as TDir | undefined;
  const fontSize = watch('fontSize') || 40;
  const image = watch('image');

  const handleClick = (
    lineIndex: number,
    hieroIndex: number,
    imageIndex: number,
  ) => {
    setCurrent([lineIndex, hieroIndex, imageIndex]);
    setAsideVisible(true);
  };

  return (
    <CContainer fluid className="d-flex">
      <div className="text-end">
        <CImage src={image} />
      </div>

      <div className="text-start">
        <StyledHieroContainer $dir={dir} $imageIndex={current?.[2]}>
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
                onClick={(hieroIndex: number, imageIndex) =>
                  handleClick(lineIndex, hieroIndex, imageIndex)
                }
              />
            </div>
          ))}
        </StyledHieroContainer>
      </div>
    </CContainer>
  );
};

ShowHieroes.displayName = 'ShowHieroes';
