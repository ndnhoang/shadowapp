import { Platform } from 'react-native';

export default {
    SFText: {
        ...Platform.select({
            ios: {
              fontFamily: 'Gotham-Medium',
            },
            android: {
              fontFamily: 'Gotham-Medium',
            }
        })
    },
    SFTextBold: {
        ...Platform.select({
            ios: {
              fontFamily: 'Gotham-Black',
            },
            android: {
              fontFamily: 'Gotham-Black',
            }
        })
    },
    SFTextLight: {
        ...Platform.select({
            ios: {
              fontFamily: 'Gotham-Thin',
            },
            android: {
              fontFamily: 'Gotham-Thin',
            }
        })
    },

    bodyCopy: {
        fontSize: 16,
        marginBottom: 16,
    },
    header: {
        fontSize: 32,
        marginBottom: 28,
    },
    subheader: {
        fontSize: 24,
        marginBottom: 24,
    },
    title: {
        fontSize: 20,
        marginBottom: 18,
        fontFamily: 'Gotham-Black',
    },
    caption: {
        fontSize: 12,
        lineHeight: 18,
        marginBottom: 12,
        color: '#808080',
    },

    SFTextGreyLight: {
        color: '#999',
    },
    SFTextBlack: {
        color: '#000',
    },
    SFTextBlue: {
        color: '#442ea9',
    },

    // *** text alignment *** //
    textLeft: {
        textAlign: 'left'
    },
    textCenter: {
        textAlign: 'center',
    },
    textRight: {
        textAlign: 'right'
    },

    // *** font size *** //
    textTint: {
        fontSize: 8,
    },
    textSmall: {
        fontSize: 12,
    },
    textMedium: {
        fontSize: 16,
    },
    textLarge: {
        fontSize: 24,
    },
    textExtraLarge: {
        fontSize: 36,
    },

    // *** text colors *** //
    textWhite: {
        color: '#FFFFFF',
    },
    textBlack: {
        color: '#3f3b38',
    },
    textGreyLight: {
        color: '#999',
    },
    textGrey: {
        color: '#666',
    },
    textGreyDark: {
        color: '#333',
    },
    textYellow: {
        color: '#F7941E',
    },
    textBlue: {
        color: '#999',
    },
    textBlueActive: {
        color: '#FCC300',
    },

    textActive: {
        color: '#FFF',
        backgroundColor: '#7E8BF5',
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 13,
        fontSize: 18,
    },

    textHeader: {
        fontSize: 24,
        color: '#FFF'
    },
    textDesc: {
        fontSize: 16,
        color: '#FFF'
    },

    // *** inputText *** //
    inputText: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderRadius: 0,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 5,
        fontFamily: 'Roboto',
        color: '#FFF',
        borderBottomWidth: 0,
        borderColor: '#746f76',
        fontSize: 14,
        placeholderTextColor: '#FFF'
    },
    input: {
        fontSize: 12,
    },
    textarea: {
        textAlignVertical: 'top',
    },

}
