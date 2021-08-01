import { combineReducers } from 'redux';
import page from './page';
import categories from './categories';
import products from './products';
import cart from './cart';
export default combineReducers({
  page,
  categories,
  products,
  cart,
});
