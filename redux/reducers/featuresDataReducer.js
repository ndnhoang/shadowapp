import { FETCHING_FEATURESDATA, FETCHING_FEATURESDATA_SUCCESS, FETCHING_FEATURESDATA_FAILURE } from '../constants'
const initialState = {
    data: [],
    dataFetched: false,
    isFetching: false,
    error: false
}

export default function featuresDataReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_FEATURESDATA:
            return {
                ...state,
                data: [],
                isFetching: true
            }
        case FETCHING_FEATURESDATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data
            }
        case FETCHING_FEATURESDATA_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}