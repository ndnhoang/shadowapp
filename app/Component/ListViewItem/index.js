/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Thumbnail } from 'native-base'

class ListViewItem extends Component {
    constructor(props) {
        super(props);

        this._renderItem = this._renderItem.bind(this);
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View>
                    <Thumbnail source={this.props.icon} square small style={this.props.style} />
                </View>
            </TouchableOpacity>
        );
    }
}

export default ListViewItem;