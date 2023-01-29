import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
// import { DebugButton } from './state/recoil_state';

const queryClient = new QueryClient();

import overrides from './theme/index';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      {/* <DebugButton /> */}
      <QueryClientProvider client={queryClient}>
        <ChakraProvider resetCSS theme={overrides}>
          <App />
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
