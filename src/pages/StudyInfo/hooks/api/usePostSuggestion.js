import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../../../shared/hooks/api';
import { useSuggestionActions } from '../../../../store/suggestionStore';

const usePostSuggestion = successCallback => {
  const { setStatus } = useSuggestionActions();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, problem }) =>
      await api.post(`/api/studies/${id}/suggestion/${problem}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getNextProblems');
        setStatus(null);
        successCallback();
      },
    },
  );
};

export default usePostSuggestion;
