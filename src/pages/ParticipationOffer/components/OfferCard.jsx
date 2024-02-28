import React from 'react'
import Line from '../../../shared/components/Line';
import SimpleButton from '../../../shared/components/SimpleButton';

const OfferCard = ({data}) => {
  return (
    <div>
      <div className="px-6 py-4 flex justify-between items-center">
        <h2>{data.studyTitle}</h2>
        <SimpleButton />
      </div>
      <Line/>
      <div className="px-6 py-6 flex flex-col gap-4">
        <div className='flex items-center gap-3'>
          <h3>{data.userName}</h3>
          <h4>{data.userId}</h4>
        </div>
        <div className='flex flex-col gap-1.5'>
          <h3>참여 메시지</h3>
          <div className='px-3.5 py-2.5 border border-solid border-gray-300 shadow-sm rounded-lg'>
            <h4>{data.message}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfferCard;
