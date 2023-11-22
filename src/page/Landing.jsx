import React from 'react';
import { useNavigate } from 'react-router-dom';
import CommonLayout from '../layout/CommonLayout';
import { ReactComponent as Search } from '../asset/search.svg';
import { ReactComponent as Study } from '../asset/study.svg';

const LandingButton = ({ img, title, clickEvent }) => {
  let colorNum = 1;
  if (title === '스터디 만들기') {
    colorNum = 2;
  }
  const buttonClasses = `w-full h-40 grid place-items-center rounded-md ${
    colorNum === 1
      ? 'bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600'
      : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'
  } px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`;
  return (
    <span className="sm:ml-3">
      <button type="button" className={buttonClasses} onClick={clickEvent}>
        {img}
        <div className="text-3xl font-bold">{title}</div>
      </button>
    </span>
  );
};

const Landing = () => {
  const navigate = useNavigate();
  return (
    <CommonLayout
      subTitle="코딩 테스트 스터디 관리 서비스"
      title="이 문제 푸셨나요?"
    >
      <div className="flex flex-col justify-between">
        <div className="w-full text-base font-semibold text-gray-600">
          스터디원이 푼 문제인지 쉽게 확인해보세요. <br />
          함께 풀고 싶은 문제를 제안해보세요.
        </div>
        <div className="flex flex-col gap-3">
          <LandingButton
            img={<Search stroke-width="3" class="w-16 h-16" />}
            title="스터디 찾기"
            clickEvent={() => navigate('/search')}
          />
          <LandingButton
            img={<Study stroke-width="3" class="w-16 h-16" />}
            title="스터디 만들기"
          />
        </div>
      </div>
    </CommonLayout>
  );
};

export default Landing;
