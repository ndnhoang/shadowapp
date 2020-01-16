import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, View } from 'native-base'

import { I18n, NamespacesConsumer } from 'react-i18next';
import i18n from '../../Service/i18n';

import PageStyle from './Style';
import Style from '@Theme/Style'

export default class extends React.Component {
    constructor(props) {
        super(props);

        this._getLanguageButton = this._getLanguageButton.bind(this);
    }

    _getLanguageButton(lang) {
        if (lang === 'en') {
            return (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }} >
                    <TouchableOpacity onPress={() => {
                        i18n.changeLanguage('en');
                    }}>
                        <Text style={[(this.props.textStyle ? this.props.textStyle : Style.textGrey), Style.SFTextBold['en']]}>ENG</Text>
                    </TouchableOpacity>
                    <Text style={this.props.textStyle ? this.props.textStyle : Style.textGrey}> / </Text>
                    <TouchableOpacity onPress={() => {
                        i18n.changeLanguage('zh-Hant');
                    }}>
                        <Text style={[(this.props.textStyle ? this.props.textStyle : Style.textGrey), Style.SFText['zh-Hant']]}>中文</Text>
                    </TouchableOpacity>

                </View>
            );
        } else if (lang === 'zh-Hant') {
            return (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }} >
                    <TouchableOpacity onPress={() => {
                        i18n.changeLanguage('en');
                    }}>
                        <Text style={[(this.props.textStyle ? this.props.textStyle : Style.textGrey), Style.SFText['en']]}>ENG</Text>
                    </TouchableOpacity>
                    <Text style={this.props.textStyle ? this.props.textStyle : Style.textGrey}> / </Text>
                    <TouchableOpacity onPress={() => {
                        i18n.changeLanguage('zh-Hant');
                    }}>
                        <Text style={[(this.props.textStyle ? this.props.textStyle : Style.textGrey), Style.SFTextBold['zh-Hant']]}>中文</Text>
                    </TouchableOpacity>

                </View>
            );
        }
    }

    render() {
        return (
            <NamespacesConsumer>{
                (t, { i18n }) => (
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                        {this._getLanguageButton(i18n.language)}
                    </View>
                )}
            </NamespacesConsumer>
        )
    }
}