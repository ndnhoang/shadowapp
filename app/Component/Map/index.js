import React from 'react'
import { Platform, PermissionsAndroid } from 'react-native'
import PropTypes from 'prop-types';
import { View, StyleProvider } from 'native-base'

import PageStyle from './Style';
import Style from '@Theme/Style'

import MapView, { Marker } from 'react-native-maps';
import _ from 'lodash';

class SFMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapRegion: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            mapMarkers: [],
            userLocationHadInit: false,
            androidMapViewStyle: { paddingTop: 1 }
        };

        this._updateUserLocation = this._updateUserLocation.bind(this);
        this._updateMapLocation = this._updateMapLocation.bind(this);
        this._showStoreLocation = this._showStoreLocation.bind(this);
        this._getStoreMarker = this._getStoreMarker.bind(this);
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
                .then((granted) => {
                    this.forceUpdate();
                });
        }
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
            mapMarkers: [{
                coordinates: data.coordinates,
                title: data.name,
                description: data.address
            }]
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
        if (_.isEmpty(this.props.mapMarkers)) {
            return null;
        } 

        if (_.isUndefined(this.props.mapMarkers)) {
            return null;
        } 
        
        const markers = this.props.mapMarkers;
        var markerList = [];

        for (let index = 0; index < markers.length; index++) {
            const element = markers[index];
            markerList.push((
                <Marker
                    coordinate={element.coordinates}
                    title={element.title}
                    description={element.description} />
            ));
        }

        return markerList;
    }

    render() {
        return (
            <View style={[PageStyle.mapContainer, Style.bgWhite]} >
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
        )
    }
}

SFMap.propTypes = {
    mapMarkers: PropTypes.arrayOf(PropTypes.object)
}

SFMap.defaultProps = {
    style: {}
}

export default SFMap;