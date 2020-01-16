import i18next from 'i18next';
import { reactI18nextModule, translate } from 'react-i18next';
// import RNLanguages from 'react-native-languages';
import * as RNLocalize from "react-native-localize";

import enDoc from '@Translations/en.js';
import jaDoc from '@Translations/ja.js';
import zhHansDoc from '@Translations/zh-Hans.js';
import zhHantDoc from '@Translations/zh-Hant.js';

const currentLng = RNLocalize.getLocales();
const defaultLng = 'en';

if (Array.isArray(currentLng)) {
    defaultLng = locales[0].languageTag;
}

const languageDetector = {
    type: 'languageDetector',
    async: true, // flags below detection to be async
    detect: (callback) => {
        console.log('---------- Current Language: ' + defaultLng);
        callback(defaultLng);
    },
    init: () => { },
    cacheUserLanguage: () => { }
}

i18next
    .use(languageDetector)
    .use(reactI18nextModule)
    .init({
        interpolation: {
            escapeValue: false
        },
        fallbackLng: 'en',
        lng: 'en',
        resources: {
            en: {
                translation: enDoc
            },
            ja: {
                translation: jaDoc
            },
            "zh-Hans": {
                translation: zhHansDoc
            },
            "zh-Hant": {
                translation: zhHantDoc
            }
        }
    });

export default i18next;
