import React from 'react';
import { CButton } from '@coreui/react';
import { Hiero } from '../../../controls/hiero';
import { useHieroContext } from '../../../app/context/hiero-context';
import { useSignAsideContext } from './context';
import { SignDto, TDir } from '../../../types';
import { useFormContext } from 'react-hook-form';
import { useSignContext } from '../context';

export const HieroesList: React.FC = () => {
  const { hieroglyphs } = useHieroContext();
  const { shiftCurrent } = useSignContext();
  const { activeTab, gardinerCodes, query, changeHiero, insertMode } =
    useSignAsideContext();
  const { watch } = useFormContext<SignDto>();
  const dir = watch('dir') as TDir | undefined;

  const hieroList = React.useMemo(() => {
    if (activeTab === 'select') {
      const pattern = new RegExp(`${gardinerCodes}\\d`);
      return Object.entries(hieroglyphs).filter(([key]) => key.match(pattern));
    } else if (activeTab === 'search' && query) {
      const pattern = new RegExp(query, 'i');
      return Object.entries(hieroglyphs).filter(
        ([key, value]) => key.match(pattern) || value.match(pattern),
      );
    } else {
      return [];
    }
  }, [activeTab, gardinerCodes, hieroglyphs, query]);

  const handleClick = (value: string) => {
    if (insertMode === 'left') {
      changeHiero(value, 'hiero-left');
    } else if (insertMode === 'right') {
      changeHiero(value, 'hiero-right');
      shiftCurrent(1, true);
    } else {
      changeHiero(value, 'hiero');
    }
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
