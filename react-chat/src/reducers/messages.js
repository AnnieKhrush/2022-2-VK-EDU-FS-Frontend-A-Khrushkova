import { GET_MESSAGES_REQUEST, GET_MESSAGES_SUCCESS, GET_MESSAGES_FAILURE } from '../constants/ActionTypes';


const initialState = {
    loading: false,
    messages: [],
    error: '',
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_MESSAGES_SUCCESS:
            return {
                loading: false,
                messages: action.payload,
                error: '',
            }
        case GET_MESSAGES_FAILURE:
            return {
                loading: false,
                messages: state.messages,
                error: action.payload.error,
            }
    
        default:
            return state
    }
}