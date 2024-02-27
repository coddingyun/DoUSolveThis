import { useQuery } from 'react-query';
import { api } from '../../../../shared/hooks/api';

const useMyStudy = () => {
  const { data, isLoading } = useQuery('myStudy', async () => {
    const response = await api.get(`/api/mystudies`);
    return response.data;
  });

  return { myStudy: data, isLoading };
};

export default useMyStudy;
