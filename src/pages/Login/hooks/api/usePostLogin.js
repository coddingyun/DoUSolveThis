import { useMutation } from 'react-query';
import { api } from '../../../../shared/hooks/api';
import { setAuthToken } from '../../../../shared/utils/auth';
import { useUserActions } from '../../../../store/userStore';

const usePostLogin = successCallback => {
  const { setUserName, setUserId, setUserImage } = useUserActions();

  return useMutation(
    async data => {
      const response = await api.post(`/api/login`, data);
      return response;
    },
    {
      onSuccess: response => {
        const accessToken = response.headers.get('Gauth');
        const refreshToken = response.headers.get('RefreshToken');

        setAuthToken(accessToken, refreshToken);
        setUserName(response.data.username);
        setUserId(response.data.userId);
        setUserImage(response.data.imageUrl);
        successCallback(response);
      },
    },
  );
};

export default usePostLogin;
