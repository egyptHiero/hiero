import React from 'react';
import { useFormContext } from 'react-hook-form';
import { SignDto } from '../../types/types';
import { joinLines, splitIntoLines } from './logic';

type TCurrent = [number, number, number];
type TChangeHiero = (
  value: string,
  variant: 'left' | 'right' | 'hiero',
) => void;

interface ISignContext {
  current?: TCurrent;
  setCurrent: React.Dispatch<React.SetStateAction<TCurrent | undefined>>;
  lines: Array<{ codes: string; hieroes: string[]; delimiters: string[] }>;
  asideVisible: boolean;
  setAsideVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isImageLoaded: boolean;
  setImageIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  changeHiero: TChangeHiero;
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
  const { watch, setValue } = useFormContext<SignDto>();
  const classification = watch('classification') || '';
  const [current, setCurrent] = React.useState<TCurrent>();
  const [isImageLoaded, setImageIsLoaded] = React.useState(false);

  const lines = React.useMemo(
    () => splitIntoLines(classification),
    [classification],
  );

  const changeHiero: TChangeHiero = React.useCallback(
    (value, variant) => {
      setValue('classification', joinLines(lines, current, { value, variant }));
    },
    [current, lines, setValue],
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
      changeHiero,
    };
  }, [asideVisible, changeHiero, current, isImageLoaded, lines]);

  return <SignContext.Provider value={value}>{children}</SignContext.Provider>;
};

SignContext.displayName = 'SignContext';
