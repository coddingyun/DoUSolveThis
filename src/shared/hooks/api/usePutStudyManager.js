import { useMutation } from 'react-query';
import { api } from '.';

const usePutStudyManager = (id, onSuccessCallback) => {
  return useMutation(
    async userId =>
      api.put(`/api/studies/${id}/manager`, {
        userId,
      }),
    {
      onSuccess: onSuccessCallback,
    },
  );
};

export default usePutStudyManager;
