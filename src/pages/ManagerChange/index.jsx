import { useNavigate } from 'react-router-dom';
import SimpleButton from '../../shared/components/SimpleButton';
import useGetManagementStudy from '../../shared/hooks/api/useGetManagementStudy';
import { useWithdrawManagerChangedId } from '../../store/withdrawStore';
import StudyCardForManagerChange from './components/StudyCardForManagerChange';
import { Button } from '@chakra-ui/react';
import useWithdraw from '../MyPage/hooks/api/useWithdraw';

const ManagerChange = () => {
  const { data } = useGetManagementStudy(() => {}, true);
  const managerChangedId = useWithdrawManagerChangedId();

  const { refetch: refetchWithdraw } = useWithdraw();

  const navigate = useNavigate();

  const handleClickCancel = () => {
    navigate('/my-page')
  };

  const handleClickWithdraw = () => {
    refetchWithdraw();
  };

  return (
    <div className="pt-[80px]">
      <div className="px-24">
        <div className="py-5 mb-8">
          <div className="w-full flex justify-between">
            <h1 className="font-semibold text-4xl text-gray-900 my-1">
              서비스 탈퇴
            </h1>
            <div className="flex gap-3">
              <Button
                className="flex items-center gap-1 !px-3.5 !py-0 border border-solid border-gray-300 !rounded-lg"
                onClick={handleClickCancel}
              >
                <div className="text-gray-700 font-semibold text-sm">
                  탈퇴 취소
                </div>
              </Button>
              <SimpleButton title="탈퇴하기" onClick={handleClickWithdraw} isDisabled={managerChangedId && managerChangedId.length !== data.length}/>
            </div>
          </div>
          <h2 className="text-base text-gray-500">
            그동안 내가 관리했던 스터디의 새로운 스터디장을 지정해야 서비스
            탈퇴가 가능합니다.
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {data &&
            data.map((item, idx) => (
              <StudyCardForManagerChange
                key={`StudyCardForManagerChange#${idx}`}
                id={item.id}
                title={item.title}
                description={item.description}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerChange;
