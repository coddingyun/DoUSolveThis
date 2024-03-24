import { useQuery } from 'react-query';
import { api } from '.';

const useCheckId = (id, successCallback) => {
  const { data, isLoading, refetch } = useQuery(
    'checkId',
    async () => {
      const response = await api.get(`/api/validate/baekjoon?ids=${id}`);
      return response.data;
    },
    {
      enabled: false,
      onSuccess: data => {
        successCallback(data);
      },
    },
  );

  return { valid: data, isLoading, refetch };
};

export default useCheckId;
