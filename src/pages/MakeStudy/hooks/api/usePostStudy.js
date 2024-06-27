import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../../../shared/hooks/api';

const usePostStudy = (successCallback, errorCallback) => {
  const queryClient = useQueryClient();

  return useMutation(async data => await api.post(`/api/studies`, data), {
    onSuccess: () => {
      successCallback();
      queryClient.invalidateQueries('search');
      queryClient.invalidateQueries('myStudy');
    },
    onError: () => {
      errorCallback();
    },
  });
};

export default usePostStudy;
