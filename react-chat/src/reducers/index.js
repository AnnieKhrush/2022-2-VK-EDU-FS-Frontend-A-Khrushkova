import { combineReducers } from 'redux';
import messages from './messages';
import chats from './chats_list';
import lastgmessage from './last_gmessage';
import general_messages from './general_messages';

export default combineReducers({
    messages,
    chats,
    lastgmessage,
    general_messages,
})
