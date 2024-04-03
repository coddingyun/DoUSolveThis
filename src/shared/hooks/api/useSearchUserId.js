import { useQuery } from 'react-query';
import { api } from '.';
import { useStudyActions } from '../../../store/studyStore';

const useSearchUserId = bjId => {
  const { addMember } = useStudyActions();
  return useQuery(
    'searchUserId',
    async () => {
      const response = await api.get(`/api/user/search/userId?bjId=${bjId}`);
      return response.data;
    },
    {
      enabled: false,
      onSuccess: data => {
        addMember({
          userId: data.userId,
          bjId: bjId,
        });
      },
    },
  );
};

export default useSearchUserId;
