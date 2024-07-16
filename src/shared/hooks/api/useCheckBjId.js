import { useQuery } from 'react-query';
import { api } from '.';

const useCheckBJId = (id, successCallback) => {
    const { data, isLoading, refetch } = useQuery(
      'checkBJId',
      async () => {
        const response = await api.get(`/api/validate/baekjoon?id=${id}`);
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
  export default useCheckBJId;