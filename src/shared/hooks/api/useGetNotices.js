import { useQuery } from 'react-query';
import { api } from '.';

const useGetNotices = () => {
  return useQuery('notices', async () => {
    const response = await api.get('/api/user/notices');
    return response.data.notices;
  });
};

export default useGetNotices;
