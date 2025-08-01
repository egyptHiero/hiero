import React from 'react';
import { useDebounce } from 'use-debounce';

type CustomControlNames = 'search';

interface IAppContext {
  isSidebarVisible: boolean;
  setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  query?: string;
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
  customControls?: React.ReactNode;
  customControlNames?: Set<CustomControlNames>;
  setCustomControls: (
    children: React.SetStateAction<React.ReactNode | undefined>,
    ...controlNames: CustomControlNames[]
  ) => void;
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
  const [debouncedQuery] = useDebounce(query, 300);
  const [customControls, setCustomControls] = React.useState<React.ReactNode>();
  const [customControlNames, setCustomControlNames] =
    React.useState<Set<CustomControlNames>>();

  const setCustomControlsWithNames = React.useCallback<
    IAppContext['setCustomControls']
  >((children, ...controlNames) => {
    setCustomControls(children);
    setCustomControlNames(new Set(controlNames));
  }, []);

  const value = React.useMemo(
    () => ({
      isSidebarVisible,
      setSidebarVisible,
      query: debouncedQuery,
      setQuery,
      customControls,
      customControlNames,
      setCustomControls: setCustomControlsWithNames,
    }),
    [
      customControls,
      customControlNames,
      debouncedQuery,
      isSidebarVisible,
      setCustomControlsWithNames,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppContext.displayName = 'AppContext';
