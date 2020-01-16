import { FETCHING_IMAGEMARKERDATA, FETCHING_IMAGEMARKERDATA_SUCCESS, FETCHING_IMAGEMARKERDATA_FAILURE } from '../constants';
import ModelsManager from '@Manager/ModelsManager';

export function getImageMarkerData() {
    return {
        type: FETCHING_IMAGEMARKERDATA
    }
}

export function getImageMarkerDataSuccess(data) {
    return {
        type: FETCHING_IMAGEMARKERDATA_SUCCESS,
        data
    }
}

export function getImageMarkerDataFailure() {
    return {
        type: FETCHING_IMAGEMARKERDATA_FAILURE
    }
}

export function fetchImageMarkerData() {
    return (dispatch) => {
        dispatch(getImageMarkerData());
        return fetch('http://192.168.0.165/appData/ImageMarker.json')
            .then(response => {
                // console.warn('Fetched: ' + JSON.stringify(response));
                return response.json();
            })
            .then(responseJson => {
                // console.warn('Fetched again: ' + JSON.stringify(responseJson));
                // ModelsManager.CreateModels(responseJson.models);
                dispatch(getImageMarkerDataSuccess(responseJson));
                return Promise.resolve();
            })
            .catch((err) => console.warn('Error: ', err));
    }
}