import { useMutation } from 'react-query';
import { api } from '../../../../shared/hooks/api';

const usePostStudy = successCallback => {
  return useMutation(async data => await api.post(`/api/studies`, data), {
    onSuccess: () => {
      // TODO: invalidate my study
      successCallback();
    },
  });
};

export default usePostStudy;
