import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import ParticipateModal from './modals/ParticipateModal';
import EnterProblem from './modals/checkProblem/EnterProblem';
import { RankTag, RecruitingTag } from '../../../shared/components/Tag';
import { getAccessToken } from '../../../shared/utils/auth';

const Header = ({ studyInfoData, studyId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderModal = () => {
    if (studyInfoData.participated) {
      return <EnterProblem isOpen={isOpen} onClose={onClose} />;
    }
    return (
      <ParticipateModal
        isOpen={isOpen}
        onClose={onClose}
        title={studyInfoData.title}
        studyId={studyId}
      />
    );
  };
  
  return (
    <>
      <div className="py-5 flex justify-between items-start">
        <div>
          <div className='flex gap-4 mb-4'>
            <RecruitingTag isRecruiting={studyInfoData.recruiting}/>
            <RankTag>
              {studyInfoData.avg_rank}
            </RankTag>
          </div>
          <h1 className="!p-0 !mb-1 text-gray-900 text-4xl font-semibold">
            {studyInfoData.title}
          </h1>
          <h4 className="text-gray-500 text-base font-normal">
            {studyInfoData.description} <br />
            오픈 채팅방:{' '}
            <a
              href={studyInfoData.openchat}
              className="border-b border-gray-500"
            >
              {studyInfoData.openchat}
            </a>
          </h4>
        </div>
        <div className="flex gap-3">
          <Button className="!bg-brand-50 !text-brand-700 rounded-lg text-color font-semibold text-sm">
            현재 참여 인원 {studyInfoData.members.length}명
          </Button>
          {(getAccessToken() && !studyInfoData.participated)&& (
            <Button
              onClick={onOpen}
              className="!bg-brand-600 !text-white rounded-lg font-semibold text-sm"
              isDisabled={!studyInfoData.recruiting}
            >
              참여하기
            </Button>
          )}
        </div>
      </div>
      <div>{renderModal()}</div>
    </>
  );
};

export default Header;
