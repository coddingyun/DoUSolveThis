import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import CheckProblemModal from './CheckProblemModal';
import { ReactComponent as Search } from '../../../../../assets/search.svg';
import useCheckNextProblem from '../../../hooks/api/nextProblems/useCheckNextProblem';
import {
  useSuggestionActions,
  useSuggestionSolvePeople,
  useSuggestionStatus,
} from '../../../../../store/suggestionStore';
import usePostSuggestion from '../../../hooks/api/usePostSuggestion';
import tw from 'twin.macro';

const EnterProblem = ({ isOpen, onClose }) => {
  const { id } = useParams();

  const [value, setValue] = useState('');

  const { refetch } = useCheckNextProblem(id, value);

  const onSuccessCallback = () => {
    setValue('');
  };
  const mutation = usePostSuggestion(onSuccessCallback);
  const status = useSuggestionStatus();
  const { setStatus } = useSuggestionActions();
  const solvePeople = useSuggestionSolvePeople();

  const submitAction = () => {
    refetch();
  };

  const handleSuggestProb = () => {
    mutation.mutate({
      id,
      problem: value,
    });
    onClose();
  };

  const tagStyles = {
    solved: {
      bgColor: 'bg-error-50',
      textColor: 'text-error-700',
      text:
        solvePeople &&
        solvePeople.length > 0 &&
        (solvePeople.length === 1
          ? `${solvePeople[0].username}님이 풀었습니다.`
          : `${solvePeople[0].username}님 외 ${solvePeople.length - 1}명이 풀었습니다.`),
    },
    not_solved: {
      bgColor: 'bg-success-50',
      textColor: 'text-success-700',
      text: '푼 사람이 없습니다.',
    },
    not_existed: {
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-700',
      text: '문제가 없습니다.',
    },
  };

  const buttonStyles = {
    solved: {
      title: '이 문제 어때요',
      handleClick: handleSuggestProb,
    },
    not_solved: {
      title: '이 문제 어때요',
      handleClick: handleSuggestProb,
    },
    not_existed: {
      title: '다른 문제 검색',
      handleClick: () => {
        setStatus(null);
      },
    },
    null: {
      title: '문제 검색',
      handleClick: submitAction,
    },
  };

  const handleChangeValue = e => {
    setValue(e.target.value);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      refetch();
    }
  };

  const renderTag = () => {
    if (status) {
      return (
        <div
          className={`inline-block mt-2 px-4 py-0.5 rounded-2xl text-center font-medium text-sm ${tagStyles[status].bgColor} ${tagStyles[status].textColor}`}
        >
          {tagStyles[status].text}
        </div>
      );
    }

    return null;
  };

  const renderBody = () => {
    return (
      <div className="w-full">
        <div className="w-full relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-grey-500">
            <Search strokeWidth="2" className="w-5 h-5" />
          </div>
          <input
            type="text"
            id="default-search"
            className="block w-full h-10 p-4 ps-10 text-sm text-gray-900 border border-gray-300 focus:outline-none rounded-lg"
            placeholder="백준 문제 번호를 입력해주세요."
            value={value}
            onChange={handleChangeValue}
            onKeyDown={handleKeyDown}
            required
          />
        </div>
        {renderTag()}
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <div css={styles.footerButton(status)}>
        {status === 'not_solved' ||
          (status === 'solved' && (
            <Button
              className="!w-full !rounded-lg border border-solid !border-gray-300 !bg-white text-gray-700 font-semibold mr-1"
              variant="outlined"
              onClick={() => {
                setStatus(null);
                setValue('');
              }}
            >
              다른 문제 검색
            </Button>
          ))}
        <Button
          className="!w-full !rounded-lg !text-white !bg-brand-600"
          onClick={buttonStyles[status].handleClick}
          isDisabled={!value}
        >
          {buttonStyles[status].title}
        </Button>
      </div>
    );
  };
  return (
    <CheckProblemModal
      title="이 문제 푸셨나요?"
      body={renderBody()}
      footer={renderFooter()}
      isOpen={isOpen}
      onClose={() => {
        setValue('');
        setStatus(null);
        onClose();
      }}
    />
  );
};

const styles = {
  footerButton: status => [
    tw`!w-full`,
    status === 'not_solved' ||
      (status === 'solved' && tw`grid grid-cols-2 gap-3`),
  ],
};

export default EnterProblem;
