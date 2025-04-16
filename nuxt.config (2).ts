// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxthub/core',
    '@nuxtjs/i18n'


  ],

  
  
  i18n: {
    locales: [ // Список поддерживаемых языков
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ru', name: 'Русский', file: 'ru.json' }
    ],
    defaultLocale: 'en', // Язык по умолчанию
    lazy: true, // Ленивая загрузка переводов
    langDir: '../locales', // Папка с файлами переводов
    strategy: 'prefix_except_default', // Стратегия маршрутизации
    //strategy: 'no_prefix',

    detectBrowserLanguage: { // Автоматическое определение языка браузера
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  }
  ,
  
  runtimeConfig: {
    public: {
      //wsUrl: process.env.WS_URL || "wss://app.mine.bz/api/socket",

      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY
    }
  }
,

  vite: {
    server: {
      allowedHosts: ['.ngrok-free.app'] // Разрешаем ngrok
    }
  }

})