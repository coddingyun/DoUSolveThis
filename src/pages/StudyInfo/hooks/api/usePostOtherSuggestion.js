import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../../../shared/hooks/api';
import { useSuggestionActions } from '../../../../store/suggestionStore';

const usePostOtherSuggestion = successCallback => {
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
        successCallback();
      },
    },
  );
};

export default usePostOtherSuggestion;
