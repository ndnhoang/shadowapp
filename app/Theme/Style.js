import { Platform } from 'react-native';

import Btn from './btn';
import Typography from './typography';
import Grid from './grid';

export const SFBlack = '#0C090A';
export const SFWhite = '#F8F8F8';

export default {
    // SF Style
      // colors
    ...Btn,
    ...Typography,
    ...Grid,

    navigation: {
        shadowOpacity: 0,
        elevation: 0,
        shadowOffset: {
            height: 0,
        },
        shadowRadius: 0,
        width: '100%',
        borderWidth: 0,
        borderColor: 'transparent',
        borderBottomColor: 'transparent',
        backgroundColor: '#FFF',
    },
    navigationTransparent: {
        backgroundColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
        shadowOffset: {
            height: 0,
        },
        shadowRadius: 0,
        width: '100%',
        borderWidth: 0,
    },
    headerShadow:{
      shadowOpacity: 0.01,
      elevation: 2,
      shadowOffset: {
          height: 2,
      },
      shadowRadius: 2,
    },
    SFBlack:{
      backgroundColor: '#000',
    },
    SFWhite:{
      backgroundColor: '#FFF',
    },
    SFBlue:{
      backgroundColor: '#555',
    },
    // *** background colors *** //

    bgMainIntro: {
        backgroundColor: '#7E8BF5',
    },
    bgMain: {
        backgroundColor: '#FFF',
    },
    bgWhite: {
        backgroundColor: '#fceae5',
    },
    bgBlack: {
        backgroundColor: '#433c3a',
    },
    bgGreen: {
        backgroundColor: '#006837',
    },
    bgYellow: {
        backgroundColor: '#F7941E',
    },
    bgYellowDark: {
        backgroundColor: '#e4932a',
    },
    bgPink: {
        backgroundColor: '#EC87C0',
    },
    bgBot: {
        backgroundColor: '#FFF',
        borderTopWidth: 0.5,
        borderColor: '#DDD',
    },
    bgFilter: {
        backgroundColor: '#FFF',
        borderTopWidth: 0.5,
        borderColor: '#DDD',
        flexDirection: 'row',
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },

    // *** row *** //
    logo: {
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
    },

    // *** text header *** //
    actionBarLeft: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 2,
    },
    actionBarMiddle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 6,
    },
    actionBarRight: {
        justifyContent: 'center',
        flex: 2,
        alignItems: 'flex-end',
    },
    actionBarText: {
        color: '#FFFFFF',
        fontFamily: "Montserrat-Regular",
        fontSize: 14,
        textAlign: 'center',
    },
    actionBarBtn: {
        alignSelf: 'flex-start',
        marginLeft: -10,
    },
    actionMenu: {
        marginLeft: 10,
    },
    actionBtn: {
        alignSelf: 'center',
    },
    actionIcon: {
        fontSize: 18,
        color: '#FFF',
    },
    actionBtnRight: {
        alignSelf: 'flex-end'
    },
    // *** Overlay *** //

    blackOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },

    // *** line *** //
    blueTopLine: {
        borderTopWidth: 1,
        borderColor: '#2A3C54'
    },
    greyBottomLine: {
        borderTopWidth: 0.5,
        borderColor: '#DDD',
        marginLeft: 0,
    },
    borderWhite: {
        borderBottomColor: '#FFF',
    },

    menuContainer: {
      marginTop: 80,
    },

}
