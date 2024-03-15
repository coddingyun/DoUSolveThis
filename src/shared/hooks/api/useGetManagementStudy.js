import { useQuery } from 'react-query';
import { api } from '.';

const useGetManagementStudy = successCallback => {
  return useQuery(
    'managementStudy',
    async () => {
      const response = await api.get('/api/mystudies/management');
      return response.data;
    },
    {
      enabled: false,
      onSuccess: successCallback
    },
  );
};

export default useGetManagementStudy;
