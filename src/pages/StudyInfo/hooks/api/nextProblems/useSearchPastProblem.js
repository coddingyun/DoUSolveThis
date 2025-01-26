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
const getYYYYYMMDD = date => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const useSearchProblem = (id, queryKey, setCards, setTotal) => {
  const { setStatus, setSolvePeople } = useSuggestionActions();
  const { refetch, data, isLoading } = useQuery(
    queryKey,
    async ({ queryKey }) => {
      const [_, query, detailInfo] = queryKey;
      const encodedTags = detailInfo.tags
        .map(tag => encodeURIComponent(tag))
        .join(',');
      const response = await api.get(
        `/api/studies/${id}/past/problem/search?query=${query}&startDate=${getYYYYYMMDD(detailInfo.startDate)}&tags=${encodedTags}&endDate=${getYYYYYMMDD(detailInfo.endDate)}&startRank=${detailInfo.start}&endRank=${detailInfo.end}&page=${detailInfo.page}`,
      );
      return response.data;
    },
    {
      enabled: false,
      onSuccess: data => {
        setTotal(data.total);
        setCards(data.result);
      },
    },
  );

  return { refetch, nextProblems: data, isLoading };
};

export default useSearchProblem;
