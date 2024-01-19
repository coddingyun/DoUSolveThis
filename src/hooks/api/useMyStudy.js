import axios from 'axios';
import { useQuery } from 'react-query';
import { getCookie } from '../../utils/cookie';

const useMyStudy = () => {
  const { data, isLoading } = useQuery(
    'myStudy',
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/mystudies`,
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

  return { myStudy: data, isLoading };
};

export default useMyStudy;
