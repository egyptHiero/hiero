import React, { useState } from 'react';
import { TActiveTab } from './types';
import { GARDINER_CLASSIFICATION } from '../../../constants';

interface IAsideContext {
  activeTab: TActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<TActiveTab>>;
  classification: string;
  setClassification: React.Dispatch<React.SetStateAction<string>>;
  query?: string;
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AsideContext = React.createContext<IAsideContext | null>(null);

export const useAsideContext = (): IAsideContext => {
  const context = React.useContext(AsideContext);

  if (context) {
    return context;
  }

  throw new Error('AsideContext was not initialized');
};

interface IAsideContextProvider {
  children?: React.ReactNode;
}

export const AsideContextProvider: React.FC<IAsideContextProvider> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState<TActiveTab>('select');
  const [query, setQuery] = useState<string>();
  const [classification, setClassification] = React.useState<string>(
    GARDINER_CLASSIFICATION[0],
  );

  const value = React.useMemo(() => {
    return {
      activeTab,
      setActiveTab,
      query,
      setQuery,
      classification,
      setClassification,
    };
  }, [activeTab, classification, query]);

  return (
    <AsideContext.Provider value={value}>{children}</AsideContext.Provider>
  );
};

AsideContext.displayName = 'AsideContext';
