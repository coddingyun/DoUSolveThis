/* eslint-disable react/jsx-key */
import { useState } from 'react';
import { StudyCard, LoadingCard } from './components/Card';
import TopNavigation from '../../shared/layout/TopNavigation';
import SelectComp from '../../shared/components/Select';
import SearchInput from './components/SearchInput';
import useSearch from './hooks/api/useSearch';
import RegionButton from '../../shared/components/RegionButton';
import { useFilterStudyArea, useFilterActions } from '../../store/filterStore';
import {
  LANG_OPTIONS,
  PURPOSE_OPTIONS,
  ORDER_OPTIONS,
} from '../../shared/constants/options';
import CheckBoxButton from './components/CheckBoxButton';
import { Button } from '@chakra-ui/react';
import { ReactComponent as Rotate } from '../../assets/rotate-cw.svg';

const SearchStudy = () => {
  const [order, setOrder] = useState('최신순');
  const [lang, setLang] = useState('');
  const [level, setLevel] = useState('');
  const [term, setTerm] = useState('');
  const [completedTerm, setCompletedTerm] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const [isRecruiting, setIsRecruiting] = useState(true);
  const studyArea = useFilterStudyArea();
  const { setStudyArea } = useFilterActions();

  const { searchData: data, isFetching } = useSearch(
    order,
    completedTerm,
    lang,
    level,
    studyArea,
    isOnline,
    isRecruiting,
  );

  const handleSearch = () => {
    setCompletedTerm(term);
  };

  const handleChangeOrder = e => {
    setOrder(e.target.value);
  };

  const handleChangeLang = e => {
    setLang(e.target.value);
  };

  const handleChangePurpose = e => {
    setLevel(e.target.value);
  };

  const handleChangeTerm = e => {
    setTerm(e.target.value);
  };

  const handleChangeIsOneline = () => {
    setIsOnline(prev => !prev);
  };

  const handleChangeIsRecruting = () => {
    setIsRecruiting(prev => !prev);
  };

  const handleClickInitButton = () => {
    setOrder('최신순');
    setLang('');
    setLevel('');
    setTerm('');
    setCompletedTerm('');
    setIsOnline(false);
    setIsRecruiting(true);
    setStudyArea({
      area: '전국',
      city: '전체',
    });
  };

  return (
    <TopNavigation>
      <div>
        <form onSubmit={handleSearch}>
          <SearchInput value={term} handleChangeValue={handleChangeTerm} />
        </form>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <SelectComp
              value={lang}
              handleChangeValue={handleChangeLang}
              options={LANG_OPTIONS}
              className="w-24"
              placeholder="언어별"
            />
            <SelectComp
              value={level}
              handleChangeValue={handleChangePurpose}
              options={PURPOSE_OPTIONS}
              className="w-24"
              placeholder="목적별"
            />
            <RegionButton studyArea={studyArea} setStudyArea={setStudyArea} />
            <CheckBoxButton
              title="온라인만 보기"
              isSelected={isOnline}
              onClick={handleChangeIsOneline}
            />
            <CheckBoxButton
              title="모집 중만 보기"
              isSelected={isRecruiting}
              onClick={handleChangeIsRecruting}
            />
            <Button
              className="flex gap-2 !bg-transparent border !border-transparent !text-gray-500 !text-xs"
              onClick={handleClickInitButton}
            >
              <Rotate />
              초기화
            </Button>
          </div>
          <SelectComp
            value={order}
            handleChangeValue={handleChangeOrder}
            options={ORDER_OPTIONS}
            className="w-32"
          />
        </div>
        <div className="scroll-auto mt-8 grid grid-cols-3 gap-6">
          {isFetching &&
            Array.from({ length: 4 }, (_, idx) => <LoadingCard id={idx} />)}
          {!isFetching &&
            data?.pages?.[0]?.data?.map(item => (
              <StudyCard
                item={item}
              />
            ))}
        </div>
      </div>
    </TopNavigation>
  );
};

export default SearchStudy;
