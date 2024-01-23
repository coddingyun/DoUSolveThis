import axios from 'axios';
import { useQuery } from 'react-query';
import { getCookie } from '../../../utils/cookie';
import { useNextProbsActions } from '../../../store/nextProbStore';

const useDeleteAllNextProblems = id => {
  const { deleteAllNextProbs } = useNextProbsActions();
  const { data, refetch } = useQuery(
    'deleteAllNextProblems',
    async () => {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/studies/${id}/suggestion`,
        {
          headers: {
            Access: getCookie('Access'),
          },
        },
      );
      return response.json();
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: () => {
        deleteAllNextProbs();
      },
    },
  );

  return { data, deleteAllFetch: refetch };
};

export default useDeleteAllNextProblems;
