import { useMutation } from 'react-query';
import { api } from '.';

const usePutStudyInfo = (id, successCallback, errorCallback) => {
  return useMutation(
    async data => await api.put(`/api/studies/${id}`, data),
    {
      onSuccess: () => {
        // TODO: invalidate my study
        successCallback();
      },
      onError: () => {
        errorCallback();
      },
    },
  );
};

export default usePutStudyInfo;
