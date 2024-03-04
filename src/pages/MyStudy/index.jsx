import { useEffect } from 'react';
import { Switch } from '@chakra-ui/react';
import TopNavigation from '../../shared/layout/TopNavigation';
import StudyCard from './components/Card';
import useMyStudy from './hooks/api/useMyStudy';
import { useAppActions } from '../../store/appStore';

const MyStudy = () => {
  const { myStudy, isLoading, switchStatus, setSwitchStatus } = useMyStudy();
  const { setCurMenu } = useAppActions();

  const handleChangeSwitch = () => {
    setSwitchStatus(prev => !prev);
  };

  useEffect(() => {
    setCurMenu('myStudy');
  }, []);

  return (
    <TopNavigation>
      <div className="h-full py-10 px-8">
        <div className="w-full flex flex-row-reverse items-center gap-3">
          <Switch
            colorScheme="purple"
            isChecked={switchStatus}
            onChange={handleChangeSwitch}
          />
          <h4 className="text-gray-700 text-[16px] font-semibold">
            내가 관리하는 스터디
          </h4>
        </div>
        <div className="scroll-auto grid grid-cols-3 mt-8 gap-6">
          {!isLoading &&
            myStudy.map(item => (
              <StudyCard
                key={item.id}
                id={item.id}
                title={item.title}
                management={'isManagement' in item ? item.isManagment : true}
              />
            ))}
        </div>
      </div>
    </TopNavigation>
  );
};

export default MyStudy;
