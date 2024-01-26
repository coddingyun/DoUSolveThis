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
        `${process.env.REACT_APP_BASE_URL}/api/studies/${id}/suggestions`,
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
        deleteAllNextProbs();
      },
    },
  );

  return { data, deleteAllFetch: refetch };
};

export default useDeleteAllNextProblems;
