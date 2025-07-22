import React from 'react';
import { CFormRange } from '@coreui/react';
import { useFormContext } from 'react-hook-form';
import { SignDto } from '../../types/types';

export const FontSize: React.FC = () => {
  const { setValue, watch } = useFormContext<SignDto>();

  const currentValue = watch('fontSize');

  return (
    <CFormRange
      min={20}
      max={75}
      value={currentValue}
      onChange={({ target }) =>
        setValue('fontSize', Number.parseInt(target.value))
      }
    />
  );
};

FontSize.displayName = 'FontSize';
