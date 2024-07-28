import { useQuery } from 'react-query';
import { useSuggestionActions } from '../../../../../store/suggestionStore';
import { api } from '../../../../../shared/hooks/api';

const rank2str = [
  'ur',
  'b5',
  'b4',
  'b3',
  'b2',
  'b1',
  's5',
  's4',
  's3',
  's2',
  's1',
  'g5',
  'g4',
  'g3',
  'g2',
  'g1',
  'p5',
  'p4',
  'p3',
  'p2',
  'p1',
  'd5',
  'd4',
  'd3',
  'd2',
  'd1',
  'r5',
  'r4',
  'r3',
  'r2',
  'r1',
];
const useSearchProblem = (id, queryKey, setCards) => {
  const { setStatus, setSolvePeople } = useSuggestionActions();
  const { refetch, data, isLoading } = useQuery(
    queryKey,
    async ({ queryKey }) => {
      const [_, query, detailInfo] = queryKey;
      const isRandom = detailInfo.isRandom;
      let range = '*';
      if (detailInfo.start !== -1) {
        range += rank2str[detailInfo.start];
      } else {
        range += 'ur';
      }
      range += '..';
      if (detailInfo.end !== -1) {
        range += rank2str[detailInfo.end];
      } else {
        range += 'r1';
      }
      let _minSolved;
      if (detailInfo.minSolved) {
        _minSolved = 's%23' + detailInfo.minSolved + '..';
      } else {
        _minSolved = 0;
      }
      const encodedTags = detailInfo.tags
        .map(tag => encodeURIComponent(tag))
        .join(',');
      const response = await api.get(
        `/api/studies/${id}/problem/search?query=${query}&notSolved=${detailInfo.notSolved}&tags=${encodedTags}&minSolved=${_minSolved}&range=${range}&isRandom=${isRandom}`,
      );
      return response.data;
    },
    {
      enabled: false,
      onSuccess: data => {
        setCards(data.problems);
      },
    },
  );

  return { refetch, nextProblems: data, isLoading };
};

export default useSearchProblem;
