import { GET_MESSAGES_REQUEST, GET_MESSAGES_SUCCESS, GET_MESSAGES_FAILURE } from '../constants/ActionTypes';
import { GET_CHATS_REQUEST, GET_CHATS_SUCCESS, GET_CHATS_FAILURE } from '../constants/ActionTypes';
import { GET_LASTGMESSAGE_REQUEST, GET_LASTGMESSAGE_SUCCESS, GET_LASTGMESSAGE_FAILURE } from '../constants/ActionTypes';
import { GET_GENERALMESSAGES_REQUEST, GET_GENERALMESSAGES_SUCCESS, GET_GENERALMESSAGES_FAILURE } from '../constants/ActionTypes';

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

        fetch(`/chats/list/${1}`, {
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

const getLastGmessageStarted = () => ({
    type: GET_LASTGMESSAGE_REQUEST,
})


const getLastGmessageSuccess = (gmessages) => ({
    type: GET_LASTGMESSAGE_SUCCESS,
    payload: gmessages,
})


const getLastGmessageFailure = (error) => ({
    type: GET_LASTGMESSAGE_FAILURE,
    payload: error,
})


function getTimeFromISOString(timestamp) {
    return new Date(timestamp).toLocaleTimeString('ru', { timeStyle: 'short', hour12: false, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
}


export const getLastGmessage = () => {
    return ((dispatch, getState) => {
        console.log('lastgmessage:', getState());
        dispatch(getLastGmessageStarted())

        fetch('https://tt-front.vercel.app/messages', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
        })
        .then(response => response.json())
        .then(data => {
            let message = data.at(-1);
            message.timestamp = getTimeFromISOString(message.timestamp);
            dispatch(getLastGmessageSuccess(message));  
        })
        .catch(error => {dispatch(getLastGmessageFailure(error.message))})

    })
}


const getGeneralMessagesStarted = () => ({
    type: GET_GENERALMESSAGES_REQUEST,
})


const getGeneralMessagesSuccess = (messages) => ({
    type: GET_GENERALMESSAGES_SUCCESS,
    payload: messages,
})


const getGeneralMessagesFailure = (error) => ({
    type: GET_GENERALMESSAGES_FAILURE,
    payload: error,
})


export const getGmessages = () => {
    return ((dispatch, getState) => {
        console.log('general_messages:', getState());
        dispatch(getGeneralMessagesStarted())

        fetch('https://tt-front.vercel.app/messages', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
        })
        .then(response => response.json())
        .then(data => dispatch(getGeneralMessagesSuccess(data)))
        .catch(error => dispatch(getGeneralMessagesFailure(error.message)))

    })
}