import { useMutation, useQueryClient } from 'react-query';
import { api } from '.';

const useDeleteNotices = id => {
  const queryClient = useQueryClient();

  return useMutation(async () => api.delete(`/api/user/notices/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('notices');
      queryClient.invalidateQueries('userInfo', { refetchInactive: true });
    },
  });
};

export default useDeleteNotices;
