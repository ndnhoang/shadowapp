import React from 'react';
import { ScrollView, Linking } from 'react-native';
import { View, Text, List, Button, ListItem, Container, Content, H1, H3, Form, Item, Input, StyleProvider, Label } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import ContactMap from '@Component/Map';
import Header from '@Component/Header';
import { NamespacesConsumer } from 'react-i18next';

import MapView, { Marker } from 'react-native-maps';

import NavigationService from '@Service/Navigation';

import getTheme from '@SFTheme/components';
import platform from '@SFTheme/variables/platform';

import OfficeInfo from '@Model/OfficeInfo';

import Style from '@Theme/Style';
import PageStyle from './Style';

//const {width, height} = Dimensions.get('window')
// const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contactInfo: {
                firstName: 'Shadow',
                lastName: 'Factory',
                email: 'contact@shadowfactory.io'
            }
        }

        this._getOffectList = this._getOffectList.bind(this);
        this._sendContact = this._sendContact.bind(this);
    }

    _getOffectList(item) {
        return (
            <ListItem>
                <View>
                    <Text>{item.location}</Text>
                    <Text note>{item.address}</Text>
                </View>
            </ListItem>
        )
    }

    _sendContact() {
        Linking.openURL('mailto:contact@shadowfactory.io?subject=New%20Contact&body=' + JSON.stringify(this.state.contactInfo)).then(() => { })
    }

    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Container style={Style.bgMain}>
                    <Header style={[Style.SFWhite, Style.headerShadow]} buttonOnRight={true} useBackButton={true} />

                    <Content padder disableKBDismissScroll={true} contentContainerStyle={[Style.layoutCenter, Style.layout, Style.p0, Style.pt4, Style.m0]}>
                        <ScrollView showsVerticalScrollIndicator={false} style={[Style.flex1, Style.layoutInner, Style.p0, Style.m0]}>

                            <View style={[Style.flex1, Style.mb3]}>
                                <Text style={[Style.SFText, Style.header]}>HAVE SOMETHING IN MIND? LET’S WORK TOGETHER!</Text>
                            </View>
                            <View style={[Style.flex1, Style.m0]}>
                                <Form style={[Style.ml0,]}>
                                    <Item style={[Style.ml0,]}>
                                        <Label></Label>
                                        <Input placeholder="First Name" onChangeText={(text) => {
                                            var contactInfo = this.state.contactInfo;
                                            contactInfo.firstName = text;
                                            this.setState({
                                                contactInfo: contactInfo
                                            })
                                        }} />
                                    </Item>
                                    <Item style={[Style.ml0,]}>
                                        <Label></Label>
                                        <Input placeholder="Last Name" onChangeText={(text) => {
                                            var contactInfo = this.state.contactInfo;
                                            contactInfo.lastName = text;
                                            this.setState({
                                                contactInfo: contactInfo
                                            })
                                        }} />
                                    </Item>
                                    <Item style={[Style.ml0]}>
                                        <Label></Label>
                                        <Input placeholder="Email" onChangeText={(text) => {
                                            var contactInfo = this.state.contactInfo;
                                            contactInfo.email = text;
                                            this.setState({
                                                contactInfo: contactInfo
                                            })
                                        }} />
                                    </Item>
                                    <Item style={[Style.ml0, Style.mb4]}>
                                        <Label></Label>
                                        <Input placeholder="Message" onChangeText={(text) => {
                                            var contactInfo = this.state.contactInfo;
                                            contactInfo.message = text;
                                            this.setState({
                                                contactInfo: contactInfo
                                            })
                                        }} />
                                    </Item>
                                </Form>
                                <Button style={[Style.justifyCenter, Style.mb4, { width: '100%' }]}
                                    onPressOut={this._sendContact}>
                                    <Text style={{ textAlign: 'center' }}>Submit</Text>
                                </Button>
                            </View>
                            {/*<View style={[Style.col0, { width: '100%', paddingHorizontal: 10, paddingTop: 30 }]}>
                                <Text>{OfficeInfo.en.copyright}</Text>
                            </View>*/}

                            <View style={[Style.col0, { width: '100%', height: hp('40%') }]} >
                                <ContactMap
                                    mapMarkers={[
                                        {
                                            coordinates: { latitude: 22.2866613, longitude: 114.1368035 },
                                            title: 'Shadow Factory',
                                            description: '4212-4215, 42F, Hong Kong Plaza, 188 Connaught Rd W, Sai Ying Pun'
                                        }]} />
                            </View>

                            <View style={Style.col0} >
                                <List
                                    dataArray={OfficeInfo.en.offices}
                                    renderRow={this._getOffectList}
                                />
                            </View>

                        </ScrollView>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}
