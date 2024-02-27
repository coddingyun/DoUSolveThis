import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import Card from './Card';
import { ReactComponent as ArrowUp } from '../../../assets/arrow-up.svg';
import { ReactComponent as ArrowDown } from '../../../assets/arrow-down.svg';

const StudyPlan = ({ studyInfoData }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  return (
    <div>
      <div className="flex items-center">
        <h3 className="text-gray-900 text-[24px] font-semibold">
          🗓️ 스터디 일정
        </h3>
        <Button className="!p-0 !bg-transparent" onClick={handleClick}>
          {open ? <ArrowUp /> : <ArrowDown />}
        </Button>
      </div>
      {open && (
        <div className="grid grid-cols-4 gap-8 pt-8">
          <Card title="지역" content={studyInfoData.area} />
          <Card title="온/오프라인 여부" content={studyInfoData.meeting_type} />
          <Card
            title="모임 빈도"
            content={`${studyInfoData.period} ${studyInfoData.frequency}`}
          />
          <Card title="스터디 시간" content={studyInfoData.study_time} />
        </div>
      )}
    </div>
  );
};

export default StudyPlan;
