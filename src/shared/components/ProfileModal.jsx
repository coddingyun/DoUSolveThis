import { Button } from '@chakra-ui/react';
import { useUserId, useUserName } from '../../store/userStore';
import Line from './Line';
import Profile from './Profile';
import { ReactComponent as User } from '../../assets/user.svg';
import { ReactComponent as LogOut } from '../../assets/log-out.svg';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../pages/MyPage/hooks/api/useLogout';

const ProfileModalButton = ({ title, Icon, onClick }) => {
  return (
    <Button
      className="px-[14px] py-[10px] flex gap-2 !bg-white"
      onClick={onClick}
    >
      <Icon />
      <div className="text-gray-900 font-medium">{title}</div>
    </Button>
  );
};

const ProfileModal = () => {
  const userName = useUserName();
  const userId = useUserId();

  const navigate = useNavigate();
  const { refetch: refetchLogout } = useLogout();

  const handleClickMyPage = () => {
    navigate('/my-page');
  };

  const handleClickLogout = () => {
    refetchLogout();
  };

  return (
    <div className="min-w-[280px] max-w-fit rounded-lg border border-gray-300 absolute top-12 right-0 !bg-white z-10 shadow-sm">
      <div className="max-w-fit px-[14px] py-[10px] flex gap-4 items-center">
        <Profile boxSize="40px" />
        <div className="flex-1 min-w-0">
          <h3 className="text-gray-900 font-semibold text-lg whitespace-nowrap overflow-hidden overflow-ellipsis">{userName}</h3>
          <h5 className="text-gray-500">{userId}</h5>
        </div>
      </div>
      <Line />
      <div className="flex flex-col items-start">
        <ProfileModalButton
          title="나의 정보"
          Icon={User}
          onClick={handleClickMyPage}
        />
        <ProfileModalButton
          title="로그아웃"
          Icon={LogOut}
          onClick={handleClickLogout}
        />
      </div>
    </div>
  );
};

export default ProfileModal;
