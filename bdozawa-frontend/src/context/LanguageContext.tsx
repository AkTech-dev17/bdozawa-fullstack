import React, { createContext, useState } from 'react';

type Language = 'English' | 'Kurdish (Sorani)' | 'Arabic';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations: Record<Language, Record<string, string>> = {
  English: {
    lostItems: 'Lost items',
    foundItems: 'Found items',
    howItWorks: 'How it works',
    successStories: 'Success stories',
    signIn: 'Sign in',
    getStarted: 'Get started',
    searchTitle: 'Search items',
    searchSubtitle: 'Filter by type, category and keywords to find what you\'re looking for.',
    searchPlaceholder: 'Search by title, brand, location, keyword...',
  },
  'Kurdish (Sorani)': {
    lostItems: 'شتە لەستووەکان',
    foundItems: 'شتە دۆزراوەکان',
    howItWorks: 'چۆنیەتی کارکردن',
    successStories: 'چیرۆکە سەرکەوتووەکان',
    signIn: 'چوونەژوورەوە',
    getStarted: 'دەست پێبکە',
    searchTitle: 'گەڕان بەدوای شتەکاندا',
    searchSubtitle: 'فلتەر بکە بەپێی جۆر، پۆل و وشەی کلیدی بۆ دۆزەرەوەی ئەوەی دەگەڕێیت بەدوایدا.',
    searchPlaceholder: 'گەڕان بەپێی ناونیشان، مارکە، شوێن، وشەی کلیدی...',
  },
Arabic: {
    lostItems: 'العناصر المفقودة',
    foundItems: 'العناصر المعثورة',
    howItWorks: 'كيف يعمل',
    successStories: 'قصص النجاح',
    signIn: 'تسجيل الدخول',
    getStarted: 'ابدأ الان',
    searchTitle: 'البحث عن العناصر',
    searchSubtitle: 'قم بالتصفية حسب النوع والفئة والكلمات الرئيسية للعثور على ما تبحث عنه.',
    searchPlaceholder: 'البحث بالعنوان، العلامة التجارية، الموقع، الكلمة الرئيسية...',
  },
};

// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('English');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir = language === 'English' ? 'ltr' : 'rtl';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <div dir={dir} style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};