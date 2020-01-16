import React from 'react';
import { FlatList, Dimensions } from 'react-native';
import { StyleProvider, Container, Content, Text, View, Radio, Right, Left, Body, H1, ListItem } from 'native-base';

import Header from '@Component/Header';

import NavigationService from '@Service/Navigation'

import getTheme from '@SFTheme/components';
import platform from '@SFTheme/variables/platform';

import Style from '@Theme/Style'
import PageStyle from './Style'

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const settingItems = [
    { name: 'Notification' }
]

export default class extends React.Component {
    constructor(props) {
        super(props);

        this._getSettingMenu = this._getSettingMenu.bind(this);
    }

    _getSettingMenu({ item }) {
        return (
            <ListItem key={item.name}>
                <Left>
                    <Text>{item.name}</Text>
                </Left>
                <Right>
                    <Radio selected={true} />
                </Right>
            </ListItem>
        );
    }

    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Container style={Style.bgMain}>
                    <Header style={Style.SFWhite} buttonOnRight={true} useBackButton={true} />

                    <Content contentContainerStyle={[Style.layoutCenter, Style.layoutInner]}>

                        <View >
                            <H1>Settings</H1>
                        </View>
                        <View style={[Style.col0, PageStyle.listContent]}>
                            <FlatList
                                data={settingItems}
                                renderItem={this._getSettingMenu} />
                        </View>

                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}