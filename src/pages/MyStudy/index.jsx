import { useState } from 'react';
import { Switch } from '@chakra-ui/react';
import TopNavigation from '../../shared/layout/TopNavigation';
import StudyCard from './components/Card';
import useMyStudy from './hooks/api/useMyStudy';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LandingButton from '../Landing/components/LandingButton';

const MyStudy = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { myStudy, isLoading } = useMyStudy();
  const [switchStatus, setSwitchStatus] = useState(
    searchParams.get('managed') === 'true' ? true : false,
  );
  const navigate = useNavigate();

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
      {myStudy &&
        myStudy.managements.length === 0 &&
        myStudy.participations.length === 0 && (
          <div className="w-full h-screen flex flex-col gap-[23px] justify-center items-center pb-16">
            <h2 className="font-bold text-2xl text-center">
              참여 중인 스터디가 없습니다.
              <br />
              스터디에 참여해보세요.
            </h2>
            <LandingButton
              title="스터디 구경하기"
              clickEvent={() => navigate('/search')}
              bgColor="brand"
            />
          </div>
        )}
      {myStudy &&
        (myStudy.managements.length > 0 ||
          myStudy.participations.length > 0) && (
          <div className="h-full py-10 px-8">
            <div className="w-full flex flex-row-reverse items-center gap-3">
              <Switch
                colorScheme="purple"
                isChecked={
                  searchParams.get('managed') === 'true' ? true : false
                }
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
        )}
    </TopNavigation>
  );
};

export default MyStudy;
