'use strict';

import React, { Component } from 'react';
import { AsyncStorage, Touchableo } from 'react-native';

import EventManager from '@Manager/EventManager';
import ModelsManager from '@Manager/ModelsManager';

import { connect } from 'react-redux';
import { fetchImageMarkerData } from '../../../../redux/actions/imageMarkerAction';

import { Viro3DObject, ViroNode, ViroConstants } from 'react-viro';
import _ from 'lodash';

import ImageMarker from '@Component/AR/ImageMarker';

class ARMarkerView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isMaterialProcessed: false,
            markerCurrentDisplay: {},
            modelsProps: {}
        };

        this.modelKeyList = [];
        this.models = {};
        this.clickedObject = '';
        this.totalModelsCount = 0;

        this._onInitialized = this._onInitialized.bind(this);
        this._createModels = this._createModels.bind(this);

        this._getMarkers = this._getMarkers.bind(this);
        this._getModel = this._getModel.bind(this);
        this._getMaterials = this._getMaterials.bind(this);
        this._onMarkerDataUpdated = this._onMarkerDataUpdated.bind(this);

        this.ChangeModel = this.ChangeModel.bind(this);

        this.props.fetchImageMarkerData().then(this._onMarkerDataUpdated);
    }

    _onInitialized(state, reason) {
        if (state == ViroConstants.TRACKING_NORMAL) {
            AsyncStorage.setItem('isARPermissionGranted', 'true');
        } else if (state == ViroConstants.TRACKING_NONE) {
            AsyncStorage.setItem('isARPermissionGranted', 'false');
        }
    }

    componentDidMount() {
        // console.warn('--------- ARMarkerView componentDidMount ------------')

        EventManager.on('SwitchModel', this.ChangeModel);
    }

    _onMarkerDataUpdated() {
        // console.warn('--------- _onMarkerDataUpdated ------------')
        this.totalModelsCount = _.size(this.props.imageMarkerData.data.models);

        this._createModels();

        // console.warn('Models created: ' + _.size(this.models));

        if (_.isEmpty(this.state.markerCurrentDisplay)) {
            const data = this.props.imageMarkerData.data;
            this.modelKeyList = _.keys(data.models);

            var newDisplayData = {};

            for (const key in data.markers) {
                if (data.markers.hasOwnProperty(key)) {
                    const element = data.markers[key];
                    const targetDisplay = {
                        index: this.modelKeyList.findIndex(item => item === element.model.target),
                        model: data.models[element.model.target]
                    }

                    // console.warn('', targetDisplay);
                    newDisplayData[key] = targetDisplay;
                }
            }

            this.setState({
                markerCurrentDisplay: newDisplayData
            });
        }
    }

    _createModels() {
        var markerModels = this.props.imageMarkerData.data.models;

        for (const key in markerModels) {
            if (markerModels.hasOwnProperty(key)) {
                const element = markerModels[key];

                var newModelsProps = this.state.modelsProps;

                newModelsProps[key] = {
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                    scale: [1, 1, 1],
                    opacity: 1,
                    animation: {}
                }
                this.setState({ modelsProps: newModelsProps });

                this.models[key] = (
                    <Viro3DObject
                        type={_.isUndefined(element.type) ? 'VRX' : element.type}
                        key={key}
                        source={element.source}
                        resources={_.isUndefined(element.resources) ? [] : [{ uri: element.resources[0] }, { uri: element.resources[1] }, { uri: element.resources[2] }]}
                        position={this.state.modelsProps[key].position}
                        // materials={_.isUndefined(data.resources) ? [] : [key]}
                        rotation={this.state.modelsProps[key].rotation}
                        scale={this.state.modelsProps[key].scale}
                        opacity={this.state.modelsProps[key].opacity}
                        onClick={(position, source) => {
                            console.warn(key);
                            this.clickedObject = key;
                        }}
                        animation={this.state.modelsProps[key].animation}
                    />
                );

            }
        }
    }

    ChangeModel(state) {
        if (_.isEmpty(this.state.markerCurrentDisplay))
            return;

        var curDisplayObject = this.state.markerCurrentDisplay;

        for (const key in curDisplayObject) {
            if (curDisplayObject.hasOwnProperty(key)) {
                curDisplayObject[key].index += 1;

                if (curDisplayObject[key].index >= this.totalModelsCount) {
                    curDisplayObject[key].index = 0;
                }
            }
        }

        this.setState({
            markerCurrentDisplay: curDisplayObject
        });
        console.warn('Change Model!!' + JSON.stringify(this.state.markerCurrentDisplay));
    }

    _getMaterials() {
        if (_.isUndefined(this.props.imageMarkerData.data.materials))
            return;

        var materialTargets = {};

        for (const key in this.props.imageMarkerData.data.materials) {
            if (this.props.imageMarkerData.data.materials.hasOwnProperty(key)) {
                const element = this.props.imageMarkerData.data.materials[key];

                // materialTargets[key] = {
                //     lightingModel: "Blinn",
                //     shininess: 1
                // }
                materialTargets[key].push(element);
            }
        }

        ViroMaterials.createMaterials(materialTargets);
    }

    _getMarkers() {
        if (_.isUndefined(this.props.imageMarkerData))
            return null;
        if (_.isEmpty(this.props.imageMarkerData.data))
            return null;

        var markerDataList = this.props.imageMarkerData.data.markers;
        var markerModels = this.props.imageMarkerData.data.models;

        var markerList = []

        for (const key in markerDataList) {
            if (markerDataList.hasOwnProperty(key)) {
                const element = markerDataList[key];

                var modelIndex = 0;
                var model = null;

                if (_.isUndefined(this.state.markerCurrentDisplay[key])) {
                    modelIndex = 0;
                    model = markerModels[element.model.target];
                } else {
                    modelIndex = this.state.markerCurrentDisplay[key].index;
                    model = this.state.markerCurrentDisplay[key].model;
                }

                model = _.merge(model, element.model);

                markerList.push(
                    <ImageMarker key={key} markerKey={key} markerData={element}>
                        {/* {this._getModel(element.model.targets[modelIndex], model)} */}
                        {this._showModel(element.model.targets[modelIndex], model)}
                    </ImageMarker>
                );
            }
        }

        return markerList;
    }

    _showModel(key, data) {
        if (_.size(this.models) < 1 || _.isEmpty(this.state.modelsProps))
            return null;

        var markerModels = this.props.imageMarkerData.data.models;
        var targetModel = null;

        if (markerModels.hasOwnProperty(key)) {
            const element = markerModels[key];

            targetModel = (
                <Viro3DObject
                    type={_.isUndefined(element.type) ? 'VRX' : element.type}
                    key={key}
                    source={element.source}
                    resources={_.isUndefined(element.resources) ? [] : [{ uri: element.resources[0] }, { uri: element.resources[1] }, { uri: element.resources[2] }]}
                    position={data.position}
                    // materials={_.isUndefined(data.resources) ? [] : [key]}
                    rotation={data.rotation}
                    scale={data.scale}
                    opacity={data.opacity}
                    onClick={(position, source) => {
                        console.warn(key);
                        this.clickedObject = key;
                    }}
                // animation={data.animation}
                />
            );

        }

        return targetModel;
    }

    _getModel(key, data) {
        var curData;

        if (_.isUndefined(this.state.markerCurrentDisplay[key])) {
            console.warn("No Model");
            curData = data;
        } else {
            // var markerModels = this.props.imageMarkerData.data.models;
            console.warn("Have Model");
            curData = this.state.markerCurrentDisplay[key].model;
            curData = _.merge(curData, this.props.imageMarkerData.data.markers.model);
        }

        if (!curData) {
            console.warn("No curData");
            return null;
        }

        return this.models[key];
    }

    render() {
        return (
            <ViroNode>
                {this._getMarkers()}
            </ViroNode>
        );
    }
}


function mapStateToProps(state) {
    return {
        imageMarkerData: state.imageMarkerData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchImageMarkerData: () => dispatch(fetchImageMarkerData())
    }
}

const ReduxARMarkerView = connect(
    mapStateToProps,
    mapDispatchToProps
)(ARMarkerView)

export default ReduxARMarkerView;

// module.exports = ReduxARMarkerView;
