import React from 'react';
import { useClientContext } from './client-context';
import { useQuery } from '@tanstack/react-query';

interface IHieroContext {
  hieroglyphs: Record<string, string>;
}

const HieroContext = React.createContext<IHieroContext | null>(null);

export const useHieroContext = (): IHieroContext => {
  const context = React.useContext(HieroContext);

  if (context) {
    return context;
  }

  throw new Error('HieroContext was not initialized');
};

interface IHieroContextProvider {
  children?: React.ReactNode;
}

export const HieroContextProvider: React.FC<IHieroContextProvider> = ({
  children,
}) => {
  //const { setError } = useAppContext();

  const { client } = useClientContext();

  const { data } = useQuery({
    queryKey: ['hieroglyphs'],
    queryFn: () =>
      client.path('/api/hieroglyph').method('get').create()({
        pageSize: -1,
      }),
  });

  const value = React.useMemo(() => {
    return {
      hieroglyphs: data?.data || {},
    };
  }, [data?.data]);

  return (
    <HieroContext.Provider value={value}>{children}</HieroContext.Provider>
  );
};

HieroContext.displayName = 'HieroContext';
