import React, { useState } from 'react';
import { UserTag } from '../../../shared/components/Tag';
import { Button, useDisclosure } from '@chakra-ui/react';
import SimpleModal from '../../../shared/components/SimpleModal';
import InputContainer from '../../../shared/components/InputContainer';
import SelectComp from '../../../shared/components/Select';
import useStudyInfo from '../../../shared/hooks/api/useStudyInfo';
import usePutStudyManager from '../../../shared/hooks/api/usePutStudyManager';
import { useUserName } from '../../../store/userStore';
import { useWithdrawActions } from '../../../store/withdrawStore';

const StudyCardForManagerChange = ({ title, description, id }) => {
  const [isChanged, setIsChanged] = useState(false);
  const [manager, setManager] = useState({
    username: '',
    userId: 0,
  });
  const { setManagerChangedId } = useWithdrawActions();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSuccessCallBack = () => {
    setIsChanged(true);
    setManagerChangedId(id);
    onClose();
  };

  const { studyInfoData } = useStudyInfo(id);
  const mutation = usePutStudyManager(id, onSuccessCallBack);

  const userName = useUserName();
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
        <div className="flex justify-between items-center">
          <h6 className="text-gray-500 text-sm">새로운 스터디장</h6>
          <UserTag title={manager.username} tier={6} />
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

  const onClickEdit = () => {
    mutation.mutate(manager.userId);
  };

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
            value={manager.username}
            handleChangeValue={e => {
              const pickedManager = members.filter(member => {
                if (member.username === e.target.value) {
                  return member;
                }
              });

              setManager({
                username: pickedManager[0].username,
                userId: pickedManager[0].userId,
              });
            }}
            options={members.map(member => member.username)}
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
