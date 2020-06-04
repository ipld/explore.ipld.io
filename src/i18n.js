import i18n from 'i18next'
import ICU from 'i18next-icu'
import StaticHttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import ca from 'i18next-icu/locale-data/ca'
import cs from 'i18next-icu/locale-data/cs'
import da from 'i18next-icu/locale-data/da'
import de from 'i18next-icu/locale-data/de'
import en from 'i18next-icu/locale-data/en'
import es from 'i18next-icu/locale-data/es'
import fr from 'i18next-icu/locale-data/fr'
import it from 'i18next-icu/locale-data/it'
import ja from 'i18next-icu/locale-data/ja'
import ko from 'i18next-icu/locale-data/ko'
import nl from 'i18next-icu/locale-data/nl'
import no from 'i18next-icu/locale-data/no'
import pl from 'i18next-icu/locale-data/pl'
import pt from 'i18next-icu/locale-data/pt'
import ru from 'i18next-icu/locale-data/ru'
import sv from 'i18next-icu/locale-data/sv'
import zh from 'i18next-icu/locale-data/zh'

const localeData = [ca, cs, da, de, en, es, fr, it, ja, ko, nl, no, pl, pt, ru, sv, zh]

i18n
  .use(new ICU({ localeData }))
  .use(StaticHttpBackend)
  .use(LanguageDetector)
  .init({
    ns: ['explore'],
    fallbackLng: {
      'zh-Hans': ['zh-CN', 'en'],
      'zh-Hant': ['zh-TW', 'en'],
      zh: ['zh-CN', 'en'],
      default: ['en']
    },
    debug: process.env.DEBUG,
    backend: {
      // ensure a realtive path is used to look up the locales, so it works when used from /ipfs/<cid>
      loadPath: 'locales/{{lng}}/{{ns}}.json'
    },
    // react i18next special options (optional)
    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default',
      useSuspense: false
    }
  })

export default i18n
