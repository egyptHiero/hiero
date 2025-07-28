import React, { MouseEventHandler } from 'react';
import { CButton } from '@coreui/react';
import { Hiero } from '../../../components/hiero';
import { useHieroContext } from '../../../app/context/hiero-context';
import { useAsideContext } from './context';
import { TDir } from '../../../types';
import { useFormContext } from 'react-hook-form';
import { SignDto } from '../../../types/types';
import { useSignContext } from '../context';

export const HieroesList: React.FC = () => {
  const { hieroglyphs } = useHieroContext();
  const { activeTab, classification, query } = useAsideContext();
  const { watch } = useFormContext<SignDto>();
  const dir = watch('dir') as TDir | undefined;
  const { changeHiero } = useSignContext();

  const hieroList = React.useMemo(() => {
    if (activeTab === 'select') {
      const pattern = new RegExp(`${classification}\\d`);
      return Object.entries(hieroglyphs).filter(([key]) => key.match(pattern));
    } else if (activeTab === 'search' && query) {
      const pattern = new RegExp(query, 'i');
      return Object.entries(hieroglyphs).filter(
        ([key, value]) => key.match(pattern) || value.match(pattern),
      );
    } else {
      return [];
    }
  }, [activeTab, classification, hieroglyphs, query]);

  const handleClick = (value: string) => {
    changeHiero(value, 'hiero');
  };

  return (
    <>
      {hieroList.map(([key, value]) => {
        return (
          <CButton
            key={key}
            type="button"
            className="btn-outline"
            label={value}
            title={`${key} - ${value}`}
            onClick={() => handleClick(key)}
          >
            <Hiero text={key} fontSize={40} dir={dir} />
          </CButton>
        );
      })}
    </>
  );
};

HieroesList.displayName = 'HieroesList';
