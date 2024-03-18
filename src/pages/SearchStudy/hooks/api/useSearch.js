import { useInfiniteQuery } from 'react-query';
import { api } from '../../../../shared/hooks/api';
import { ORDER_OPTIONS } from '../../../../shared/constants/options';

const useSearch = (orderNum, completedTerm, lang, levelNum, area, isOnline, isRecruiting) => {
  const { data, isFetching, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ['search', orderNum, completedTerm, lang, levelNum, area, isOnline, isRecruiting],
      async ({ pageParam = 1 }) => {
        const response = await api.get(`/api/studies`, {
          params: {
            order_by: ORDER_OPTIONS.indexOf(orderNum) + 1,
            term: completedTerm,
            page: pageParam,
            language: lang || 'ALL',
            level: levelNum || 'ALL',
            area: area.area === '전국' ? 'ALL' : area.area,
            city: area.city === '전체' ? 'ALL' : area.city,
            onlineOnly: isOnline,
            recruitingOnly: isRecruiting,
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
