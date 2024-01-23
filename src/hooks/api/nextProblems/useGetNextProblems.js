import axios from 'axios';
import { useQuery } from 'react-query';
import { getCookie } from '../../../utils/cookie';
import { useNextProbsActions } from '../../../store/nextProbStore';

const useGetNextProblems = id => {
  const { setNextProbs } = useNextProbsActions();

  const { data, isLoading } = useQuery(
    'getNextProblems',
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/studies/${id}/suggestion`,
        {
          headers: {
            Access: getCookie('Access'),
          },
        },
      );
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: data => {
        setNextProbs(data);
      },
    },
  );

  return { nextProblems: data, isLoading };
};

export default useGetNextProblems;
