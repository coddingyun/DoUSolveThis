import React from 'react';
import WriteStudyInfo from './steps/WriteStudyInfo';
import WriteMeetingInfo from './steps/WriteMeetingInfo';
import AddStudyMember from './steps/AddStudyMember';

const MakeStudy = ({ steps, clickHandler, Funnel, Step, onClose }) => {
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

      {/* <Step name="종료">
        <SetupEmail onNext={() => nextClickHandler(steps[4])} />
      </Step> */}
    </Funnel>
  );
};

export default MakeStudy;
