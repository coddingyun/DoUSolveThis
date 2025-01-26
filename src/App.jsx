import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookiesProvider } from 'react-cookie';
import { ChakraProvider } from '@chakra-ui/react';
import spinner from './assets/spinner.gif';
import Router from './shared/components/common/Router';
import theme from './shared/layout/theme';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Loading = () => {
  return (
    <div className="h-screen w-full grid place-items-center">
      <img src={spinner} width="50" alt="로딩 중" />
    </div>
  );
};

function App() {
  return (
    <div>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <CookiesProvider>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
              <Suspense fallback={<Loading />}>
                <BrowserRouter>
                  <Router />
                </BrowserRouter>
              </Suspense>
            </ChakraProvider>
          </QueryClientProvider>
        </CookiesProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
