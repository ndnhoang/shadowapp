import { FETCHING_LANGDATA, FETCHING_LANGDATA_SUCCESS, FETCHING_LANGDATA_FAILURE } from '../constants';

export function getLangsData() {
    return {
        type: FETCHING_IMAGEMARKERDATA
    }
}

export function getLangsSuccess(data) {
    return {
        type: FETCHING_IMAGEMARKERDATA_SUCCESS,
        data
    }
}

export function getLangsDataFailure() {
    return {
        type: FETCHING_IMAGEMARKERDATA_FAILURE
    }
}

export function fetchLangsData() {
    return (dispatch) => {
        dispatch(getImageMarkerData());
        fetch('http://192.168.0.165/appData/ImageMarker.json')
            .then(response => {
                console.log('Fetched: ' + JSON.stringify(response));
                return response.json();
            })
            .then(responseJson => {
                console.log('Fetched again: ' + JSON.stringify(responseJson));
                dispatch(getImageMarkerDataSuccess(responseJson));
            })
            .catch((err) => console.warn('Error: ', err));
    }
}