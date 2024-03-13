import { useQuery } from 'react-query';
import { api } from '.';

const useGetManagementStudy = () => {
  return useQuery(
    'managementStudy',
    async () => {
      const response = await api.get('/api/mystudies/management');
      return response.data;
    },
    {
      enabled: false,
    },
  );
};

export default useGetManagementStudy;
