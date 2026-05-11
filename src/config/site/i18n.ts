export const i18nConfig = {
  locales: ['id', 'en', 'ru'] as const,
  defaultLocale: 'id' as const,

  labels: {
    id: {
      languageAria: "Pilih bahasa",
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
      contentCreator: "Pembuat Konten",
      skipToContent: "loncat ke konten utama",
      
      backToTop: "Kembali ke atas",

      relatedArticles: "Artikel Terkait",
      
      articleNavigation: "Navigasi artikel",
      previous: "Sebelumnya",
      next: "Selanjutnya",
      previousArticle: "Artikel sebelumnya",
      nextArticle: "Artikel selanjutnya",
      general: "Umum",
      author: "Penulis",
      avatarOf: "Avatar dari",
      readAlso: "Baca juga.",
      readArticle: "Baca artikel",
      lastUpdated: "Terakhir diperbarui",

      // HOMEPAGE //
      HeroTitle: "Creative.",
      HeroHighlight: "engineer",
      HeroDesc: "Eksplorasi workflow digital, AI tools, musik, anime, dan game dari perspektif kreator modern di era otomatisasi.",

      // BLOG //
      blogPageTitle: "Blog & Insights",
      blogPageDescription: "Catatan dari balik layar tentang sistem, kreativitas, dan eksplorasi dunia digital modern.",
      blogHeroTitle: "Blog",
      blogHeroHighlight: "& insights.",
      blogHeroDesc: "Catatan dari balik layar tentang sistem, kreativitas, dan hal-hal yang gue anggap menarik. Sebuah jurnal untuk setiap fragmen yang sedang gue pelajari.",
      latestPosts: "Terbaru.",
      noBlogPosts: "Belum ada postingan blog.",
      viewAll: "Lihat semua",

      // PORTFOLIO //
      portfolioPageTitle: "Portfolio & Projects",
      portfolioPageDesc: "Koleksi karya digital, mulai dari web application, sistem desain, hingga eksperimen teknologi dan UI/UX modern.",
      portfolioHeroTitle: "Crafting",
      portfolioHeroHighlight: "& experiences",
      portfolioHeroDesc: "Kumpulan projek pengembangan web dan beberapa eksperimen visual.",
      portfolioFeatured: "Featured Project",
      portfolioAllProjects: "Semua Project",
      portfolioEmpty: "Belum ada project yang dipublish.",
      portfolioHeader: "Header Portfolio",
      portfolioImageContent: "Gambar Konten Portfolio",
      portfolioMetricsCase: "Metrik & Studi Kasus Portfolio",
      portfolioContent: "Konten Portfolio",
      portfolioGallery: "Galeri",
      portfolioRelatedContent: "Konten Terkait Portfolio",

      perf: "PERF", 
      a11y: "A11Y", 
      seo: "SEO",

      challenge: "Tantangan", 
      solution: "Solusi", 
      result: "Hasil",

      // Portfolio Header
      p_updated: "Diperbarui",
      p_featured: "Unggulan",
      p_client: "Klien",
      p_role: "Peran",
      p_duration: "Durasi",
      p_liveDemo: "Demo",
      p_sourceCode: "Kode Sumber",
      p_techStack: "Tech Stack",

      // PORTFOLIO RELATED //
      pr_relatedProjects: "Proyek terkait",

      // PORTFOLIO METRICS //
      pm_performance: "Performa",
      pm_accessibility: "Aksesibilitas",
      pm_seo: "SEO",

      // CATEGORY TAB //
      all: "Semua",
      selectCategory: "Pilih kategori",
      noPostsInCategory: "Belum ada postingan di kategori ini.",
      showMore: "Tampilkan lebih banyak",
      seeAllPosts: "Lihat semua postingan",
      browsePostsByCategory: "Jelajahi postingan berdasarkan kategori",
      filterCategory: "Filter kategori",

      // COOKIE //
      cookiePreference: "Preferensi cookie",
      cookieValuePrivacy: "Kami menghargai privasi kamu",
      cookieSelectCookie: "Pilih cookie mana yang kamu izinkan",
      close: "Tutup",
      cookieFunctional: "Fungsional",
      cookieFunctionalDesc: "Diperlukan agar situs berjalan. Tidak dapat dinonaktifkan.",
      cookieAnalytics: "Analitik",
      cookieAnalyticsDesc: "Membantu kami memahami cara pengunjung berinteraksi dengan konten.",
      cookieAds: "Iklan & Personalisasi",
      cookieAdsDesc: "Menampilkan iklan yang relevan untuk Anda. Nonaktifkan jika tidak ingin iklan.",
      cookieToggleAnalytics: "Toggle analitik",
      cookieToggleAds: "Toggle iklan",
      cookieRejectAll: "Tolak semua",
      cookieSaveChoice: "Simpan pilihan",
      cookieAcceptAll: "Terima semua",
      cookieChangePreference: "Ubah preferensi cookie",
      
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
      waitingSync: "Menunggu sinkronisasi...",
      justNow: "Baru saja",
      ago: "yang lalu",
      allSystemsNormal: "Semua Sistem Normal.",
      updated: "Diperbarui",
      lastChecks: "cek terakhir",
      offline: "Offline",
      uptime: "Waktu Aktif",
      average: "rata-rata",
      identifyingNode: "Mengidentifikasi...",
      calculating: "Menghitung...",
      systemStatus: "Status Sistem",
      closePanel: "Tutup panel",
      node: "Node",
      lastCheck: "Pemeriksaan Terakhir",
      someTimeAgo: "Beberapa waktu lalu",
      globalEdge: "Global Edge",

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

      // SHARE POST //
      share: "Bagikan",
      shareArticle: "Bagikan artikel ini",
      otherPlatforms: "Platform lainnya",
      more: "Lainnya",
      shareTo: "Bagikan ke",
    },
    en: {
      languageAria: "Select language",
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
      contentCreator: "Content Creator",
      skipToContent: "skip to main content",
      
      backToTop: "Back to top",
      lastUpdated: "Last updated",

      relatedArticles: "Related articles",
      articleNavigation: "Article Navigation",
      previous: "Previous",
      next: "Next",
      previousArticle: "Previous article",
      nextArticle: "Next article",
      general: "General",
      author: "Author",
      avatarOf: "Avatar of",
      readAlso: "Read also.",
      readArticle: "Read article",

      // HOMEPAGE //
      HeroTitle: "Creative.",
      HeroHighlight: "engineer",
      HeroDesc: "Exploring digital workflows, AI tools, music, anime, and games from the perspective of a modern creator in the automation era.",

      // BLOG //
      blogPageTitle: "Blog & Insights",
      blogPageDescription: "Behind-the-scenes notes on systems, creativity, and modern digital exploration.",
      blogHeroTitle: "Blog",
      blogHeroHighlight: "& insights.",
      blogHeroDesc: "Behind-the-scenes notes on systems, creativity, and things I find interesting. A journal for every fragment I'm learning.",
      latestPosts: "Latest.",
      noBlogPosts: "No blog posts yet.",
      viewAll: "View all",

      // PORTFOLIO //
      portfolioPageTitle: "Portfolio & Projects",
      portfolioPageDesc: "A collection of digital works, from web applications, design systems, to tech experiments and modern UI/UX.",
      portfolioHeroTitle: "Crafting",
      portfolioHeroHighlight: "& experiences",
      portfolioHeroDesc: "A collection of web development projects and visual experiments.",
      portfolioFeatured: "Featured Project",
      portfolioAllProjects: "All Projects",
      portfolioEmpty: "No projects published yet.",
      portfolioHeader: "Portfolio Header",
      portfolioImageContent: "Portfolio Image Content",
      portfolioMetricsCase: "Portfolio Metrics & Case Study",
      portfolioContent: "Portfolio Content",
      portfolioGallery: "Gallery",
      portfolioRelatedContent: "Portfolio Related Content",
      perf: "PERF", 
      a11y: "A11Y", 
      seo: "SEO",
      challenge: "Challenge", 
      solution: "Solution", 
      result: "Result",

      // Portfolio Header
      p_updated: "Updated",
      p_featured: "Featured",
      p_client: "Client",
      p_role: "Role",
      p_duration: "Duration",
      p_liveDemo: "Live Demo",
      p_sourceCode: "Source Code",
      p_techStack: "Tech Stack",

      // PORTFOLIO RELATED //
      pr_relatedProjects: "Related Projects",

      // PORTFOLIO METRICS //
      pm_performance: "Performance",
      pm_accessibility: "Accessibility",
      pm_seo: "SEO",

      // CATEGORY TAB //
      all: "All",
      selectCategory: "Select category",
      noPostsInCategory: "No posts in this category yet.",
      showMore: "Show more",
      seeAllPosts: "See all posts",
      browsePostsByCategory: "Browse posts by category",
      filterCategory: "Filter category",

      // COOKIE //
      cookiePreference: "Cookie preference",
      cookieValuePrivacy: "We value your privacy",
      cookieSelectCookie: "Choose which cookies you allow",
      close: "Close",
      cookieFunctional: "Functional",
      cookieFunctionalDesc: "Required for the site to work. Cannot be disabled.",
      cookieAnalytics: "Analytics",
      cookieAnalyticsDesc: "Help us understand how visitors interact with content.",
      cookieAds: "Ads & Personalization",
      cookieAdsDesc: "Show relevant ads for you. Disable if you don't want ads.",
      cookieToggleAnalytics: "Toggle analytics",
      cookieToggleAds: "Toggle ads",
      cookieRejectAll: "Reject all",
      cookieSaveChoice: "Save choice",
      cookieAcceptAll: "Accept all",
      cookieChangePreference: "Change cookie preference",
      
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
      waitingSync: "Waiting for sync...",
      justNow: "Just now",
      ago: "ago",
      allSystemsNormal: "All Systems Operational.",
      updated: "Updated",
      lastChecks: "last checks",
      offline: "Offline",
      uptime: "Uptime",
      average: "average",
      identifyingNode: "Identifying...",
      calculating: "Calculating...",
      systemStatus: "System Status",
      closePanel: "Close panel",
      node: "Node",
      lastCheck: "Last Check",
      someTimeAgo: "Some time ago",
      globalEdge: "Global Edge",

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

      // SHARE POST //
      share: "Share",
      shareArticle: "Share this article",
      otherPlatforms: "Other platforms",
      more: "More",
      shareTo: "Share to",
    },
    ru: {
      languageAria: "Выберите язык",
      home: "Главная",
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
      contentCreator: "Создатель контента",
      
      backToTop: "Наверх",
      skipToContent: "перейти к основному содержимому",

      relatedArticles: "Статьи по теме",
      lastUpdated: "Последнее обновление",
      
      articleNavigation: "Навигация по статьям",
      previous: "Предыдущий",
      next: "Следующий",
      previousArticle: "Предыдущая статья",
      nextArticle: "Следующая статья",
      general: "Общее",
      author: "Автор",
      avatarOf: "Аватар",
      readAlso: "Читайте также.",
      readArticle: "Читать статью",

      // HOMEPAGE //
      HeroTitle: "Креативный.",
      HeroHighlight: "инженер",
      HeroDesc: "Исследование цифровых рабочих процессов, ИИ-инструментов, музыки, аниме и игр с точки зрения современного творца в эпоху автоматизации.",

      // BLOG //
      blogPageTitle: "Блог и инсайты",
      blogPageDescription: "Закулисные заметки о системах, творчестве и исследовании современного цифрового мира.",
      blogHeroTitle: "Блог",
      blogHeroHighlight: "и инсайты.",
      blogHeroDesc: "Закулисные заметки о системах, творчестве и вещах, которые я нахожу интересными. Журнал для каждого фрагмента, который я изучаю.",
      latestPosts: "Последнее.",
      noBlogPosts: "Пока нет записей в блоге.",
      viewAll: "Смотреть все",

      // PORTFOLIO //
      portfolioPageTitle: "Портфолио и проекты",
      portfolioPageDesc: "Коллекция цифровых работ: от веб-приложений и дизайн-систем до технологических экспериментов и современного UI/UX.",
      portfolioHeroTitle: "Создаю",
      portfolioHeroHighlight: "опыт",
      portfolioHeroDesc: "Коллекция проектов веб-разработки и визуальных экспериментов.",
      portfolioFeatured: "Избранный проект",
      portfolioAllProjects: "Все проекты",
      portfolioEmpty: "Пока нет опубликованных проектов.",
      portfolioHeader: "Заголовок портфолио",
      portfolioImageContent: "Изображение портфолио",
      portfolioMetricsCase: "Метрики и кейс-стади портфолио",
      portfolioContent: "Контент портфолио",
      portfolioGallery: "Галерея",
      portfolioRelatedContent: "Связанный контент портфолио",
      perf: "ПРОИЗВ", 
      a11y: "ДОСТУП", 
      seo: "SEO",
      challenge: "Задача", 
      solution: "Решение", 
      result: "Результат",

      // Portfolio Header
      p_updated: "Обновлено",
      p_featured: "Избранное",
      p_client: "Клиент",
      p_role: "Роль",
      p_duration: "Продолжительность",
      p_liveDemo: "Демо",
      p_sourceCode: "Исходный код",
      p_techStack: "Стек технологий",

      // PORTFOLIO RELATED //
      pr_relatedProjects: "Похожие проекты",

      // PORTFOLIO METRICS //
      pm_performance: "Производительность",
      pm_accessibility: "Доступность",
      pm_seo: "SEO",

      // CATEGORY TAB //
      all: "Все",
      selectCategory: "Выбрать категорию",
      noPostsInCategory: "В этой категории пока нет записей.",
      showMore: "Показать больше",
      seeAllPosts: "Смотреть все записи",
      browsePostsByCategory: "Просмотр записей по категориям",
      filterCategory: "Фильтр категорий",

      // COOKIE //
      cookiePreference: "Настройки cookie",
      cookieValuePrivacy: "Мы ценим вашу конфиденциальность",
      cookieSelectCookie: "Выберите какие cookie разрешить",
      close: "Закрыть",
      cookieFunctional: "Функциональные",
      cookieFunctionalDesc: "Необходимы для работы сайта. Нельзя отключить.",
      cookieAnalytics: "Аналитика",
      cookieAnalyticsDesc: "Помогают понять как посетители взаимодействуют с контентом.",
      cookieAds: "Реклама и персонализация",
      cookieAdsDesc: "Показывать релевантную рекламу. Отключите если не хотите рекламу.",
      cookieToggleAnalytics: "Переключить аналитику",
      cookieToggleAds: "Переключить рекламу",
      cookieRejectAll: "Отклонить все",
      cookieSaveChoice: "Сохранить выбор",
      cookieAcceptAll: "Принять все",
      cookieChangePreference: "Изменить настройки cookie",
      
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
      waitingSync: "Ожидание синхронизации...",
      justNow: "Только что",
      ago: "назад",
      allSystemsNormal: "Все системы в норме.",
      updated: "Обновлено",
      lastChecks: "последних проверок",
      offline: "Офлайн",
      uptime: "Аптайм",
      average: "в среднем",
      identifyingNode: "Определение...",
      calculating: "Вычисление...",
      systemStatus: "Статус системы",
      closePanel: "Закрыть панель",
      node: "Узел",
      lastCheck: "Последняя проверка",
      someTimeAgo: "Некоторое время назад",
      globalEdge: "Global Edge",

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

      // SHARE POST //
      share: "Поделиться",
      shareArticle: "Поделиться статьей",
      otherPlatforms: "Другие платформы",
      more: "Ещё",
      shareTo: "Поделиться в",
    },
  }
} as const;

export type Locale = typeof i18nConfig.locales[number];
export type LabelKey = keyof typeof i18nConfig.labels.id;