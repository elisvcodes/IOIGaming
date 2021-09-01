import axios from 'axios';
import config from '../util/config';

export const getCategories = () =>
  axios.get(`${config.SERVER_URI}/api/v1/category`);
