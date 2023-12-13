import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Search } from '../../asset/search.svg';
import { ReactComponent as Study } from '../../asset/study.svg';
import { ReactComponent as Export } from '../../asset/export.svg';
import Login from '../../components/Login';

const LandingButton = ({ img, title, clickEvent, bgColor }) => {
  let customColor;
  if (bgColor === 'purple') {
    customColor =
      'bg-purple-500 hover:bg-purple-400 focus-visible:outline-purple-500';
  } else if (bgColor === 'indigo') {
    customColor =
      'bg-indigo-500 hover:bg-indigo-400 focus-visible:outline-indigo-500';
  } else {
    customColor =
      'bg-blue-500 hover:bg-blue-400 focus-visible:outline-blue-500';
  }
  const buttonClasses = `w-64 h-10 flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${customColor}`;

  return (
    <span className="sm:ml-3">
      <button type="button" className={buttonClasses} onClick={clickEvent}>
        {img}
        <div className="text-xl font-bold">{title}</div>
      </button>
    </span>
  );
};

const Landing = () => {
  const navigate = useNavigate();
  return (
    // <CommonLayout
    //   subTitle="코딩 테스트 스터디 관리 서비스"
    //   title="이 문제 푸셨나요?"
    // >
    <div className="w-full h-screen grid place-items-center py-20">
      <div className="h-full flex flex-col justify-evenly">
        <div>
          <div className="text-lg font-semibold text-gray-600 text-center">
            코딩 테스트 스터디 관리 서비스
          </div>
          <div className="text-5xl font-extrabold text-gray-800 text-center">
            이 문제 푸셨나요?
          </div>
          <div className="w-full text-base font-semibold text-gray-600 text-center mt-5">
            스터디원이 푼 문제인지 쉽게 확인해보세요. <br />
            함께 풀고 싶은 문제를 제안해보세요.
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 items-center">
          <LandingButton
            img={<Export strokeWidth="3" className="w-6 h-6" />}
            title="최근 스터디 바로가기"
            clickEvent={() => navigate('/search')}
            bgColor="blue"
          />
          <LandingButton
            img={<Search strokeWidth="3" className="w-6 h-6" />}
            title="스터디 찾기"
            clickEvent={() => navigate('/search')}
            bgColor="indigo"
          />
          <LandingButton
            img={<Study strokeWidth="3" className="w-6 h-6" />}
            title="스터디 만들기"
            clickEvent={() => navigate('/')}
            bgColor="purple"
          />
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Landing;
