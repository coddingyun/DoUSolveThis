import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../../../shared/hooks/api';
import { useSuggestionActions } from '../../../../store/suggestionStore';

const useAddUserCode = successCallback => {
  return useMutation(
    async ({ id, problem, codeId, code, name }) => {
      const response = await api.post(
        `/api/studies/${id}/problems/${problem}`,
        {
          id: codeId,
          name: name,
          code,
        },
      );
      return response.data;
    },
    {
      onSuccess: data => {
        successCallback(data);
      },
    },
  );
};

export default useAddUserCode;
