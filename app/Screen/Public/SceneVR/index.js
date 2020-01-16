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
  StyleSheet, Text, TouchableOpacity
} from 'react-native';
import { Container, Content, View, Toast, Icon } from 'native-base'
import NavigationService from '@Service/Navigation'

import Orientation from 'react-native-orientation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor } from 'react-native-responsive-screen';

import { ViroVRSceneNavigator } from 'react-viro';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: "E847F524-0DCE-4BF0-8C4C-BFA81775B0CC",

}

// Sets the default scene you want for AR and VR
var InitialVRScene = require('./BasicVR');

var UNSET = "UNSET";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class SceneVR extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
      lastScreenshot: '',
      orientation: 'PORTRAIT'
    }

    this._getVRNavigator = this._getVRNavigator.bind(this);
    this._onOrientationDidChange = this._onOrientationDidChange.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }

  componentDidMount() {
    lor(this);

    Orientation.unlockAllOrientations();

    Orientation.addOrientationListener(this._onOrientationDidChange);
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._onOrientationDidChange);

    this._exitViro();

    Orientation.lockToPortrait();
  }

  _onOrientationDidChange(orientation) {
    this.setState({
      orientation: orientation
    })
  }

  _getVRNavigator() {
    return (
      <Container>
        <Content contentContainerStyle={localStyles.viroContainer}>
          <View ref={(ref) => { this.viewRef = ref; }} collapsable={false} style={{ flex: 1, width: '100%', height: '100%', position: 'absolute' }} >
            <View collapsable={false} style={{ flex: 1 }}>
              <ViroVRSceneNavigator
                initialScene={{
                  scene: InitialVRScene
                }}
                {...this.state.sharedProps}
              />
            </View>
          </View>
        </Content>
      </Container>
    )
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: UNSET
    })
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    return this._getVRNavigator();
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
