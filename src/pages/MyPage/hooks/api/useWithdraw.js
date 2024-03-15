import { useQuery } from 'react-query';
import { api } from '../../../../shared/hooks/api';
import useGetManagementStudy from '../../../../shared/hooks/api/useGetManagementStudy';
import { useNavigate } from 'react-router-dom';

const useWithdraw = () => {
  const navigate = useNavigate();
  const onSuccessCallback = data => {
    if (data) {
      navigate('/manager-change');
    } else {
      navigate('/');
    }
  };
  const { refetch: refetchGetManagementStudy } =
    useGetManagementStudy(onSuccessCallback);

  return useQuery('withdraw', async () => api.get('/api/withdraw'), {
    enabled: false,
    onSuccess: () => {
      refetchGetManagementStudy();
    },
  });
};

export default useWithdraw;
