import React from 'react';
import { useFormContext } from 'react-hook-form';
import { SignDto } from '../../types/types';
import { TCurrent } from './types';
import { shiftCurrentIndex } from './logic';
import { splitIntoLines } from '../../utils';

interface ISignContext {
  current?: TCurrent;
  setCurrent: React.Dispatch<React.SetStateAction<TCurrent | undefined>>;
  shiftCurrent: (value: number, force: boolean) => void;
  lines: Array<{ codes: string; hieroes: string[]; delimiters: string[] }>;
  asideVisible: boolean;
  setAsideVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isImageLoaded: boolean;
  setImageIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignContext = React.createContext<ISignContext | null>(null);

export const useSignContext = (): ISignContext => {
  const context = React.useContext(SignContext);

  if (context) {
    return context;
  }

  throw new Error('SignContext was not initialized');
};

interface ISignContextProvider {
  children?: React.ReactNode;
}

export const SignContextProvider: React.FC<ISignContextProvider> = ({
  children,
}) => {
  const [asideVisible, setAsideVisible] = React.useState(false);
  const { watch } = useFormContext<SignDto>();
  const classification = watch('classification') || '';
  const [current, setCurrent] = React.useState<TCurrent>();
  const [isImageLoaded, setImageIsLoaded] = React.useState(false);

  const lines = React.useMemo(
    () => splitIntoLines(classification),
    [classification],
  );

  const shiftCurrent = React.useCallback(
    (value: number, force = false) => {
      setCurrent(shiftCurrentIndex(value, lines, current ?? [-1, -1], force));
    },
    [current, lines],
  );

  const value = React.useMemo(() => {
    return {
      current,
      setCurrent,
      lines,
      asideVisible,
      setAsideVisible,
      isImageLoaded,
      setImageIsLoaded,
      shiftCurrent,
    };
  }, [asideVisible, current, isImageLoaded, lines, shiftCurrent]);

  return <SignContext.Provider value={value}>{children}</SignContext.Provider>;
};

SignContext.displayName = 'SignContext';
