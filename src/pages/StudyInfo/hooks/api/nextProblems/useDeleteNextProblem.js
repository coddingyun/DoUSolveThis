import { useQuery } from 'react-query';
import { useNextProbsActions } from '../../../../../store/nextProbStore';
import { api } from '../../../../../shared/hooks/api';

const useDeleteNextProblem = (id, problem) => {
  const { deleteNextProbs } = useNextProbsActions();
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
        deleteNextProbs(problem);
      },
    },
  );

  return { data, deleteFetch: refetch };
};

export default useDeleteNextProblem;
