import { combineReducers } from 'redux';
import auth from './auth';
import categories from './category';
export default combineReducers({
  auth,
  categories,
});
