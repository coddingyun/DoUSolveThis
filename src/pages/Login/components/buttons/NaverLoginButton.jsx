import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../../../shared/utils/cookie';
import LoginButton from './LoginButton';
import { ReactComponent as NaverIcon } from '../../../../assets/naverIcon.svg';

const NaverLoginButton = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const state = new URL(window.location.href).searchParams.get('state');

  const navigate = useNavigate();

  useEffect(() => {
    const axiosNaverLogin = async () => {
      if (code && state) {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/login`,
          {
            authCode: code,
            authState: state,
            provider: 'NAVER',
          },
        );

        const access = response.headers.get('Gauth');
        const refresh = response.headers.get('RefreshToken');

        setCookie('Access', access);
        setCookie('Refresh', refresh);

        const { data } = response;
        console.log(data.username, data.isFirst, 'naver');
        navigate('/search');
      }
    };

    axiosNaverLogin();
  }, []);

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

export default NaverLoginButton;
