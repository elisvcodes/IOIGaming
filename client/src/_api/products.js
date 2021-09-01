import axios from 'axios';
import config from '../util/config';

export const getProductsByCat = (slug) =>
  axios.get(
    `${config.SERVER_URI}/api/v1/category/${slug}${window.location.search}`
  );
