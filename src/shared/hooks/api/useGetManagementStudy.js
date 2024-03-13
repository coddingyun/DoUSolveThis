import { useQuery } from 'react-query';
import { api } from '.';
import { useNavigate } from 'react-router-dom';

const useGetManagementStudy = () => {
  const navigate = useNavigate();

  return useQuery(
    'managementStudy',
    async () => {
      const response = await api.get('/api/mystudies/management');
      return response.data;
    },
    {
      enabled: false,
      onSuccess: data => {
        if (data) {
          // TODO. 스터디 탈퇴 시 스터디장 지정 페이지로 이동
          // navigate('/')
        } else {
          navigate('/')
        }
      }
    },
  );
};

export default useGetManagementStudy;
