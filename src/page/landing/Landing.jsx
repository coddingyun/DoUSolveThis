import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Search } from '../../asset/search.svg';
import { ReactComponent as Export } from '../../asset/export.svg';
import { ReactComponent as LogoMark } from '../../asset/logomark.svg';
import GoogleLogin from '../../components/Login/GoogleLogin';
import NaverLogin from '../../components/Login/NaverLogin';
import { setCookie } from '../../utils/cookie';
import LandingButton from './LandingButton';

const Landing = () => {
  const navigate = useNavigate();

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
        console.log(data.username, data.isFirst);
      });
  }
  return (
    // <CommonLayout
    //   subTitle="코딩 테스트 스터디 관리 서비스"
    //   title="이 문제 푸셨나요?"
    // >
    <div className="w-full h-screen grid place-items-center py-20">
      <div className="grid place-items-center">
        <div className="w-full grid place-items-center mb-14">
          <LogoMark className="w-12 h-12 mb-3" />
          <div className="text-lg font-semibold text-gray-900 text-center mb-2">
            코딩 테스트 스터디 관리 서비스
          </div>
          <div className="text-5xl font-bold text-gray-900 text-center">
            이 문제 푸셨나요?
          </div>
          <div className="w-full text-base font-normal text-gray-500 text-center mt-4">
            스터디원이 푼 문제인지 쉽게 확인해보세요. <br />
            함께 풀고 싶은 문제를 제안해보세요.
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 items-center">
          <LandingButton
            img={<Export strokeWidth="3" className="w-6 h-6" />}
            title="스터디 구경하기"
            clickEvent={() => navigate('/search')}
            bgColor="brand"
          />
          <LandingButton
            img={<Search strokeWidth="3" className="w-6 h-6" />}
            title="로그인 후 시작하기"
            clickEvent={() => navigate('/search')}
            bgColor="white"
          />
          <GoogleLogin />
          <NaverLogin />
        </div>
      </div>
    </div>
  );
};

export default Landing;
