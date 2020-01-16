import { Platform } from 'react-native'

export default {
    footer: {
        backgroundColor: '#F8F8F8',
        ...Platform.select({
            ios: {
                height: 60
            },
            android: {
                height: 60
            }
        })
    },
    footerBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
    btnFont: {
        fontSize: 16,
        lineHeight: 16,
        // fontWeight: Platform.OS === "ios" ? "500" : "400",
        // paddingVertical: 20
    },
    highlighted: {
        backgroundColor: '#e3e3e3'
    },
    camIcon: {
        fontSize: 28,
        padding: 0,
    }
}
