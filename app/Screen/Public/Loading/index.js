import React from 'react'
import { Container, View, Spinner } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import AppIntroSlider from 'react-native-app-intro-slider'

import Firebase, { Notification } from 'react-native-firebase';
import i18next from 'i18next';

import NavigationService from '@Service/Navigation'

import Style from '@Theme/Style'

export default class extends React.Component {
  constructor(props) {
    super(props);


  }



  onDone = () => {
    NavigationService.navigate('PublicHome')
  }
  onSkip = () => {
    NavigationService.navigate('PublicHome')
  }
  render() {
    return <Container style={Style.SFBlack}>
      <View>
        <Spinner />
      </View>
    </Container>
  }
}