import { useQuery, useQueryClient } from 'react-query';
import { api } from '../../../../../shared/hooks/api';

const useDeleteAllNextProblems = id => {
  const queryClient = useQueryClient();

  const { data, refetch } = useQuery(
    'deleteAllNextProblems',
    async () => {
      const response = await api.delete(`/api/studies/${id}/suggestions`);
      return response;
    },
    {
      enabled: false,
      onSuccess: () => {
        queryClient.invalidateQueries('getNextProblems');
      },
    },
  );

  return { data, deleteAllFetch: refetch };
};

export default useDeleteAllNextProblems;
