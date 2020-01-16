import { FETCHING_LANGDATA, FETCHING_LANGDATA_SUCCESS, FETCHING_LANGDATA_FAILURE } from '../constants'
const initialState = {
    data: [],
    dataFetched: false,
    isFetching: false,
    error: false
}

export default function langsDataReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_LANGDATA:
            return {
                ...state,
                data: false,
                isFetching: true
            }
        case FETCHING_LANGDATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data
            }
        case FETCHING_LANGDATA_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}