import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Platform, ImageBackground, FlatList } from 'react-native'
import { Button, Text, Icon } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import NavigationService from '@Service/Navigation'

import { I18n, NamespacesConsumer } from 'react-i18next';
import i18n from '../../Service/i18n';

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
        setting: PropTypes.objectOf(PropTypes.number)
    }

    constructor(props) {
        super(props);

        this._getHighlight = this._getHighlight.bind(this);
        this._getTabs = this._getTabs.bind(this);
    }

    _getItems({ item, separators }) {
        return (
            <TouchableOpacity style={PageStyles.itemBig} underlayColor='transparent' onPress={() => { NavigationService.navigate('PublicPropertyDetail') }}>
                <View>
                    <View>
                        <Image source={{ uri: item.image }} style={PageStyles.itemImgBig} />
                        <Icon name="heart" type="MaterialCommunityIcons" style={PageStyles.itemFavorite} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const styles = StyleSheet.create({
            footer: {
                backgroundColor: '#FFF',
                ...Platform.select({
                    ios: {
                        height: 120
                    },
                    android: {
                        height: 130
                    }
                })
            }
        })

        return (
            <NamespacesConsumer>{
                (t, { i18n }) => (
                    <ImageBackground source={require('@Asset/images/property-bg.png')} imageStyle={'cover'} style={PageStyles.slider}>
                        {/* <FlatList
                            data={FEATURED}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={PageStyles.flatList}
                            renderItem={() => (
                            )}
                        /> */}
                    </ImageBackground>
                )}
            </NamespacesConsumer>
        )
    }
}
