import React from 'react'
import { View, Animated, Easing } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { NamespacesConsumer } from 'react-i18next';

import PageStyle from './Style';
import Style from '@Theme/Style'

export default class ScanningLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scanningPos: { y: new Animated.Value(-PageStyle.contentContainer.height) }
        }

        this._startScanning = this._startScanning.bind(this);
    }

    componentDidMount() {
        this._startScanning();
    }

    _getScanningLine() {
        if (this.props.useImage) {
            return (
                <Image source={require('@SFAsset/scanLayer.png')} />
            );
        } else {
            return (
                <Animated.View style={{ top: this.state.scanningPos.y }}>
                    <LinearGradient
                        colors={PageStyle.scanningLineColor}
                        style={PageStyle.contentContainer}
                    />
                </Animated.View>
            );
        }
    }

    _startScanning() {
        this.state.scanningPos.y.setValue(-PageStyle.contentContainer.height);
        Animated.timing(
            this.state.scanningPos.y, {
                toValue: hp('100%'),
                duration: 10000,
                easing: Easing.linear
            }).start(() => this._startScanning());
    }

    render() {
        return (
            <View style={[this.props.style, PageStyle.container]}>
                {this._getScanningLine()}
            </View>
        )
    }
}