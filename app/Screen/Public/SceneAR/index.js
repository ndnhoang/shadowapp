/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import { StyleSheet, Text, AsyncStorage } from 'react-native';
import { Container, Content, View, Toast, Icon, Button } from 'native-base'
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';
import ScalableImage from 'react-native-scalable-image';
import SVGImage from 'react-native-remote-svg';
import Orientation from 'react-native-orientation';

import EventManager from '@Manager/EventManager';
import { AR_ANCHOR_FOUND } from '@Constant/ARConstant';

import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor } from 'react-native-responsive-screen';

import { ViroARSceneNavigator, ViroUtils } from 'react-viro';

import NavigationService from '@Service/Navigation'

import Header from '@Component/Header';
// import MutableFooter from '@Component/MutableFooter';
import ScanningLine from '@Component/AR/ScanningLine';
import PermissionNotify from './PermissionNotify';
import ARFilterEditor from './ARFilterEditor';

import Style from '@Theme/Style'
import PageStyle from "./Style";

import { NamespacesConsumer } from 'react-i18next';
import InitialARScene from './BasicAR';

var _ = require('lodash');

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: "E847F524-0DCE-4BF0-8C4C-BFA81775B0CC",
}

// Sets the default scene you want for AR and VR
// var InitialARScene = require('./BasicAR');
// var InitialARScene = require('./ARMarkerView');

