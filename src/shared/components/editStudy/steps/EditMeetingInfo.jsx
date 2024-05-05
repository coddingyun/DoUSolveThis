import React from 'react';
import InputContainer from '../../InputContainer';
import SelectComp from '../../Select';
import RegionButton from '../../RegionButton';
import { Form } from '../../Form';
import {
  useEditStudyActions,
  useEditStudyArea,
  useEditStudyFrequencyNumber,
  useEditStudyFrequencyStandard,
  useEditStudyMeetingType,
  useEditStudyTime,
} from '../../../../store/studyStore';
import {
  MEETING_OPTIONS,
  FREQUENCY_NUMBER_OPTIONS,
  FREQUENCY_STANDARD_OPTIONS,
} from '../../../constants/options';

const EditMeetingInfo = () => {
  const meetingType = useEditStudyMeetingType();
  const studyArea = useEditStudyArea();
  const studyTime = useEditStudyTime();
  const frequencyStandard = useEditStudyFrequencyStandard();
  const frequencyNumber = useEditStudyFrequencyNumber();

  const {
    setMeetingType,
    setStudyArea,
    setStudyTime,
    setFrequencyStandard,
    setFrequencyNumber,
  } = useEditStudyActions();
  return (
    <>
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
    </>
  );
};

export default EditMeetingInfo;
