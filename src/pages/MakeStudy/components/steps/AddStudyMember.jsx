import { useState } from 'react';
import { BaekjoonIdTag } from '../../../../shared/components/Tag';
import ModalLayout from '../../../../shared/layout/ModalLayout';
import InputContainer from '../../../../shared/components/InputContainer';
import Input from '../../../../shared/components/Input';
import useCheckId from '../../../../shared/hooks/api/useCheckId';
import { useStudyStore, useStudyActions } from '../../../../store/studyStore';
import usePostStudy from '../../hooks/api/usePostStudy';
import { makeStudyStepTitle } from '../../../../shared/constants/steps';

const AddStudyMember = ({ onPrev, clickHandler }) => {
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

  const { addMember } = useStudyActions();
  const onCheckIdSuccessCallback = data => {
    if (data.valid) {
      addMember(data);
    }
  };
  const { refetch } = useCheckId(term, onCheckIdSuccessCallback);

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      refetch();
      setTerm('');
    }
  };

  const onStudySuccessCallback = () => {
    clickHandler(makeStudyStepTitle[3]);
  };

  const onStudyErrorCallback = () => {
    clickHandler(makeStudyStepTitle[4]);
  };

  const mutation = usePostStudy(onStudySuccessCallback, onStudyErrorCallback);

  const onNext = () => {
    mutation.mutate({
      title: studyName,
      description,
      openchat: kakaoUrl,
      main_language: language,
      level,
      members: members.map(member => member.username),
      area: studyArea.area === '전국' ? 'ALL' : studyArea.area,
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
      rightButtonType="submit"
      dirtyFieldsCnt={5}
      onPrev={onPrev}
      onNext={onNext}
    >
      <InputContainer title="스터디원 추가(선택)">
        <Input
          placeholder="스터디원 사용자 ID 등록하려면 입력 후 엔터"
          value={term}
          handleChangeValue={e => setTerm(e.target.value)}
          handleKeyDown={handleKeyDown}
        />
        <div className="flex flex-wrap gap-2">
          {members &&
            members.map((member, idx) => (
              <BaekjoonIdTag key={`member#${idx}`} member={member}>
                {member.username}
              </BaekjoonIdTag>
            ))}
        </div>
      </InputContainer>
    </ModalLayout>
  );
};

export default AddStudyMember;
