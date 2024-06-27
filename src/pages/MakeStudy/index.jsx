import React from 'react';
import { useNavigate } from 'react-router-dom';
import WriteStudyInfo from './components/steps/WriteStudyInfo';
import WriteMeetingInfo from './components/steps/WriteMeetingInfo';
import AddStudyMember from './components/steps/AddStudyMember';
import Completed from './components/steps/Completed';
import { useStudyActions } from '../../store/studyStore';
import { makeStudyStepTitle } from '../../shared/constants/steps';
import ModalLayout from '../../shared/layout/ModalLayout';
import StudyModalError from '../../shared/components/StudyModalError';
import useGetMyPage from '../MyPage/hooks/api/useGetMyPage';
import { useEffect } from 'react';

const MakeStudy = ({ clickHandler, Funnel, Step, onClose }) => {
  const navigate = useNavigate();
  const { reset } = useStudyActions();
  const { data } = useGetMyPage();

  const { setLanguage, setMeetingType, setStudyArea } = useStudyActions();

  useEffect(() => {
    if (data) {
      setLanguage(data.language);
      setMeetingType(data.prefer_type);
      setStudyArea({
        area: data.area,
        city: data.city,
      });
    }
  }, [data]);

  if (!data) {
    return <></>;
  }

  return (
    <Funnel>
      <Step name={makeStudyStepTitle[0]}>
        <WriteStudyInfo
          onPrev={onClose}
          onNext={() => clickHandler(makeStudyStepTitle[1])}
          userInfoData={data}
        />
      </Step>

      <Step name={makeStudyStepTitle[1]}>
        <WriteMeetingInfo
          onPrev={() => clickHandler(makeStudyStepTitle[0])}
          onNext={() => clickHandler(makeStudyStepTitle[2])}
          userInfoData={data}
        />
      </Step>

      <Step name={makeStudyStepTitle[2]}>
        <AddStudyMember
          onPrev={() => clickHandler(makeStudyStepTitle[1])}
          rightButtonType="submit"
          clickHandler={clickHandler}
        />
      </Step>

      <Step name={makeStudyStepTitle[3]}>
        <Completed
          onPrev={() => {
            onClose();
            clickHandler(makeStudyStepTitle[0]);
            reset();
          }}
          onNext={() => {
            onClose();
            clickHandler(makeStudyStepTitle[0]);
            navigate('/my-study');
            reset();
          }}
        />
      </Step>
      <Step name={makeStudyStepTitle[4]}>
        <ModalLayout
          title={null}
          leftButtonTitle="확인"
          rightButtonTitle="되돌아가기"
          onPrev={() => {
            onClose();
            clickHandler(makeStudyStepTitle[0]);
            reset();
          }}
          onNext={() => {
            clickHandler(makeStudyStepTitle[2]);
          }}
        >
          <StudyModalError />
        </ModalLayout>
      </Step>
    </Funnel>
  );
};

export default MakeStudy;
