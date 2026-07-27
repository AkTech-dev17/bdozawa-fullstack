import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import logoImg from '../assets/bdozawa.png';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#0d1117', 
      borderTop: '1px solid #30363d', 
      color: '#8b949e', 
      padding: '3rem 3% 2rem 3%', 
      width: '100%', 
      boxSizing: 'border-box',
      marginTop: 'auto'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: window.innerWidth < 768 ? 'column' : 'row',
        justifyContent: 'space-between', 
        alignItems: window.innerWidth < 768 ? 'flex-start' : 'center',
        gap: '2rem', 
        paddingBottom: '2.5rem',
        borderBottom: '1px solid #30363d'
      }}>
        
        {/* Left Side: Brand & Socials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f0f6fc', fontWeight: 'bold', fontSize: '1.2rem' }}>
            <img 
              src={logoImg} 
              alt="Bdozawa Logo" 
              style={{ 
                width: '198px', 
                height: '38px', 
                objectFit: 'contain', 
                filter: 'brightness(0) invert(1)' 
              }} 
            />
            Bdozawa
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0, maxWidth: '300px' }}>
            The trusted way to reunite people with what they've lost — powered by community and smart matching.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
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
              href="https://www.linkedin.com/in/akar-shwan" 
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.75rem' }}>
          <Link to="/search?type=lost" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '0.9rem' }}>Lost items</Link>
          <Link to="/search?type=found" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '0.9rem' }}>Found items</Link>
          <Link to="/register" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '0.9rem' }}>Report an item</Link>
          <Link to="/#how-it-works" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '0.9rem' }}>How it works</Link>
          <Link to="/#success-stories" style={{ color: '#8b949e', textDecoration: 'none', fontSize: '0.9rem' }}>Success stories</Link>
        </div>

      </div>

      {/* Bottom Bar: Copyright & Engineer Credit */}
      <div style={{ maxWidth: '1200px', margin: '1.5rem auto 0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          © 2026 Bdozawa. All rights reserved.
        </div>
        <div>
          Engineered by <span style={{ color: '#f0f6fc', fontWeight: 'bold' }}>Akar</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;