import { useQuery } from 'react-query';
import { api } from '../../../../shared/hooks/api';
import { useNavigate } from 'react-router-dom';

const useWithdraw = () => {
  const navigate = useNavigate();
  
  return useQuery('withdraw', async () => api.get('/api/withdraw'), {
    enabled: false,
    onSuccess: () => {
      navigate('/');
    },
  });
};

export default useWithdraw;
