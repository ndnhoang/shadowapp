import { combineReducers } from 'redux'
import imageMarkerData from './imageDataReducer'
import loginData from './loginDataReducer'

const rootReducer = combineReducers({
    imageMarkerData,
    loginData
})

export default rootReducer;