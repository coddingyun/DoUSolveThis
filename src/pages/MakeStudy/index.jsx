import React from 'react';
import { useNavigate } from 'react-router-dom';
import WriteStudyInfo from './steps/WriteStudyInfo';
import WriteMeetingInfo from './steps/WriteMeetingInfo';
import AddStudyMember from './steps/AddStudyMember';
import Completed from './steps/Completed';

const MakeStudy = ({ steps, clickHandler, Funnel, Step, onClose }) => {
  const navigate = useNavigate();

  return (
    <Funnel>
      <Step name="스터디 정보 작성">
        <WriteStudyInfo
          onPrev={onClose}
          onNext={() => clickHandler(steps[1])}
        />
      </Step>

      <Step name="모임 정보 작성">
        <WriteMeetingInfo
          onPrev={() => clickHandler(steps[0])}
          onNext={() => clickHandler(steps[2])}
        />
      </Step>

      <Step name="스터디원 추가">
        <AddStudyMember
          onPrev={() => clickHandler(steps[1])}
          onNext={() => clickHandler(steps[3])}
        />
      </Step>

      <Step name="종료">
        <Completed
          onPrev={() => {
            navigate('/search');
          }}
          onNext={() => {
            // TODO: 내 스터디로
            navigate('/search');
          }}
        />
      </Step>
    </Funnel>
  );
};

export default MakeStudy;