var UNSET = "UNSET";
var AR_NAVIGATOR_TYPE = "AR";
var isARSupportedOnDevice = ViroUtils.isARSupportedOnDevice;

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class SceneAR extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPermissionGranted: null,
      isPermissionNotified: false,
      isARSupported: true,
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
      lastScreenshot: '',
      orientation: 'PORTRAIT',
      arAnchorFound: false
    }

    this._didFocus = this._didFocus.bind(this);
    this._willBlur = this._willBlur.bind(this);
    // this._didBlur = this._didBlur.bind(this);
    this._startViro = this._startViro.bind(this);

    this._getIsPermissionGranted = this._getIsPermissionGranted.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getARPermissionRequest = this._getARPermissionRequest.bind(this);
    this._onOrientationDidChange = this._onOrientationDidChange.bind(this);

    this._onARSupportedDevice = this._onARSupportedDevice.bind(this);
    this._onNonARSupportedDevice = this._onNonARSupportedDevice.bind(this);
    this._getUnsupported = this._getUnsupported.bind(this);

    this._onHandlerStateChange = this._onHandlerStateChange.bind(this);

    this._onARAnchorFound = this._onARAnchorFound.bind(this);
    this._getScanningLine = this._getScanningLine.bind(this);

    this._ARScreenCapture = this._ARScreenCapture.bind(this);
    this.HandleOnRetake = this.HandleOnRetake.bind(this);

    this._exitViro = this._exitViro.bind(this);

    this.arSceneNav = null;
    this.viewRef = null;


    // this.willFocusSubscription = this.props.navigation.addListener(
    //   'willFocus',
    //   payload => {
    //     this._willFocus();
    //   }
    // );

    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this._didFocus();
      }
    );

    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      payload => {
        this._willBlur();
      }
    );

    // this.didBlurSubscription = this.props.navigation.addListener(
    //   'didBlur',
    //   payload => {
    //     this._didBlur();
    //   }
    // );

  }

  componentDidMount() {
    console.warn('SceneAR mount!');
  }

  componentWillUnmount() {
    console.warn('SceneAR will unmount!');
  }

  _didFocus() {
    console.warn('_didFocus');
    // console.warn('Constant: ', AR_ANCHOR_FOUND)

    isARSupportedOnDevice(this._onNonARSupportedDevice, this._getIsPermissionGranted);

    EventManager.once(AR_ANCHOR_FOUND, this._onARAnchorFound);

    // this._getIsPermissionGranted();

    // lor(this);

    // Orientation.unlockAllOrientations();
    // Orientation.addOrientationListener(this._onOrientationDidChange);
  }

  _willBlur() {
    console.warn('_willBlur ')
    // Orientation.removeOrientationListener(this._onOrientationDidChange);
    // Orientation.lockToPortrait();

    this.didFocusSubscription.remove();
    this.willBlurSubscription.remove();

    EventManager.removeListener(AR_ANCHOR_FOUND);

    // NavigationService.resetTop('AppNav');
  }

  _getIsPermissionGranted() {
    AsyncStorage.getItem('isARPermissionGranted')
      .then((value) => {
        console.warn('_getIsPermissionGranted ', value)
        if (value === 'true') {
          console.warn('Its true')
          this.setState({
            isPermissionGranted: true,
            navigatorType: AR_NAVIGATOR_TYPE
          })
        } else {
          console.warn('Its false')
          this.setState({
            isPermissionGranted: false
          })
        }
      })
      .catch(() => {
        console.warn('_getIsPermissionGranted rejected')
      })
  }

  _onOrientationDidChange(orientation) {
    this.setState({
      orientation: orientation
    })
  }

  _onARSupportedDevice() {
    this.setState({
      isARSupported: true
    })
  }

  _onNonARSupportedDevice() {
    this.setState({
      isARSupported: false
    })
  }

  _onARAnchorFound() {
    this.setState({
      arAnchorFound: true
    })
  }

  _onHandlerStateChange({ nativeEvent }) {
    if (nativeEvent.state === State.ACTIVE) {
      console.warn("I'm flinged in ar camera! ");
      EventManager.emit('SwitchModel');
    } else if (nativeEvent.state === State.END) {
      console.warn("The flinged End! ");
    }
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType === UNSET)
      return this._getUnsupported();

    if (this.state.isARSupported) {
      if (this.state.isPermissionGranted === true) {
        return this._getARNavigator();
      } else if (this.state.isPermissionGranted === false) {
        if (this.state.isPermissionNotified)
          return this._getARNavigator();
        else
          return this._getARPermissionRequest();
      }
    }

    return this._getUnsupported();
  }

  _getARPermissionRequest() {
    return (
      <PermissionNotify
        onOK={() => { this.setState({ isPermissionNotified: true }) }}
        onBack={() => { NavigationService.navigate('PublicHome') }} />
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    let buttonStyle;

    if (this.state.orientation === 'LANDSCAPE') {
      buttonStyle = StyleSheet.create({
        captureButtonState: {
          top: hp('50%'),
          right: 30
        },
        closeButtonState: {
          right: 15,
          top: 10
        },
        logo: { width: wp('30%'), top: 20, left: 20 }
      });
    } else {
      buttonStyle = StyleSheet.create({
        captureButtonState: {
          bottom: 20,
          alignSelf: 'center'
        },
        closeButtonState: {
          right: 0,
          top: 20
        },
        logo: { width: wp('30%'), top: 20, left: 20 }
      })
    }

    return (
      <Container>
        <Content contentContainerStyle={localStyles.viroContainer}>
          <View ref={(ref) => { this.viewRef = ref; }} collapsable={false} style={{ flex: 1, width: '100%', height: '100%', position: 'absolute' }} >
            <View collapsable={false} style={{ flex: 1 }}>
              <ViroARSceneNavigator ref={(ref) => {
                // console.log('--------------- Referenced -----------------');
                this.arSceneNav = ref;
              }} {...this.state.sharedProps}
                viroAppProps={{ testing: 'Hey' }}
                initialScene={{ scene: InitialARScene, passProps: { displayObject: true } }}
              />
            </View>
            <FlingGestureHandler {...this.props}
              direction={Directions.LEFT | Directions.RIGHT}
              onHandlerStateChange={this._onHandlerStateChange}
            >
              <View style={{ flex: 1, width: '100%', height: '100%', position: 'absolute', backgroundColor: '#ffffff00' }}>

                <View style={[{ flex: 1, position: 'absolute' }, buttonStyle.closeButtonState]}>
                  <Button transparent onPressOut={() => {
                    this._exitViro();

                    // NavigationService.pop();
                    NavigationService.navigate('AppNav');
                  }} >
                    <Icon type="MaterialCommunityIcons" name='close' style={{ fontSize: 42, color: '#fff', opacity: 0.7 }} />
                  </Button>
                </View>

                <View style={[{ flex: 1, position: 'absolute' }, buttonStyle.captureButtonState]}>
                  <Button transparent onPressOut={this._ARScreenCapture} >
                    <Icon type="FontAwesome" name='camera' style={{ fontSize: 52, color: '#fff', opacity: 0.7 }} />
                  </Button>
                </View>

                <View style={{ position: 'absolute', flex: 1, width: '100%', height: '100%' }}>
                  <ScalableImage opacity={0.7} style={buttonStyle.logo} width={buttonStyle.logo.width} resizeMode={"contain"} source={require('@SFAsset/ShadowFactory(white).png')} />
                </View>

              </View>
            </FlingGestureHandler>
          </View>
          {this._getARPhotoContainer()}
        </Content>
      </Container>
    );
  }

  _getScanningLine() {
    // Hide the scanning line when anchor found.
    if (this.state.arAnchorFound)
      return null;

    return (<ScanningLine style={{ flex: 1, position: 'absolute' }} />);
  }

  _getARPhotoContainer() {
    if (_.isEmpty(this.state.lastScreenshot)) {
      return null;
    } else {
      return (
        <ARFilterEditor lastestPhoto={this.state.lastScreenshot} onRetake={this.HandleOnRetake} orientation={this.state.orientation} />
      );
    }
  }

  _ARScreenCapture() {
    if (this.arSceneNav !== null && this.arSceneNav !== undefined) {
      this.arSceneNav._takeScreenshot('shadowfactorSS', false)
        .then((result) => {
          if (result.success) {
            Toast.show({
              text: 'Photo Captured!',
            });

            this.setState({
              lastScreenshot: result.url
            });
            console.log('--------------- Captured ', result.url, ' ----------------')
          } else {
            console.log('--------------- Error ', result.errorCode, ' ----------------')
          }
        }).catch((error) => {
          console.log('--------------- Catch Error ', error, ' ----------------')
        });
    } else {
      console.log('--------------- Null ----------------');
    }
  }

  _getUnsupported() {
    return (
      <NamespacesConsumer >{
        (t, { i18n }) => (
          <Container style={Style.bgMain}>

            <Header style={Style.SFWhite} buttonOnRight={true} useBackButton={true}
              overrideBackButton={() => {
                NavigationService.navigate('AppNav');
              }} />
            <Content contentContainerStyle={Style.layoutCenter}>
              <View style={Style.layoutCenter}>
                <Text>Sorry, ar is not supported on your device.</Text>
              </View>
            </Content>
          </Container>
        )
      }
      </NamespacesConsumer>
    )
  }

  _getAROffUI() {
    return (
      <NamespacesConsumer >{
        (t, { i18n }) => (
          <Container style={Style.bgMain}>

            <Header style={Style.SFWhite} buttonOnRight={true} useBackButton={true}
              overrideBackButton={() => {
                NavigationService.navigate('AppNav');
              }} />
            <Content contentContainerStyle={Style.layoutCenter}>
              <View style={Style.layoutCenter}>
                <Text>Turning off AR feature.</Text>
              </View>
            </Content>
          </Container>
        )
      }
      </NamespacesConsumer>
    )
  }

  HandleOnRetake() {
    this.setState({
      lastScreenshot: ''
    });
  }

  _startViro() {
    this.setState({
      navigatorType: AR_NAVIGATOR_TYPE
    })
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: UNSET
    })
  }
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: "black",
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "black",
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});
