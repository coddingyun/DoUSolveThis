import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../../../shared/hooks/api';
import { useSuggestionActions } from '../../../../store/suggestionStore';

const useGetProblemCodes = successCallback => {
  return useMutation(
    async ({ id, problem }) => {
      const response = await api.get(`/api/studies/${id}/problems/${problem}`);
      return response.data;
    },
    {
      onSuccess: data => {
        successCallback(data);
      },
    },
  );
};

export default useGetProblemCodes;
