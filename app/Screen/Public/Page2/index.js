import React from 'react';
import { View, Image, TouchableOpacity, Linking } from 'react-native';
import { Text, Button } from 'native-base';
import ScalableImage from 'react-native-scalable-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Col, Row, Grid } from "react-native-easy-grid";

import NavigationService from '@Service/Navigation';

import Style from '@Theme/Style';
import PageStyle from './Style';

//const {width, height} = Dimensions.get('window')
// const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class Page2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comingSoonButton: 0.7
        }
    }

    render() {
        return (
            <View style={{ height: '100%' }}>
                <Grid>
                    <Row>
                        <Button style={{ backgroundColor: 'black', overflow: 'hidden', height: '100%', borderRadius: 0 }} onPress={() => {
                            Linking.openURL('http://www.grabbagvr.com/');
                        }}>
                            <Image source={require('@SFAsset/page2/GameList-GrabBag.png')} style={{ width: '100%' }} resizeMode={'cover'} />
                        </Button>
                    </Row>
                    <Row>
                        <Button style={{ backgroundColor: 'black', overflow: 'hidden', height: '100%', borderRadius: 0 }} onPress={() => {
                            Linking.openURL('http://hangup.shadowfactory.io/');
                        }}>
                            <Image source={require('@SFAsset/page2/GameList-HangUp.jpg')} style={{ width: '100%' }} resizeMode={'cover'} />
                        </Button>
                    </Row>
                    <Row>
                        <Button style={{ backgroundColor: 'black', overflow: 'hidden', height: '100%', borderRadius: 0 }}
                            onPressIn={() => {
                                this.setState({
                                    comingSoonButton: 0.2
                                });
                            }}
                            onPressOut={() => {
                                this.setState({
                                    comingSoonButton: 0.7
                                });
                            }}>
                            <Image source={require('@SFAsset/page2/GameList-StupidCupid.png')} style={{ width: '100%' }} resizeMode={'cover'} />
                            <View style={[Style.blackOverlay, Style.justifyEnd, Style.alignCenter]}>
                                <Text style={[Style.SFTextBold, Style.subheader, { opacity: this.state.comingSoonButton }]}>Coming Soon</Text>
                            </View>
                        </Button>
                    </Row>
                </Grid>
            </View>
        )
    }
}
