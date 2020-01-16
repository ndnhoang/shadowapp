import React, { Component } from 'react';
import { Viro360Video, ViroScene, ViroText } from 'react-viro';

export default class Video360 extends Component {
    constructor(props) {
        super(props);

        this._onDone = this._onDone.bind(this);
        this._onError = this._onError.bind(this);
    }

    _onDone() {
        if (this.props.onDone)
            this.props.onDone();
    }
    _onError(error) {
        if (this.props.onError)
            this.props.onError();
    }

    render() {
        return (
            <ViroScene>
                <Viro360Video
                    source={require("@SFAsset/movies/splash.mp4")}
                    onFinish={this._onDone}
                    onError={this._onError}
                    loop={false}
                    paused={false}
                    volume={1.0}
                    rotation={[0, 90, 0]} />
            </ViroScene>
        )
    }
}