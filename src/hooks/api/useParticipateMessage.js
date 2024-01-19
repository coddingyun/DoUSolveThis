import axios from 'axios';
import { useQuery } from 'react-query';
import { getCookie } from '../../utils/cookie';

const useParticipateMessage = (studyId, message) => {
  const { isLoading, refetch } = useQuery(
    'participateMessage',
    async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/participation`,
        {
          studyId,
          message,
        },
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
      enabled: false,
    },
  );

  return { isLoading, refetch };
};

export default useParticipateMessage;
