import * as React from 'react';
import createClient from 'openapi-fetch';
import type { paths } from '../../@types/openapi-schema';

interface IClientContext {
  client: ReturnType<typeof createClient<paths>>;
  select: <T extends { data?: unknown; error?: unknown; response?: unknown }>(value: T) => T['data'];
}

const ClientContext = React.createContext<IClientContext | null>(null);

export const useClientContext = (): IClientContext => {
  const context = React.useContext(ClientContext);

  if (context) {
    return context;
  }

  throw new Error('ClientContext was not initialized');
};

interface IClientContextProvider {
  children?: React.ReactNode;
}

export const ClientContextProvider: React.FC<IClientContextProvider> = ({
  children,
}) => {
  //const { setError } = useAppContext();

  const value = React.useMemo(() => {
    const select: IClientContext['select'] = ({ data, error }) => {

      if (error) {
        // todo
        //setError(new Error(error['message']));
      }
      return data;
    };

    const client = createClient<paths>();
    return {
      client,
      select,
    };
  }, []);

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
};

ClientContext.displayName = 'ClientContext';
