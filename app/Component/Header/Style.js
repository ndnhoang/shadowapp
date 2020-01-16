import { Platform } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default {
    headerLayout: {
        ...Platform.select({
            ios: {
                height: 72,
                alignItems: 'center',
                justifyContent: 'center',
            },
            android: {
                height: 72,
                alignItems: 'center',
                justifyContent: 'center',
            }
        })
    },
    buttonOnLeft: {
        left: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        zIndex: 100,
        height: 36
    },
    buttonOnRight: {
        right: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        zIndex: 100,
        height: 36
    }
}
