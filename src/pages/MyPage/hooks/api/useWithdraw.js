import { useQuery } from 'react-query';
import { api } from '../../../../shared/hooks/api';
import useGetManagementStudy from '../../../../shared/hooks/api/useGetManagementStudy';

const useWithdraw = () => {
  const { refetch: refetchGetManagementStudy } = useGetManagementStudy();

  return useQuery('withdraw', async () => api.get('/api/withdraw'), {
    enabled: false,
    onSuccess: () => {
      refetchGetManagementStudy();
    },
  });
};

export default useWithdraw;
