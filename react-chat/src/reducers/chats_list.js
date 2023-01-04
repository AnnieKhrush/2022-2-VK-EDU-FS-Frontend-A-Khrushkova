import { GET_CHATS_REQUEST, GET_CHATS_SUCCESS, GET_CHATS_FAILURE } from '../constants/ActionTypes';


const initialState = {
    loading: false,
    chats: [],
    error: '',
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CHATS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_CHATS_SUCCESS:
            return {
                loading: false,
                chats: action.payload,
                error: '',
            }
        case GET_CHATS_FAILURE:
            return {
                loading: false,
                chats: state.chats,
                error: action.payload.error,
            }
    
        default:
            return state
    }
}