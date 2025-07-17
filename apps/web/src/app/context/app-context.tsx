import React from 'react';

interface IAppContext {
  isSidebarVisible: boolean;
  setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  query?: string;
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AppContext = React.createContext<IAppContext | null>(null);

export const useAppContext = (): IAppContext => {
  const context = React.useContext(AppContext);

  if (context) {
    return context;
  }

  throw new Error('AppContext was not initialized');
};

interface IAppContextProvider {
  children?: React.ReactNode;
}

export const AppContextProvider: React.FC<IAppContextProvider> = ({
  children,
}) => {
  const [isSidebarVisible, setSidebarVisible] = React.useState(true);
  const [query, setQuery] = React.useState<string>();

  const value = React.useMemo(
    () => ({
      isSidebarVisible,
      setSidebarVisible,
      query,
      setQuery,
    }),
    [isSidebarVisible, query],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppContext.displayName = 'AppContext';
