import { useQuery } from 'react-query';
import { useNextProbsActions } from '../../../store/nextProbStore';
import { api } from '..';

const useDeleteAllNextProblems = id => {
  const { deleteAllNextProbs } = useNextProbsActions();
  const { data, refetch } = useQuery(
    'deleteAllNextProblems',
    async () => {
      const response = await api.delete(`/api/studies/${id}/suggestions`);
      return response;
    },
    {
      enabled: false,
      onSuccess: () => {
        deleteAllNextProbs();
      },
    },
  );

  return { data, deleteAllFetch: refetch };
};

export default useDeleteAllNextProblems;
