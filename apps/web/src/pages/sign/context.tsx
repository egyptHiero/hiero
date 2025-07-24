import React from 'react';
import {
  DELIMITER_NEW_LINE,
  SUPPORTED_DELIMITERS,
  SUPPORTED_DELIMITERS_REGEXP,
} from '../../constants';
import { useFormContext } from 'react-hook-form';
import { SignDto } from '../../types/types';

type TCurrent = [number, number, number];

interface ISignContext {
  current?: TCurrent;
  setCurrent: React.Dispatch<React.SetStateAction<TCurrent | undefined>>;
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
    () =>
      classification
        ? classification.split(DELIMITER_NEW_LINE).map((line) => {
            const all = line.split(SUPPORTED_DELIMITERS_REGEXP);
            return {
              codes: line,
              hieroes: all.filter((v) => !SUPPORTED_DELIMITERS.includes(v)),
              delimiters: all.filter((v) => SUPPORTED_DELIMITERS.includes(v)),
            };
          })
        : [],
    [classification],
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
    };
  }, [asideVisible, current, isImageLoaded, lines]);

  return <SignContext.Provider value={value}>{children}</SignContext.Provider>;
};

SignContext.displayName = 'SignContext';
