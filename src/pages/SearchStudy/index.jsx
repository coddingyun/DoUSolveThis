import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { StudyCard, LoadingCard } from './Card';
import { getCookie } from '../../utils/cookie';
import TopNavigation from '../../layout/TopNavigation';
import Select from './Select';
import SearchInput from './SearchInput';

const ORDER_OPTIONS = ['최신순', '인기순', '평균 티어 순', '평균 푼 문제 수'];
const LANG_OPTIONS = [
  '언어별',
  'C++',
  'C',
  'Python',
  'Java',
  'node.js',
  'Kotlin',
  'Swift',
  'Ruby',
];
const PURPOSE_OPTIONS = ['목적별', '입문', '취준', '대회'];

const SearchStudy = () => {
  const [order, setOrder] = useState(1);
  const [lang, setLang] = useState(1);
  const [purpose, setPurpose] = useState(1);
  const [term, setTerm] = useState('');
  const [completedTerm, setCompletedTerm] = useState('');

  const { data, isFetching, refetch } = useQuery(
    'search',
    () =>
      fetch(
        `${process.env.REACT_APP_BASE_URL}/api/studies?order_by=${order}&term=${completedTerm}`,
        {
          headers: {
            Access: getCookie('Access'),
          },
        },
      ).then(res => res.json()),
    {
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    refetch();
  }, [order, lang, purpose, completedTerm]);

  const handleSearch = e => {
    e.preventDefault();
    setCompletedTerm(term);
  };

  const handleChangeOrder = e => {
    setOrder(e.target.value);
  };

  const handleChangeLang = e => {
    setLang(e.target.value);
  };

  const handleChangePurpose = e => {
    setPurpose(e.target.value);
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
            <Select
              value={lang}
              handleChangeValue={handleChangeLang}
              options={LANG_OPTIONS}
            />
            <Select
              value={purpose}
              handleChangeValue={handleChangePurpose}
              options={PURPOSE_OPTIONS}
            />
          </div>
          <Select
            value={order}
            handleChangeValue={handleChangeOrder}
            options={ORDER_OPTIONS}
          />
        </div>
        <div className="scroll-auto mt-6 grid grid-cols-3 gap-6">
          {isFetching &&
            Array.from({ length: 4 }, (_, idx) => <LoadingCard id={idx} />)}
          {!isFetching &&
            data &&
            data.map(item => (
              <StudyCard
                id={item.id}
                title={item.title}
                description={item.description}
                tier={item.avg_rank}
                lang={item.language}
              />
            ))}
        </div>
      </div>
    </TopNavigation>
  );
};

export default SearchStudy;
