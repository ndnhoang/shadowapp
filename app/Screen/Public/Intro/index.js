import React from 'react'
import { StyleSheet, StatusBar, TouchableWithoutFeedback } from 'react-native'
import { Container, View, } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Orientation from 'react-native-orientation';

import Intro360 from './Intro360';
import IntroVideo from './IntroVideo';

import FirebaseSystem from '../../../Service/FirebaseSystem';

import NavigationService from '@Service/Navigation'

import Style from '@Theme/Style'

export default class extends React.Component {
  constructor(props) {
    super(props);

    FirebaseSystem.instance.connect();

    this._getIntro = this._getIntro.bind(this);
    this._onDone = this._onDone.bind(this);
    this._onSkip = this._onSkip.bind(this);
    this._handleTap = this._handleTap.bind(this);

    this.lastTap = null;
  }

  componentDidMount() {
    Orientation.lockToPortrait();
  }

  _getIntro() {
    const isUse360 = this.props.navigation.getParam('use360', false);
    if (isUse360)
      return (
        <View style={{ flex: 1 }}>
          <Intro360 onDone={this._onDone} onError={this._onSkip} />
        </View>
      );
    else
      return (
        <View style={[{ flex: 1, width: wp('100%'), height: hp('100%') }, Style.layoutCenter]}>
          <IntroVideo onDone={this._onDone} onError={this._onSkip} />
        </View>
      );
  }

  _onDone() {
    NavigationService.navigate('AppNav');
  }
  _onSkip() {
    NavigationService.navigate('AppNav');
  }

  _handleTap() {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
      this._onSkip();
    } else {
      this.lastTap = now;
    }
  }

  render() {
    return (
      <View style={[Style.SFBlack, { width: '100%', height: '100%' }]} >
        <StatusBar backgroundColor={Style.SFBlack.backgroundColor} animated barStyle="light-content" />
        <TouchableWithoutFeedback onPressOut={this._handleTap}>
          {this._getIntro()}
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
