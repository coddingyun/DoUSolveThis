import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../../../shared/hooks/api';
import { useSuggestionActions } from '../../../../store/suggestionStore';

const usePutUserCode = successCallback => {
  return useMutation(
    async ({ id, problem, codeId, code }) => {
      const response = await api.put(`/api/studies/${id}/problems/${problem}`, {
        id: codeId,
        code,
      });
      return response.data;
    },
    {
      onSuccess: data => {
        successCallback(data);
      },
    },
  );
};

export default usePutUserCode;
