import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { getCookie } from '../../utils/cookie';

const useSearch = (orderNum, completedTerm, lang, levelNum, areaStr) => {
  const { data, isFetching, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      'search',
      async ({ pageParam = 1 }) => {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/studies`,
          {
            params: {
              order_by: orderNum,
              term: completedTerm,
              page: pageParam,
              language: lang,
              level: levelNum,
              area: areaStr,
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
