'use strict';

import React, { Component } from 'react';

import { View } from 'react-native';

import {
  ViroScene,
  ViroText,
  Viro360Image,
} from 'react-viro';

import Style from '@Theme/Style'

class BasicVR extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ViroScene>
        <Viro360Image source={require('@SFAsset/360photo/westlake_towers.jpg')} />
        <ViroText text={"Hello World!"} width={2} height={2} position={[0, 0, -2]} />
      </ViroScene>
    );
  }
}

export default BasicVR;
module.exports = BasicVR;