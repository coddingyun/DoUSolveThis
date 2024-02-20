import React, { useState } from 'react';
import ModalLayout from '../ModalLayout';
import InputContainer from '../InputContainer';
import Input from '../Input';
import useCheckId from '../../../hooks/api/useCheckId';
import { useStudyStore } from '../../../store/studyStore';
import { BaekjoonIdTag } from '../../../components/Tag';
import usePostStudy from '../../../hooks/api/usePostStudy';

const AddStudyMember = ({ onPrev, clickHandler, steps }) => {
  const [term, setTerm] = useState('');
  const {
    studyName,
    description,
    kakaoUrl,
    language,
    level,
    solvedProblemNumber,
    meetingType,
    studyArea,
    studyTime,
    frequencyStandard,
    frequencyNumber,
    members,
  } = useStudyStore();
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
      title: studyName,
      description,
      openchat: kakaoUrl,
      main_language: language,
      level,
      members,
      area: studyArea.area === '지역' ? 'ALL' : studyArea.area,
      city: studyArea.city === '전체' ? 'ALL' : studyArea.city,
      how_many: solvedProblemNumber,
      meeting_type: meetingType,
      period: frequencyStandard,
      frequency: frequencyNumber,
      study_time: studyTime,
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
