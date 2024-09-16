import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import { en } from "./vocab/eng";
import { ua } from "./vocab/ukr";

const resourses = {
  en: { translation: en },
  ua: { translation: ua },
};
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resourses,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
