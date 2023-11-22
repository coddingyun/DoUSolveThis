import React from 'react';
import CommonLayout from '../layout/CommonLayout';
import { ReactComponent as Search } from '../asset/search.svg';

const SearchStudy = () => {
  return (
    <CommonLayout title="스터디 찾기">
      <div>
        <form>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-grey-500">
              <Search stroke-width="1.5" class="w-5 h-5" />
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
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 focus:border-white rounded-lg bg-gray-50"
              placeholder="스터디 이름을 입력해 주세요."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
            >
              검색
            </button>
          </div>
        </form>
      </div>
    </CommonLayout>
  );
};

export default SearchStudy;
