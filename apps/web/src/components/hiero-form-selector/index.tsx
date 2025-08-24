import * as React from 'react';
import { TDir } from '../../types';
import { TCurrent, TLine } from '../../pages/sign/types';
import { CContainer } from '@coreui/react';
import { HieroSelectorContextProvider } from './context';
import { HieroSelectorImage } from './image';
import { HieroesSelector } from './hieroes-selector';

interface IHieroFormSelectorProps {
  name: string;
  image: string;
  dir?: TDir;
  fontSize?: number;
  onSelect?: (current: TCurrent, lines: TLine[]) => void;
}

export const HieroFormSelector: React.FC<IHieroFormSelectorProps> = ({
  name,
  image,
  dir = 'hlr',
  fontSize = 40,
  onSelect,
}) => {
  return (
    <HieroSelectorContextProvider dir={dir} fontSize={fontSize} name={name}>
      <CContainer fluid className="d-flex">
        <div>
          <HieroSelectorImage image={image} />
        </div>
        <div>
          <HieroesSelector />
        </div>
      </CContainer>
    </HieroSelectorContextProvider>
  );
};

HieroFormSelector.displayName = 'HieroFormSelector';
