import React, { Component } from "react";
import { Content, Text, List, ListItem, Container, Left, Header, Footer, View, Button, StyleProvider, Icon } from "native-base";
import SVGImage from 'react-native-remote-svg';
import ScalableImage from 'react-native-scalable-image';

import SocialButtons from '@Component/SocialButtonsList';

import getTheme from '@SFTheme/components';
import shadowfactory from '@SFTheme/variables/shadowfactory';

import i18n from '@Service/i18n';

import PageStyle from "./Style";
import Style from '@Theme/Style';

import NavigationService from '@Service/Navigation'
import { NamespacesConsumer } from 'react-i18next';

import OfficeInfo from '@Model/OfficeInfo';

class MenuLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    };
  }

  renderList(datas) {
    return (
      <List
        dataArray={datas}
        renderRow={data =>
          <ListItem
            button
            noBorder
            onPress={() => NavigationService.navigate(data.target)}
          >
            <Left>
              <Text style={[Style.SFTextLight, PageStyle.burgerItems]}>
                {data.name}
              </Text>
            </Left>
          </ListItem>}
      />
    )
  }

  render() {
    return (
      <NamespacesConsumer>{
        (t, { i18n }) => (
          <StyleProvider style={getTheme(shadowfactory)}>
            <Container style={Style.menuContainer}>
              {/* <Header style={[Style.navigation, Style.SFWhite]}>
                <View style={[Style.layoutInner, PageStyle.drawerTop, PageStyle.topButtonLayout]}>
                  <Button transparent onPress={() => {
                    NavigationService.closeDrawer();
                  }} >
                    <Icon type="FontAwesome" name='close' style={{fontSize: 24, color: 'transparent'}} />
                  </Button>
                </View>
              </Header> */}

              <Content
                bounces={false}
                style={Style.navigation}
              >
                <View>
                  {this.renderList(t('hamburgerMenu', { returnObjects: true }))}
                </View>
              </Content>

              <Footer style={[Style.navigation, Style.flexColumn, { height:120}]}>
                <SocialButtons style={{flex:1}}/>
                <Text style={[Style.ml4, Style.caption,]}>{OfficeInfo.en.copyright}</Text>
              </Footer>
            </Container>
          </StyleProvider>
        )}
      </NamespacesConsumer>
    );
  }
}

export default MenuLeft;
