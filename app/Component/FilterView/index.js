/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    CameraRoll,
    Image,
    Share,
    TouchableOpacity,
    Platform
} from 'react-native';
import {
    Container, Content, Button,
    Text, Icon, View, Toast, Footer, FooterTab
} from 'native-base'
import NavigationService from '@Service/Navigation'
import { I18n, NamespacesConsumer } from 'react-i18next';
import RNShare from 'react-native-share';
import i18n from '../../../Service/i18n';

import Orientation from 'react-native-orientation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor } from 'react-native-responsive-screen';

import Style from '@Theme/Style'
import PageStyle from './Style'

import {
    ViroARSceneNavigator
} from 'react-viro';

import { captureScreen, captureRef } from 'react-native-view-shot';

var _ = require('lodash');

class ARFilterEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lastestPhoto: props.lastestPhoto,
            orientation: props.orientation
        }

        this._getARFilterContainer = this._getARFilterContainer.bind(this);
        this._OnRetakePressed = this._OnRetakePressed.bind(this);
        this._OnSharePressed = this._OnSharePressed.bind(this);
        this._share = this._share.bind(this);

        this.ScreenCapture = this.ScreenCapture.bind(this);

        this.arSceneNav = null;
        this.viewRef = null;
    }

    componentDidMount() {
        lor(this);

        Orientation.getOrientation((err, orientation) => {
            if (orientation === 'LANDSCAPE') {
                Orientation.lockToLandscape();
            } else {
                Orientation.lockToPortrait();
            }
        });

        // Orientation.addOrientationListener(this._onOrientationDidChange);
    }

    // componentWillUnmount() {
    // Orientation.removeOrientationListener(this._onOrientationDidChange);
    // }

    // _onOrientationDidChange(orientation) {
    //     this.setState({
    //         orientation: orientation
    //     })
    // }

    render() {
        return this._getARFilterContainer();
    }

    ScreenCapture() {
        if (this.viewRef !== null && this.viewRef !== undefined) {
            captureRef(this.viewRef, { format: 'jpg', quality: 0.9 })
                .then(uri => {
                    Toast.show({
                        text: 'Saving...',
                    })
                    console.log('=========== Captured: ' + uri);
                    this.setState({
                        lastestPhoto: uri
                    });
                    CameraRoll.saveToCameraRoll(uri).then(newURI => {
                        Toast.show({
                            text: 'Photo Saved!',
                            type: 'success'
                        });
                        console.log('=========== Saved: ' + newURI);
                    }
                    ).catch(error => {
                        Toast.show({
                            text: 'Screen Not Captured! ' + error,
                            type: 'danger'
                        })
                        console.log('=========== Photo Not Saved!: ' + newURI);
                    });
                });
        } else {
            Toast.show({
                text: 'No Ref To Captured!',
                type: 'danger',
            })
        }
    }

    _getARFilterContainer() {
        let layerStyle;

        if (this.state.orientation === 'LANDSCAPE') {
            layerStyle = StyleSheet.create({
                logo: { width: '15%', top: -100, left: 20 }
            });
        } else {
            layerStyle = StyleSheet.create({
                logo: { width: '30%', top: -80, left: 20 }
            })
        }

        return (
            <NamespacesConsumer>{
                (t, { i18n }) => (
                    <Container>
                        <Content contentContainerStyle={{
                            flex: 1,
                            width: '100%',
                            backgroundColor: "white"
                        }}>
                            <View collapsable={false} style={{ flex: 1, width: '100%', height: '100%' }} >
                                {/* Canvas View */}
                                <View ref={(ref) => { this.viewRef = ref; }} collapsable={false} style={{ flex: 1, position: 'absolute', width: '100%', height: '100%' }}>
                                    {/* AR Photo View */}
                                    <Image
                                        source={{
                                            isStatic: true, uri: (Platform.select({
                                                ios: this.state.lastestPhoto,
                                                android: 'file://' + this.state.lastestPhoto
                                            }))
                                        }}
                                        style={{ position: 'absolute', flex: 1, width: '100%', height: '100%' }}
                                        onError={({ nativeEvent }) => { console.log('Error!!!!! ', nativeEvent.error) }} />
                                    {/* Filter View */}
                                    <View style={{ position: 'absolute', flex: 1, width: '100%', height: '100%' }}>
                                        <Image style={layerStyle.logo} resizeMode={"contain"} source={require('@SFAsset/ShadowFactory(black).png')} />
                                    </View>
                                </View>

                                {/* Button View */}
                                <Footer style={[Style.greyTopLine, { position: 'absolute', bottom: 0, backgroundColor: '#fcfcfc' }]}>
                                    <FooterTab>
                                        <TouchableOpacity style={[Style.flex, Style.layoutCenter, { backgroundColor: '#fcfcfc' }]} onPress={this._OnRetakePressed}>
                                            <Icon name="redo" type="FontAwesome" style={Style.textBlue} />
                                            <Text style={KOSEStyle.KOSEText[i18n.language]}>{t('arfiltereditor.retake')}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[Style.flex, Style.layoutCenter, { backgroundColor: '#fcfcfc' }]} onPressOut={this.ScreenCapture}>
                                            <Icon name="save" type="FontAwesome" style={Style.textBlue} />
                                            <Text style={KOSEStyle.KOSEText[i18n.language]}>{t('arfiltereditor.save')}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[Style.flex, Style.layoutCenter, { backgroundColor: '#fcfcfc' }]} onPressOut={this._OnSharePressed}>
                                            <Icon name="share" type="FontAwesome" style={Style.textBlue} />
                                            <Text style={KOSEStyle.KOSEText[i18n.language]}>{t('arfiltereditor.share')}</Text>
                                        </TouchableOpacity>
                                    </FooterTab>
                                </Footer>
                            </View>
                        </Content>
                    </Container>
                )}
            </NamespacesConsumer>
        );
    }

    _OnRetakePressed() {
        Orientation.unlockAllOrientations();
        this.props.onRetake();
        //NavigationService.navigate('PublicSceneAR');
    }

    _OnSharePressed() {
        if (this.viewRef !== null && this.viewRef !== undefined) {
            captureRef(this.viewRef, { format: 'jpg', quality: 0.9 })
                .then(uri => {
                    // Toast.show({
                    //     text: 'Screen Ref Captured! ' + uri,
                    //     type: 'success',
                    //     duration: 500
                    // })

                    this._share(uri);
                });
        } else {
            Toast.show({
                text: 'No Ref To Captured!',
                type: 'danger',
            })
        }
    }

    _share(uri) {
        if (_.isUndefined(uri) || _.isNull(uri))
            return;

        if (Platform.OS === 'ios') {
            CameraRoll.saveToCameraRoll(uri).then(newURI => {
                Toast.show({
                    text: 'Photo Saved!',
                    type: 'success'
                });

                console.log('=========== Captured: ' + uri);
                const msgToShare = { message: '', title: 'KOSE', url: 'file://' + uri }

                Share.share(msgToShare, { dialogTitle: 'KOSE' })
                    .then((result) => { console.log('------- Share result: ', result.action, result.activityType) });
            }
            ).catch(error => {
                // Toast.show({
                //     text: 'Screen Not Captured! ' + error,
                //     type: 'danger'
                // })

                console.log('=========== Screen Not Saved!: ' + newURI);
            });

        } else {

            const msgToShare = {
                title: 'KOSE',
                url: uri,
                subject: 'Share To'
            };

            RNShare.open(msgToShare).catch((error) => {
                console.log("Error: " + JSON.stringify(error));
            })
        }
    }
}

export default ARFilterEditor;