import i18n from 'i18next'
import ICU from 'i18next-icu'
import XHR from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from 'i18next-icu/locale-data/en'
import pl from 'i18next-icu/locale-data/pl'
import pt from 'i18next-icu/locale-data/pt'

i18n
  .use(new ICU({
    localeData: [en, pl, pt]
  }))
  .use(XHR)
  .use(LanguageDetector)
  .init({
    ns: ['explore'],
    fallbackLng: 'en',
    debug: true,
    // react i18next special options (optional)
    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    }
  })

export default i18n
