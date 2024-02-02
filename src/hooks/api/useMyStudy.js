import { useQuery } from 'react-query';
import { api } from '.';

const useMyStudy = () => {
  const { data, isLoading } = useQuery('myStudy', async () => {
    const response = await api.get(
      `${process.env.REACT_APP_BASE_URL}/api/mystudies`,
    );
    return response.data;
  });

  return { myStudy: data, isLoading };
};

export default useMyStudy;
