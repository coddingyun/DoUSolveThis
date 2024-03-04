import React from 'react';
import Line from '../../../shared/components/Line';
import SimpleButton from '../../../shared/components/SimpleButton';

const OfferCard = ({ data, onClick }) => {
  return (
    <div className="shadow-sm border border-solid border-gray-200 rounded-lg">
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-gray-900 text-lg font-semibold">
          {data.studyTitle}
        </h2>
        <SimpleButton title="수락하기" onClick={onClick} />
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
