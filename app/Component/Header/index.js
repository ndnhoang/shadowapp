import React from 'react'
import { Image, StatusBar, SafeAreaView, Platform, StyleSheet } from 'react-native'
import { Button, View, Header, Icon } from 'native-base'
import ScalableImage from 'react-native-scalable-image';
import SVGImage from 'react-native-remote-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import NavigationService from '@Service/Navigation'

import PageStyle from './Style';
import Style from '@Theme/Style';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this._getTopButton = this._getTopButton.bind(this);
        this._getMenuButton = this._getMenuButton.bind(this);
        this._getBackButton = this._getBackButton.bind(this);
        this._getHeader = this._getHeader.bind(this);
    }

    _getTopButton() {
        if (this.props.useBackButton) {
            return this._getBackButton();
        } else {
            return this._getMenuButton();
        }
    }

    _getMenuButton() {
        var buttonStyle = [Style.actionBarLeft, PageStyle.buttonOnLeft];
        if (this.props.buttonOnRight) {
            buttonStyle = [Style.actionBarRight, PageStyle.buttonOnRight];
        }

        return (
            <View style={buttonStyle}>
                <Button transparent style={[Style.justifyEnd, Style.alignEnd, {width:'100%'}]} onPress={() => {
                    console.log("---------- Bars openDrawer");
                    NavigationService.openDrawer();
                }} >
                    <Icon type="FontAwesome" name='navicon' style={{fontSize: 24, lineHeight: 24, color: '#c3c3c3', marginRight: 0}} />
                </Button>
            </View>
        );
    }

    _getBackButton() {
        var buttonStyle = [Style.actionBarLeft, PageStyle.buttonOnLeft, Style.alignCenter];
        if (this.props.buttonOnRight) {
            buttonStyle = [Style.actionBarRight, PageStyle.buttonOnRight, Style.alignCenter];
        }

        return (
            <View style={buttonStyle}>
                <Button transparent onPress={() => {
                    console.log("---------- Bars back");
                    if (this.props.overrideBackButton) {
                        this.props.overrideBackButton();
                    } else {
                        NavigationService.back();
                    }
                }}
                style={[Style.justifyEnd, Style.alignEnd, {width:'100%'}]}>
                    <Icon type="Entypo" name='chevron-thin-left' style={{fontSize: 24, lineHeight: 24, color: '#c3c3c3', marginRight: 0}} />
                </Button>
            </View>
        );
    }

    _getHeader() {
        var logoStyle = [Style.actionBarRight];
        if (this.props.buttonOnRight) {
            logoStyle = [Style.actionBarLeft];
        }

        const headerContent = (
            <Header style={[Style.navigation, PageStyle.headerLayout, this.props.style]}>
                <StatusBar animated barStyle={'dark-content'} backgroundColor={Style.SFWhite.backgroundColor} />

                <View style={logoStyle}>
                    <ScalableImage source={require('@SFAsset/ShadowFactory(black).png')} height={36} />
                </View>

                {this._getTopButton()}
            </Header>
        );

        return headerContent;
    }

    render() {
        if (Platform.OS === 'ios') {
            return (
                <SafeAreaView style={[{ zIndex: 99, justifyContent: 'flex-end', alignItems: 'flex-end', }, this.props.style]} >
                    {this._getHeader()}
                </SafeAreaView >
            );
        } else {
            return (
                <View style={[{ zIndex: 99, alignItems: 'flex-end', justifyContent: 'flex-end' }, this.props.style]} >
                    {this._getHeader()}
                </View >
            );
        }
    }
}
