import React from 'react';
import { CButton } from '@coreui/react';
import { Hiero } from '../../hiero';
import { useHieroContext } from '../../../app/context/hiero-context';
import { useSelectorAsideContext } from './context';
import { useHieroSelectorContext } from '../context';

const sortFn = ([a]: string[], [b]: string[]) => {
  const [aGroup = '', aNumber = '', aTail = ''] = a?.split(/(\d+)/) || [];
  const [bGroup = '', bNumber = '', bTail = ''] = b?.split(/(\d+)/) || [];

  if (aGroup.length !== bGroup.length) {
    return aGroup.length - bGroup.length;
  }

  if (aGroup !== bGroup) {
    return aGroup.localeCompare(bGroup);
  }

  if (aNumber !== bNumber) {
    return Number(aNumber) - Number(bNumber);
  }

  return aTail.localeCompare(bTail);
};

export const HieroesList: React.FC = () => {
  const { hieroglyphs } = useHieroContext();
  const { shiftCurrent, dir } = useHieroSelectorContext();
  const { activeTab, category, query, changeHiero, insertMode } =
    useSelectorAsideContext();

  const hieroList = React.useMemo(() => {
    if (activeTab === 'select') {
      const pattern = new RegExp(`^${category}\\d`);
      return Object.entries(hieroglyphs)
        .filter(([key]) => key.match(pattern))
        .sort(sortFn);
    } else if (activeTab === 'search' && query) {
      const pattern = new RegExp(query, 'i');
      return Object.entries(hieroglyphs)
        .filter(([key, value]) => key.match(pattern) || value.match(pattern))
        .sort(sortFn);
    } else {
      return [];
    }
  }, [activeTab, category, hieroglyphs, query]);

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
