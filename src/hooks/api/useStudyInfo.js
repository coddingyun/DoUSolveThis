import axios from 'axios';
import { useQuery } from 'react-query';
import { getCookie } from '../../utils/cookie';

const useStudyInfo = id => {
  const { data, isLoading } = useQuery(
    'studyInfo',
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/studies/${id}`,
        {
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

  return { studyInfoData: data, isLoading };
};

export default useStudyInfo;
