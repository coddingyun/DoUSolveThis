import { ReactComponent as LogoMark } from '../../assets/logo-h.svg';
import UserInfoModal from './components/UserInfoModal';
import GoogleLoginButton from './components/buttons/GoogleLoginButton';
import NaverLoginButton from './components/buttons/NaverLoginButton';
import { useDisclosure } from '@chakra-ui/react';
import usePostLogin from './hooks/api/usePostLogin';
import { Loading } from '../../App';
import { getAccessToken } from '../../shared/utils/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const login = usePostLogin(onOpen);

  return (
    <div className="w-full h-screen grid place-items-center">
      <UserInfoModal isOpen={isOpen} onClose={onClose} />
      <div className="grid place-items-center">
        <div className="w-full grid place-items-center mb-14">
          <LogoMark className="mb-8" />
          <div className="text-3xl font-semibold text-gray-900 text-center">
            로그인
          </div>
          <div className="w-full text-base font-normal text-gray-500 text-center mt-4">
            소셜 계정으로 간편 로그인
          </div>
        </div>
        <div className="flex gap-4">
          <GoogleLoginButton login={login} />
          <NaverLoginButton login={login} />
        </div>
      </div>
    </div>
  );
};

export default Login;
