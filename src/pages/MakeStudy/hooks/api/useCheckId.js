import { useQuery } from 'react-query';
import { api } from '../../../../shared/hooks/api';
import { useStudyActions } from '../../../../store/studyStore';

const useCheckId = id => {
  const { addMember } = useStudyActions();
  const { data, isLoading, refetch } = useQuery(
    'checkId',
    async () => {
      const response = await api.get(
        `${process.env.REACT_APP_BASE_URL}/api/validate/baekjoon?id=${id}`,
      );
      return response.data;
    },
    {
      enabled: false,
      onSuccess: data => {
        if (data.results.valid) {
          addMember(data.results.bjanme);
        }
      },
    },
  );

  return { valid: data, isLoading, refetch };
};

export default useCheckId;
