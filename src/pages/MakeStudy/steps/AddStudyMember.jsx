import React, { useState } from 'react';
import ModalLayout from '../ModalLayout';
import InputContainer from '../InputContainer';
import Input from '../Input';
import useCheckId from '../../../hooks/api/useCheckId';
import { useStudyMembers } from '../../../store/studyStore';
import { BaekjoonIdTag } from '../../../components/Tag';
import usePostStudy from '../../../hooks/api/usePostStudy';

const AddStudyMember = ({ onPrev, clickHandler, steps }) => {
  const [term, setTerm] = useState('');
  const members = useStudyMembers();
  const { refetch } = useCheckId(term);

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      refetch();
      setTerm('');
    }
  };

  const onSuccessCallback = () => {
    clickHandler(steps[3]);
  };

  const mutation = usePostStudy(onSuccessCallback);

  // TODO: 실 데이터로 교체
  const onNext = () => {
    mutation.mutate({
      title: '예시_제목',
      description: '스터디 설명',
      openchat: '오픈챗링크',
      main_language: 'python',
      level: '입문',
      members: [1, 2],
      area: '서울시 마포구 신촌',
      city: '마포구',
      meeting_type: '온 오프라인 둘다',
      period: '1주',
      frequency: '1번',
      study_time: '매주 월요일 7시',
    });
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
