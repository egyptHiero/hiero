import React from 'react';
import { ApplicationRoutes } from './app-routes';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ClientContextProvider } from './context/client-context';
import { ServerUnavailableErrorPage } from '../pages/errors/500';
import { HieroContextProvider } from './context/hiero-context';

interface ErrorWithStatus extends Error {
  status: number;
}

export function App() {
  const [serverIsUnavailable, setServerIsUnavailable] = React.useState(false);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        if ((error as ErrorWithStatus).status === 500) {
          setServerIsUnavailable(true);
        }
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ClientContextProvider>
        {serverIsUnavailable ? (
          <ServerUnavailableErrorPage />
        ) : (
          <HieroContextProvider>
            <ApplicationRoutes />
          </HieroContextProvider>
        )}
      </ClientContextProvider>
    </QueryClientProvider>
  );
}

export default App;
