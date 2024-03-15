import React, { useState } from 'react';
import { UserTag } from '../../../shared/components/Tag';
import { Button, useDisclosure } from '@chakra-ui/react';
import SimpleModal from '../../../shared/components/SimpleModal';
import InputContainer from '../../../shared/components/InputContainer';
import SelectComp from '../../../shared/components/Select';
import useStudyInfo from '../../../shared/hooks/api/useStudyInfo';

const StudyCardForManagerChange = ({ title, description, id }) => {
  const [isChanged, setIsChanged] = useState(false);
  const [manager, setManager] = useState('');
  const [managerTier, setManagerTier] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { studyInfoData } = useStudyInfo(id);
  const userName = userName();
  const members = studyInfoData
    ? studyInfoData.members.map(member => {
        if (member.username !== userName) {
          return member;
        }
      })
    : [];

  const renderFooter = () => {
    if (isChanged) {
      return (
        <div className="px-6 py-4 flex justify-between">
          <h6>새로운 스터디장</h6>
          <UserTag title={manager} tier={managerTier} />
        </div>
      );
    } else {
      return (
        <div className="flex justify-end">
          <Button
            className="!h-[36px] px-[14px] !text-brand-700 !bg-brand-50"
            onClick={onOpen}
          >
            스터디장 지정
          </Button>
        </div>
      );
    }
  };

  const onClickEdit = () => {};

  return (
    <>
      <SimpleModal
        isOpen={isOpen}
        onClose={onClose}
        title="다음 스터디장 지정"
        buttonTitle="수정하기"
        onClick={onClickEdit}
      >
        <InputContainer title="다음 스터디장">
          <SelectComp 
            value={manager}
            handleChangeValue={e => setManager(e.target.value)}
            options={members}
          />
        </InputContainer>
      </SimpleModal>
      <div className="block bg-white border border-gray-200 rounded-lg shadow">
        <div className="p-6">
          <h5 className="text-3xl font-semibold tracking-tight text-gray-900 mb-2">
            {title}
          </h5>
          <h6 className="text-sm text-gray-500">{description}</h6>
        </div>
        <hr />
        <div className="px-6 py-4">{renderFooter()}</div>
      </div>
    </>
  );
};

export default StudyCardForManagerChange;
