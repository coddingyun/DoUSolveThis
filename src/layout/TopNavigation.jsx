import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LogoMark } from '../assets/logomark.svg';

const TopNavigation = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen">
      <div className="h-16 flex items-center border border-gray-100 border-b-gray-100">
        <button
          type="button"
          className="px-20 flex items-center gap-2"
          onClick={() => {
            navigate('/');
          }}
        >
          <LogoMark className="w-8 h-8" />
          <div className="text-gray-900 font-bold">이 문제 푸셨나요?</div>
        </button>
      </div>
      <div className="px-20">{children}</div>
    </div>
  );
};

export default TopNavigation;
