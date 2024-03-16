import { useQuery } from 'react-query';
import { api } from '.';

const useGetManagementStudy = (successCallback, enabled = false) => {
  return useQuery(
    'managementStudy',
    async () => {
      const response = await api.get('/api/mystudies/management');
      return response.data;
    },
    {
      enabled: enabled,
      onSuccess: successCallback,
    },
  );
};

export default useGetManagementStudy;
