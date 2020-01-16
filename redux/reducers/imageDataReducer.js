import { FETCHING_IMAGEMARKERDATA, FETCHING_IMAGEMARKERDATA_SUCCESS, FETCHING_IMAGEMARKERDATA_FAILURE } from '../constants'
const initialState = {
    data: [],
    dataFetched: false,
    isFetching: false,
    error: false
}

export default function imageDataReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_IMAGEMARKERDATA:
            return {
                ...state,
                data: [],
                isFetching: true
            }
        case FETCHING_IMAGEMARKERDATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data
            }
        case FETCHING_IMAGEMARKERDATA_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}