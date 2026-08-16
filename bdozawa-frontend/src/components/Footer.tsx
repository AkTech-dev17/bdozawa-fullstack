import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import logoImg from '../assets/bdozawa.png';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

const Footer = () => {
  const { t, dir } = useThemeLanguage();
  const isRtl = dir === 'rtl';

  return (
    <footer style={{ 
      backgroundColor: '#0d1117', 
      borderTop: '1px solid #30363d', 
      color: '#8b949e', 
      padding: '3rem 3% 2rem 3%', 
      width: '100%', 
      boxSizing: 'border-box',
      marginTop: 'auto',
      textAlign: isRtl ? 'right' : 'left'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: window.innerWidth < 768 ? 'column' : (isRtl ? 'row-reverse' : 'row'),
        justifyContent: 'space-between', 
        alignItems: window.innerWidth < 768 ? 'flex-start' : 'center',
        gap: '2rem', 
        paddingBottom: '2.5rem',
        borderBottom: '1px solid #30363d'
      }}>
        
       {/* Left Side: Brand & Socials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f0f6fc', fontWeight: '700', fontSize: '1.4rem', letterSpacing: '-0.5px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
            <img 
              src={logoImg} 
              alt="Bdozawa Logo" 
              style={{ 
                width: '32px', 
                height: '32px', 
                objectFit: 'contain', 
                filter: 'brightness(0) invert(1)' 
              }} 
            />
            Bdozawa
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0, maxWidth: '300px' }}>
            {t('footerTagline')}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
            {/* GitHub Link */}
            <a 
              href="https://github.com/AkTech-dev17" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="GitHub"
              style={{ width: '36px', height: '36px', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b949e', textDecoration: 'none', transition: 'color 0.2s, border-color 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#f0f6fc'; e.currentTarget.style.borderColor = '#60a5fa'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#8b949e'; e.currentTarget.style.borderColor = '#30363d'; }}
            >
              <FaGithub size={16} />
            </a>
            
            {/* LinkedIn Link */}
            <a 
              href="https://www.linkedin.com/in/akar-shwan-4577822a1/" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="LinkedIn"
              style={{ width: '36px', height: '36px', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b949e', textDecoration: 'none', transition: 'color 0.2s, border-color 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#f0f6fc'; e.currentTarget.style.borderColor = '#60a5fa'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#8b949e'; e.currentTarget.style.borderColor = '#30363d'; }}
            >
              <FaLinkedinIn size={16} />
            </a>
          </div>
        </div>

        {/* Right Side: Clean Inline Navigation Links */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.75rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
          <Link to="/search?type=lost" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '0.9rem' }}>{t('lostItems')}</Link>
          <Link to="/search?type=found" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '0.9rem' }}>{t('foundItems')}</Link>
          <Link to="/register" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '0.9rem' }}>{t('reportAnItem')}</Link>
          <Link to="/#how-it-works" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '0.9rem' }}>{t('howItWorks')}</Link>
          <Link to="/#success-stories" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '0.9rem' }}>{t('successStories')}</Link>
        </div>

      </div>

      {/* Bottom Bar: Copyright & Engineer Credit */}
      <div style={{ maxWidth: '1200px', margin: '1.5rem auto 0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', flexWrap: 'wrap', gap: '1rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
        <div>
          {t('allRightsReserved')}
        </div>
        <div>
          Engineered by <span style={{ color: '#f0f6fc', fontWeight: 'bold' }}>Akar</span>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
export default Footer;