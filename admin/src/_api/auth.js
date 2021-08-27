import axios from 'axios';
import config from '../util/config';

export const login = (creds) =>
  axios.post(`${config.SERVER_URI}/api/v1/user/login`, creds, {
    withCredentials: true,
  });

export const logout = () =>
  axios.post(
    `${config.SERVER_URI}/api/v1/user/logout`,
    {},
    { withCredentials: true }
  );
