import React from 'react';
import WriteStudyInfo from './steps/WriteStudyInfo';

const MakeStudy = ({ steps, nextClickHandler, Funnel, Step }) => {
  return (
    <Funnel>
      <Step name="스터디 정보 작성">
        <WriteStudyInfo onNext={() => nextClickHandler(steps[1])} />
      </Step>

      <Step name="모임 정보 작성">
        <WriteStudyInfo onNext={() => nextClickHandler(steps[2])} />
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
