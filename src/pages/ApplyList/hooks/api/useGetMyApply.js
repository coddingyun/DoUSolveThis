import { useQuery } from 'react-query';
import { api } from '../../../../shared/hooks/api';

const useGetMyApply = () => {
  return useQuery('myApply', async () => {
    const response = await api.get('/api/user/mypage/apply');
    return response.data;
  });
};

export default useGetMyApply;
