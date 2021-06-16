import axios from 'axios';

export const login = (creds) =>
  axios.post('http://localhost:7000/api/v1/user/login', creds, {
    withCredentials: true,
  });

export const logout = () =>
  axios.post(
    'http://localhost:7000/api/v1/user/logout',
    {},
    { withCredentials: true }
  );
