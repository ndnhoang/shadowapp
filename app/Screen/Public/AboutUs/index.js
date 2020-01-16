import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { StyleProvider, Container, Content, H1, Text } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ScalableImage from 'react-native-scalable-image';

import Header from '@Component/Header';

import NavigationService from '@Service/Navigation';

import getTheme from '@SFTheme/components';
import platform from '@SFTheme/variables/platform';

import Style from '@Theme/Style';
import PageStyle from './Style';

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class extends React.Component {
    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Container style={Style.bgMain}>
                    <Header style={Style.SFWhite} buttonOnRight={true} useBackButton={true} />

                    <Content padder disableKBDismissScroll={true} contentContainerStyle={[Style.layoutCenter, Style.layout],{padding:0, margin:0}}>
                      <ScrollView showsVerticalScrollIndicator={false} style={{flex:1, width:'100%', padding:0, margin:0}}>
                        <View style={{flex:1}}>
                          <ScalableImage source={require('@SFAsset/aboutImg.jpg')} width={wp('100%')} />
                        </View>
                        <View style={[{flex:1}, Style.justifyCenter, Style.alignStart, Style.layout]}>
                            <Text style={Style.SFTextBold['en'], Style.header}>Shadow Factory</Text>
                            <Text style={Style.SFText['en'], Style.subheader}>is a B2B virtual, augmented, and mixed reality production services company.</Text>
                            <Text style={Style.SFText['en'], Style.caption}>HONG KONG | TORONTO | HONOLULU | {"\n"}LOS ANGELES | NEW YORK</Text>
                            <Text style={Style.SFText['en'], Style.bodyCopy}>We produce quality, story-driven, fully immersive and interactive experiences, and offer new and exciting ways to engage audiences. An outstanding team equipped with extensive skill sets and the latest digital toolkits, we are the one-stop-shop for all your VR needs.</Text>
                            <Text style={Style.SFText['en'], Style.title}>BEHIND THE NAME</Text>
                            <Text style={Style.SFText['en'], Style.bodyCopy}>In the 1930’s, the British government engaged the expertise of its automotive industry in order to rapidly advance its technical and production capabilities. The numerous facilities that took part in these efforts became known as Shadow Factories.</Text>
                            <Text style={Style.SFText['en'], Style.bodyCopy}>Similarly, we collaborate with agencies and enterprises, advancing their ability to deliver meaningful VR experiences to their customers.</Text>
                        </View>
                      </ScrollView>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}
