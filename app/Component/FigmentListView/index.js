/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import { FlatList } from 'react-native';

import ListViewItem from '../ListViewItem';
// import { Thumbnail } from 'native-base'

// import Orientation from 'react-native-orientation';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor } from 'react-native-responsive-screen';

import Style from '@Theme/Style';
import LocalStyle from './style';

var _ = require('lodash');

class FigmentListView extends Component {
    constructor(props) {
        super(props);

        this._renderItem = this._renderItem.bind(this);
    }

    componentDidMount() {
    }

    render() {
        return (
            <FlatList
                horizontal={true}
                data={this.props.data}
                renderItem={({ item }) => this._renderItem}
            />
        );
    }

    _renderItem(item) {
        return (
            <ListViewItem key={item.key} icon={item.icon} onPress={() => { this.props.onItemPress(item.key) }} />
        );
    }
}

export default FigmentListView;