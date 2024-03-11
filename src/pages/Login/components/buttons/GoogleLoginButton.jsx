import { useGoogleLogin } from '@react-oauth/google';
import { ReactComponent as GoogleIcon } from '../../../../assets/googleIcon.svg';
import LoginButton from './LoginButton';
import usePostLogin from '../../hooks/api/usePostLogin';

const GoogleLoginButton = ({ onOpen }) => {
  const googleLogin = usePostLogin(onOpen);

  const handleClickGoogleLogin = useGoogleLogin({
    onSuccess: async credentialResponse => {
      const data = {
        authCode: credentialResponse.code,
        provider: 'GOOGLE',
      };
      googleLogin.mutate(data);
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

export default GoogleLoginButton;
