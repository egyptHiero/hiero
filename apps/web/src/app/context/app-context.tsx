import React from 'react';
import { useCustomControls } from './custom-controls';

type CustomControlNames = 'search';

interface IAppContext {
  isSidebarVisible: boolean;
  setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCustomControlsParam: (key: string, value: string | undefined) => void;
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
  const [customControls, setCustomControls] = React.useState<React.ReactNode>();
  const [customControlNames, setCustomControlNames] =
    React.useState<Set<CustomControlNames>>();
  const setCustomControlsWithNames = React.useCallback<
    IAppContext['setCustomControls']
  >((children, ...controlNames) => {
    setCustomControls(children);
    setCustomControlNames(new Set(controlNames));
  }, []);

  const { setCustomControlsParams } = useCustomControls();

  const setCustomControlsParam = React.useCallback<
    IAppContext['setCustomControlsParam']
  >(
    (key, value) => {
      setCustomControlsParams((values) => {
        if (value) {
          values[key] = value;
        } else {
          delete values[key];
        }

        return { ...values };
      });
    },
    [setCustomControlsParams],
  );

  const value = React.useMemo(
    () => ({
      isSidebarVisible,
      setSidebarVisible,
      setCustomControlsParam,
      customControls,
      customControlNames,
      setCustomControls: setCustomControlsWithNames,
    }),
    [
      isSidebarVisible,
      setCustomControlsParams,
      customControls,
      customControlNames,
      setCustomControlsWithNames,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppContext.displayName = 'AppContext';
