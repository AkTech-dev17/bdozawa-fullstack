import React, { createContext, useContext, useState } from 'react';

type Language = 'English' | 'Kurdish (Sorani)' | 'Arabic';
type Theme = 'dark' | 'light';

interface ContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
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
  },
  'Kurdish (Sorani)': {
    lostItems: 'شتە لەستووەکان',
    foundItems: 'شتە دۆزراوەکان',
    howItWorks: 'چۆنیەتی کارکردن',
    successStories: 'چیرۆکە سەرکەوتووەکان',
    signIn: 'چوونەژوورەوە',
    getStarted: 'دەست پێبکە',
  },
  Arabic: {
    lostItems: 'العناصر المفقودة',
    foundItems: 'العناصر المعثورة',
    howItWorks: 'كيف يعمل',
    successStories: 'قصص النجاح',
    signIn: 'تسجيل الدخول',
    getStarted: 'ابدأ الان',
  },
};

const ThemeLanguageContext = createContext<ContextType | undefined>(undefined);

export const ThemeLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('English');
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir = language === 'English' ? 'ltr' : 'rtl';

  // Dynamic theme styles
  const themeStyles = {
    backgroundColor: theme === 'dark' ? '#0d1117' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#1f2937',
    minHeight: '100vh',
    width: '100%',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box' as const,
    transition: 'background-color 0.2s ease, color 0.2s ease',
  };

  return (
    <ThemeLanguageContext.Provider value={{ language, setLanguage, theme, toggleTheme, t, dir }}>
      <div dir={dir} style={{ ...themeStyles, textAlign: dir === 'rtl' ? 'right' : 'left' }}>
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