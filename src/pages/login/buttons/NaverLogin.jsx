import React from 'react';
import { setCookie } from '../../../utils/cookie';
import LoginButton from '../LoginButton';
import { ReactComponent as NaverIcon } from '../../../assets/naverIcon.svg';

const NaverLogin = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const state = new URL(window.location.href).searchParams.get('state');

  if (code && state) {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authCode: code,
        authState: state,
        provider: 'NAVER',
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
        console.log(data.username, data.isFirst, 'naver');
      });
  }

  const handleClickNaverLogin = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
      process.env.REACT_APP_NAVER_CLIENT_ID
    }&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&state=${Math.random()
      .toString(36)
      .substring(3, 14)}`;
  };

  return (
    <LoginButton
      icon={<NaverIcon />}
      bgColor="bg-naver"
      click={handleClickNaverLogin}
    />
  );
};

export default NaverLogin;
