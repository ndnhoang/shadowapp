'use strict';

import React, { Component } from 'react';

import { StyleSheet, AsyncStorage } from 'react-native';

import EventManager from '@Manager/EventManager';

import { connect } from 'react-redux';
import { fetchImageMarkerData } from '../../../../redux/actions/imageMarkerAction';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  Viro3DObject,
  ViroDirectionalLight,
  ViroAmbientLight,
  ViroSpotLight,
  ViroMaterials,
  ViroBox,
  ViroQuad,
} from 'react-viro';

// import ImageMarkerController from '../../../Component/controller/KOSEImageMarkerController';
import ImageMarkerController from '../../../Component/controller/ImageMarkerController';
import ARMarkerView from './ARMarkerView';

class BasicAR extends Component {

  constructor(props) {
    super(props);

    this._onInitialized = this._onInitialized.bind(this);
    this.ChangeModel = this.ChangeModel.bind(this);
  }

  componentDidMount() {
    // console.log('--------- componentDidMount ------------')
    // this.props.fetchImageMarkerData();

    EventManager.on('SwitchModel', this.ChangeModel);
  }

  ChangeModel(state) {
    console.warn('Change Model!!' + state);
  }

  render() {
    // console.warn('Render: ' + JSON.stringify(this.props.displayObject));
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroAmbientLight color={'#ffffff'} intensity={600}
          shadowOrthographicPosition={[0, 3, -2]}
          shadowOrthographicSize={10}
          shadowNearZ={2}
          shadowFarZ={9}
          castsShadow={true} />
        <ViroDirectionalLight color={'#ffffff'} position={[0, 3, -2]} intensity={600} direction={[0.5, -0.5, 0.1]}
          shadowOrthographicPosition={[0, 3, -5]}
          shadowOrthographicSize={10}
          shadowNearZ={2}
          shadowFarZ={9}
          castsShadow={true} />
        {/* <ImageMarkerController /> */}
        <ARMarkerView />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      AsyncStorage.setItem('isARPermissionGranted', 'true');
    } else if (state == ViroConstants.TRACKING_NONE) {
      AsyncStorage.setItem('isARPermissionGranted', 'false');
    }
  }
}

ViroMaterials.createMaterials({
  carz: {
    lightingModel: "Blinn"
  },
  grid: {
    lightingModel: "Lambert",
  }
});

// function mapStateToProps(state) {
//   return {
//     imageMarkerData: state.imageMarkerData
//   }
// }

function mapDispatchToProps(dispatch) {
  return {
    fetchImageMarkerData: () => dispatch(fetchImageMarkerData())
  }
}

const ReduxBasicAR = connect(
  mapDispatchToProps
)(BasicAR)

export default ReduxBasicAR;

module.exports = ReduxBasicAR;
