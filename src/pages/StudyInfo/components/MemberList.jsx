import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { ReactComponent as ArrowUp } from '../../../assets/arrow-up.svg';
import { ReactComponent as ArrowDown } from '../../../assets/arrow-down.svg';
import UserTag from './UserTag';

const MemberList = ({ studyInfoData }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };
  return (
    <div className="py-8">
      <div className="flex items-center">
        <h3 className="text-gray-900 text-[24px] font-semibold">
          🙆🏻‍♀️ 참여 중인 스터디원
        </h3>
        <Button className="!p-0 !bg-transparent" onClick={handleClick}>
          {open ? <ArrowUp /> : <ArrowDown />}
        </Button>
      </div>
      {open && (
        <div className="flex flex-row gap-2 pt-8">
          {studyInfoData.solved.map((data, idx) => (
            <UserTag key={`UserTag#${idx}`} title={data.username} tier={data.rank} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberList;
