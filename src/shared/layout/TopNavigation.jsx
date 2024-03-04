import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, useDisclosure } from '@chakra-ui/react';
import { ReactComponent as LogoMark } from '../../assets/logomark.svg';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import { useAppCurMenu, useAppActions } from '../../store/appStore';
import MakeStudy from '../../pages/MakeStudy';
import useFunnel from '../hooks/useFunnel';
import { useStudyActions } from '../../store/studyStore';
import Profile from '../components/Profile';
import { Form } from '../components/Form';
import { studySchema } from '../constants/schema';

const steps = ['스터디 정보 작성', '모임 정보 작성', '스터디원 추가', '종료'];

const CreateStudyButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { Funnel, Step, setStep } = useFunnel(steps[0]);
  const { reset } = useStudyActions();

  const clickHandler = nextStep => {
    setStep(nextStep);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          clickHandler(steps[0]);
          reset();
        }}
        closeOnOverlayClick={false}
      >
        <Form onSubmit={()=>{
          // Todo. Submit Action 여기로 이동시키기
        }} schema={studySchema}>
          <MakeStudy
            steps={steps}
            clickHandler={clickHandler}
            Funnel={Funnel}
            Step={Step}
            onClose={onClose}
          />
        </Form>
      </Modal>
      <Button
        className="flex items-center gap-1 !bg-brand-600"
        onClick={onOpen}
      >
        <Plus />
        <div className="text-white font-semibold text-base">스터디 만들기</div>
      </Button>
    </>
  );
};

const ProfileButton = () => {
  const navigate = useNavigate();
  const handleNavigateToMyPage = () => {
    navigate('/my-page');
  };

  return (
    <Button className="!bg-transparent !p-0" onClick={handleNavigateToMyPage}>
      <Profile boxSize="32px" />
    </Button>
  );
};

const TopNavigation = ({ children }) => {
  const navigate = useNavigate();

  const curMenu = useAppCurMenu();
  const { setCurMenu } = useAppActions();

  const menuStyle = '!text-base !font-semibold !bg-transparent !px-0';
  return (
    <div className="w-full h-screen">
      <div className="h-16 flex justify-between items-center border border-gray-100 border-b-gray-100">
        <div className="pl-20 flex items-center gap-10">
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => {
              navigate('/');
            }}
          >
            <LogoMark className="w-8 h-8" />
            <div className="text-gray-900 font-bold">이 문제 푸셨나요?</div>
          </button>
          <Button
            className={`${curMenu === 'search' ? '!text-brand-700' : '!text-gray-500'}
            ${menuStyle}`}
            onClick={() => {
              setCurMenu('search');
              navigate('/search');
            }}
          >
            스터디 찾기
          </Button>
          <Button
            className={`${curMenu === 'myStudy' ? '!text-brand-700' : '!text-gray-500'}
            ${menuStyle}`}
            onClick={() => {
              navigate('/my-study');
            }}
          >
            내 스터디
          </Button>
        </div>
        <div className="pr-20 flex gap-8 items-center">
          <CreateStudyButton />
          <ProfileButton />
        </div>
      </div>
      <div className="px-20">{children}</div>
    </div>
  );
};

export default TopNavigation;
