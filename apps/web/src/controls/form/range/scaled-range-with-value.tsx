import * as React from 'react';
import {
  CFormInput,
  CFormRange,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react';
import { ScaledFormRange } from './scaled-range';
import { CInputGroupProps } from '@coreui/react/src/components/form/CInputGroup';

type IScaledRangeWithValueProps = Omit<
  React.ComponentProps<typeof CFormRange>,
  'size'
> &
  Pick<CInputGroupProps, 'size'> & { labelWidth?: number };

export const ScaledRangeWithValue: React.FC<IScaledRangeWithValueProps> = ({
  name,
  size = 'sm',
  width = 80,
  label,
  labelWidth = 80,
  ...props
}) => {
  return (
    <div className="d-flex w-100">
      <div>
        <CInputGroup size={size}>
          <CInputGroupText style={{ width: `${labelWidth}px` }}>
            {label}
          </CInputGroupText>
          <CFormInput
            name={name}
            style={{ width: `${width}px`, textAlign: 'right' }}
            {...props}
          />
        </CInputGroup>
      </div>
      <div className="col ps-1">
        <ScaledFormRange {...props} />
      </div>
    </div>
  );
};

ScaledRangeWithValue.displayName = 'ScaledRangeWithValue';
