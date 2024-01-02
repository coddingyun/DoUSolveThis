import React from 'react';
import { ReactComponent as LogoMark } from '../assets/logomark.svg';

const TopNavigation = ({ children }) => {
  return (
    <div className="w-full h-screen px-10">
      <div className="flex">
        <LogoMark className="w-12 h-12" />
        <div>이 문제 푸셨나요?</div>
      </div>
      {children}
    </div>
  );
};

export default TopNavigation;
