import { combineReducers } from 'redux';
import page from './page';
import categories from './categories';
export default combineReducers({
  page,
  categories,
});
