import React, { useState } from 'react';
import { Button, Switch, useDisclosure } from '@chakra-ui/react';
import ParticipateModal from './modals/ParticipateModal';
import EnterProblem from './modals/checkProblem/EnterProblem';
import { RankTag } from '../../../shared/components/Tag';
import { getAccessToken } from '../../../shared/utils/auth';
import { useUserName } from '../../../store/userStore';
import usePatchRecruiting from '../hooks/api/usePatchRecruiting';

const Header = ({ studyInfoData, studyId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userName = useUserName();
  const [isRecruiting, setIsRecruiting] = useState(studyInfoData.recruiting);

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

  const succesCallback = () => {
    setIsRecruiting(prev => !prev);
  };

  const mutation = usePatchRecruiting(succesCallback);

  const handleChangeSwitch = () => {
    mutation.mutate({ id: studyId, isRecruiting: !isRecruiting });
  };

  return (
    <>
      <div className="py-5 flex justify-between items-start">
        <div>
          <div className="mb-4">
            {/* <RecruitingTag isRecruiting={studyInfoData.recruiting} /> */}
            <RankTag>{studyInfoData.avg_rank}</RankTag>
          </div>
          <h1 className="!p-0 !mb-4 text-gray-900 text-4xl font-semibold">
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
          {getAccessToken() && !studyInfoData.participated && (
            <Button
              onClick={onOpen}
              className="!bg-brand-600 !text-white rounded-lg font-semibold text-sm"
              isDisabled={!studyInfoData.recruiting}
            >
              참여하기
            </Button>
          )}
          {studyInfoData.manager.username === userName && (
            <div className="flex items-center gap-2">
              <span
                className={`font-semibold ${isRecruiting ? 'text-gray-700' : 'text-gray-400'}`}
              >
                {isRecruiting ? '모집 중' : '모집 완료'}
              </span>
              <Switch
                colorScheme="purple"
                isChecked={isRecruiting}
                onChange={handleChangeSwitch}
              />
            </div>
          )}
        </div>
      </div>
      <div>{renderModal()}</div>
    </>
  );
};

export default Header;
