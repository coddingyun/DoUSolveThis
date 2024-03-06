import React from 'react';
import InputContainer from '../../InputContainer';
import SelectComp from '../../Select';
import { Form } from '../../Form';
import {
  useEditStudyActions,
  useEditStudyDescription,
  useEditStudyKakaoUrl,
  useEditStudyLanguage,
  useEditStudyLevel,
  useEditStudyName,
  useEditStudySolvedProblemNumber,
} from '../../../../store/studyStore';
import { LANG_OPTIONS, PURPOSE_OPTIONS } from '../../../constants/options';

const EditStudyInfo = () => {
  const studyName = useEditStudyName();
  const description = useEditStudyDescription();
  const kakaoUrl = useEditStudyKakaoUrl();
  const language = useEditStudyLanguage();
  const level = useEditStudyLevel();
  const solvedProblemNumber = useEditStudySolvedProblemNumber();
  const {
    setStudyName,
    setDescription,
    setKakaoUrl,
    setLanguage,
    setLevel,
    setSolvedProblemNumber,
  } = useEditStudyActions();

  return (
    <>
      <InputContainer title="모임 이름">
        <Form.Input
          placeholder="모임 이름을 입력해주세요. (최대 15글자)"
          value={studyName}
          handleChangeValue={e => setStudyName(e.target.value)}
          errorName="studyName"
        />
      </InputContainer>
      <InputContainer title="모임 설명">
        <Form.Input
          placeholder="모임 설명을 입력해주세요. (최대 40글자)"
          value={description}
          handleChangeValue={e => setDescription(e.target.value)}
          errorName="studyDescription"
        />
      </InputContainer>
      <InputContainer title="오픈 채팅방">
        <Form.Input
          placeholder="오픈 채팅방 링크를 입력해주세요"
          value={kakaoUrl}
          handleChangeValue={e => setKakaoUrl(e.target.value)}
          errorName="kakaoUrl"
        />
      </InputContainer>
      <InputContainer title="주 사용 언어">
        <SelectComp
          value={language}
          handleChangeValue={e => setLanguage(e.target.value)}
          options={LANG_OPTIONS}
          textClassName="!text-base !font-normal"
        />
      </InputContainer>
      <InputContainer title="목표 레벨">
        <SelectComp
          value={level}
          handleChangeValue={e => setLevel(e.target.value)}
          options={PURPOSE_OPTIONS}
          textClassName="!text-base !font-normal"
        />
      </InputContainer>
      <InputContainer title="1주일간 푸는 문제 수">
        <Form.Input
          type="number"
          placeholder="문제 개수를 입력해주세요."
          value={solvedProblemNumber}
          handleChangeValue={e => setSolvedProblemNumber(e.target.value)}
          errorName="problemNumber"
        />
      </InputContainer>
    </>
  );
};

export default EditStudyInfo;
