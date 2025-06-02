import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import enQuilt from './locale/en.json';
import esQuilt from './locale/es.json';

const resources = {
  en: { translation: enQuilt },
  es: { translation: esQuilt },
};

const setupI18n = async () => {
  const savedLang = await AsyncStorage.getItem('userLanguage');

  console.log('resources -->', resources);
  await i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      resources,
      lng: savedLang || 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
};

setupI18n();

export default setupI18n;
