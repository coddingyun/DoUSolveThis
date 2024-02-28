import { api } from "../../../../shared/hooks/api"
import { useQuery } from "react-query";

const useGetParticipationOffer = () => {
  return useQuery("participationOffer", async () => {
    const response = api.get('/api/user/mypage/participation');
    return response.data;
  })
}

export default useGetParticipationOffer;
