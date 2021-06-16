import * as API from '../_api/auth';
import Cookies from 'js-cookie';
export const login = (creds) => async (dispatch) => {
  const { data, status } = await API.login(creds);
  if (status === 200) {
    dispatch({ type: 'AUTH', payload: data });
  }
};

export const isLoggedIn = () => async (dispatch) => {
  if (Cookies.get('user_token_jwt')) {
    dispatch({ type: 'isLoggedIn', payload: true });
  } else {
    dispatch({ type: 'isLoggedIn', payload: false });
  }
};

export const logout = (history) => async (dispatch) => {
  await API.logout();
  dispatch({ type: 'isLoggedIn', payload: false });
  history.push('/login');
};
