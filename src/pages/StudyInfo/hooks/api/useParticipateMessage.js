import { useQuery } from 'react-query';
import { api } from '../../../../shared/hooks/api';

const useParticipateMessage = (studyId, message) => {
  const { isLoading, refetch } = useQuery(
    'participateMessage',
    async () => {
      const response = await api.post(`/api/participation`, {
        studyId,
        message,
      });
      return response.data;
    },
    {
      enabled: false,
    },
  );

  return { isLoading, refetch };
};

export default useParticipateMessage;
