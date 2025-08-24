import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TCurrent, TLine } from './types';
import { shiftCurrentIndex } from './logic';
import { splitIntoLines } from '../../utils';
import { TDir } from '../../types';

interface IHieroSelectorContext {
  dir: TDir;
  fontSize: number;
  current: TCurrent;
  setCurrent: React.Dispatch<React.SetStateAction<TCurrent>>;
  shiftCurrent: (value: number, force?: boolean) => void;
  lines: TLine[];
  asideVisible: boolean;
  setAsideVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isImageLoaded: boolean;
  setImageIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  gardinerCodes: string;
  setGardinerCodes: (value: string) => void;
}

const HieroSelectorContext = React.createContext<IHieroSelectorContext | null>(
  null,
);

export const useHieroSelectorContext = (): IHieroSelectorContext => {
  const context = React.useContext(HieroSelectorContext);

  if (context) {
    return context;
  }

  throw new Error('HieroSelectorContext was not initialized');
};

interface IHieroSelectorContextProvider {
  children?: React.ReactNode;
  name: string;
  dir: TDir;
  fontSize: number;
}

export const HieroSelectorContextProvider: React.FC<
  IHieroSelectorContextProvider
> = ({ dir, fontSize, name, children }) => {
  const [asideVisible, setAsideVisible] = React.useState(false);
  const { watch, setValue } = useFormContext<{ [name]: string }>();
  const gardinerCodes = watch(name) || '';
  const setGardinerCodes = React.useCallback(
    (value: string) => setValue(name, value),
    [name, setValue],
  );
  const [current, setCurrent] = React.useState<TCurrent>([0, -1]);
  const [isImageLoaded, setImageIsLoaded] = React.useState(false);

  const lines = React.useMemo(
    () => splitIntoLines(gardinerCodes),
    [gardinerCodes],
  );

  const shiftCurrent = React.useCallback(
    (value: number, force = false) => {
      setCurrent(shiftCurrentIndex(value, lines, current, force));
    },
    [current, lines],
  );

  const value = React.useMemo(() => {
    return {
      dir,
      fontSize,
      current,
      setCurrent,
      lines,
      asideVisible,
      setAsideVisible,
      isImageLoaded,
      setImageIsLoaded,
      shiftCurrent,
      gardinerCodes,
      setGardinerCodes,
    };
  }, [
    asideVisible,
    current,
    dir,
    fontSize,
    gardinerCodes,
    isImageLoaded,
    lines,
    setGardinerCodes,
    shiftCurrent,
  ]);

  return (
    <HieroSelectorContext.Provider value={value}>
      {children}
    </HieroSelectorContext.Provider>
  );
};

HieroSelectorContext.displayName = 'HieroSelectorContext';
