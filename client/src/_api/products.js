import axios from 'axios';
import config from '../util/config';

export const getProducts = ({ slug, query, priceQuery }) => {
  console.log(`${slug}${priceQuery}`);
  if (slug && priceQuery) {
    return axios.get(
      `${config.SERVER_URI}/api/v1/product/${slug}${priceQuery}`
    );
  } else if (query) {
    return axios.get(`${config.SERVER_URI}/api/v1/product/search/${query}`);
  } else if (slug) {
    return axios.get(`${config.SERVER_URI}/api/v1/product/${slug}`);
  }
};
