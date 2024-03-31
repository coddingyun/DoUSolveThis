import { useState } from 'react';
import { Modal } from '@chakra-ui/react';
import ModalLayout from '../../../shared/layout/ModalLayout';
import InputContainer from '../../../shared/components/InputContainer';
import SelectComp from '../../../shared/components/Select';
import RegionButton from '../../../shared/components/RegionButton';
import {
  MEETING_OPTIONS,
  LANG_OPTIONS,
} from '../../../shared/constants/options';
import { useNavigate } from 'react-router-dom';
import useCheckId from '../../../shared/hooks/api/useCheckId';
import usePostUserProfile from '../hooks/api/usePostUserProfile';
import { useUserName } from '../../../store/userStore';
import { Form } from '../../../shared/components/Form';
import { userSchema } from '../../../shared/constants/schema';

const UserInfoModal = ({ isOpen, onClose }) => {
  const [meetingType, setMeetingType] = useState('온·오프라인 모두');
  const [studyArea, setStudyArea] = useState({
    area: '전국',
    city: '전체',
  });
  const [language, setLanguage] = useState('Python');
  const [baekjoonId, setBaekjoonId] = useState();
  const [isValidBaekjoonId, setIsValidBaekjoonId] = useState(true);
  const username = useUserName();

  const navigate = useNavigate();
  const mutation = usePostUserProfile();

  const onSuccessCallback = data => {
    if (data.valid) {
      mutation.mutate({
        username: username,
        bjname: baekjoonId,
        prefer_type: meetingType,
        area: studyArea.area === '전국' ? 'ALL' : studyArea.area,
        city: studyArea.city === '전체' ? 'ALL' : studyArea.city,
        language,
      });
    } else {
      setIsValidBaekjoonId(false);
    }
  };
  const { refetch } = useCheckId(baekjoonId, onSuccessCallback);

  const handleClickRegister = () => {
    refetch();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        navigate('/search');
      }}
      closeOnOverlayClick={false}
    >
      <Form schema={userSchema}>
        <ModalLayout
          title="정보 입력"
          buttonTitle="등록하기"
          prevNext={false}
          closeButton={false}
          dirtyFieldsCnt={1}
          onNext={handleClickRegister}
        >
          <InputContainer title="온·오프라인 여부">
            <SelectComp
              value={meetingType}
              handleChangeValue={e => setMeetingType(e.target.value)}
              options={MEETING_OPTIONS}
              textClassName="!text-base !font-normal"
              placeholder="온·오프라인 선택"
            />
          </InputContainer>
          <InputContainer title="모임 지역">
            <RegionButton
              studyArea={studyArea}
              setStudyArea={setStudyArea}
              className="!w-full text-base !font-normal !text-left"
              disabled={meetingType === '온라인'}
            />
          </InputContainer>
          <InputContainer title="주 사용 언어">
            <SelectComp
              value={language}
              handleChangeValue={e => setLanguage(e.target.value)}
              options={LANG_OPTIONS}
              textClassName="!text-base !font-normal"
              placeholder="언어 선택"
            />
          </InputContainer>
          <InputContainer title="백준 ID">
            <Form.Input
              placeholder="백준 ID 입력"
              value={baekjoonId}
              handleChangeValue={e => {
                setBaekjoonId(e.target.value);
              }}
              errorName="baekjoonId"
              isValidBaekjoonId={isValidBaekjoonId}
            />
          </InputContainer>
        </ModalLayout>
      </Form>
    </Modal>
  );
};

export default UserInfoModal;
