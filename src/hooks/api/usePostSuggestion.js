import { useMutation } from 'react-query';
import { api } from '.';
import { useNextProbsActions } from '../../store/nextProbStore';
import { useSuggestionActions } from '../../store/suggestionStore';

const usePostSuggestion = successCallback => {
  const { addNextProbs } = useNextProbsActions();
  const { setStatus } = useSuggestionActions();

  return useMutation(
    async ({ id, problem }) =>
      await api.post(`/api/studies/${id}/suggestion/${problem}`),
    {
      onSuccess: data => {
        addNextProbs(data.data);
        setStatus(null);
        successCallback();
      },
    },
  );
};

export default usePostSuggestion;
