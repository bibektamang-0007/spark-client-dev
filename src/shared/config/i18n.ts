import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enShared from "../locales/en/shared.json";
import enPublic from "../locales/en/public.json";
import enAdmin from "../locales/en/admin.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enShared,
        public: enPublic,
        admin: enAdmin,
      },
    },
    defaultNS: "common",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
