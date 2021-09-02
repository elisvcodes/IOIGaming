import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { categoriesReducer } from './category';
import { productsReducer } from './product';
import { pagesReducer } from './page';
import { ordersReducer } from './order';
export default combineReducers({
  authReducer,
  categoriesReducer,
  productsReducer,
  pagesReducer,
  ordersReducer,
});
