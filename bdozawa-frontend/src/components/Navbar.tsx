import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiSearch } from 'react-icons/fi';
import { IoLanguageOutline } from 'react-icons/io5';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import logoImg from '../assets/bdozawa.png';

const Navbar = () => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage, theme, toggleTheme, t, dir } = useThemeLanguage();
  
  const location = useLocation();
  const navigate = useNavigate();

  const isDark = theme === 'dark';
  const isRtl = dir === 'rtl';

  // Match the exact string union types defined in ThemeLanguageContext ('Kurdish (Sorani)' | 'English' | 'Arabic')
  const languages = [
    { name: 'Kurdish (Sorani)', native: 'کوردی' },
    { name: 'English', native: 'English' },
    { name: 'Arabic', native: 'العربية' },
  ] as const;

  // Function to smoothly scroll to sections on the Home page
  const scrollToSection = (sectionId: string) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      width: '100%',
      padding: '1rem 3%', 
      backgroundColor: isDark ? '#030712' : '#ffffff', 
      borderBottom: `1px solid ${isDark ? '#1f2937' : '#e5e7eb'}`,
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxSizing: 'border-box',
      transition: 'background-color 0.2s, border-color 0.2s',
      flexDirection: isRtl ? 'row-reverse' : 'row',
      textAlign: isRtl ? 'right' : 'left'
    }}>
      
      {/* Left Side: Logo & Navigation Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
        
        {/* LOGO UPDATE HERE */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
          <img 
            src={logoImg} 
            alt="Bdozawa Logo" 
            style={{ 
              width: '32px', 
              height: '32px', 
              objectFit: 'contain', 
              filter: isDark ? 'brightness(0) invert(1)' : 'none'
            }} 
          />
          <h1 style={{ color: isDark ? '#ffffff' : '#111827', fontSize: '1.4rem', margin: 0, fontWeight: '700', letterSpacing: '-0.5px' }}>
            Bdozawa
          </h1>
        </Link>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
          <Link to="/search?type=lost" style={{ color: isDark ? '#d1d5db' : '#4b5563', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>
            {t('lostItems')}
          </Link>
          <Link to="/search?type=found" style={{ color: isDark ? '#d1d5db' : '#4b5563', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500' }}>
            {t('foundItems')}
          </Link>
          
          {/* Scroll Buttons for Sections */}
          <button 
            onClick={() => scrollToSection('how-it-works')} 
            style={{ background: 'none', border: 'none', color: isDark ? '#d1d5db' : '#4b5563', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '500', padding: 0 }}
          >
            {t('howItWorks')}
          </button>
          
          <button 
            onClick={() => scrollToSection('success-stories')} 
            style={{ background: 'none', border: 'none', color: isDark ? '#d1d5db' : '#4b5563', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '500', padding: 0 }}
          >
            {t('successStories')}
          </button>
        </div>
      </div>

      {/* Right Side: Search, Language, Theme & Auth */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: isDark ? '#f9fafb' : '#374151', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
          <Link to="/search" style={{ color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <FiSearch size={20} style={{ cursor: 'pointer' }} />
          </Link>

          {/* Language Dropdown */}
          <div style={{ position: 'relative' }}>
            <IoLanguageOutline 
              size={20} 
              style={{ cursor: 'pointer' }} 
              onClick={() => setIsLangOpen(!isLangOpen)}
            />

            {isLangOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                [isRtl ? 'left' : 'right']: 0,
                marginTop: '10px',
                width: '220px',
                backgroundColor: isDark ? '#161b22' : '#ffffff',
                border: `1px solid ${isDark ? '#30363d' : '#e5e7eb'}`,
                borderRadius: '12px',
                padding: '8px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                zIndex: 100,
                textAlign: isRtl ? 'right' : 'left'
              }}>
                {languages.map((lang) => {
                  const isSelected = language === lang.name;
                  return (
                    <div 
                      key={lang.name}
                      onClick={() => {
                        setLanguage(lang.name as never);
                        setIsLangOpen(false);
                      }}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        backgroundColor: isSelected ? (isDark ? '#1f2937' : '#f3f4f6') : 'transparent',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        flexDirection: isRtl ? 'row-reverse' : 'row'
                      }}
                    >
                      <span style={{ fontWeight: isSelected ? 'bold' : 'normal', color: isDark ? '#f0f6fc' : '#111827', fontSize: '0.9rem' }}>
                        {lang.native}
                      </span>
                      <span style={{ color: '#8b949e', fontSize: '0.8rem' }}>
                        {lang.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '4px'
            }}
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
        
        {/* Auth Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginInlineStart: '1rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
          <Link to="/login" style={{ color: isDark ? '#ffffff' : '#111827', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.95rem' }}>
            {t('signIn')}
          </Link>
          <Link to="/register" style={{
            padding: '10px 20px',
            backgroundColor: '#60a5fa', 
            color: '#0d1117',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            textDecoration: 'none',
            fontSize: '0.95rem'
          }}>
            {t('getStarted')}
          </Link>
        </div>

      </div>
    </nav>
  );
};

Navbar.displayName = 'Navbar';
export default Navbar;