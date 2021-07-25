import { combineReducers } from 'redux';
import auth from './auth';
import categories from './category';
import products from './product';
import pages from './page';
export default combineReducers({
  auth,
  categories,
  products,
  pages,
});
