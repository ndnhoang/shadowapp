import React from 'react';
import { Animated } from 'react-native';
import { Container, Content, Button, Icon, Text, Title, Left, Right, Body, Input, Item, View, Badge } from 'native-base';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation';

import Header from '@Component/Header';
import MutableFooter from '@Component/MutableFooter';
import MutableFlatList from '@Component/MutableFlatList';

// import News from '@Screen/Public/News';
// import Games from '@Screen/Public/Games';
// import Features from '@Screen/Public/Features';

import Page1 from '@Screen/Public/Page1';
import Page2 from '@Screen/Public/Page2';

import { NamespacesConsumer } from 'react-i18next';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import NavigationService from '@Service/Navigation'

import { connect } from 'react-redux';

import Style from '@Theme/Style'
import PageStyles from '@Screen/Public/Home/Style'

// const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const _ = require('lodash');

class PublicHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            svgdata: ''
        }

        this._getMemberContent = this._getMemberContent.bind(this);
    }

    componentDidMount() {
        Orientation.lockToPortrait();
    }

    _getMemberContent() {
        if (this.props.loginData) {
            return (
                <View style={[PageStyles.search, Style.SFWhite]}>
                    <Button transparent style={PageStyles.searchBtn} onPress={() => {
                        NavigationService.navigate('PublicSceneAR')
                    }}>
                        <Icon active name='camera' type="SimpleLineIcons" style={PageStyles.searchBtnIcon} />
                    </Button>

                    <Button transparent style={PageStyles.searchBtn} onPress={() => {
                        // FacebookLogin();
                    }}>
                        <Text style={PageStyles.itemPrice}>Facebook Login</Text>
                    </Button>
                </View>
            );
        } else {
            return (
                <View style={[PageStyles.search, Style.SFWhite]}>
                    <Button transparent style={PageStyles.searchBtn} onPress={() => {
                        NavigationService.navigate('MemberSignIn')
                    }}>
                        <Icon active name='sign-in' type="FontAwesome" style={PageStyles.searchBtnIcon} />
                        <Text style={PageStyles.itemPrice}>Login</Text>
                    </Button>
                </View>
            );
        }
    }

    render() {
        return (
            <NamespacesConsumer >{
                (t, { i18n }) => (
                    <Container style={Style.bgMain}>
                        <Header style={Style.SFWhite} buttonOnRight={true} />

                        <Content style={Style.layoutInner} contentContainerStyle={Style.layoutCenter}>
                            <SwiperFlatList showPagination paginationStyleItem={{ height: 3, width: wp('8%'), borderRadius: 0, }} paginationDefaultColor={'rgba(150, 150, 150, 0.5)'}>
                                <View style={{ width: wp('100%'), height: '100%' }}>
                                    <Page1 />
                                </View>
                                <View style={{ width: wp('100%'), height: '100%' }}>
                                    <Page2 />
                                </View>
                            </SwiperFlatList>
                        </Content>

                        <MutableFooter tabs={t('cloudFooter', { returnObjects: true })} />
                    </Container>
                )
            }
            </NamespacesConsumer>
        )
    }
}

function mapStateToProps(state) {
    return {
        loginData: state.loginData
    }
}

const ReduxPublicHome = connect(
    mapStateToProps
)(PublicHome)

export default ReduxPublicHome;
