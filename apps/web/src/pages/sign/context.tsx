import React from 'react';
import { UseFormWatch } from 'react-hook-form/dist/types/form';
import { SignDto } from '../../types/types';
import {
  DELIMITER_NEW_LINE,
  SUPPORTED_DELIMITERS,
  SUPPORTED_DELIMITERS_REGEXP,
} from '../../constants';

type TCurrent = [number, number, number];

interface ISignContext {
  current?: TCurrent;
  setCurrent: React.Dispatch<React.SetStateAction<TCurrent | undefined>>;
  lines: Array<{ codes: string; hieroes: string[]; delimiters: string[] }>;
  asideVisible: boolean;
  setAsideVisible: React.Dispatch<React.SetStateAction<boolean>>;
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
  watch: UseFormWatch<SignDto>;
}

export const SignContextProvider: React.FC<ISignContextProvider> = ({
  children,
  watch,
}) => {
  const [asideVisible, setAsideVisible] = React.useState(false);
  const classification = watch('classification') || '';
  const [current, setCurrent] = React.useState<TCurrent>();
  const lines = React.useMemo(
    () =>
      classification.split(DELIMITER_NEW_LINE).map((line) => {
        const all = line.split(SUPPORTED_DELIMITERS_REGEXP);
        return {
          codes: line,
          hieroes: all.filter((v) => SUPPORTED_DELIMITERS.includes(v)),
          delimiters: all.filter((v) => !SUPPORTED_DELIMITERS.includes(v)),
        };
      }),
    [classification],
  );

  const value = React.useMemo(() => {
    return {
      current,
      setCurrent,
      lines,
      asideVisible,
      setAsideVisible,
    };
  }, [asideVisible, current, lines]);

  return <SignContext.Provider value={value}>{children}</SignContext.Provider>;
};

SignContext.displayName = 'SignContext';
