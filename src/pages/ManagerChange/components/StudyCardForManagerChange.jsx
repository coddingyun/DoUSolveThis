import React, { useState } from 'react';
import { UserTag } from '../../../shared/components/Tag';
import { Button } from '@chakra-ui/react';

const StudyCardForManagerChange = ({ title, description }) => {
  const [isChanged, setIsChanged] = useState(false);
  const [manager, setManager] = useState('');
  const [managerTier, setManagerTier] = useState('');

  const renderFooter = () => {
    if (isChanged) {
      return (
        <div className="px-6 py-4 flex justify-between">
          <h6>새로운 스터디장</h6>
          <UserTag title={manager} tier={managerTier} />
        </div>
      );
    } else {
      return (
        <div className='flex justify-end'>
          <Button
            className="!h-[36px] px-[14px] !text-brand-700 !bg-brand-50"
            onClick={() => {
              //TODO 다음 스터디장 지정 모달 열기
            }}
          >
            스터디장 지정
          </Button>
        </div>
      );
    }
  };
  return (
    <div className="block bg-white border border-gray-200 rounded-lg shadow">
      <div className="p-6">
        <h5 className="text-3xl font-semibold tracking-tight text-gray-900 mb-2">
          {title}
        </h5>
        <h6 className="text-sm text-gray-500">{description}</h6>
      </div>
      <hr />
      <div className='px-6 py-4'>
        {renderFooter()}
      </div>
    </div>
  );
};

export default StudyCardForManagerChange;
