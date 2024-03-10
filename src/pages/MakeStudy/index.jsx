import { useNavigate } from 'react-router-dom';
import WriteStudyInfo from './components/steps/WriteStudyInfo';
import WriteMeetingInfo from './components/steps/WriteMeetingInfo';
import AddStudyMember from './components/steps/AddStudyMember';
import Completed from './components/steps/Completed';
import { useStudyActions } from '../../store/studyStore';
import { makeStudyStepTitle } from '../../shared/constants/steps';
import ModalLayout from '../../shared/layout/ModalLayout';

const MakeStudy = ({ clickHandler, Funnel, Step, onClose }) => {
  const navigate = useNavigate();
  const { reset } = useStudyActions();

  return (
    <Funnel>
      <Step name={makeStudyStepTitle[0]}>
        <WriteStudyInfo
          onPrev={onClose}
          onNext={() => clickHandler(makeStudyStepTitle[1])}
        />
      </Step>

      <Step name={makeStudyStepTitle[1]}>
        <WriteMeetingInfo
          onPrev={() => clickHandler(makeStudyStepTitle[0])}
          onNext={() => clickHandler(makeStudyStepTitle[2])}
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
            navigate('/search');
            onClose();
            clickHandler(makeStudyStepTitle[0]);
            reset();
          }}
          onNext={() => {
            navigate('/my-study');
            onClose();
            clickHandler(makeStudyStepTitle[0]);
            reset();
          }}
        />
      </Step>
      <Step name={makeStudyStepTitle[4]}>
        <ModalLayout
          title={null}
          buttonTitle= "확인"
          prevNext={false}
          onNext={() => {
            navigate('/my-study');
            onClose();
            clickHandler(makeStudyStepTitle[0]);
            reset();
          }}
        >
          <Completed />
        </ModalLayout>
      </Step>
    </Funnel>
  );
};

export default MakeStudy;
