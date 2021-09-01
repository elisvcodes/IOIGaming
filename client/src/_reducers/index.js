import { combineReducers } from 'redux';
import { pageReducer } from './page';
import { categoriesReducer } from './categories';
import { productReducer } from './products';
import cart from './cart';
export default combineReducers({
  pageReducer,
  categoriesReducer,
  productReducer,
  cart,
});
