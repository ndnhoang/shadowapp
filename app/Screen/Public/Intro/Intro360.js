import React from 'react'
import { View } from 'react-native'

import { ViroVRSceneNavigator } from 'react-viro';

import { VIROAPI_KEY } from '../../../../keyConfig';

import Video360 from './Video360';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ViroVRSceneNavigator
                    apiKey={VIROAPI_KEY}
                    initialScene={{
                        scene: Video360,
                        passProps: this.props
                    }}
                    vrModeEnabled={false}
                />
            </View>
        )
    }
}