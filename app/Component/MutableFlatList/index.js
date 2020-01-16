import React from 'react';
import PropTypes from 'prop-types';

import { View, FlatList, Image, TouchableOpacity } from 'react-native'
import { Text, Icon } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import NavigationService from '@Service/Navigation'

import { I18n, NamespacesConsumer } from 'react-i18next';
import i18n from '../../Service/i18n';

import PageStyles from './Style';
import Style from '@Theme/Style'

import _ from 'lodash';

export default class extends React.Component {
    static defaultProps = {
        data: []
    }

    // static propTypes = {
    //     data: PropTypes.arrayOf(PropTypes.shape({
    //         name: PropTypes.string,
    //         icon: PropTypes.string,
    //         target: PropTypes.string
    //     })),
    //     setting: PropTypes.objectOf(PropTypes.number)
    // }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NamespacesConsumer>{
                (t, { i18n }) => (
                    <View style={PageStyles.background} >
                        <FlatList
                            data={this.props.data}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={PageStyles.flatList}
                            renderItem={({ item, separators }) => (
                                <TouchableOpacity key={item.key} style={PageStyles.itemBig} underlayColor='transparent' onPress={() => { NavigationService.navigate('PublicPropertyDetail') }}>
                                    <View>
                                        <View>
                                            <Image source={{ uri: item.image }} style={PageStyles.itemImgBig} />
                                            <Icon name="heart" type="MaterialCommunityIcons" style={PageStyles.itemFavorite} />
                                        </View>
                                        <Text style={PageStyles.itemPrice}>{item.price}</Text>
                                        <Text style={PageStyles.itemLocation}>{item.location}</Text>
                                        <View style={PageStyles.itemRow}>
                                            <View style={PageStyles.itemOverview}>
                                                <Icon name="bed" type="FontAwesome" style={PageStyles.itemIcon} />
                                                <Text style={PageStyles.itemNo}>{item.bedroom}</Text>
                                            </View>
                                            <View style={PageStyles.itemOverview}>
                                                <Icon name="bathtub" type="FontAwesome" style={PageStyles.itemIcon} />
                                                <Text style={PageStyles.itemNo}>{item.bathroom}</Text>
                                            </View>
                                            <View style={PageStyles.itemOverview}>
                                                <Icon name="expand" type="FontAwesome" style={PageStyles.itemIcon} />
                                                <Text style={PageStyles.itemNo}>{item.area}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>

                )}
            </NamespacesConsumer>
        )
    }
}
