import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor } from 'react-native-responsive-screen';

export default {
    iconSize: {
        margin: 2,
    },

    iconText_en: {
        fontSize: 12,
        bottom: 0
    },

    iconText_zh: {
        fontSize: 12,
        bottom: 0
    },

    layoutContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    layoutMessage: {
        paddingHorizontal: 20
    },

    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageTitle: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        paddingHorizontal: 20,
    },
    pageCol: {
        marginTop: 20,
    },
    pageIcon: {

    },

    overview: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    overviewTitle: {
        flex: 1,
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 10,
    },
    overviewDesc: {
        flex: 1,
        color: '#666',
        lineHeight: 20,
        fontFamily: 'Montserrat-Regular',
        fontSize: 13,
    },

}