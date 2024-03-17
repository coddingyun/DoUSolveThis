import { useMutation } from 'react-query';
import { api } from '../../../../shared/hooks/api';
import { setAuthToken } from '../../../../shared/utils/auth';
import { useUserActions } from '../../../../store/userStore';
import { useNavigate } from 'react-router-dom';

const usePostLogin = onOpen => {
  const { setUserName, setUserId, setUserImage } = useUserActions();
  const navigate = useNavigate();

  return useMutation(
    async data => {
      const response = await api.post(`/api/login`, data);
      return response;
    },
    {
      onSuccess: response => {
        const accessToken = response.headers.get('Access');
        const refreshToken = response.headers.get('Refreshtoken');

        setAuthToken(accessToken, refreshToken);
        setUserName(response.data.username);
        setUserId(response.data.userId);
        setUserImage(response.data.imageUrl);

        if (response.data.isFirst) {
          onOpen();
        } else {
          navigate('/search');
        }
      },
    },
  );
};

export default usePostLogin;
