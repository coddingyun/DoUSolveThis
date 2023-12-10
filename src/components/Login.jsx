import { useGoogleLogin } from '@react-oauth/google';
import React from 'react';

const Login = () => {
  const handleClickLogin = useGoogleLogin({
    onSuccess: credentialResponse => {
      fetch(`${process.env.REACT_APP_BASE_URL}/api/login`, {
        method: 'POST',
        body: JSON.stringify({
          authCode: credentialResponse,
          provider: 'GOOGLE',
        }),
      });
    },
    onError: () => {
      console.log('Login Failed');
    },
  });
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  return <div onClick={() => handleClickLogin()}>Google Login</div>;
};

export default Login;
