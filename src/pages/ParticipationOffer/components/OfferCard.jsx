import React from 'react';
import Line from '../../../shared/components/Line';
import SimpleButton from '../../../shared/components/SimpleButton';
import { Button } from '@chakra-ui/react';

const OfferCard = ({ data, onApproveClick, onRejectClick }) => {
  return (
    <div className="shadow-sm border border-solid border-gray-200 rounded-lg">
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-gray-900 text-lg font-semibold">
          {data.studyTitle}
        </h2>
        <div className='flex gap-2'>
          <Button
            className="!text-sm !rounded-lg border border-solid !border-gray-300 !bg-white text-gray-700 font-semibold mr-1"
            variant="outlined"
            onClick={onRejectClick}
          >
            거절하기
          </Button>
          <SimpleButton title="수락하기" onClick={onApproveClick} />
        </div>
      </div>
      <Line />
      <div className="px-6 py-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h3 className="text-gray-900 text-2xl font-semibold">
            {data.username}
          </h3>
          <h4 className="text-gray-500 text-base">{data.userId}</h4>
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-gray-700 text-sm font-medium">참여 메시지</h3>
          <div className="h-[128px] overflow-y-auto px-3.5 py-2.5 border border-solid border-gray-300 shadow-sm rounded-lg">
            <h4 className="text-gray-500">{data.message}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
