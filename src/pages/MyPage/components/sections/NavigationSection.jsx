import { useNavigate } from 'react-router-dom';
import NavigationCard from '../NavigationCard';

const NavigationSection = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-8">
      <NavigationCard
        title="내 스터디 바로가기"
        onClick={() => {
          navigate('/my-study');
        }}
      />
      <NavigationCard
        title="내가 만든 스터디 관리하기"
        onClick={() => {
          navigate('/my-study');
        }}
      />
      <NavigationCard
        title="참여 제안 보기"
        onClick={() => {
          navigate('/participation-offer');
        }}
      />
      <NavigationCard
        title="신청 목록 보기"
        onClick={() => {
          // TODO. 올바른 라우팅
          navigate('/');
        }}
      />
    </div>
  );
};

export default NavigationSection;
