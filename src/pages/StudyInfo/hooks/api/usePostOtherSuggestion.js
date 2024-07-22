import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../../../shared/hooks/api';
import { useSuggestionActions } from '../../../../store/suggestionStore';

const usePostOtherSuggestion = successCallback => {
  const queryClient = useQueryClient();
  const { setStatus } = useSuggestionActions();
  return useMutation(
    async ({ id, link, _types, title, rank }) =>
      await api.post(`/api/studies/${id}/other/suggestion`, {
        link: link,
        types: _types,
        title: title,
        rank: rank,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getNextProblems');
        setStatus(null);
        successCallback();
      },
    },
  );
};

export default usePostOtherSuggestion;
