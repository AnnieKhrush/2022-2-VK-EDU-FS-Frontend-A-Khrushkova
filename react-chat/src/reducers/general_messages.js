import { GET_GENERALMESSAGES_REQUEST, GET_GENERALMESSAGES_SUCCESS, GET_GENERALMESSAGES_FAILURE } from '../constants/ActionTypes';


const initialState = {
    loading: false,
    general_messages: [],
    error: '',
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_GENERALMESSAGES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_GENERALMESSAGES_SUCCESS:
            return {
                loading: false,
                general_messages: action.payload,
                error: '',
            }
        case GET_GENERALMESSAGES_FAILURE:
            return {
                loading: false,
                general_messages: state.general_messages,
                error: action.payload.error,
            }
    
        default:
            return state
    }
}