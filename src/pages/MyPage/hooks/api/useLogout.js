import { useNavigate } from 'react-router-dom';
import { api } from '../../../../shared/hooks/api';
import { useQuery } from 'react-query';
import { removeAuthToken } from '../../../../shared/utils/auth';

const useLogout = () => {
  const navigate = useNavigate();

  return useQuery('logout', async () => api.get('/api/logout'), {
    enabled: false,
    onSuccess: () => {
      removeAuthToken();
      navigate('/');
    },
  });
};

export default useLogout;
