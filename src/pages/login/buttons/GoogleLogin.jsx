import React from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { setCookie } from '../../../utils/cookie';
import { ReactComponent as GoogleIcon } from '../../../assets/googleIcon.svg';
import LoginButton from '../LoginButton';
import { useUserStore } from '../../../store/userStore';

const GoogleLogin = () => {
  const setUserName = useUserStore(state => state.setUserName);
  const setUserId = useUserStore(state => state.setUserId);
  const setUserImage = useUserStore(state => state.setUserImage);

  const handleClickGoogleLogin = useGoogleLogin({
    onSuccess: async credentialResponse => {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/login`,
        {
          authCode: credentialResponse.code,
          provider: 'GOOGLE',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const access = response.headers.get('Gauth');
      const refresh = response.headers.get('RefreshToken');

      setCookie('Access', access);
      setCookie('Refresh', refresh);

      const { data } = response;
      setUserName(data.username);
      setUserId(data.userId);
      setUserImage(data.imageUrl);
      console.log(data.username, data.isFirst);
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
