import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { setCookie } from '../../../utils/cookie';
import { ReactComponent as GoogleIcon } from '../../../asset/googleIcon.svg';
import LoginButton from '../LoginButton';

const GoogleLogin = () => {
  const handleClickGoogleLogin = useGoogleLogin({
    onSuccess: credentialResponse => {
      fetch(`${process.env.REACT_APP_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authCode: credentialResponse.code,
          provider: 'GOOGLE',
        }),
      })
        .then(response => {
          const access = response.headers.get('Gauth');
          const refresh = response.headers.get('RefreshToken');

          setCookie('Access', access);
          setCookie('Refresh', refresh);

          return response.json();
        })
        .then(data => {
          console.log(data.username, data.isFirst);
        });
    },
    onError: error => {
      console.log('Error: ', error);
    },
    flow: 'auth-code',
  });
  return (
    <LoginButton
      icon={<GoogleIcon />}
      bgColor="bg-white"
      click={handleClickGoogleLogin}
    />
  );
};

export default GoogleLogin;
