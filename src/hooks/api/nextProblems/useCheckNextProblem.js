import { useQuery } from 'react-query';
import { useSuggestionActions } from '../../../store/suggestionStore';
import { api } from '..';

const useCheckNextProblem = (id, problem) => {
  const { setStatus, setSolvePeople } = useSuggestionActions();

  const { refetch, data, isLoading } = useQuery(
    'postNextProblem',
    async () => {
      const response = await api.get(`/api/studies/${id}/search/${problem}`);
      return response.data;
    },
    {
      enabled: false,
      onSuccess: data => {
        if (data.isExist) {
          if (data.whoSolved && data.whoSolved.length > 0) {
            setStatus('solved');
            setSolvePeople(data.whoSolved);
          } else {
            setStatus('not_solved');
          }
        } else {
          setStatus('not_existed');
        }
      },
    },
  );

  return { refetch, nextProblems: data, isLoading };
};

export default useCheckNextProblem;
