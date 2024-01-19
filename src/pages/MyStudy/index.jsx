import React from 'react';
import { Switch } from '@chakra-ui/react';
import TopNavigation from '../../layout/TopNavigation';
import StudyCard from './Card';
import useMyStudy from '../../hooks/api/useMyStudy';

const MyStudy = () => {
  const { myStudy, isLoading } = useMyStudy();
  return (
    <TopNavigation>
      <div className="h-full py-10 px-8">
        <div className="w-full flex flex-row-reverse items-center gap-3">
          <Switch colorScheme="purple" />
          <h4 className="text-gray-700 text-[16px] font-semibold">
            내가 만든 스터디
          </h4>
        </div>
        <div className="scroll-auto grid grid-cols-3 mt-8 gap-6">
          {!isLoading &&
            myStudy.map(item => <StudyCard id={item.id} title={item.title} />)}
        </div>
      </div>
    </TopNavigation>
  );
};

export default MyStudy;