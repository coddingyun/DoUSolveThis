import { useState } from 'react';
import { Switch } from '@chakra-ui/react';
import TopNavigation from '../../shared/layout/TopNavigation';
import StudyCard from './components/Card';
import useMyStudy from './hooks/api/useMyStudy';
import { useSearchParams } from 'react-router-dom';

const MyStudy = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { myStudy, isLoading } = useMyStudy();
  const [switchStatus, setSwitchStatus] = useState(
    searchParams.get('managed') === 'true' ? true : false,
  );

  const handleChangeSwitch = () => {
    setSwitchStatus(prev => !prev);
    const prev = searchParams.get('managed');
    if (prev === 'true') {
      searchParams.set('managed', 'false');
    } else {
      searchParams.set('managed', 'true');
    }

    setSearchParams(searchParams);
  };

  return (
    <TopNavigation>
      <div className="h-full py-10 px-8">
        <div className="w-full flex flex-row-reverse items-center gap-3">
          <Switch
            colorScheme="purple"
            isChecked={searchParams.get('managed') === 'true' ? true : false}
            onChange={handleChangeSwitch}
          />
          <h4 className="text-gray-700 text-[16px] font-semibold">
            내가 관리하는 스터디
          </h4>
        </div>
        <div className="scroll-auto grid grid-cols-3 mt-8 gap-6">
          {!isLoading &&
            myStudy.managements.map(item => (
              <StudyCard
                key={item.id}
                id={item.id}
                title={item.title}
                management
              />
            ))}
          {!isLoading &&
            switchStatus === false &&
            myStudy.participations.map(item => (
              <StudyCard key={item.id} id={item.id} title={item.title} />
            ))}
        </div>
      </div>
    </TopNavigation>
  );
};

export default MyStudy;
