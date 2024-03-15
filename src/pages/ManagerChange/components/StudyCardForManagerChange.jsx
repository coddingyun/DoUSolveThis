import React, { useState } from 'react';
import { UserTag } from '../../../shared/components/Tag';
import { Button } from '@chakra-ui/react';

const StudyCardForManagerChange = ({ title, description }) => {
  const [isChanged, setIsChanged] = useState(false);
  const [manager, setManager] = useState('');
  const [managerTier, setManagerTier] = useState('');

  const renderFooter = () => {
    if (isChanged) {
      <div className="px-6 py-4 flex justify-between">
        <h6>새로운 스터디장</h6>
        <UserTag title={manager} tier={managerTier} />
      </div>;
    } else {
      <Button
        className="!h-[36px] px-[14px] !text-brand-700 !bg-brand-50"
        onClick={() => {
          //TODO 다음 스터디장 지정 모달 열기
        }}
      >
        스터디장 지정
      </Button>;
    }
  };
  return (
    <div className="block bg-white border border-gray-200 rounded-lg shadow">
      <h5 className="p-6 text-3xl font-semibold tracking-tight text-gray-900">
        {title}
      </h5>
      <h6>{description}</h6>
      <hr />
      {renderFooter()}
    </div>
  );
};

export default StudyCardForManagerChange;
