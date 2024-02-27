import { useQuery } from 'react-query';
import { api } from '../../../../shared/hooks/api';

const useStudyInfo = id => {
  const { data, isLoading } = useQuery('studyInfo', async () => {
    const response = await api.get(`/api/studies/${id}`);
    return response.data;
  });

  return { studyInfoData: data, isLoading };
};

export default useStudyInfo;
