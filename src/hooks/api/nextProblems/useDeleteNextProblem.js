import axios from 'axios';
import { useQuery } from 'react-query';
import { getCookie } from '../../../utils/cookie';
import { useNextProbsActions } from '../../../store/nextProbStore';

const useDeleteNextProblem = (id, problem) => {
  const { deleteNextProbs } = useNextProbsActions();
  const { data, refetch } = useQuery(
    'deleteNextProblem',
    async () => {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/studies/${id}/suggestion/${problem}`,
        {
          headers: {
            Access: getCookie('Access'),
          },
        },
      );
      return response;
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: () => {
        deleteNextProbs(problem);
      },
    },
  );

  return { data, deleteFetch: refetch };
};

export default useDeleteNextProblem;
