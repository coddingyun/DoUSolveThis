import { getCookie, removeCookie, setCookie } from './cookie';

export const setAuthToken = (accessToken, refreshToken) => {
  setCookie('Access', accessToken);
  setCookie('Refresh', refreshToken);
};

export const removeAuthToken = () => {
  removeCookie('Access');
  removeCookie('Refresh');
}

export const getAccessToken = () => {
  return getCookie('Access');
}
