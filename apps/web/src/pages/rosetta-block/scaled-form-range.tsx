import * as React from 'react';
import { CFormRange } from '@coreui/react';
import styled from '@emotion/styled';

type CFormRangeProps = React.ComponentProps<typeof CFormRange>;

interface StyledMarkProps {
  value: number;
  width?: number;
}

const StyledMark = styled.div<StyledMarkProps>(({ value, width }) => {
  return {
    position: 'absolute',
    borderRight: '1px solid gray',
    left: 0,
    top: 0,
    width: `calc(${width}%)`,
    height: '18px',
    zIndex: -1,
    '&::after': {
      right: 0,
      position: 'absolute',
      content: `"${value}"`,
      top: '20px',
      fontSize: 'small',
      transform: 'translateX(50%)',
    },
  };
});

const StyledScale = styled.div({
  position: 'absolute',
  top: '3px',
  left: 0,
  width: '100%',
  height: '12px',
  zIndex: -1,
  backgroundRepeat: 'no-repeat',
  backgroundSize: Array(4).fill('1px 30px').join(','),
  backgroundPosition: '20% center, 40% center, 60% center, 80% center',
  backgroundImage: Array(4).fill('linear-gradient(gray, gray)').join(','),
});

export const ScaledFormRange: React.FC<CFormRangeProps> = (params) => {
  const { min = 0, max = 0 } = params;

  return (
    <div className="position-relative w-100 h-100 mb-2">
      <CFormRange {...params} className="position-relative" />
      <div style={{ margin: '0 8px', position: 'relative', top: '-28px' }}>
        <StyledMark value={min} width={0} />
        <StyledMark value={max} width={100} />
        <StyledMark value={(max - min) / 2} width={50} />
        <StyledScale />
      </div>
    </div>
  );
};

ScaledFormRange.displayName = 'ScaledFormRange';
