import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookiesProvider } from 'react-cookie';
import { ChakraProvider } from '@chakra-ui/react';
import spinner from './assets/spinner.gif';
import Login from './pages/Login';
import MyStudy from './pages/MyStudy';

const queryClient = new QueryClient();

const Landing = lazy(() => import('./pages/Landing'));
const SearchStudy = lazy(() => import('./pages/SearchStudy'));
const StudyInfo = lazy(() => import('./pages/StudyInfo'));
const StudyEdit = lazy(() => import('./pages/StudyEdit'));

const Loading = () => {
  return (
    <div className="h-screen w-full grid place-items-center">
      <img src={spinner} width="50" alt="로딩 중" />
    </div>
  );
};

function App() {
  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <CookiesProvider>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider>
              <BrowserRouter>
                <Suspense fallback={<Loading />}>
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/search" element={<SearchStudy />} />
                    <Route path="/info/:id" exact element={<StudyInfo />} />
                    <Route path="/edit/:id" exact element={<StudyEdit />} />
                    <Route path="/my-study" exact element={<MyStudy />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </ChakraProvider>
          </QueryClientProvider>
        </CookiesProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
