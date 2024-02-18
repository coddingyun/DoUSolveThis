import React from 'react';
import WriteStudyInfo from './steps/WriteStudyInfo';
import WriteMeetingInfo from './steps/WriteMeetingInfo';

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
        <WriteMeetingInfo onNext={() => clickHandler(steps[2])} />
      </Step>

      {/* <Step name="스터디원 추가">
        <SetupMajor onNext={() => nextClickHandler(steps[3])} />
      </Step>

      <Step name="종료">
        <SetupEmail onNext={() => nextClickHandler(steps[4])} />
      </Step> */}
    </Funnel>
  );
};

export default MakeStudy;
