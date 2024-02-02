import { Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import ParticipateModal from './modals/ParticipateModal';
import EnterProblem from './modals/checkProblem/EnterProblem';

const Header = ({
  title,
  description,
  peopleNum,
  studyId,
  participated = true,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderModal = () => {
    if (participated) {
      return <EnterProblem isOpen={isOpen} onClose={onClose} />;
    }
    return (
      <ParticipateModal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        studyId={studyId}
      />
    );
  };
  return (
    <>
      <div className="py-5 flex justify-between items-start">
        <div>
          <h1 className="!p-0 !mb-1 text-gray-900 text-4xl font-semibold">
            {title}
          </h1>
          <h4 className="text-gray-500 text-base font-normal">{description}</h4>
        </div>
        <div className="flex gap-3">
          <Button className="!bg-brand-50 !text-brand-700 rounded-lg text-color font-semibold text-sm">
            현재 참여 인원 {peopleNum}명
          </Button>
          <Button
            onClick={onOpen}
            className="!bg-brand-600 !text-white rounded-lg font-semibold text-sm"
          >
            {participated ? '이 문제를 푸셨나요?' : '참여하기'}
          </Button>
        </div>
      </div>
      <div>{renderModal()}</div>
    </>
  );
};

export default Header;
