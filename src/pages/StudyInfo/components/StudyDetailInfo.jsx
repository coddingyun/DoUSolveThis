import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import Card from '../../../shared/components/Card';
import { ReactComponent as ArrowUp } from '../../../assets/arrow-up.svg';
import { ReactComponent as ArrowDown } from '../../../assets/arrow-down.svg';
import { getTierText } from '../../../shared/utils/tierInfo';

const StudyDetailInfo = ({ studyInfoData }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };
  return (
    <div className="py-8">
      <div className="flex items-center">
        <h3 className="text-gray-900 text-[24px] font-semibold">
          🤔 스터디 정보
        </h3>
        <Button className="!p-0 !bg-transparent" onClick={handleClick}>
          {open ? <ArrowUp /> : <ArrowDown />}
        </Button>
      </div>
      {open && (
        <div className="grid grid-cols-4 gap-8 pt-8">
          <Card title="목표 레벨" content={studyInfoData.level} />
          <Card title="주 사용 언어" content={studyInfoData.language} />
          <Card title="스터디원 평균 티어" content={getTierText(studyInfoData.avg_rank)} />
          <Card
            title="스터디원 평균 푼 문제 수"
            content={studyInfoData.avg_solved}
          />
        </div>
      )}
    </div>
  );
};

export default StudyDetailInfo;
