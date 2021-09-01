import axios from 'axios';
import config from '../util/config';

export const getPage = (slug) =>
  axios.get(`${config.SERVER_URI}/api/v1/page/${slug}`);
