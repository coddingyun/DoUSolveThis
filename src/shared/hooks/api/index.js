import axios from 'axios';
import { getCookie, setCookie } from '../../utils/cookie';
import { getAccessToken, removeAuthToken } from '../../utils/auth';

export const noAuthApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10 * 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10 * 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const onRequestFulfilled = async config => {
  const accessToken = getCookie('Access');

  if (accessToken) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Access = accessToken;
  }

  return config;
};

const onRequestRejected = error => {
  console.log('interceptor > error', error);
  Promise.reject(error);
};

const onResponseFulfilled = response => response;

let isTokenRefreshAttempted = true;

const onResponseRejected = async error => {
  if (error.response?.status ===429 && isTokenRefreshAttempted){
    const currentPath = window.location.pathname; // 현재 URL 경로 확인
    if(currentPath !== "/login" && currentPath !== "/"){
      window.location.href = "/"; // 로그인 페이지로 이동
    }
  }
  if (error.response?.status === 401){
    // TODO: refresh token 으로 access token 받아오기
    const requestConfig = error.config;
    if (!requestConfig) return Promise.reject(error);

    const refreshToken = getCookie('Refresh');

    const response = await api.post('/api/update/token', {
      refresh: refreshToken,
    });

    const newAccessToken = response.headers.get('Access');
    const newRefreshToken = response.headers.get('Refreshtoken');

    setCookie('Access', newAccessToken, { path: '/' });
    setCookie('Refresh', newRefreshToken, { path: '/' });
    requestConfig.headers.Access = newAccessToken;
    return api(requestConfig);
  }
  return Promise.reject(error);
};

api.interceptors.request.use(onRequestFulfilled, onRequestRejected);
api.interceptors.response.use(onResponseFulfilled, onResponseRejected);
