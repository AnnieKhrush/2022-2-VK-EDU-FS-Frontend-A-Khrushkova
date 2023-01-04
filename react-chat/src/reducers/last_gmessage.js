import { GET_LASTGMESSAGE_REQUEST, GET_LASTGMESSAGE_SUCCESS, GET_LASTGMESSAGE_FAILURE } from '../constants/ActionTypes';


const initialState = {
    loading: false,
    lastgmessage: [],
    error: '',
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LASTGMESSAGE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_LASTGMESSAGE_SUCCESS:
            return {
                loading: false,
                lastgmessage: action.payload,
                error: '',
            }
        case GET_LASTGMESSAGE_FAILURE:
            return {
                loading: false,
                lastgmessage: state.lastgmessage,
                error: action.payload.error,
            }
    
        default:
            return state
    }
}