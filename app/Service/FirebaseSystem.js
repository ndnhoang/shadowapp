import React from 'react';
import Firebase, { Notification } from 'react-native-firebase';

class FirebaseSystem {
    _activated = false;
    _config = {};

    constructor() {
        if (!FirebaseSystem.instance) {
            this._data = [];
            FirebaseSystem.instance = this;
        }

        return FirebaseSystem.instance;
    }

    connect() {
        Firebase.auth().signInAnonymouslyAndRetrieveData()
            .then(() => {

                Firebase.config().setDefaults({
                    "en": "Nothing"
                });

                Firebase.config().fetch(0)
                    .then(() => {
                        return Firebase.config().activateFetched();
                    })
                    .then((activated) => {
                        if (!activated) console.warn('------ Fetched data not activated.');

                        this._activated = activated;
                        // console.log("------- Notification Enable Function");
                        Firebase.messaging().getToken()
                            .then((fcmToken) => { this._enableMessaging(fcmToken).catch(() => { console.warn('Enable Messaging Error!!') }); });
                        // console.log("------- After Notification Enable Function");

                        this.getConfig('supportedLang');

                        // this.getData();
                    })
            });

        this._enableMessaging = this._enableMessaging.bind(this);
        this._listenMessageEvent = this._listenMessageEvent.bind(this);

        this.enabled = false;

        this.notificationDisplayedListener = null;
        this.notificationListener = null;
        this.messageListener = null;
    }

    async _enableMessaging(fcmToken) {
        if (fcmToken) {
            console.warn('--------- Token Get ---------');
        } else {
            console.warn('--------- No Token ---------');
        }
        this.enabled = await Firebase.messaging().hasPermission();
        if (!this.enabled) {
            await Firebase.messaging().requestPermission()
                .then(() => {
                    console.warn("------- Notification Enabled");
                    this.enabled = true;
                    this._listenMessageEvent();
                })
                .catch(error => {
                    console.warn("------- Error " + error);
                    this.enabled = false;
                });
        } else {
            console.warn('--------- Has Permission ----------');
            this._listenMessageEvent();
        }
    }

    _listenMessageEvent() {
        console.warn('--------- Listen To Message Event ---------');
        this.notificationDisplayedListener = Firebase.notifications().onNotificationDisplayed((notification) => {
            console.warn("-------- Displayed ", notification.title, " ---------", notification.body);
        });
        this.notificationListener = Firebase.notifications().onNotification((notification) => {
            console.warn("-------- Arrived ", notification.title, " ---------", notification.body);
        });
        this.messageListener = Firebase.messaging().onMessage((message) => {
            console.warn("-------- Message Arrived ", message);
        });
    }

    _unListenMessageEvent() {
        this.notificationDisplayedListener();
        this.notificationListener();
        this.messageListener();
    }

    getConfig() {
        this._getConfigByKey('supportedLang');
    }

    _getConfigByKey(theKey) {
        return Firebase.config().getValue(theKey).then((snapshot) => { this._handleConfigSnapshot(snapshot, theKey) });
    }

    _handleConfigSnapshot(snapshot, theKey) {
        const configVal = snapshot.val();

        if (configVal) {
            console.warn('-------- Got Config Value: ', JSON.stringify(configVal));
            this._config[theKey] = configVal;
        } else {
            console.warn('-------- Nothing -------');
        }
    }

    getData() {
        console.warn('Getting Data...');

        this.transaction()
            .then((data) => {
                //console.warn('Data: ', JSON.stringify(data));
            })
            .catch((error) => {
                console.warn('Transaction failed: ', error);
            });
    }

    async transaction() {
        console.warn('Data transaction!');

        const ref = Firebase.firestore().collection('translations');
        // const doc = await ref.onSnapshot((querySnapshot) => {
        //     console.warn('Snapshot!!!')
        //     querySnapshot.forEach((doc) => {
        //         console.warn('Data ', doc.id, ': ', JSON.stringify(doc.data()))
        //     })

        // });

        await ref.get().then((querySnapshot) => {
            console.warn('get Snapshot!!!')
            querySnapshot.forEach((doc) => {
                console.warn('Data ', doc.id, ': ', JSON.stringify(doc.data()))
            })
        })
    }
}

/**
 * @type {typeof FirebaseSystem}
 */
const instance = new FirebaseSystem();
Object.freeze(instance);

export default FirebaseSystem;