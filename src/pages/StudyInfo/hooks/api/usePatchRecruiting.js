import { useMutation } from 'react-query';
import { api } from '../../../../shared/hooks/api';

const usePatchRecruiting = (successCallback) => {
  return useMutation(
    async ({ id, isRecruiting }) =>
      await api.patch(`/api/studies/${id}/recruiting`, {
        isRecruiting
      }),
    {
      onSuccess: () => {
        successCallback();
      },
    },
  );
};

export default usePatchRecruiting;
