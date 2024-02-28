import { useInfiniteQuery } from 'react-query';
import { api } from '../../../../shared/hooks/api';

const useSearch = (orderNum, completedTerm, lang, levelNum, area) => {
  const { data, isFetching, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      'search',
      async ({ pageParam = 1 }) => {
        console.log(lang);
        const response = await api.get(`/api/studies`, {
          params: {
            order_by: orderNum+1,
            term: completedTerm,
            page: pageParam,
            language: lang || 'ALL',
            level: levelNum || 'ALL',
            area: area.area === '지역' ? 'ALL' : area.area,
            city: area.city === '전체' ? 'ALL' : area.city,
          },
        });
        return response;
      },
      {
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
