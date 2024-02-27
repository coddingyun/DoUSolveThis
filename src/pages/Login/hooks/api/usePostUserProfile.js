import { useMutation } from "react-query"
import { api } from "../../../../shared/hooks/api"
import { useNavigate } from "react-router-dom"

const usePostUserProfile = () => {
  const navigate = useNavigate();

  return useMutation(
    async data => {
      const response = await api.post('/api/user/profile', data);
      return response.data;
    },
    {
      onSuccess: () => {
        navigate('/search');
      }
    }
  )
}

export default usePostUserProfile;
