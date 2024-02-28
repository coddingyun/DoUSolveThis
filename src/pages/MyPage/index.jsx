import Line from '../../shared/components/Line';
import Profile from '../../shared/components/Profile';
import TopNavigation from '../../shared/layout/TopNavigation';
import AccountManagementButton from './components/AccountManagementButton';
import NavigationSection from './components/sections/NavigationSection';
import ProfileSection from './components/sections/ProfileSection';
import UserInfoSection from './components/sections/UserInfoSection';
import useGetMyPage from './hooks/api/useGetMyPage';
import useLogout from './hooks/api/useLogout';
import useWithdraw from './hooks/api/useWithdraw';

const MakeStudy = () => {
  const { data } = useGetMyPage();
  const { refetch: refetchLogout } = useLogout();
  const { refetch: refetchWithdraw } = useWithdraw();

  const handleClickLogout = () => {
    refetchLogout();
  }

  const handleClickWithdraw = () => {
    refetchWithdraw();
  }

  if (!data) {
    return null;
  }

  return (
    <TopNavigation>
      <div className="w-full py-24 flex flex-col items-center">
        <div className='w-[904px] flex flex-col gap-8'>
          <ProfileSection userName={data.username} baekjoonId={data.bjname}/>
          <UserInfoSection
            preferType={data.prefer_type}
            area={data.area}
            languages={data.languages}
          />
          <Line />
          <NavigationSection />
          <Line />
          <div className="flex justify-end gap-3">
            <AccountManagementButton title="로그아웃" onClick={handleClickLogout}/>
            <AccountManagementButton title="탈퇴하기" onClick={handleClickWithdraw}/>
          </div>
        </div>
      </div>
    </TopNavigation>
  );
};

export default MakeStudy;
