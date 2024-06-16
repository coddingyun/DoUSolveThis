import { useQuery, useQueryClient } from 'react-query';
import { api } from '../../../../../shared/hooks/api';

const useDeleteNextProblem = (id, problem) => {
  const queryClient = useQueryClient();

  const { data, refetch } = useQuery(
    'deleteNextProblem',
    async () => {
      const response = await api.delete(
        `/api/studies/${id}/suggestion/${problem}`,
      );
      return response;
    },
    {
      enabled: false,
      onSuccess: () => {
        queryClient.invalidateQueries('getNextProblems');
      },
    },
  );

  return { data, deleteFetch: refetch };
};

export default useDeleteNextProblem;
