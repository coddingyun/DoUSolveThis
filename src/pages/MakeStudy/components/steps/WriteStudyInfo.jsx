import SelectComp from '../../../../shared/components/Select';
import {
  LANG_OPTIONS,
  PURPOSE_OPTIONS,
} from '../../../../shared/constants/options';
import {
  useStudyActions,
  useStudyDescription,
  useStudyKakaoUrl,
  useStudyLanguage,
  useStudyLevel,
  useStudyName,
  useStudySolvedProblemNumber,
} from '../../../../store/studyStore';
import Input from '../Input';
import ModalLayout from '../../../../shared/layout/ModalLayout';
import InputContainer from '../InputContainer';

const WriteStudyInfo = ({ onPrev, onNext }) => {
  const studyName = useStudyName();
  const description = useStudyDescription();
  const kakaoUrl = useStudyKakaoUrl();
  const language = useStudyLanguage();
  const level = useStudyLevel();
  const solvedProblemNumber = useStudySolvedProblemNumber();
  const {
    setStudyName,
    setDescription,
    setKakaoUrl,
    setLanguage,
    setLevel,
    setSolvedProblemNumber,
  } = useStudyActions();

  return (
    <ModalLayout
      leftButtonTitle="잠깐만요"
      rightButtonTitle="다음"
      onPrev={onPrev}
      onNext={onNext}
    >
      <InputContainer title="모임 이름">
        <Input
          placeholder="모임 이름을 입력해주세요. (최대 15글자)"
          value={studyName}
          handleChangeValue={e => setStudyName(e.target.value)}
        />
      </InputContainer>
      <InputContainer title="모임 설명">
        <Input
          placeholder="모임 설명을 입력해주세요. (최대 40글자)"
          value={description}
          handleChangeValue={e => setDescription(e.target.value)}
        />
      </InputContainer>
      <InputContainer title="오픈 채팅방">
        <Input
          placeholder="오픈 채팅방 링크를 입력해주세요"
          value={kakaoUrl}
          handleChangeValue={e => setKakaoUrl(e.target.value)}
        />
      </InputContainer>
      <InputContainer title="주 사용 언어">
        <SelectComp
          value={language}
          handleChangeValue={e => setLanguage(LANG_OPTIONS[e.target.value + 1])}
          options={LANG_OPTIONS.slice(1)}
          textClassName="!text-base !font-normal"
        />
      </InputContainer>
      <InputContainer title="목표 레벨">
        <SelectComp
          value={level}
          handleChangeValue={e => setLevel(PURPOSE_OPTIONS[e.target.value + 1])}
          options={PURPOSE_OPTIONS.slice(1)}
          textClassName="!text-base !font-normal"
        />
      </InputContainer>
      <InputContainer title="1주일간 푸는 문제 수">
        <Input
          type="number"
          placeholder="문제 개수를 입력해주세요."
          value={solvedProblemNumber}
          handleChangeValue={e => setSolvedProblemNumber(e.target.value)}
        />
      </InputContainer>
    </ModalLayout>
  );
};

export default WriteStudyInfo;
