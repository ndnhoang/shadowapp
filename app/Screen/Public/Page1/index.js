import React from 'react';
import { ImageBackground } from 'react-native';
import { Text, View, Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Col, Row, Grid } from "react-native-easy-grid";

import NavigationService from '@Service/Navigation';


import Style from '@Theme/Style';
import PageStyle from './Style';

//const {width, height} = Dimensions.get('window')
// const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class Page1 extends React.Component {
  render() {
    return (
      <View>
        <ImageBackground source={require('@SFAsset/firework.jpg')} style={{ width: wp('100%'), height: hp('100%') }}>
          <Grid style={[Style.blackOverlay, Style.p2]}>
            <Row size={1} style={[Style.justifyStart, Style.alignStart]}>
            </Row>
            <Row size={3} style={[Style.flexColumn, Style.justifyCenter]}>
              <Text style={[Style.SFText, Style.textWhite, { fontSize: 48, }]}>WELCOME</Text>
              <Text style={[Style.SFText, Style.textWhite, { fontSize: 48, }]}>TO THE</Text>
              <Text style={[Style.SFTextBold, Style.textWhite, { fontSize: 52, }]}>SHADOW FACTORY APP</Text>
            </Row>
            <Row size={2} style={[Style.justifyStart, Style.alignStart]}>
              <Col size={1} style={[Style.justifyStart, Style.alignStart]}>
              </Col>
              <Col size={2} style={[Style.alignEnd]}>
                <Text style={[Style.bodyCopy, Style.textWhite]}>Check out what our AR camera can do with our business cards.</Text>
                <Icon type="FontAwesome" name="level-down" style={{ fontSize: 48, color: '#FFFFFF' }} />
              </Col>
            </Row>
          </Grid>
        </ImageBackground>
      </View>
    )
  }
}
