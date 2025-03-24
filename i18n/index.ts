import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// 导入语言文件
import zh from './locales/zh'
import en from './locales/en'

i18n.use(initReactI18next).init({
  resources: {
    zh: {
      translation: zh
    },
    en: {
      translation: en
    }
  },
  lng: 'en', // 默认语言
  fallbackLng: 'en', // 回退语言
  interpolation: {
    escapeValue: false
  }
})

export default i18n 