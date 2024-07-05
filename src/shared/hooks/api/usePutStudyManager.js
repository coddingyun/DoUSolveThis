import { useMutation } from 'react-query';
import { api } from '.';

const usePutStudyManager = (id, onSuccessCallback) => {
  return useMutation(
    async userId =>
      await api.patch(`/api/studies/${id}/manager`, {
        userId,
      }),
    {
      onSuccess: onSuccessCallback,
    },
  );
};

export default usePutStudyManager;
