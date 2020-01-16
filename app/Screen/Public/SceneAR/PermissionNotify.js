/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import { StyleProvider, Container, Content, View, Button, Text, } from 'native-base';
import ScalableImage from 'react-native-scalable-image';

import getTheme from '@SFTheme/components';
import shadowfactory from '@SFTheme/variables/shadowfactory';

import NavigationService from '@Service/Navigation'

import Orientation from 'react-native-orientation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor } from 'react-native-responsive-screen';

import Style from '@Theme/Style'
import PageStyle from "./Style";

import { NamespacesConsumer } from 'react-i18next';

var _ = require('lodash');

export default class PermissionNotify extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NamespacesConsumer>{
                (t, { i18n }) => (
                    <StyleProvider style={getTheme(shadowfactory)}>
                        <Container>
                            <Content contentContainerStyle={[Style.navigation, { height: '100%' }, Style.col, Style.positionCenterEnd]}>
                                <View style={[Style.navigation, Style.col, Style.positionCenter]}>
                                    <Text>FOR AR TO WORK</Text>
                                    <Text>YOU MUST GIVE</Text>
                                    <Text>US PERMISSION TO</Text>
                                    <Text>YOUR CAMERA.</Text>
                                </View>
                                <View style={[Style.col, Style.positionCenter]}>
                                    <Button style={[Style.col, Style.positionCenter, PageStyle.permissionButton]}
                                        onPress={this.props.onOK}>
                                        <Text>OK</Text>
                                    </Button>
                                    <Button style={[Style.col, Style.positionCenter, PageStyle.permissionButton]}
                                        onPress={this.props.onBack}>
                                        <Text>BACK</Text>
                                    </Button>
                                </View>
                                <View>
                                    <ScalableImage source={require('@SFAsset/ShadowFactory(black).png')} height={hp('6%')} />
                                </View>
                            </Content>
                        </Container>
                    </StyleProvider>
                )}
            </NamespacesConsumer>
        );
    }
}
