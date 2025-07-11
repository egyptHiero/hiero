import {ApplicationRoutes} from "./app-routes";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AppContextProvider} from "./context/app-context";
import {ClientContextProvider} from "./context/client-context";

export function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <ClientContextProvider>
          <ApplicationRoutes/>
        </ClientContextProvider>
      </QueryClientProvider>
    </AppContextProvider>
  );
}

export default App;
