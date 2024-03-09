import { useQuery } from 'react-query';
import { api } from '.';

const useGetUserInfo = () => {
  return useQuery(
    'userInfo',
    async () => {
      const response = await api.get('/api/user/information');
      return response.data;
    },
    {
      enabled: false,
    },
  );
};

export default useGetUserInfo;
