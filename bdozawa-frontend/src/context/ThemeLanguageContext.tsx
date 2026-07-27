import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'Kurdish (Sorani)' | 'English' | 'Arabic';
type Theme = 'dark' | 'light';

interface ThemeLanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const translations: Record<Language, Record<string, string>> = {
  'English': {
    lostItems: 'Lost items',
    foundItems: 'Found items',
    howItWorks: 'How it works',
    successStories: 'Success stories',
    signIn: 'Sign in',
    getStarted: 'Get started',
    heroTitle: 'Reuniting you with what matters most',
    heroSubtitle: "The world's most sophisticated network for lost and found. Fast, secure, and precision-engineered for modern discovery.",
    reportLost: 'Report a lost item',
    foundSomething: 'I found something',
    searchPlaceholder: 'Search for a lost or found item...',
    searchButton: 'Search',
    browseCategory: 'Browse by category',
    whatAreYouLookingFor: 'What are you looking for?',
    jumpStraight: 'Jump straight to the category that matches your item.',
    viewAll: 'View all',
    recentlyFound: 'Recently found',
    oneOfTheseYours: 'Is one of these yours?',
    kindPeople: 'Kind people found these items and are waiting to return them.',
    itemsReunited: 'Items reunited',
    members: 'Members',
    activeListings: 'Active listings',
    reunionRate: 'Reunion rate',
    realReunions: 'Real reunions, real relief',
    peopleReconnect: 'People reconnect with what they thought was gone for good.',
    isDozerFree: 'Is Bdozawa free to use?',
    isDozerFreeDesc: 'Yes, Reporting lost or found items and connecting with people is completely free. Rewards are optional and set entirely by the person who lost the item.',
    howKeepSafe: 'How do you keep my information safe?',
    howKeepSafeDesc: 'We use advanced encryption and privacy controls to ensure your contact details are shared only when you choose to connect.',
    whatDoBefore: 'What should I do before meeting someone?',
    whatDoBeforeDesc: 'Always meet in a public, well-lit place and verify item details before handing anything over.',
    lostSomethingTitle: 'Lost something? Let\'s bring it home.',
    lostSomethingSubtitle: 'Join a community that believes in giving things back. Post your first listing in under a minute.',
    reportAnItem: 'Report an item',
    browseItems: 'Browse items',
    footerTagline: 'The trusted way to reunite people with what they\'ve lost — powered by community and smart matching.',
    product: 'Product',
    company: 'Company',
    faq: 'FAQ',
    about: 'About',
    careers: 'Careers',
    allRightsReserved: '© 2026 Bdozawa. All rights reserved.',
  },
  'Kurdish (Sorani)': {
    lostItems: 'شتە ونبووەکان',
    foundItems: 'شتە دۆزراوەکان',
    howItWorks: 'چۆن کار دەکات',
    successStories: 'چیڕۆکی سەرکەوتن',
    signIn: 'چوونەژوورەوە',
    getStarted: 'دەستپێکردن',
    heroTitle: 'گه‌ڕاندنه‌وه‌ی ئه‌و شتانه‌ی بۆت گرنگن',
    heroSubtitle: 'پێشکەوتوترین تۆڕ بۆ شتە ونبووەکان و دۆزراوەکان. خێرا، سەلامەت، و دروستکراو بۆ دۆزینەوەی مودێرن.',
    reportLost: 'ڕاپۆرتکردنی شتی ونبوو',
    foundSomething: 'شتێکم دۆزیوەتەوە',
    searchPlaceholder: 'گەڕان بەدوای شتێکی ونبوو یان دۆزراوەدا...',
    searchButton: 'گەڕان',
    browseCategory: 'گەڕان بەپێی پۆل',
    whatAreYouLookingFor: 'بەدوای چی دەگەڕێیت؟',
    jumpStraight: 'ڕاستەوخۆ بچۆ بۆ ئەو پۆلەی کە لەگەڵ شتەکەت دەگونجێت.',
    viewAll: 'بینینی هەموو',
    recentlyFound: 'تازە دۆزراوەکان',
    oneOfTheseYours: 'ئایا بە یەکێک لە مانە هەتییە؟',
    kindPeople: 'کەسیک هەوای دۆزینەوەی نەمان، هەردەکاران تەمەن کورسی دۆزینەوە و لە هەموو ویزەکە گەڕان بۆ کردووە و وەکووە دەکرێت.',
    itemsReunited: 'شتە ڕادەستکراوەکان',
    members: 'ئەندامەکان',
    activeListings: 'لیستە چالاکەکان',
    reunionRate: 'ڕێژەی گەڕانەوە',
    realReunions: 'چوار هەنگاوی ساده بۆ کۆتاییه کی خوش',
    peopleReconnect: 'بە گرتن و بێ ناوی — تەنها پێشەکییەکی بچووک بۆ وێنە و شتە ونبووە و ونبووە.',
    isDozerFree: 'ئایا بێدۆزە بەڕووە؟',
    isDozerFreeDesc: 'بەڵی، ڕاپۆرتکردنی شتە ونبووەکان و دۆزراوەکان و پەیوەندیکردن لەگەڵ کەسانی تر بە تەواوی بێبەرامبەرە. پاداشتەکان ئارەزوومەندانەن و لەلایەن ئەو کەسەوە دیاری دەکرێن کە شتەکەی ون کردووە.',
    howKeepSafe: 'چۆن زانیارییەکانم دەپارێزیت؟',
    howKeepSafeDesc: 'پەنا بەستراوە بە سیستەمی پێشکەوتو و پاراستنی تایبەتمەندی بۆ دڵنیابوون لەوەی زانیارییەکانت پارێزراون.',
    whatDoBefore: 'چۆن بەر لە ملاقاتکردنی کەسێک ماڵ؟',
    whatDoBeforeDesc: 'هەمووکات لە شوێنێکی گشتی و ڕووناکدا یەکتر ببینن و وردەکارییەکان بپشکنن.',
    lostSomethingTitle: 'شتێکت ون بووە؟ شوێنی دۆزینەوەی لێرەیە.',
    lostSomethingSubtitle: 'ئەندام بوون لە کۆمەڵگەیەکەدا کە باوەڕی بە گەڕاندنەوەی شتەکان هەیە. بڵاوکردنەوەی یەکەم ڕاپۆرت لە کەمتر لە خولەکێکدا.',
    reportAnItem: 'ڕاپۆرتی شتێك ونبوو',
    browseItems: 'گەڕان بە شتەکان',
    footerTagline: 'تۆڕی کۆمەڵگەیی تۆ بۆ ڕێکخستنەوەی خێرا و گەڕانەوەی بێگەرد.',
    product: 'بەرهەم',
    company: 'کۆمپانیا',
    faq: 'پرسیارە باوەکان',
    about: 'دەربارە',
    careers: 'هەلی کار',
    allRightsReserved: '© ٢٠٢٦ بێدۆزە. هەموو مافەکان پارێزراون.',
  },
  'Arabic': {
    lostItems: 'العناصر المفقودة',
    foundItems: 'العناصر المعثورة',
    howItWorks: 'كيف يعمل',
    successStories: 'قصص النجاح',
    signIn: 'تسجيل الدخول',
    getStarted: 'ابدأ الان',
    heroTitle: 'نعيذك إلى ما يهمك أكثر',
    heroSubtitle: 'أكثر شبكة تطوراً للمفقودات والموجودات. سريعة وآمنة ومصممة بدقة للاكتشاف الحديث.',
    reportLost: 'أبلغ عن غرض مفقود',
    foundSomething: 'وجدت شيئاً',
    searchPlaceholder: 'ابحث عن غرض مفقود أو موجود...',
    searchButton: 'بحث',
    browseCategory: 'تصفح حسب الفئة',
    whatAreYouLookingFor: 'عَمَّ تبحث؟',
    jumpStraight: 'انتقل مباشرة إلى الفئة التي تطابق غرضك.',
    viewAll: 'تصفح الكل',
    recentlyFound: 'مفقودات حديثة',
    oneOfTheseYours: 'ساعد في إعادة هذه الأغراض',
    kindPeople: 'شخص ما يأمل في إيجادها. عمل صغير يمكن أن يحدث فرقاً كبيراً.',
    itemsReunited: 'أغراض أُعِيدت',
    members: 'الأعضاء',
    activeListings: 'قوائم نشطة',
    reunionRate: 'نسبة الاسترجاع',
    realReunions: 'قصص نجاح',
    peopleReconnect: 'إليك ما يقوله مستخدمونا عن تجربة استخدام Bdozawa.',
    isDozerFree: 'Bdozawa مجاني الاستخدام؟',
    isDozerFreeDesc: 'نعم، الإبلاغ عن المفقودات أو الموجودات والتواصل مع الناس مجاني تماماً. المكافآت اختيارية ويحددها من فقد الغرض.',
    howKeepSafe: 'كيف تحمي معلوماتي؟',
    howKeepSafeDesc: 'نحن نستخدم أحدث تقنيات التشفير والخصوصية لحماية تفاصيل اتصالك.',
    whatDoBefore: 'ماذا أفعل قبل مقابلة شخص ما؟',
    whatDoBeforeDesc: 'التق دائماً في مكان عام ومضاء جيداً وتحقق من التفاصيل.',
    lostSomethingTitle: 'فقدت شيئاً؟ دعنا نعيده إلى البيت.',
    lostSomethingSubtitle: 'انضم إلى مجتمع يؤمن بإعادة الأشياء. انشر إعلانك الأول في أقل من دقيقة.',
    reportAnItem: 'أبلغ عن غرض',
    browseItems: 'تصفح الأغراض',
    footerTagline: 'الطريقة الأكثر موثوقية لمساعدة الناس في استعادة ما فقدوه - مدعومة بالمجتمع والبحث الذكي.',
    product: 'المنتج',
    company: 'الشركة',
    faq: 'الأسئلة الشائعة',
    about: 'حول',
    careers: 'وظائف',
    allRightsReserved: '© 2026 Bdozawa. جميع الحقوق محفوظة.',
  }
};

const ThemeLanguageContext = createContext<ThemeLanguageContextType | undefined>(undefined);

export const ThemeLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('English');
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const dir = (language === 'Kurdish (Sorani)' || language === 'Arabic') ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isDark = theme === 'dark';

  return (
    <ThemeLanguageContext.Provider value={{ language, setLanguage, theme, toggleTheme, t, dir }}>
      <div dir={dir} style={{ width: '100%', minHeight: '100vh', backgroundColor: isDark ? '#0d1117' : '#ffffff', color: isDark ? '#ffffff' : '#111827', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
        {children}
      </div>
    </ThemeLanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeLanguage = () => {
  const context = useContext(ThemeLanguageContext);
  if (!context) {
    throw new Error('useThemeLanguage must be used within a ThemeLanguageProvider');
  }
  return context;
};