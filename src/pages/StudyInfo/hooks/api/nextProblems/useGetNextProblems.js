import { useQuery } from 'react-query';
import { useNextProbsActions } from '../../../../../store/nextProbStore';
import { api } from '../../../../../shared/hooks/api';

const useGetNextProblems = id => {
  const { setNextProbs } = useNextProbsActions();

  const { data, isLoading } = useQuery(
    'getNextProblems',
    async () => {
      const response = await api.get(`/api/studies/${id}/suggestion`);
      return response.data;
    },
    {
      onSuccess: data => {
        setNextProbs(data);
      },
    },
  );

  return { nextProblems: data, isLoading };
};

export default useGetNextProblems;
