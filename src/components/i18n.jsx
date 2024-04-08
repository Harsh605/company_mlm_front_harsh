import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { en_data } from "./multiLanguage/en/global";
import { hi_data } from "./multiLanguage/hi/global";

const resources = {
  en: {
    translation: en_data,
  },
  hi: {
    translation: hi_data,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    lng: "en",
    resources,
  });

export default i18n;
