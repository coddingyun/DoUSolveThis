import React, { useState, useEffect } from 'react';
import { StudyCard, LoadingCard } from './Card';
import TopNavigation from '../../layout/TopNavigation';
import SelectComp from './Select';
import SearchInput from './SearchInput';
import useSearch from '../../hooks/api/useSearch';
import RegionButton from './RegionButton';
import { useFilterStudyArea } from '../../store/filterStore';

const ORDER_OPTIONS = ['최신순', '인기순', '평균 티어 순', '평균 푼 문제 수'];
const LANG_OPTIONS = [
  '언어별',
  'Cpp',
  'C',
  'Python',
  'Java',
  'NodeJs',
  'Kotlin',
  'Swift',
  'Ruby',
];
const PURPOSE_OPTIONS = ['목적별', '입문', '취준', '대회'];

const SearchStudy = () => {
  const [order, setOrder] = useState(0);
  const [lang, setLang] = useState(0);
  const [level, setLevel] = useState(0);
  const [term, setTerm] = useState('');
  const [completedTerm, setCompletedTerm] = useState('');
  // eslint-disable-next-line no-unused-vars
  const studyArea = useFilterStudyArea();

  const {
    searchData: data,
    isFetching,
    refetch,
  } = useSearch(order, completedTerm, lang, level, studyArea);

  useEffect(() => {
    refetch();
  }, [order, lang, level, completedTerm, studyArea]);

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
            />
            <SelectComp
              value={level}
              handleChangeValue={handleChangePurpose}
              options={PURPOSE_OPTIONS}
              className="w-24"
            />
            <RegionButton />
          </div>
          <SelectComp
            value={order}
            handleChangeValue={handleChangeOrder}
            options={ORDER_OPTIONS}
            className="w-32"
          />
        </div>
        <div className="scroll-auto mt-6 grid grid-cols-3 gap-6">
          {isFetching &&
            Array.from({ length: 4 }, (_, idx) => <LoadingCard id={idx} />)}
          {!isFetching &&
            data?.pages?.[0]?.data?.map(item => (
              <StudyCard
                id={item.id}
                title={item.title}
                description={item.description}
                tier={item.avg_rank}
                lang={item.language}
                area={item.area}
                level={item.level}
                meetingType={item.meeting_type}
              />
            ))}
        </div>
      </div>
    </TopNavigation>
  );
};

export default SearchStudy;
