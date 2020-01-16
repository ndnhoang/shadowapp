import React, { Component } from 'react';
import { StyleSheet, Linking } from 'react-native';

import EventManager from '@Manager/EventManager';
import { AR_ANCHOR_FOUND } from '@Constant/ARConstant';

import { connect } from 'react-redux';

import { ViroText, Viro3DObject, ViroARImageMarker, ViroVideo, ViroImage, ViroARTrackingTargets, ViroMaterials, ViroAnimations, ViroNode } from 'react-viro';
import _ from 'lodash';

type Props = {};
class ImageMarker extends Component<Props> {
    constructor(props) {
        super(props);

        this._getMarker = this._getMarker.bind(this);
    }

    _getMarker() {

        const element = this.props.markerData;

        // console.warn("Element: " + JSON.stringify(element));
        var newMarker = null;
        var markerKey = "" + this.props.markerKey;
        var markerTarget = {};

        markerTarget[markerKey] = {
            source: element.detectionImage.source,
            orientation: element.detectionImage.orientation,
            physicalWidth: element.detectionImage.physicalWidth
        };

        // console.warn("Markers: ", JSON.stringify(markerTarget));
        ViroARTrackingTargets.createTargets(markerTarget);
        // return null;

        newMarker = (
            <ViroARImageMarker
                target={markerKey}
                onAnchorFound={() => {
                    console.warn(markerKey + ' found here!!!')
                    EventManager.emit(AR_ANCHOR_FOUND);
                }}
            >
                {this.props.children}
            </ViroARImageMarker>
        );

        return (
            <ViroNode>{newMarker}</ViroNode>
        );
    }

    render() {
        if (_.isUndefined(this.props.markerData))
            return null;

        return this._getMarker();
    }
}

export default ImageMarker;

// module.exports = ReduxImageMarkerController;
