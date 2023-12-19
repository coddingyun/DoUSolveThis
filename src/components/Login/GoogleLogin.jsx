import { useGoogleLogin } from '@react-oauth/google';
import React from 'react';
import { setCookie } from '../../utils/cookie';

const GoogleLogin = () => {
  const handleClickLogin = useGoogleLogin({
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
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={() => handleClickLogin()} style={{ cursor: 'pointer' }}>
      Google Login
    </div>
  );
};

export default GoogleLogin;
