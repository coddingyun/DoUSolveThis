import { useQuery } from 'react-query';
import { api } from '../../../../shared/hooks/api';
import useGetManagementStudy from '../../../../shared/hooks/api/useGetManagementStudy';
import { useNavigate } from 'react-router-dom';

const useWithdraw = () => {
  const navigate = useNavigate();
  const onSuccessCallback = data => {
    if (data) {
      // TODO. 스터디 탈퇴 시 스터디장 지정 페이지로 이동
      // navigate('/')
    } else {
      navigate('/')
    }
  }
  const { refetch: refetchGetManagementStudy } = useGetManagementStudy(onSuccessCallback);

  return useQuery('withdraw', async () => api.get('/api/withdraw'), {
    enabled: false,
    onSuccess: () => {
      refetchGetManagementStudy();
    },
  });
};

export default useWithdraw;
