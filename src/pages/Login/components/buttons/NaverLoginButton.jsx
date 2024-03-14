import { useEffect } from 'react';
import LoginButton from './LoginButton';
import { ReactComponent as NaverIcon } from '../../../../assets/naverIcon.svg';
import usePostLogin from '../../hooks/api/usePostLogin';

const NaverLoginButton = ({ onOpen }) => {
  const code = new URL(window.location.href).searchParams.get('code');
  const state = new URL(window.location.href).searchParams.get('state');

  const naverLogin = usePostLogin(onOpen);

  useEffect(() => {
    const axiosNaverLogin = async () => {
      if (code && state) {
        const data = {
          authCode: code,
          authState: state,
          provider: 'NAVER',
        };
        naverLogin.mutate(data);
      }
    };

    axiosNaverLogin();
  }, []);

  const handleClickNaverLogin = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
      import.meta.env.VITE_NAVER_CLIENT_ID
    }&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&state=${Math.random()
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
