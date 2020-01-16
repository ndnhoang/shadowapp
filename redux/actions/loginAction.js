import { FETCHING_LOGINDATA, FETCHING_LOGINDATA_SUCCESS, FETCHING_LOGINDATA_FAILURE } from '../constants';
import SFLoginManager from '../../app/Manager/Login';

export function getLoginData() {
    return {
        type: FETCHING_LOGINDATA
    }
}

export function getLoginDataSuccess() {
    return {
        type: FETCHING_LOGINDATA_SUCCESS,
        data: true
    }
}

export function getLoginDataFailure() {
    return {
        type: FETCHING_LOGINDATA_FAILURE
    }
}

export function fetchLoginAnonymouslyData() {
    return (dispatch) => {
        dispatch(getLoginData());
        SFLoginManager.instance.Login()
            .then((isLoggedin) => {
                console.warn('Login Anonymously Promise resolved!!!!!');
                if (isLoggedin) {
                    console.warn('Anonymously Loggedin!!!!!');
                    dispatch(getLoginDataSuccess());
                } else {
                    console.warn('No Anonymously Loggedin!!!!!');
                    dispatch(getLoginDataFailure());
                }
            });
    }
}

export function fetchLoginWithEmailData(loginDetails) {
    return (dispatch) => {
        dispatch(getLoginData());
        SFLoginManager.instance.LoginWithEmail(loginDetails)
            .then((isLoggedin) => {
                console.warn('Login Email Promise resolved!!!!!');
                if (isLoggedin) {
                    console.warn('Email Loggedin!!!!!');
                    dispatch(getLoginDataSuccess());
                } else {
                    console.warn('No Email Loggedin!!!!!');
                    dispatch(getLoginDataFailure());
                }
            });
    }
}

export function fetchSignUpWithEmailData(loginDetails) {
    return (dispatch) => {
        dispatch(getLoginData());
        SFLoginManager.instance.SignUpWithEmail(loginDetails)
            .then((isLoggedin) => {
                console.warn('Login Email Promise resolved!!!!!');
                if (isLoggedin) {
                    console.warn('Email Loggedin!!!!!');
                    dispatch(getLoginDataSuccess());
                } else {
                    console.warn('No Email Loggedin!!!!!');
                    dispatch(getLoginDataFailure());
                }
            });
    }
}

export function fetchLogout() {
    return (dispatch) => {
        dispatch(getLoginData());
        SFLoginManager.instance.Logout();
    }
}
