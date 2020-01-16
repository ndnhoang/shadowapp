import React from 'react'
import { View, Image, StyleSheet, Platform } from 'react-native'
import { Button, Text, Footer, FooterTab, Icon } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import NavigationService from '@Service/Navigation'

import { I18n, NamespacesConsumer } from 'react-i18next';
import i18n from '../../Service/i18n';

import PageStyle from './Style';
import Style from '@Theme/Style'

export default class extends React.Component {
    constructor(props) {
        super(props);

        this._getHighlight = this._getHighlight.bind(this)
    }

    _getHighlight() {

    }

    render() {
        const styles = StyleSheet.create({
            footer: {
                backgroundColor: '#FFF',
                ...Platform.select({
                    ios: {
                        height: 60
                    },
                    android: {
                        height: 70
                    }
                })
            }
        })

        return (
            <NamespacesConsumer>{
                (t, { i18n }) => (
                    <Footer style={styles.footer}>
                        <FooterTab style={Style.bgBot}>
                            <Button vertical style={[Style.bgBot]} onPress={() => {
                                NavigationService.navigate('PublicHome')
                            }} style={Style.flex}>
                                <Icon name="home" type="FontAwesome" style={Style.textBlue} />
                                <Text style={[Style.SFTextBold[i18n.language], Style.SFTextGreyLight, Style.textCenter, { flex: 1, fontSize: 10 }]}>{t('footer.home').toUpperCase()}</Text>
                            </Button>
                            <Button vertical style={Style.bgBot} onPress={() => {
                                NavigationService.navigate('PublicSceneAR')
                            }} style={Style.flex}>
                                <Icon name="device-camera" type="Octicons" style={Style.textBlue} />
                                <Text numberOfLines={1} style={[Style.SFTextBold[i18n.language], Style.SFTextGreyLight, Style.textCenter, { flex: 1, fontSize: 10 }]}>{t('footer.arcamera').toUpperCase()}</Text>
                            </Button>
                            <Button vertical style={Style.bgBot} onPress={() => {
                                NavigationService.navigate('MemberHome')
                            }} style={Style.flex}>
                                <Icon name="user" type="FontAwesome" style={Style.textActive} />
                                <Text style={[Style.SFTextBold[i18n.language], Style.SFTextGreyLight, Style.textCenter, { flex: 1, fontSize: 10 }]}>{t('footer.products').toUpperCase()}</Text>
                            </Button>
                            <Button vertical style={Style.bgBot} onPress={() => {
                                NavigationService.navigate('MemberFavorites')
                            }} style={Style.flex}>
                                <Icon name="heart" type="FontAwesome" style={Style.textBlue} />
                                <Text style={[Style.SFTextBold[i18n.language], Style.SFTextGreyLight, Style.textCenter, { flex: 1, fontSize: 10 }]}>{t('footer.locations').toUpperCase()}</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                )}
            </NamespacesConsumer>
        )
    }
}