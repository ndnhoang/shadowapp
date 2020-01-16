import React from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { Container, View, } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import RNVideo from 'react-native-video';

import Style from '@Theme/Style'

const styles = StyleSheet.create({
    image: {
        top: 20,
        width: wp('100%'),
        height: hp('100%'),
        resizeMode: 'cover'
    }
});

export default class extends React.Component {
    constructor(props) {
        super(props);

        this._onDone = this._onDone.bind(this);
        this._onError = this._onError.bind(this);
    }

    _onDone() {
        if (this.props.onDone)
            this.props.onDone();
    }
    _onError() {
        if (this.props._onError)
            this.props._onError();
    }

    render() {
        return (
            <RNVideo source={require("@SFAsset/movies/Shadow_Factory_2.mp4")}   // Can be a URL or a local file.
                ref={(ref) => {
                    this.player = ref
                }}                                      // Store reference
                onBuffer={() => { console.log("--------------- Video Bufferring!!!!------------") }}                // Callback when remote video is buffering
                onEnd={() => { this._onDone(); }}                      // Callback when playback finishes
                onError={() => { console.log("--------------- Video Error!!!!------------") }}               // Callback when video cannot be loaded
                style={[{ width: wp('100%'), height: hp('27%') }]} />
        )
    }
}