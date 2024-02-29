import { useQuery } from 'react-query';
import { api } from '../../../../shared/hooks/api';

const useGetMyPage = () => {
  return useQuery('myPage', async () => {
    const response = await api.get('/api/user/mypage');
    return response.data;
  });
};

export default useGetMyPage;
