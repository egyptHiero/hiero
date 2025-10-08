import * as React from 'react';
import { CFormRange } from '@coreui/react';
import { StyledContainer, StyledMark, StyledScale } from './styled';

type CFormRangeProps = React.ComponentProps<typeof CFormRange>;

/**
 * Enhanced CFormRange control with marking scale.
 */
export const ScaledFormRange: React.FC<CFormRangeProps> = (params) => {
  const { min = 0, max = 0 } = params;

  return (
    <div className="position-relative w-100 h-100 mb-2">
      <CFormRange {...params} className="position-relative" />
      <StyledContainer>
        <StyledMark value={min} width={0} />
        <StyledMark value={max} width={100} />
        <StyledMark value={(max + min) / 2} width={50} />
        <StyledScale />
      </StyledContainer>
    </div>
  );
};

ScaledFormRange.displayName = 'ScaledFormRange';
