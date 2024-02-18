import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Image, Modal, useDisclosure } from '@chakra-ui/react';
import { ReactComponent as LogoMark } from '../assets/logomark.svg';
import { ReactComponent as Plus } from '../assets/plus.svg';
import { useAppCurMenu, useAppActions } from '../store/appStore';
import { useUserImage } from '../store/userStore';
import MakeStudy from '../pages/MakeStudy';
import useFunnel from '../hooks/useFunnel';

const steps = ['스터디 정보 작성', '모임 정보 작성', '스터디원 추가', '종료'];

const CreateStudyButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { Funnel, Step, setStep } = useFunnel(steps[0]);

  const nextClickHandler = nextStep => {
    setStep(nextStep);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        {/* <ModalOverlay />
        <ModalContent> */}
        {/* <ModalHeader className="text-grey-900 text-2xl font-semibold">
            {title}
          </ModalHeader> */}
        {/* <ModalCloseButton />
          <ModalBody> */}
        <MakeStudy
          steps={steps}
          nextClickHandler={nextClickHandler}
          Funnel={Funnel}
          Step={Step}
        />
        {/* </ModalBody> */}
        {/* <ModalFooter>{footer}</ModalFooter> */}
        {/* </ModalContent> */}
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
  const userImage = useUserImage(state => state.userImage);

  return (
    <Button className="!bg-transparent !p-0">
      <Image
        src={userImage}
        className="rounded-full"
        alt="profile"
        boxSize="32px"
      />
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
            className={`${curMenu === 1 ? '!text-brand-700' : '!text-gray-500'}
            ${menuStyle}`}
            onClick={() => {
              setCurMenu(1);
              navigate('/search');
            }}
          >
            스터디 찾기
          </Button>
          <Button
            className={`${curMenu === 2 ? '!text-brand-700' : '!text-gray-500'}
            ${menuStyle}`}
            onClick={() => {
              setCurMenu(2);
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
