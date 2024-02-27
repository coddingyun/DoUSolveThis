import { setCookie } from "./cookie";

export const setAuthToken = (accessToken, refreshToken) => {
  setCookie('Access', accessToken);
  setCookie('Refresh', refreshToken);
};
