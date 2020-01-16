import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, View, ActionSheet, Button } from 'native-base'

import { I18n, NamespacesConsumer } from 'react-i18next';
import i18n from '../../Service/i18n';

import _ from 'lodash';

import AllLang from '../../Service/Translations/lang';

import PageStyle from './Style';
import Style from '@Theme/Style'

export default class extends React.Component {
    constructor(props) {
        super(props);

        this._getLanguageButton = this._getLanguageButton.bind(this);
    }

    _getLanguageButton(lang) {
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }} >
                <TouchableOpacity onPress={() => {
                    const supportedLang = _.map(AllLang.allLang, ((l) => l.name));
                    ActionSheet.show({
                        options: supportedLang,
                        cancelButtonIndex: 0,
                        title: 'Select a language'
                    },
                        buttonIndex => {
                            const langCode = _.map(AllLang.allLang, ((l) => l.code));
                            i18n.changeLanguage(langCode[buttonIndex]);
                        });
                }}>
                    <Text style={[(this.props.textStyle ? this.props.textStyle : Style.textGrey), Style.SFTextBold['en']]}>
                        {AllLang.allLang[lang].title + ' : ' + AllLang.allLang[lang].name}
                    </Text>
                </TouchableOpacity>
            </View>
        );
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