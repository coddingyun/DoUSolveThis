import { useMutation } from 'react-query';
import { api } from '.';
import { useNextProbsActions } from '../../store/nextProbStore';

const usePostSuggestion = () => {
  const { addNextProbs } = useNextProbsActions();

  return useMutation(
    async ({ id, problem }) =>
      await api.post(`/api/studies/${id}/suggestion/${problem}`),
    {
      onSuccess: data => {
        addNextProbs(data.data);
      },
    },
  );
};

export default usePostSuggestion;
