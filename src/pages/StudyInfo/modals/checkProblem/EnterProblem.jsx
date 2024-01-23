import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import CheckProblemModal from './CheckProblemModal';
import { ReactComponent as Search } from '../../../../assets/search.svg';

const EnterProblem = ({ isOpen, onClose }) => {
  const [value, setValue] = useState('');

  const handleChangeValue = e => {
    setValue(e.target.value);
  };

  const submitAction = () => {
    // Todo api 연동
  };

  const renderBody = () => {
    return (
      <div className="w-full grid place-items-center">
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
            required
          />
        </div>
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <div className="!w-full grid grid-cols-2 gap-3">
        <Button
          className="!w-full !rounded-lg border border-solid !border-gray-300 !bg-white text-gray-700 font-semibold mr-1"
          variant="outlined"
          onClick={onClose}
        >
          잠깐만요
        </Button>
        <Button
          className="!w-full !bg-brand-600 !rounded-lg !text-white"
          onClick={submitAction}
          disabled={!value}
        >
          이 문제 어때요?
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
      onClose={onClose}
    />
  );
};

export default EnterProblem;
