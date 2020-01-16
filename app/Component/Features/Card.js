import React from 'react';
import { Text } from 'react-native';
import { Card, CardItem, Left, Body, Thumbnail, Button, Icon } from 'native-base';
import ScalableImage from 'react-native-scalable-image';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// import NavigationService from '@Service/Navigation'

import { NamespacesConsumer } from 'react-i18next';

import PageStyle from './Style';
import Style from '@Theme/Style'

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NamespacesConsumer>{
                (t, { i18n }) => (
                    <Card style={PageStyle.cardStyle}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: data.logo }} />
                                <Body>
                                    <Text>{data.title}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <ScalableImage source={{ uri: data.image }} />
                                <Body>
                                    <Text>{data.description}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent>
                                    <Icon type="FontAwesome" name='gamepad' />
                                    <Text>Steam Link</Text>
                                </Button>
                            </Left>
                        </CardItem>
                    </Card>
                )}
            </NamespacesConsumer>
        )
    }
}