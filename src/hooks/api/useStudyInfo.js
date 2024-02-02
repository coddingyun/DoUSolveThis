import { useQuery } from 'react-query';
import { api } from '.';

const useStudyInfo = id => {
  const { data, isLoading } = useQuery('studyInfo', async () => {
    const response = await api.get(
      `${process.env.REACT_APP_BASE_URL}/api/studies/${id}`,
    );
    return response.data;
  });

  return { studyInfoData: data, isLoading };
};

export default useStudyInfo;
