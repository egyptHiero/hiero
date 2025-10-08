import React from 'react';
import { CButtonGroup, CFormCheck } from '@coreui/react';
import { useFormContext } from 'react-hook-form';
import { SignDto } from '../../types';

const dirValues = ['hlr', 'hrl', 'vlr', 'vrl'] as const;

export const Dir: React.FC = () => {
  const { setValue, watch } = useFormContext<SignDto>();

  const currentValue = watch('dir') || 'hlr';

  return (
    <CButtonGroup role="group">
      {dirValues.map((value) => (
        <CFormCheck
          key={value}
          type="radio"
          button={{ color: 'secondary', variant: 'outline' }}
          id={value}
          label={value}
          checked={currentValue === value}
          onChange={() => setValue('dir', value)}
        />
      ))}
    </CButtonGroup>
  );
};

Dir.displayName = 'Dir';
