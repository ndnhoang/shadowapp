import React, { Component } from 'react';
import { Viro3DObject } from 'react-viro';
import _ from 'lodash';

var modelList = {};

class ModelObject extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Viro3DObject
                type={_.isUndefined(this.props.data.type) ? 'VRX' : this.props.data.type}
                key={this.props.key}
                source={this.props.data.source}
                resources={_.isUndefined(this.props.data.resources) ? [] : [{ uri: this.props.data.resources[0] }, { uri: this.props.data.resources[1] }, { uri: this.props.data.resources[2] }]}
                position={this.props.data.position}
                materials={_.isUndefined(this.props.data.resources) ? [] : [key]}
                rotation={this.props.data.rotation}
                scale={this.props.data.scale}
                opacity={_.isUndefined(this.props.data.opacity) ? 1 : this.props.data.opacity}
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

}

export default ModelObject;
