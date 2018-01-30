import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
import url from './url';

export default combineReducers({
    messages,
    auth,
    url
});