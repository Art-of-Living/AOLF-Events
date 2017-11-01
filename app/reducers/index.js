import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
import css from './css';
import scripts from './scripts';
import title from './title';

export default combineReducers({
  messages,
  auth,
  scripts,
  css,
  title
});
