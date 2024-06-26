import RegionButton from '../../../../shared/components/RegionButton';
import SelectComp from '../../../../shared/components/Select';
import ModalLayout from '../../../../shared/layout/ModalLayout';
import InputContainer from '../../../../shared/components/InputContainer';
import {
  FREQUENCY_NUMBER_OPTIONS,
  FREQUENCY_STANDARD_OPTIONS,
  MEETING_OPTIONS,
} from '../../../../shared/constants/options';
import {
  useStudyActions,
  useStudyArea,
  useStudyFrequencyNumber,
  useStudyFrequencyStandard,
  useStudyMeetingType,
  useStudyTime,
} from '../../../../store/studyStore';
import { Form } from '../../../../shared/components/Form';

const WriteMeetingInfo = ({ onPrev, onNext }) => {
  const meetingType = useStudyMeetingType();
  const studyArea = useStudyArea();
  const studyTime = useStudyTime();
  const frequencyStandard = useStudyFrequencyStandard();
  const frequencyNumber = useStudyFrequencyNumber();

  const {
    setMeetingType,
    setStudyArea,
    setStudyTime,
    setFrequencyStandard,
    setFrequencyNumber,
  } = useStudyActions();

  return (
    <ModalLayout
      leftButtonTitle="이전"
      rightButtonTitle="다음"
      rightButtonType="next"
      dirtyFieldsCnt={5}
      onPrev={onPrev}
      onNext={onNext}
    >
      <InputContainer title="온·오프라인 여부">
        <SelectComp
          value={meetingType}
          handleChangeValue={e => setMeetingType(e.target.value)}
          options={MEETING_OPTIONS}
          textClassName="!text-base !font-normal"
        />
      </InputContainer>
      <InputContainer title="모임 지역">
        <RegionButton
          studyArea={studyArea}
          setStudyArea={setStudyArea}
          className="!w-full text-base !font-normal !flex !justify-start"
          disabled={meetingType === '온라인'}
        />
      </InputContainer>
      <InputContainer title="모임 빈도">
        <div className="w-full grid grid-cols-2 gap-3">
          <SelectComp
            value={frequencyStandard}
            handleChangeValue={e => setFrequencyStandard(e.target.value)}
            options={FREQUENCY_STANDARD_OPTIONS}
            textClassName="!text-base !font-normal"
          />
          <SelectComp
            value={frequencyNumber}
            handleChangeValue={e => setFrequencyNumber(e.target.value)}
            options={FREQUENCY_NUMBER_OPTIONS}
            textClassName="!text-base !font-normal"
          />
        </div>
      </InputContainer>
      <InputContainer title="스터디 시간">
        <Form.Input
          placeholder="스터디 시간을 입력해주세요. (예. 1시간)"
          value={studyTime}
          handleChangeValue={e => setStudyTime(e.target.value)}
          errorName="studyTime"
        />
      </InputContainer>
    </ModalLayout>
  );
};

export default WriteMeetingInfo;
