import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import CommonLayout from '../../layout/CommonLayout';
import { ReactComponent as Search } from '../../asset/search.svg';

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

const RankTag = ({ children }) => {
  return (
    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
      {children}
    </span>
  );
};

const LangTag = ({ children }) => {
  return (
    <span className="bg-gray-700 text-gray-300 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full border border-gray-500">
      {children}
    </span>
  );
};

const MakeStudyCards = ({ id, title, description, tier, lang }) => {
  const url = `/room/${id}`;
  return (
    <a
      key={id}
      href={url}
      className="block p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
    >
      <div className="mb-1 flex items-start justify-between">
        <h5 className="text-lg font-bold tracking-tight text-gray-900">
          {title}
        </h5>
        <RankTag>{tier}</RankTag>
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      <LangTag>{lang}</LangTag>
    </a>
  );
};

const LoadingCard = idx => {
  return (
    <div
      key={idx}
      className="block h-32 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow"
    />
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

            {/* <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label> */}
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
              <MakeStudyCards
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
