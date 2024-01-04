import { useQuery } from 'react-query';
import axios from 'axios';
import { getCookie } from '../../utils/cookie';

const useSearch = (order, completedTerm) => {
  const { data, isFetching, refetch } = useQuery(
    'search',
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/studies`,
        {
          params: {
            order_by: order,
            term: completedTerm,
          },
          headers: {
            Access: getCookie('Access'),
          },
        },
      );
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  return { searchData: data, isFetching, refetch };
};

export default useSearch;
