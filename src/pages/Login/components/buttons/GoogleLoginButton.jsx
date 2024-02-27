import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as GoogleIcon } from '../../../../assets/googleIcon.svg';
import LoginButton from './LoginButton';
import usePostLogin from '../../hooks/api/usePostLogin';

const GoogleLoginButton = ({ onOpen }) => {
  const navigate = useNavigate();

  const onSuccessCallback = response => {
    if (response.data.isFirst) {
      onOpen();
    } else {
      navigate('/search');
    }
  };
  const googleLogin = usePostLogin(onSuccessCallback);

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
