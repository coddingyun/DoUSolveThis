import { useMutation } from "react-query"
import { api } from "."

const usePostStudyOut = (id, successCallback) => {
  return useMutation(async () => {
    const response = await api.post(`/api/studies/${id}/out`);
    return response.data
  }, {
    onSuccess: data => {
      successCallback(data);
    },
  })
}

export default usePostStudyOut;
