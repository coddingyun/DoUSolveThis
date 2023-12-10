import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import CommonLayout from '../../layout/CommonLayout';
import { ReactComponent as Search } from '../../asset/search.svg';
import { StudyCard, LoadingCard } from './Card';
import { getCookie } from '../../utils/cookie';

const SelectOrderWay = ({ order, handleChangeOrder }) => {
  return (
    <select
      id="order"
      className="bg-blue-100 border border-blue-200 text-gray-900 text-xs text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-30 p-1.5"
      value={order}
      onChange={handleChangeOrder}
    >
      <option value="1">최신 순</option>
      <option value="2">평균 티어 순</option>
      <option value="3">평균 푼 문제 순</option>
    </select>
  );
};

const SearchStudy = () => {
  const [order, setOrder] = useState(1);
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
  }, [order, completedTerm]);

  const handleSearch = e => {
    e.preventDefault();
    setCompletedTerm(term);
  };

  const handleChangeOrder = e => {
    setOrder(e.target.value);
  };

  const handleChangeTerm = e => {
    setTerm(e.target.value);
  };
  return (
    <CommonLayout title="스터디 찾기">
      <div>
        <form onSubmit={handleSearch}>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-grey-500">
              <Search strokeWidth="2" className="w-5 h-5" />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full h-12 p-4 ps-10 text-sm text-gray-900 border border-gray-300 focus:border-white rounded-lg bg-gray-50"
              placeholder="스터디 이름을 입력해 주세요."
              value={term}
              onChange={handleChangeTerm}
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
            >
              검색
            </button>
          </div>
        </form>
        <div className="grid place-items-end mt-2">
          <SelectOrderWay order={order} handleChangeOrder={handleChangeOrder} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
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
    </CommonLayout>
  );
};

export default SearchStudy;
