import { combineReducers } from 'redux';
import auth from './auth';
import categories from './category';
import products from './product';
export default combineReducers({
  auth,
  categories,
  products,
});
