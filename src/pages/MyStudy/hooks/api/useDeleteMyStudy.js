import { useMutation, useQueryClient } from "react-query"
import { api } from "../../../../shared/hooks/api"

const useDeleteMyStudy = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => api.delete(`api/studies/${id}`),{
      onSuccess: () => {
        queryClient.invalidateQueries('myStudy');
      }
    }
  )
}

export default useDeleteMyStudy;
