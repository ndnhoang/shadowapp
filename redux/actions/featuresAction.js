import { FETCHING_FEATURESDATA, FETCHING_FEATURESDATA_SUCCESS, FETCHING_FEATURESDATA_FAILURE } from '../constants';

export function getFeaturesData() {
    return {
        type: FETCHING_FEATURESDATA
    }
}

export function getFeaturesDataSuccess(data) {
    return {
        type: FETCHING_FEATURESDATA_SUCCESS,
        data
    }
}

export function getFeaturesDataFailure() {
    return {
        type: FETCHING_FEATURESDATA_FAILURE
    }
}

export function fetchImageMarkerData() {
    return (dispatch) => {
        dispatch(getFeaturesData());
        fetch('http://192.168.0.165/appData/FeaturesData.json')
            .then(response => {
                console.log('Fetched: ' + JSON.stringify(response));
                return response.json();
            })
            .then(responseJson => {
                console.log('Fetched again: ' + JSON.stringify(responseJson));
                dispatch(getFeaturesDataSuccess(responseJson));
            })
            .catch((err) => console.warn('Error: ', err));
    }
}