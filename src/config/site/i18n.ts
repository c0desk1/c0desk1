export const i18nConfig = {
  locales: ['id', 'en', 'ru'] as const,
  defaultLocale: 'id' as const,

  labels: {
    id: {
      home: "Beranda",
      blog: "Blog",
      portfolio: "Portfolio",
      about: "Tentang",
      adogen: "Adogen",
      navigation: "Navigasi",
      tools: "Alat",
      legal: "Legal",
      contact: "Kontak",
      privacyPolicy: "Kebijakan Privasi",
      termsOfService: "Ketentuan Layanan",
      disclaimer: "Disclaimer",
      cookiePolicy: "Kebijakan Cookie",
      dmca: "DMCA",
      email: "Email",
      contactUs: "Hubungi Kami",
      
      pageNavigation: "Navigasi Halaman",
      articleHeader: "Judul Artikel",
      
      backToTop: "Kembali ke atas",

      relatedArticles: "Artikel Terkait",
      
      articleNavigation: "Navigasi artikel",
      previous: "Sebelumnya",
      next: "Selanjutnya",
      previousArticle: "Artikel sebelumnya",
      nextArticle: "Artikel selanjutnya",
      general: "Umum",
      author: "Penulis",
      readAlso: "Baca juga.",
      readArticle: "Baca artikel",

      // BLOG //
      latestPosts: "Terbaru.",
      noBlogPosts: "Belum ada postingan blog.",
      viewAll: "Lihat semua",

      // CATEGORY TAB //
      all: "Semua",
      selectCategory: "Pilih kategori",
      noPostsInCategory: "Belum ada postingan di kategori ini.",
      showMore: "Tampilkan lebih banyak",
      seeAllPosts: "Lihat semua postingan",
      browsePostsByCategory: "Jelajahi postingan berdasarkan kategori",
      filterCategory: "Filter kategori",
      
      // POST META
      minRead: 'menit baca',
      
      // NEWSLETTER
      newsletterHeading: 'Tetap terhubung',
      newsletterSub: 'Dapatkan postingan terbaru yang dikirimkan ke kotak masuk Anda.',
      newsletterPlaceholder: 'nama@email.com',
      newsletterBtn: 'Berlangganan',
      newsletterSuccess: 'Terima kasih telah berlangganan!',
      newsletterNote: 'Tidak ada spam. Anda dapat berhenti berlangganan kapan saja.',
      newsletterInvalid: 'Silakan masukkan alamat email yang valid.',
      newsletterExists: 'Email sudah terdaftar.',
      newsletterError: 'Terjadi kesalahan. Silakan coba lagi.',
      newsletterToastSuccess: 'Sudah berlangganan! Periksa kotak masuk Anda.',
      newsletterNetwork: 'Gagal terhubung. Silakan coba lagi nanti.',

      // BREADCRUMB
      breadcrumbAria: 'Navigasi breadcrumb',
      
      // BUTTON //

      // MENU //
      openMenu: "Buka menu",
      closeMenu: "Tutup menu",

      // SEARCH //
      search: "Cari",
      searchPlaceholder: "Cari...",
      searchModalLabel: "Cari artikel",
      clearSearch: "Hapus teks pencarian",
      closeSearch: "Tutup pencarian",
      navigate: "Navigasi",
      open: "Buka",
      results: "hasil",
      notFound: "Tidak ditemukan",
      tryOtherKeywords: "Coba kata kunci lain",
      searchArticles: "Cari artikel",
      typeToSearch: "Ketik untuk mulai mencari",
      dataNotReady: "Data belum siap",
      refreshPage: "Silakan refresh halaman",
      uncategorized: "Uncategorized",

      // STATUS //
      loadingSystem: "Memuat Sistem...",

      // COPY LINK
      copyUrl: 'Salin URL',
      copied: 'Tersalin!',
      copyFailed: 'Gagal',
      copyUrlAria: 'Salin tautan artikel',
      copiedAria: 'URL berhasil disalin',
      copyFailedAria: 'Gagal menyalin URL',
      copyToastSuccess: 'URL disalin ke clipboard!',
      copyToastFailed: 'Gagal menyalin URL, silakan coba lagi.',
      
      // TTS
      listen: 'Bacakan',
      listening: 'Membacakan...',
      listenAria: 'Dengarkan artikel',
      stopAria: 'Hentikan bacaan',
      ttsPrev: 'Sebelumnya',
      ttsNext: 'Berikutnya',
      ttsPlayPause: 'Jeda / Lanjut',
      ttsClose: 'Tutup',
      
      // THEME TOGGLE
      themeToggleGroup: 'Pilih tema',
      themeSystem: 'Ikuti sistem',
      themeLight: 'Tema terang',
      themeDark: 'Tema gelap',
    },
    en: {
      home: "Home",
      blog: "Blog",
      portfolio: "Portfolio",
      about: "About",
      adogen: "Adogen",
      navigation: "Navigation",
      tools: "Tools",
      legal: "Legal",
      contact: "Contact",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      disclaimer: "Disclaimer",
      cookiePolicy: "Cookie Policy",
      dmca: "DMCA",
      email: "Email",
      contactUs: "Contact Us",
      
      pageNavigation: "Page Navigation",
      articleHeader: "Article Header",
      
      backToTop: "Back to top",

      relatedArticles: "Related articles",
      articleNavigation: "Article Navigation",
      previous: "Previous",
      next: "Next",
      previousArticle: "Previous article",
      nextArticle: "Next article",
      general: "General",
      author: "Author",
      readAlso: "Read also.",
      readArticle: "Read article",

      // BLOG //
      latestPosts: "Latest.",
      noBlogPosts: "No blog posts yet.",
      viewAll: "View all",

      // CATEGORY TAB //
      all: "All",
      selectCategory: "Select category",
      noPostsInCategory: "No posts in this category yet.",
      showMore: "Show more",
      seeAllPosts: "See all posts",
      browsePostsByCategory: "Browse posts by category",
      filterCategory: "Filter category",
      
      // POST META
      minRead: 'min read',
      
      // NEWSLETTER
      newsletterHeading: 'Stay connected',
      newsletterSub: 'Get the latest posts delivered to your inbox.',
      newsletterPlaceholder: 'name@email.com',
      newsletterBtn: 'Subscribe',
      newsletterSuccess: 'Thanks for subscribing!',
      newsletterNote: 'No spam. Unsubscribe anytime.',
      newsletterInvalid: 'Please enter a valid email address.',
      newsletterExists: 'Email already subscribed.',
      newsletterError: 'Something went wrong. Please try again.',
      newsletterToastSuccess: 'Subscribed! Check your inbox.',
      newsletterNetwork: 'Connection failed. Please try again later.',

      // BREADCRUMB
      breadcrumbAria: 'Breadcrumb',
      
      // BUTTON //

      // SEARCH //
      search: "Search",
      searchPlaceholder: "Search...",
      searchModalLabel: "Search articles",
      clearSearch: "Clear search text",
      closeSearch: "Close search",
      navigate: "Navigate",
      open: "Open",
      results: "results",
      notFound: "Not found",
      tryOtherKeywords: "Try other keywords",
      searchArticles: "Search articles",
      typeToSearch: "Type to start searching",
      dataNotReady: "Data not ready",
      refreshPage: "Please refresh the page",
      uncategorized: "Uncategorized",

      // STATUS //
      loadingSystem: "Loading System...",

      // MENU //
      openMenu: "Open menu",
      closeMenu: "Close menu",

      // COPY LINK
      copyUrl: 'Copy URL',
      copied: 'Copied!',
      copyFailed: 'Failed',
      copyUrlAria: 'Copy article URL',
      copiedAria: 'URL copied successfully',
      copyFailedAria: 'Failed to copy URL',
      copyToastSuccess: 'URL copied to clipboard!',
      copyToastFailed: 'Failed to copy URL, please try again.',
      
      // TTS
      listen: 'Listen',
      listening: 'Listening...',
      listenAria: 'Listen to article',
      stopAria: 'Stop listening',
      ttsPrev: 'Previous',
      ttsNext: 'Next',
      ttsPlayPause: 'Pause / Resume',
      ttsClose: 'Close',
      
      // THEME TOGGLE
      themeToggleGroup: 'Choose theme',
      themeSystem: 'System',
      themeLight: 'Light',
      themeDark: 'Dark',
    },
    ru: {
      home: "дом",
      blog: "Блог",
      portfolio: "Портфолио",
      about: "О нас",
      adogen: "Adogen",
      navigation: "Навигация",
      tools: "Инструменты",
      legal: "Правовая информация",
      contact: "Контакты",
      privacyPolicy: "Политика конфиденциальности",
      termsOfService: "Условия использования",
      disclaimer: "Отказ от ответственности",
      cookiePolicy: "Политика использования cookie",
      dmca: "DMCA",
      email: "Email",
      contactUs: "Связаться с нами",
      
      pageNavigation: "навигация по страницам",
      articleHeader: "Заголовок статьи",
      
      backToTop: "Вернуться наверх",

      relatedArticles: "Статьи по теме",
      
      articleNavigation: "Навигация по статьям",
      previous: "Предыдущий",
      next: "Следующий",
      previousArticle: "Предыдущая статья",
      nextArticle: "Следующая статья",
      general: "Общее",
      author: "Автор",
      readAlso: "Читайте также.",
      readArticle: "Читать статью",

      // BLOG //
      latestPosts: "Последнее.",
      noBlogPosts: "Пока нет записей в блоге.",
      viewAll: "Смотреть все",

      // CATEGORY TAB //
      all: "Все",
      selectCategory: "Выбрать категорию",
      noPostsInCategory: "В этой категории пока нет записей.",
      showMore: "Показать больше",
      seeAllPosts: "Смотреть все записи",
      browsePostsByCategory: "Просмотр записей по категориям",
      filterCategory: "Фильтр категорий",
      
      // POST META
      minRead: 'мин чтения',
      
      // NEWSLETTER
      newsletterHeading: 'Оставайтесь на связи',
      newsletterSub: 'Получайте свежие публикации на почту.',
      newsletterPlaceholder: 'name@email.com',
      newsletterBtn: 'Подписаться',
      newsletterSuccess: 'Спасибо за подписку!',
      newsletterNote: 'Никакого спама. Отписаться можно в любой момент.',
      newsletterInvalid: 'Пожалуйста, введите действительный email.',
      newsletterExists: 'Email уже подписан.',
      newsletterError: 'Что-то пошло не так. Попробуйте снова.',
      newsletterToastSuccess: 'Вы подписаны! Проверьте почту.',
      newsletterNetwork: 'Ошибка подключения. Попробуйте позже.',

      // BREADCRUMB
      breadcrumbAria: 'Навигационная цепочка',
      
      // BUTTON //

      // SEARCH //
      search: "Поиск",
      searchPlaceholder: "Поиск...",
      searchModalLabel: "Поиск статей",
      clearSearch: "Очистить поиск",
      closeSearch: "Закрыть поиск",
      navigate: "Навигация",
      open: "Открыть",
      results: "результатов",
      notFound: "Не найдено",
      tryOtherKeywords: "Попробуйте другие ключевые слова",
      searchArticles: "Поиск статей",
      typeToSearch: "Начните вводить для поиска",
      dataNotReady: "Данные не готовы",
      refreshPage: "Обновите страницу",
      uncategorized: "Без категории",

      // STATUS //
      loadingSystem: "Загрузка системы...",

      // MENU //
      openMenu: "Открыть меню",
      closeMenu: "Закрыть меню",

      // COPY LINK
      copyUrl: 'Копировать URL',
      copied: 'Скопировано!',
      copyFailed: 'Ошибка',
      copyUrlAria: 'Копировать ссылку на статью',
      copiedAria: 'URL успешно скопирован',
      copyFailedAria: 'Не удалось скопировать URL',
      copyToastSuccess: 'URL скопирован в буфер обмена!',
      copyToastFailed: 'Не удалось скопировать URL, попробуйте снова.',
      
      // TTS
      listen: 'Прослушать',
      listening: 'Воспроизведение...',
      listenAria: 'Прослушать статью',
      stopAria: 'Остановить',
      ttsPrev: 'Назад',
      ttsNext: 'Далее',
      ttsPlayPause: 'Пауза / Продолжить',
      ttsClose: 'Закрыть',
      
      // THEME TOGGLE
      themeToggleGroup: 'Выбрать тему',
      themeSystem: 'Как в системе',
      themeLight: 'Светлая',
      themeDark: 'Тёмная',
    }
  }
} as const;

export type Locale = typeof i18nConfig.locales[number];
export type LabelKey = keyof typeof i18nConfig.labels.id;
