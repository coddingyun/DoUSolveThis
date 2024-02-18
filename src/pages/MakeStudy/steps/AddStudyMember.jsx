import React, { useState } from 'react';
import ModalLayout from '../ModalLayout';
import InputContainer from '../InputContainer';
import Input from '../Input';
import useCheckId from '../../../hooks/api/useCheckId';
import { useStudyMembers } from '../../../store/studyStore';
import { BaekjoonIdTag } from '../../../components/Tag';

const AddStudyMember = ({ onPrev, onNext }) => {
  const [term, setTerm] = useState('');
  const members = useStudyMembers();
  const { refetch } = useCheckId(term);

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  return (
    <ModalLayout
      leftButtonTitle="이전"
      rightButtonTitle="다음"
      onPrev={onPrev}
      onNext={onNext}
    >
      <InputContainer title="스터디원 추가(선택)">
        <Input
          placeholder="스터디원 백준 ID 등록하기"
          value={term}
          handleChangeValue={e => setTerm(e.target.value)}
          handleKeyDown={handleKeyDown}
        />
        <div className="flex flex-wrap gap-2">
          {members &&
            members.map((member, idx) => (
              <BaekjoonIdTag id={`member#${idx}`}>{member}</BaekjoonIdTag>
            ))}
        </div>
      </InputContainer>
    </ModalLayout>
  );
};

export default AddStudyMember;
