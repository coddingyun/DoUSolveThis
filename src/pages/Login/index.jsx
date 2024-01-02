import React from 'react';
import { ReactComponent as LogoMark } from '../../assets/logomark.svg';
import GoogleLogin from './buttons/GoogleLogin';
import NaverLogin from './buttons/NaverLogin';

const Login = () => {
  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="grid place-items-center">
        <div className="w-full grid place-items-center mb-14">
          <LogoMark className="w-12 h-12 mb-3" />
          <div className="text-3xl font-semibold text-gray-900 text-center">
            로그인
          </div>
          <div className="w-full text-base font-normal text-gray-500 text-center mt-4">
            소셜 계정으로 간편 로그인
          </div>
        </div>
        <div className="flex gap-4">
          <GoogleLogin />
          <NaverLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
