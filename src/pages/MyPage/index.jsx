import { useDisclosure } from '@chakra-ui/react';
import Line from '../../shared/components/Line';
import SimpleModal from '../../shared/components/SimpleModal';
import TopNavigation from '../../shared/layout/TopNavigation';
import AccountManagementButton from './components/AccountManagementButton';
import NavigationSection from './components/sections/NavigationSection';
import ProfileSection from './components/sections/ProfileSection';
import UserInfoSection from './components/sections/UserInfoSection';
import useGetMyPage from './hooks/api/useGetMyPage';
import { useNavigate } from 'react-router-dom';
import useGetManagementStudy from '../../shared/hooks/api/useGetManagementStudy';
import useWithdraw from './hooks/api/useWithdraw';

const MakeStudy = () => {
  const { data } = useGetMyPage();
  const { refetch: refetchWithdraw } = useWithdraw();
  const navigate = useNavigate();
  const onSuccessCallback = data => {
    if (data) {
      navigate('/manager-change');
    } else {
      refetchWithdraw();
    }
  };
  const { refetch: refetchGetManagementStudy } =
    useGetManagementStudy(onSuccessCallback);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClickWithdraw = () => {
    refetchGetManagementStudy();
  };

  const modalTitle = "정말 '이 문제 푸셨나요?'를\n 탈퇴하시겠습니까?";

  if (!data) {
    return null;
  }

  return (
    <TopNavigation>
      <SimpleModal
        isOpen={isOpen}
        onClose={onClose}
        title={modalTitle}
        buttonTitle="확인"
        onClick={handleClickWithdraw}
      />
      <div className="w-full py-24 flex flex-col items-center">
        <div className="w-[904px] flex flex-col gap-8">
          <ProfileSection userName={data.username} baekjoonId={data.bjname} />
          <UserInfoSection
            preferType={data.prefer_type}
            area={data.area}
            city={data.city}
            language={data.language}
          />
          <Line />
          <NavigationSection />
          <Line />
          <div className="flex justify-end">
            <AccountManagementButton title="탈퇴하기" onClick={onOpen} />
          </div>
        </div>
      </div>
    </TopNavigation>
  );
};

export default MakeStudy;
