import React, { Component } from 'react';
import { StyleSheet, Linking } from 'react-native';

import EventManager from '@Manager/EventManager';
import { AR_ANCHOR_FOUND } from '@Constant/ARConstant';

import { connect } from 'react-redux';

import { ViroText, Viro3DObject, ViroARImageMarker, ViroVideo, ViroImage, ViroARTrackingTargets, ViroMaterials, ViroAnimations, ViroNode } from 'react-viro';
import _ from 'lodash';

type Props = {};
class ImageMarkerController extends Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            dragPos: null,
            modelAni: []
        }

        this.HandleSpawn = this.HandleSpawn.bind(this);
        this.SpawnModel = this.SpawnModel.bind(this);
        this.SpawnVideo = this.SpawnVideo.bind(this);
        this.SpawnImage = this.SpawnImage.bind(this);
        this.SpawnText = this.SpawnText.bind(this);

        this.models = [];
    }

    HandleSpawn() {
        if (_.isEmpty(this.props.imageMarkerData) || _.isEmpty(this.props.imageMarkerData.data))
            return null;

        var newBornList = [];
        var animationTargets = this.props.imageMarkerData.data.animations;
        var markerTargets = {};
        var materialTargets = {};
        var markerModels = this.props.imageMarkerData.data.models;

        for (const key in this.props.imageMarkerData.data.markers) {
            if (this.props.imageMarkerData.data.markers.hasOwnProperty(key)) {
                const element = this.props.imageMarkerData.data.markers[key];
                if (_.isEmpty(element))
                    continue;

                markerTargets[key] = {
                    source: element.detectionImage.source,
                    orientation: element.detectionImage.orientation,
                    physicalWidth: element.detectionImage.physicalWidth
                }

                if (!_.isEmpty(element.model)) {
                    if (!_.isEmpty(element.model.resources)) {
                        materialTargets[key] = {
                            lightingModel: "Blinn",
                            diffuseTexture: { uri: element.model.resources[0] },
                            specularTexture: { uri: element.model.resources[1] },
                            shininess: 1,
                            normalTexture: { uri: element.model.resources[2] }
                        }
                    }
                }
            };
        }

        // console.log("Markers: ", markerTargets);
        ViroAnimations.registerAnimations(animationTargets);
        ViroARTrackingTargets.createTargets(markerTargets);
        ViroMaterials.createMaterials(materialTargets);

        var keyID = 0;
        for (const key in this.props.imageMarkerData.data.markers) {
            if (this.props.imageMarkerData.data.markers.hasOwnProperty(key)) {
                const element = this.props.imageMarkerData.data.markers[key];
                if (_.isEmpty(element))
                    continue;

                // console.log("Marker: ", element);
                var model = markerModels[element.model.target];
                model = _.merge(model, element.model);

                for (let index = 0; index < markerModels.length; index++) {
                    const element = markerModels[index];
                    this.models.push({
                        key: key,
                        model: this.SpawnModel(key, model)
                    });
                }

                newBornList.push((
                    <ViroARImageMarker
                        key={key}
                        target={key}
                        onAnchorFound={() => {
                            console.warn('Anchor ' + key + ' is found.');
                            if (!_.isUndefined(element.model.animations)) {
                                var newAni = this.state.modelAni;
                                newAni[key] = element.model.animations;
                                this.setState({
                                    modelAni: newAni
                                })
                            }

                            EventManager.emit(AR_ANCHOR_FOUND);
                        }}
                    >
                        {_.isUndefined(element.movie) ? null : this.SpawnVideo(key + "Video" + keyID, element.movie)}
                        {_.isUndefined(element.model) ? null : this.SpawnModel(key, model)}
                        {_.isUndefined(element.text) ? null : this.SpawnText(key + "Text" + keyID, element.text)}
                        {_.isUndefined(element.image) ? null : this.SpawnImage(key + "Image" + keyID, element.image)}
                        {/* {this.SpawnParticleEmitter()} */}
                    </ViroARImageMarker>
                ))

                keyID++;
            };
        }

        if (_.isEmpty(newBornList))
            return null;

        return (
            <ViroNode>{newBornList}</ViroNode>
        );
    }

    SpawnVideo(key, data) {
        // console.log("SpawnVideo: ", key, ", ", data);

        return (
            <ViroVideo
                key={key}
                source={data.source}
                position={data.position}
                scale={data.scale}
                rotation={data.rotation}
                onClick={() => { Linking.openURL(data.url) }}
            />
        );
    }

    SpawnModel(key, data) {
        return (
            <Viro3DObject
                type={_.isUndefined(data.type) ? 'VRX' : data.type}
                key={key}
                source={data.source}
                resources={_.isUndefined(data.resources) ? [] : [{ uri: data.resources[0] }, { uri: data.resources[1] }, { uri: data.resources[2] }]}
                position={this.state.dragPos ? this.state.dragPos : data.position}
                materials={_.isUndefined(data.resources) ? [] : [key]}
                rotation={data.rotation}
                scale={data.scale}
                // opacity={_.isUndefined(data.opacity) ? 1 : data.opacity}
                dragType='FixedDistance'
                onDrag={(dragToPos, source) => {
                    // this.setState({
                    //     dragPos: { x: dragToPos[0], y: dragToPos[1], z: dragToPos[2] }
                    // })
                }}
                onLoadStart={() => {
                    // console.warn(key + ' is loading.')
                }}
                onLoadEnd={() => {
                    // console.warn(key + ' loading is finished.')
                    // this.models[key].props.animation.run = true;
                }}
            // animation={this.state.modelAni[key]}
            />
        );
    }

    SpawnImage(key, data) {
        // console.log("SpawnImage: ", key, ", ", data);
        var imageNodes = [];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            imageNodes.push((
                <ViroImage
                    key={key + "IN" + index}
                    height={element.height}
                    width={element.width}
                    placeholderSource={require('@SFAsset/ShadowFactory(black).png')}
                    source={element.source}
                    rotation={element.rotation}
                    position={element.position}
                />
            ));
        }
        return imageNodes;
    }

    SpawnText(key, data) {
        // console.log("SpawnText: ", key, ", ", data);
        return (
            <ViroText
                key={key}
                text={data.text}
                textAlign={data.align}
                color={data.color}
                height={data.height}
                width={data.width}
                style={data.style}
                position={data.position}
                rotation={data.rotation}
            />
        );
    }

    // SpawnParticleEmitter() {
    //     return (
    //         <ViroParticleEmitter
    //             position={[0, 4.5, 0]}
    //             duration={2000}
    //             visible={true}
    //             delay={0}
    //             run={true}
    //             loop={true}
    //             fixedToEmitter={true}

    //             image={{
    //                 source: require("../res/particle3.png"),
    //                 height: 0.1,
    //                 width: 0.1,
    //                 bloomThreshold: 1.0
    //             }}

    //             spawnBehavior={{
    //                 particleLifetime: [4000, 4000],
    //                 emissionRatePerSecond: [150, 200],
    //                 spawnVolume: {
    //                     shape: "box",
    //                     params: [20, 1, 20],
    //                     spawnOnSurface: false
    //                 },
    //                 maxParticles: 800
    //             }}

    //             particleAppearance={{
    //                 opacity: {
    //                     initialRange: [0, 0],
    //                     factor: "time",
    //                     interpolation: [
    //                         { endValue: 0.5, interval: [0, 500] },
    //                         { endValue: 1.0, interval: [4000, 5000] }
    //                     ]
    //                 },

    //                 rotation: {
    //                     initialRange: [0, 360],
    //                     factor: "time",
    //                     interpolation: [
    //                         { endValue: 1080, interval: [0, 5000] },
    //                     ]
    //                 },

    //                 scale: {
    //                     initialRange: [[5, 5, 5], [10, 10, 10]],
    //                     factor: "time",
    //                     interpolation: [
    //                         { endValue: [3, 3, 3], interval: [0, 4000] },
    //                         { endValue: [0, 0, 0], interval: [4000, 5000] }
    //                     ]
    //                 },
    //             }}

    //             particlePhysics={{
    //                 velocity: {
    //                     initialRange: [[-2, 3.5, 0], [2, -3.5, 4]]
    //                 }
    //             }}
    //         />
    //     );
    // }

    render() {
        if (_.isUndefined(this.props.imageMarkerData) || _.isEmpty(this.props.imageMarkerData)) {
            return null;
        } else {
            return this.HandleSpawn();
        }
    }
}

function mapStateToProps(state) {
    return {
        imageMarkerData: state.imageMarkerData
    };
}

const ReduxImageMarkerController = connect(
    mapStateToProps
)(ImageMarkerController);

export default ReduxImageMarkerController;

// module.exports = ReduxImageMarkerController;
