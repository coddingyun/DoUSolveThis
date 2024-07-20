import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '../../../../../shared/components/Form';
import { Button, Modal, useDisclosure } from '@chakra-ui/react';
import { addOtherSchema } from '../../../../../shared/constants/addOther';
import ModalLayout from '../../../../../shared/layout/ModalLayout';
import InputContainer from '../../../../../shared/components/InputContainer';
import Input from '../../../../../shared/components/Input';
import { ReactComponent as RightArrow } from '../../../../../assets/chevron-right.svg';
import { ReactComponent as LeftArrow } from '../../../../../assets/chevron-left.svg';
import CheckProblemModal from './CheckProblemModal';
import { RankTag, UserTag } from '../../../../../shared/components/Tag';
import { ReactComponent as Search } from '../../../../../assets/search.svg';
import useCheckNextProblem from '../../../hooks/api/nextProblems/useCheckNextProblem';
import {
  useSuggestionActions,
  useSuggestionSolvePeople,
  useSuggestionStatus,
} from '../../../../../store/suggestionStore';
import usePostOtherSuggestion from '../../../hooks/api/usePostOtherSuggestion';
import tw from 'twin.macro';

const EnterOtherProblem = ({ isOpen, onClose }) => {
  const { id } = useParams();

  const [value, setValue] = useState('');
  const onSuccessCallback = () => {
    setRank('');
    setTypes('');
    setLink('');
    setTitle('');
    onClose();
  };
  const mutation = usePostOtherSuggestion(onSuccessCallback);
  const status = useSuggestionStatus();
  const { setStatus } = useSuggestionActions();
  const solvePeople = useSuggestionSolvePeople();
  const [rank, setRank] = useState('');
  const [title, setTitle] = useState('');
  const [types, setTypes] = useState('');
  const [link, setLink] = useState('');
  const onPrev = () => {
    oncClose();
  };
  const onNext = () => {
    const _types = types.split(',').map(t => t.trim());
    mutation.mutate({
      id,
      link,
      _types,
      title,
      rank,
    });
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        clickHandler();
        reset();
      }}
      closeOnOverlayClick={false}
    >
      <Form
        onSubmit={() => {
          // Todo. Submit Action 여기로 이동시키기
        }}
        schema={addOtherSchema}
      >
        <ModalLayout
          leftButtonTitle="이전"
          rightButtonTitle="저장하기"
          dirtyFieldsCnt={5}
          onPrev={onPrev}
          onNext={onNext}
        >
          <InputContainer title="문제 제목 입력">
            <Input
              placeholder="스터디 문제의 제목 입력"
              className={''}
              value={title}
              handleChangeValue={e => {
                setTitle(e.target.value);
              }}
            />
            <div className="flex flex-wrap gap-2"></div>
          </InputContainer>
          <InputContainer title="url 입력">
            <Input
              placeholder="스터디 문제로 등록하고자 하는 문제 url입력"
              className={''}
              value={link}
              handleChangeValue={e => {
                setLink(e.target.value);
              }}
            />
            <div className="flex flex-wrap gap-2"></div>
          </InputContainer>

          <InputContainer title="문제 난이도 입력 0 ~ 30">
            <div className="flex flex-row gap-2">
              <RankTag>{rank ? rank : 0}</RankTag>
              <Input
                placeholder="문제 난이도 입력 참고: 골드3 = 13 "
                className={''}
                value={rank}
                type={'number'}
                handleChangeValue={e => {
                  setRank(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-wrap gap-2"></div>
          </InputContainer>

          <InputContainer title="문제 태그 입력">
            <Input
              placeholder="스터디 문제의 태그를 콤마(,)로 구분하여 입력"
              className={''}
              value={types}
              handleChangeValue={e => {
                setTypes(e.target.value);
              }}
            />
            <div className="flex flex-wrap gap-2"></div>
          </InputContainer>
        </ModalLayout>
      </Form>
    </Modal>
  );
};

const styles = {
  footerButton: status => [
    tw`!w-full`,
    status === 'not_solved' && tw`grid grid-cols-2 gap-3`,
  ],
};

export default EnterOtherProblem;
