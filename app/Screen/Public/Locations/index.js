import React from 'react'
import { StyleSheet, Platform, PermissionsAndroid } from 'react-native'
import { View, Text, List, ListItem, Content, Thumbnail, Body, Left } from 'native-base'
import Orientation from 'react-native-orientation';

import { I18n, NamespacesConsumer } from 'react-i18next';
import i18n from '../../../Service/i18n';

import PageStyle from './Style';
import Style from '@Theme/Style'

import MapView, { Marker } from 'react-native-maps';

import Header from '@Component/Header';
import Footer from '@Component/Footer';
import _ from 'lodash';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapRegion: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            storeMarker: {},
            userLocationHadInit: false,
            androidMapViewStyle: { paddingTop: 1 }
        };

        this._getStores = this._getStores.bind(this);
        this._updateUserLocation = this._updateUserLocation.bind(this);
        this._updateMapLocation = this._updateMapLocation.bind(this);
        this._showStoreLocation = this._showStoreLocation.bind(this);
        this._getStoreMarker = this._getStoreMarker.bind(this);
    }

    componentDidMount() {
        Orientation.lockToPortrait();

        if (Platform.OS === 'android') {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
                .then((granted) => {
                    this.forceUpdate();
                });
        }
    }

    _getStores(data, lang) {
        if (!data)
            return null;

        let listItems = [];

        for (let index = 0; index < data.length; index++) {
            const element = data[index];

            listItems.push(
                (
                    <ListItem key={'listKey' + element.name} thumbnail onPress={() => {
                        // console.log("Here!!!!!!!!!!!!!!!!!");
                        this._showStoreLocation(element);
                    }}>
                        <Left>
                            <Thumbnail source={element.thumbnail} square />
                        </Left>
                        <Body>
                            <Text style={[Style.SFText[lang], Style.SFTextBlue, { fontSize: 20, paddingVertical: 5 }]}>{element.name}</Text>
                            <Text style={[Style.SFText[lang], Style.SFTextBlue, { fontSize: 14 }]}>{element.address}</Text>
                            <Text style={[Style.SFText[lang], Style.SFTextBlue, { fontSize: 14 }]}>{element.phone}</Text>
                            <Text style={[Style.SFText[lang], Style.SFTextBlue, { fontSize: 14 }]}>{element.openTime}</Text>
                        </Body>
                    </ListItem>
                )
            )
        }

        return (
            <List style={[Style.bgWhite, { paddingHorizontal: 20 }]}>
                {listItems}
            </List>
        );
    }

    _updateUserLocation(coordinates) {
        if (this.state.userLocationHadInit)
            return;

        this.setState({
            userLocationHadInit: true
        });

        this._updateMapLocation(coordinates);
    }

    _showStoreLocation(data) {
        this.setState({
            storeMarker: {
                coordinates: data.coordinates,
                title: data.name,
                description: data.address
            }
        });

        this._updateMapLocation(data.coordinates);
    }

    _updateMapLocation(coordinates) {
        this.setState({
            mapRegion: {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }
        });
    }

    _getStoreMarker() {
        if (_.isEmpty(this.state.storeMarker)) {
            return null;
        } else {
            return (
                <Marker
                    coordinate={this.state.storeMarker.coordinates}
                    title={this.state.storeMarker.title}
                    description={this.state.storeMarker.description} />
            );
        }
    }

    render() {
        return (
            <NamespacesConsumer>{
                (t, { i18n }) => (
                    <View style={[PageStyle.mapContainer, Style.bgWhite]}>
                        <Header />
                        <View style={[PageStyle.mapContainer, Style.bgWhite]} >
                            <View style={PageStyle.mapContainer}>
                                {/* View For Map View */}
                                <MapView
                                    provider={'google'}
                                    ref={(ref) => this.mapView = ref}
                                    region={this.state.mapRegion}
                                    showsUserLocation={true}
                                    showsMyLocationButton={true}
                                    onMapReady={() => {
                                        this.setState({
                                            androidMapViewStyle: PageStyle.mapView
                                        })
                                    }}
                                    style={Platform.OS === 'ios' ? PageStyle.mapView : this.state.androidMapViewStyle}
                                    onUserLocationChange={({ nativeEvent }) => {
                                        this._updateUserLocation(nativeEvent.coordinate);
                                    }}
                                >
                                    {this._getStoreMarker()}
                                </MapView>
                            </View>
                            <Text style={[Style.SFText[i18n.language], Style.SFTextGreyLight, { fontSize: 20, paddingVertical: 10, textAlign: 'center' }]}>{t('location.storelist')}</Text>
                            <Content contentContainerStyle={[Style.bgWhite]}>
                                <View style={[PageStyle.section]}>
                                    {/* View For Location List */}
                                    {this._getStores(t('stores.data', { returnObjects: true }), i18n.language)}
                                </View>
                            </Content>
                        </View>
                        <Footer activedTab={'location'} />
                    </View>
                )
            }
            </NamespacesConsumer>)
    }
}