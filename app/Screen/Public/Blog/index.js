import React from 'react';
import { Dimensions } from 'react-native';
import { StyleProvider, Container, Content, Text, View } from 'native-base';

import Header from '@Component/Header';

import NavigationService from '@Service/Navigation';

import getTheme from '@SFTheme/components';
import platform from '@SFTheme/variables/platform';

import Style from '@Theme/Style';
import PageStyle from './Style';

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class extends React.Component {
    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Container style={Style.bgMain}>
                    <Header style={Style.SFWhite} buttonOnRight={true} useBackButton={true} />

                    <Content style={Style.layoutInner} contentContainerStyle={Style.layoutCenter}>

                        <View>
                            <Text>This is Blog Page.</Text>
                        </View>

                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}