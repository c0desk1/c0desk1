// src/config/site/labels.ts
export const labels = {
  //_________Base___________//
  skipToContent: "Skip to main content",
  backToTop: "Back to top",
  minRead: "minutes read",
  breadcrumbAria: "Breadcrumb navigation",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  general: "General",
  readArticle: "Read article",
  lastUpdated: "Last updated",
  uncategorized: "Uncategorized",
  articles: "articles",

  //_________Header___________//
  navAria: "Primary navigation",
  mobileAria: "Menu navigation",
  footerNav: "Bottom navigation",

  //____NavSection
  navigation: "Navigation",
  tools: "Tools",
  legal: "Legal",
  contact: "Contact",

  //____DesktopNav + MobileMenu + FooterMenu
  home: "Home",
  blog: "Blog",
  portfolio: "Portfolio",
  about: "About",
  adogen: "Adogen",
  privacyPolicy: "Privacy Policy",
  termsOfService: "Terms Of Service",
  disclaimer: "Disclaimer",
  cookiePolicy: "Cookie Policy",
  dmca: "DMCA",
  email: "Email",
  contactUs: "Contact Us",

  //____Theme Toggle
  themeToggleGroup: "Choose a theme",
  themeSystem: "Follow the system",
  themeLight: "Light theme",
  themeDark: "Dark theme",

  //____Search
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
  dataNotReady: "Data is not ready",
  refreshPage: "Please refresh the page",

  //____Author______//
  authorPage: "Author",
  avatarOf: "Avatar of",
  contentCreatorLabel: "Creator Content",

  //____Homepage______//
  HeroAria: "Hero section",
  HeroTitle: "Creative. engineer",

  home_BlogSection: "Latest Articles",
  home_PortfolioSection: "Featured Projects",

  //____Blogpage______//
  blog_PageTitle: "Blog",
  blog_PageDescription: "Behind-the-scenes notes on systems, creativity, and exploring the modern digital world.",
  
  b_p_n: "Page",
  blog_HeroAria: "Blog Introduction",
  blog_HeroTitle: "Explore our Blog posts and updates",
  blog_featuredPosts: "Featured.",
  blog_latestPosts: "Latest.",
  b_relatedPosts: "Related Articles",
  blog_noBlogPosts: "No blog posts yet.",
  blog_viewAll: "View all articles",
  b_breadcrumb: "Page Navigation",
  b_articleHeader: "Article Title",
  b_contentCreator: "Content Creator",
  b_articleNavigation: "Article Navigation",
  b_prevPosts: "Previous",
  b_nextPosts: "Next",

  //_________CopyLink________//
  copyUrl: "Copy URL",
  copied: "Copied!",
  copyFailed: "Failed",
  copyUrlAria: "Copy article link",
  copiedAria: "URL copied successfully",
  copyFailedAria: "Copy URL failed",
  copyToastSuccess: "URL copied to clipboard!",
  copyToastFailed: "Copy URL failed, please try again.",

  //_________Share Posts_______//
  share: "Share",
  shareArticle: "Share this article",
  otherPlatforms: "Other platforms",
  more: "More",
  shareTo: "Share to",

  //_______Category__________//
  allCategory: "All",
  selectCategory: "Select a category",
  noPostsInCategory: "There are no posts in this category yet.",
  showMore: "Show more",
  seeAllPosts: "See all posts",
  browsePostsByCategory: "Browse posts by category",
  filterCategory: "Filter categories",

  // 401 Page
  unauthorizedTitle: "401: Unauthorized",
  unauthorizedDesc: "Access denied. Please log in first.",
  unauthorizedHeading: "Unauthorized.",
  unauthorizedMessage: "You need to authenticate to access this resource. Please sign in with valid credentials.",
  signIn: "Sign In",

  // 403 page
  forbiddenTitle: "403: Forbidden",
  forbiddenDesc: "You do not have permission to access this page.",
  forbiddenHeading: "Access denied.",
  forbiddenMessage: "Your credentials are valid, but you do not have the necessary permission level to view this page or directory.",
  goBack: "Go Back",

  //______404
  pageNotFound: "Page not found",
  notFoundTitle: "404: Not Found",
  notFoundDesc: "The page you are looking for cannot be found.",
  returnHome: "Return to Home",

  // 500 page
  serverErrorTitle: "500: Internal Server Error",
  serverErrorDesc: "An error occurred on our server.",
  serverErrorHeading: "Server error.",
  serverErrorMessage: "An unexpected problem occurred on our system that prevented your request from being processed. We have logged this anomaly.",
  tryAgain: "Try again",
} as const;