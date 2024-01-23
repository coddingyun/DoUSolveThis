import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { getCookie } from '../../utils/cookie';

const ORDER_OPTIONS = [1, 2, 3, 4];
const LANG_OPTIONS = [
  'ALL',
  'Cpp',
  'C',
  'Python',
  'Java',
  'NodeJs',
  'Kotlin',
  'Swift',
  'Ruby',
];
const PURPOSE_OPTIONS = ['ALL', 'CONCEPT', 'EMPLOYMENT', 'CONTEST'];

const useSearch = (orderNum, completedTerm, lang, levelNum, area) => {
  const { data, isFetching, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      'search',
      async ({ pageParam = 1 }) => {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/studies`,
          {
            params: {
              order_by: ORDER_OPTIONS[orderNum],
              term: completedTerm,
              page: pageParam,
              language: LANG_OPTIONS[lang],
              level: PURPOSE_OPTIONS[levelNum],
              area: area.area === '지역' ? 'ALL' : area.area,
              city: area.city === '전체' ? 'ALL' : area.city,
            },
            headers: {
              Access: getCookie('Access'),
            },
          },
        );
        return response;
      },
      {
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage, allPosts) => {
          return lastPage.page !== allPosts[0].totalPage
            ? lastPage.page + 1
            : undefined;
        },
      },
    );

  return {
    searchData: data,
    isFetching,
    refetch,
    fetchNextPage,
    hasNextPage,
  };
};

export default useSearch;
