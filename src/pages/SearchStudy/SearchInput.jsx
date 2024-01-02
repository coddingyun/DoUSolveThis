import React from 'react';
import { ReactComponent as Search } from '../../assets/search.svg';

const SearchInput = ({ value, handleChangeValue }) => {
  return (
    <div className="my-10 w-full grid place-items-center">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-grey-500">
          <Search strokeWidth="2" className="w-5 h-5" />
        </div>
        <input
          type="text"
          id="default-search"
          className="block w-96 h-10 p-4 ps-10 text-sm text-gray-900 border border-gray-300 focus:outline-none rounded-lg"
          placeholder="스터디명, 언어, 지역, 목적으로 검색해보세요"
          value={value}
          onChange={handleChangeValue}
          required
        />
      </div>
    </div>
  );
};

export default SearchInput;
