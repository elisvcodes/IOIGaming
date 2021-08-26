import axios from 'axios';

export const login = (creds) =>
  axios.post(
    `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/user/login`,
    creds,
    {
      withCredentials: true,
    }
  );

export const logout = () =>
  axios.post(
    `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/user/logout`,
    {},
    { withCredentials: true }
  );
