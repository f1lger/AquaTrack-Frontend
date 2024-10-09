import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json'; // ваші файли локалізації
import ua from './locales/ua.json'; // ваші файли локалізації

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ua: {
      translation: ua,
    },
  },
  lng: 'en', // Мова за замовчуванням
  fallbackLng: 'en', // Резервна мова
  interpolation: {
    escapeValue: false, // React уже робить екранування, тому це не потрібно
  },
});

export default i18n;
