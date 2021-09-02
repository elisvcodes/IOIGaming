import axios from 'axios';
import config from '../util/config';

export const getOrders = () =>
  axios.get(`${config.SERVER_URI}/api/v1/orders`, { withCredentials: true });
