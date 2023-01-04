import { GET_MESSAGES_REQUEST, GET_MESSAGES_SUCCESS, GET_MESSAGES_FAILURE } from '../constants/ActionTypes';
import { GET_CHATS_REQUEST, GET_CHATS_SUCCESS, GET_CHATS_FAILURE } from '../constants/ActionTypes';
import { GET_GMESSAGES_REQUEST, GET_GMESSAGES_SUCCESS, GET_GMESSAGES_FAILURE } from '../constants/ActionTypes';

// for messages

const getMessagesStarted = () => ({
    type: GET_MESSAGES_REQUEST,
})


const getMessagesSuccess = (messages) => ({
    type: GET_MESSAGES_SUCCESS,
    payload: messages,
})


const getMessagesFailure = (error) => ({
    type: GET_MESSAGES_FAILURE,
    payload: error,
})


export const getMessages = (id) => {
    return ((dispatch, getState) => {
        console.log('state:', getState());
        dispatch(getMessagesStarted())

        fetch(`/chats/message/list/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            dispatch(getMessagesSuccess(data.reverse()))
        })
        .catch(error => {dispatch(getMessagesFailure(error.message))})
    })
}


// for chats

const getChatsStarted = () => ({
    type: GET_CHATS_REQUEST,
})


const getChatsSuccess = (chats) => ({
    type: GET_CHATS_SUCCESS,
    payload: chats,
})


const getChatsFailure = (error) => ({
    type: GET_CHATS_FAILURE,
    payload: error,
})


export const getChats = () => {
    return ((dispatch, getState) => {
        console.log('state_chats:', getState());
        dispatch(getChatsStarted())

        fetch('/chats/list/1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => dispatch(getChatsSuccess(data)))
        .catch(error => {dispatch(getChatsFailure(error.message))})
    })
}

// for the last message from the general chat

const getGmessagesStarted = () => ({
    type: GET_GMESSAGES_REQUEST,
})


const getGmessagesSuccess = (gmessages) => ({
    type: GET_GMESSAGES_SUCCESS,
    payload: gmessages,
})


const getGmessagesFailure = (error) => ({
    type: GET_GMESSAGES_FAILURE,
    payload: error,
})


function getTimeFromISOString(timestamp) {
    return new Date(timestamp).toLocaleTimeString('ru', { timeStyle: 'short', hour12: false, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
}


export const getGmessages = () => {
    return ((dispatch, getState) => {
        console.log('gmessages:', getState());
        dispatch(getGmessagesStarted())

        fetch('https://tt-front.vercel.app/messages', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
        })
        .then(response => response.json())
        .then(data => {
            let gen_messages = data;
            for (let i = 0; i < gen_messages.length; i++) {
                gen_messages[i].timestamp = getTimeFromISOString(gen_messages[i].timestamp);
            } 
            console.log(data);
            return dispatch(getGmessagesSuccess(gen_messages));  
        })
        .catch(error => {dispatch(getGmessagesFailure(error.message))})
    })
}