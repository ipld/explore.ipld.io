import i18n from 'i18next'
import ICU from 'i18next-icu'
import XHR from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from 'i18next-icu/locale-data/en'
import ko from 'i18next-icu/locale-data/ko'
import no from 'i18next-icu/locale-data/no'
import pl from 'i18next-icu/locale-data/pl'
import pt from 'i18next-icu/locale-data/pt'
import sv from 'i18next-icu/locale-data/sv'

i18n
  .use(new ICU({
    localeData: [en, ko, no, pl, pt, sv]
  }))
  .use(XHR)
  .use(LanguageDetector)
  .init({
    ns: ['explore'],
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',
    backend: {
      // ensure a realtive path is used to look up the locales, so it works when used from /ipfs/<cid>
      loadPath: 'locales/{{lng}}/{{ns}}.json'
    },
    // react i18next special options (optional)
    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    }
  })

export default i18n
