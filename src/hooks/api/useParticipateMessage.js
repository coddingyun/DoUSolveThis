import { useQuery } from 'react-query';
import { api } from '.';

const useParticipateMessage = (studyId, message) => {
  const { isLoading, refetch } = useQuery(
    'participateMessage',
    async () => {
      const response = await api.post(
        `${process.env.REACT_APP_BASE_URL}/api/participation`,
        {
          studyId,
          message,
        },
      );
      return response.data;
    },
    {
      enabled: false,
    },
  );

  return { isLoading, refetch };
};

export default useParticipateMessage;
