import { FETCHING_LOGINDATA, FETCHING_LOGINDATA_SUCCESS, FETCHING_LOGINDATA_FAILURE } from '../constants'
const initialState = {
    data: false,
    dataFetched: false,
    isFetching: false,
    error: false
}

export default function loginDataReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_LOGINDATA:
            return {
                ...state,
                data: false,
                isFetching: true
            }
        case FETCHING_LOGINDATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data
            }
        case FETCHING_LOGINDATA_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}