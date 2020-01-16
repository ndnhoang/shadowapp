import React from 'react';
import PropTypes from 'prop-types';

import { Button, Text, Footer, FooterTab, Icon, Item } from 'native-base';
import SVGImage from 'react-native-remote-svg';

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

        this._getTabs = this._getTabs.bind(this);
    }

    _getTabs() {
        const tabs = this.props.tabs;
        var tabList = [];
        var buttonStyle = [Style.SFWhite, PageStyle.footerBtn, Style.layoutCenter, { height: '100%' }];
        var highlightedButtonStyle = _.clone(buttonStyle);
        highlightedButtonStyle.push(PageStyle.highlighted)

        for (let index = 0; index < tabs.length; index++) {
            const element = tabs[index];

            tabList.push(
                <Button key={element.name} style={element.key === this.props.highlight ? highlightedButtonStyle : buttonStyle} onPressOut={() => {
                    NavigationService.navigate(element.target)
                }}>
                    <Text style={[Style.SFText, Style.SFTextBlack, Style.textCenter, PageStyle.btnFont]}>{element.name}</Text>
                    <Icon type="FontAwesome" name='camera' style={{fontSize: 28, color: '#777'}} />
                </Button >
            )
        }

        return tabList;
    }

    render() {
        return (
            <Footer style={[Style.SFWhite, PageStyle.footer]}>
                <FooterTab style={Style.SFWhite}>
                    {this._getTabs()}
                </FooterTab>
            </Footer>
        )
    }
}
