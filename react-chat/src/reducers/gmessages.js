import { GET_GMESSAGES_REQUEST, GET_GMESSAGES_SUCCESS, GET_GMESSAGES_FAILURE } from '../constants/ActionTypes';


const initialState = {
    loading: false,
    gmessages: [],
    error: '',
}

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_GMESSAGES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_GMESSAGES_SUCCESS:
            return {
                loading: false,
                gmessages: action.payload,
                error: '',
            }
        case GET_GMESSAGES_FAILURE:
            return {
                loading: false,
                gmessages: state.gmessages,
                error: action.payload.error,
            }
    
        default:
            return state
    }
}