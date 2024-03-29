import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Modal, useDisclosure } from '@chakra-ui/react';
import { ReactComponent as LogoMark } from '../../assets/logomark.svg';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import MakeStudy from '../../pages/MakeStudy';
import useFunnel from '../hooks/useFunnel';
import { useStudyActions } from '../../store/studyStore';
import Profile from '../components/Profile';
import { Form } from '../components/Form';
import { studySchema } from '../constants/schema';
import { makeStudyStepTitle } from '../constants/steps';
import { getAccessToken } from '../utils/auth';
import ProfileModal from '../components/ProfileModal';
import NoticeButton from '../components/notice/NoticeButton';

const CreateStudyButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { Funnel, Step, setStep } = useFunnel(makeStudyStepTitle[0]);
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
          clickHandler(makeStudyStepTitle[0]);
          reset();
        }}
        closeOnOverlayClick={false}
      >
        <Form
          onSubmit={() => {
            // Todo. Submit Action 여기로 이동시키기
          }}
          schema={studySchema}
        >
          <MakeStudy
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
  const [isOpen, setIsOpen] = useState(false);
  const handleClickProfile = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className='relative'>
      <Button className="!bg-transparent !p-0" onClick={handleClickProfile}>
        <Profile boxSize="32px" />
      </Button>
      {isOpen && <ProfileModal />}
    </div>
  );
};

const TopNavigation = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
            className={`${pathname === '/search' ? '!text-brand-700' : '!text-gray-500'}
            ${menuStyle}`}
            onClick={() => {
              if (getAccessToken()) {
                navigate('/search');
              } else {
                navigate('/login')
              }
            }}
          >
            스터디 찾기
          </Button>
          {getAccessToken() && <Button
            className={`${pathname === '/my-study' ? '!text-brand-700' : '!text-gray-500'}
            ${menuStyle}`}
            onClick={() => {
              navigate('/my-study');
            }}
          >
            내 스터디
          </Button>}
        </div>
        <div className="pr-20 flex gap-6 items-center">
          <CreateStudyButton />
          {getAccessToken() && <NoticeButton />}
          {getAccessToken() && <ProfileButton />}
        </div>
      </div>
      <div className="px-20">{children}</div>
    </div>
  );
};

export default TopNavigation;
