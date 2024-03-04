import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../../../shared/hooks/api';

const useDeleteMyApply = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (studyId) => api.delete(`/api/participation?studyId=${studyId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('myApply');
      },
    },
  );
};

export default useDeleteMyApply;
