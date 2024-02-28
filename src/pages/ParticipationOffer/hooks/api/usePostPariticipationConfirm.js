import { useMutation, useQueryClient } from 'react-query';
import { api } from '../../../../shared/hooks/api';

const usePostParticipationConfirm = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async data => api.post('/api/participation/confirm', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('participationOffer');
      },
    },
  );
};

export default usePostParticipationConfirm;
