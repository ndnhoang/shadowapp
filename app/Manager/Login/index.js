import React from 'react';
import Firebase from 'react-native-firebase';
import _ from 'lodash';
/**
 * @typedef {Object} LoginDetails - Login details
 * @prop {string} email - Email
 * @prop {string} password - Password
 * @prop {function} stateChangeCallback - Auth state change callback
 */

var _credential = '';


/**
 * @constructor
 */
class SFLoginManager {
    _unSubscriber = null;

    constructor() {
        if (!SFLoginManager.instance) {
            this._data = [];
            SFLoginManager.instance = this;
        }

        return SFLoginManager.instance;
    }

    /**
     * @returns {PromiseLike<boolean>}
     */
    LoginAnonymously() {
        const loginPromise = new Promise((resolve, reject) => {
            Firebase.auth()
                .signInAnonymouslyAndRetrieveData()
                .then(credential => {
                    if (credential) {
                        _credential = credential;
                        console.warn('Default App Use -> ', _credential.user.toJSON());
                        resolve(true);
                    } else {
                        console.warn('------------ No Credential!!!!');
                        resolve(false);
                    }
                }).catch((error) => {
                    console.warn('----------- Anonymously sign in Error: ' + error);
                    reject(error);
                })
        });
        return loginPromise;
    }

    /**
     * 
     * @param {LoginDetails} loginDetails - Login details
     */
    LoginWithEmail(loginDetails) {
        const loginPromise = new Promise((resolve, reject) => {
            Firebase.auth()
                .signInAndRetrieveDataWithEmailAndPassword(loginDetails.email, loginDetails.password)
                .then(credential => {
                    if (credential) {
                        _credential = credential;
                        console.warn('Email login Use -> ', _credential.user.toJSON());
                        resolve(true);
                    } else {
                        console.warn('------------ No Credential!!!!');
                        resolve(false);
                    }
                }).catch((error) => {
                    console.warn('------------ Fail!!!!', error);
                    reject(error);
                })
        });
        return loginPromise;
    }

    /**
     * 
     * @param {LoginDetails} loginDetails - Login details
     */
    SignUpWithEmail(loginDetails) {
        const loginPromise = new Promise((resolve, reject) => {
            Firebase.auth()
                .createUserAndRetrieveDataWithEmailAndPassword(loginDetails.email, loginDetails.password)
                .then(credential => {
                    if (credential) {
                        _credential = credential;
                        this._unSubscriber = Firebase.auth().onAuthStateChanged((user) => {
                            if (user)
                                _credential.user = user;
                            else
                                _credential = null;
                        })
                        console.warn('Email login Use -> ', _credential.user.toJSON());
                        resolve(true);
                    } else {
                        console.warn('------------ No Credential!!!!');
                        resolve(false);
                    }
                }).catch((error) => {
                    console.warn('------------ Fail!!!!', error);
                    reject(error);
                })
        });
        return loginPromise;
    }

    Logout() {
        if (this._unSubscriber) {
            this._unSubscriber();
        }
    }

    async FacebookLogin() {
        try {
            const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                throw new Error('User cancelled request');
            }

            console.log('Login success with permissions: ', result.grantedPermissions.toString());

            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                throw new Error('Something went wrong obtaining the users access token.');
            }

            const credential = Firebase.auth.FacebookAuthProvider.credential(data.accessToken);

            const currentUser = await Firebase.auth().signInAndRetrieveDataWithCredential(credential);
            console.log(JSON.stringify(currentUser.user.toJSON()));
        } catch (e) {
            console.log(e);
        }
    }

    IsLoggedIn() {
        return _.isEmpty(_credential);
    }
}

/**
 * @type {typeof SFLoginManager}
 */
const instance = new SFLoginManager();
Object.freeze(instance);

export default SFLoginManager;