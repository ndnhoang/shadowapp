import React from 'react';
import PropTypes from 'prop-types';
import { Linking } from 'react-native';
import { Button, View, Icon } from 'native-base';
import SVGImage from 'react-native-remote-svg';
import ScalableImage from 'react-native-scalable-image';

import SocialLinks from './SocialServiceLink';

import NavigationService from '@Service/Navigation'

import { I18n, NamespacesConsumer } from 'react-i18next';
import i18n from '@Service/i18n';

import PageStyle from './Style';
import Style from '@Theme/Style'

import _ from 'lodash';

export default class extends React.Component {
    static defaultProps = {
        tabs: []
    }

    static propTypes = {
        tabs: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            icon: PropTypes.string,
            target: PropTypes.string
        })),
        setting: PropTypes.objectOf(PropTypes.number),
        highlight: PropTypes.string
    }

    constructor(props) {
        super(props);

        this._openSocial = this._openSocial.bind(this);
        this._getButtons = this._getButtons.bind(this);
    }

    _openSocial(service) {
        Linking.openURL(SocialLinks[service])
    }

    _getButtons() {
        return (
            <View style={[Style.navigation, PageStyle.footerButtonLayout, this.props.style]}>
                <Button transparent style={PageStyle.footerIconMargin}
                    onPressOut={() => { this._openSocial('facebook') }}>
                    <Icon type="FontAwesome" name='facebook-f' style={[PageStyle.footerIconStyle]} />
                </Button>
                <Button transparent style={PageStyle.footerIconMargin}
                    onPressOut={() => { this._openSocial('instagram') }}>
                    <Icon type="FontAwesome" name='instagram' style={[PageStyle.footerIconStyle]} />
                </Button>
                <Button transparent style={PageStyle.footerIconMargin}
                    onPressOut={() => { this._openSocial('twitter') }}>
                    <Icon type="FontAwesome" name='twitter' style={[PageStyle.footerIconStyle]} />
                </Button>
                <Button transparent style={PageStyle.footerIconMargin}
                    onPressOut={() => { this._openSocial('linkedin') }}>
                    <Icon type="FontAwesome" name='linkedin' style={[PageStyle.footerIconStyle]} />
                </Button>
            </View>
        );
    }

    render() {
        return this._getButtons();
    }
}
