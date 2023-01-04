import { combineReducers } from 'redux';
import messages from './messages';
import chats from './chats_list';
import gmessages from './gmessages';

export default combineReducers({
    messages,
    chats,
    gmessages,
})
