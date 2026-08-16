import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight, FiShield, FiUsers } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { FcGoogle } from 'react-icons/fc';
import logoImg from '../assets/bdozawa.png';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

const Login = () => {
  const navigate = useNavigate();
  const { t, dir } = useThemeLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Logged in successfully! (Mock)');
    navigate('/');
  };

  const isRtl = dir === 'rtl';

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: isRtl ? 'row-reverse' : 'row', backgroundColor: '#0d1117', color: '#ffffff', overflow: 'hidden', boxSizing: 'border-box' }}>
      
      {/* LEFT SIDE - Form Panel */}
      <div style={{ flex: '1', backgroundColor: '#0d1117', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem', position: 'relative', boxSizing: 'border-box', overflowY: 'auto', textAlign: isRtl ? 'right' : 'left' }}>
        
        <Link 
          to="/" 
          style={{ position: 'absolute', top: '2rem', [isRtl ? 'right' : 'left']: '3rem', color: '#8b949e', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: '500', flexDirection: isRtl ? 'row-reverse' : 'row' }}
        >
          <FiArrowRight size={16} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} /> {t('backHome')}
        </Link>

        <div style={{ width: '100%', maxWidth: '380px' }}>
          
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#f0f6fc', margin: '0 0 0.5rem 0' }}>{t('welcomeBack')}</h2>
            <p style={{ color: '#8b949e', fontSize: '0.95rem', margin: 0, direction: isRtl ? 'rtl' : 'ltr' }}>{t('loginSubtitle')}</p>
          </div>

          <button 
            onClick={() => alert('Google Sign-in Mock')}
            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', color: '#f0f6fc', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', marginBottom: '1.25rem', fontSize: '0.95rem' }}
          >
            <FcGoogle size={20} /> Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', color: '#8b949e', fontSize: '0.8rem', margin: '1.25rem 0' }}>
            <div style={{ flex: '1', borderBottom: '1px solid #30363d' }}></div>
            <span style={{ padding: '0 10px' }}>{t('orContinueEmail')}</span>
            <div style={{ flex: '1', borderBottom: '1px solid #30363d' }}></div>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#f0f6fc', marginBottom: '0.5rem' }}>{t('email')}</label>
              <div style={{ position: 'relative' }}>
                <FiMail size={18} style={{ position: 'absolute', [isRtl ? 'right' : 'left']: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#8b949e' }} />
                <input 
                  type="email" 
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: isRtl ? '0.75rem 2.75rem 0.75rem 1rem' : '0.75rem 1rem 0.75rem 2.75rem', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', color: '#f0f6fc', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', textAlign: isRtl ? 'right' : 'left' }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#f0f6fc' }}>{t('password')}</label>
                <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: '#60a5fa', textDecoration: 'none' }}>{t('forgotPassword')}</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <FiLock size={18} style={{ position: 'absolute', [isRtl ? 'right' : 'left']: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#8b949e' }} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: isRtl ? '0.75rem 2.75rem 0.75rem 1rem' : '0.75rem 1rem 0.75rem 2.75rem', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', color: '#f0f6fc', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', textAlign: isRtl ? 'right' : 'left' }}
                />
              </div>
            </div>

            <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#60a5fa', color: '#0d1117', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              {t('signInBtn')}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/magic-link" style={{ color: '#60a5fa', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>
              {t('magicLink')}
            </Link>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#8b949e' }}>
            {t('newHere')} <Link to="/register" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 'bold', marginInlineStart: '4px' }}>{t('createAccountLink')}</Link>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE - Blue Branding Panel */}
      <div style={{ 
        flex: '1', 
        backgroundColor: '#60a5fa', 
        color: '#0d1117', 
        padding: '4rem', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        textAlign: isRtl ? 'right' : 'left'
      }}>
        {/* LOGO UPDATE HERE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.4rem', fontWeight: '700', letterSpacing: '-0.5px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
          <img src={logoImg} alt="Bdozawa Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
          Bdozawa
        </div>

        <div style={{ maxWidth: '450px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: '1.2', margin: '0 0 1.5rem 0', color: '#0d1117', direction: isRtl ? 'rtl' : 'ltr' }}>
            {t('loginRightTitle')}
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              <div style={{ backgroundColor: 'rgba(13, 17, 23, 0.1)', padding: '10px', borderRadius: '8px', color: '#0d1117' }}>
                <HiOutlineSparkles size={22} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 'bold' }}>{t('smartMatching')}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#1f2937', opacity: 0.85 }}>{t('smartMatchingDesc')}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              <div style={{ backgroundColor: 'rgba(13, 17, 23, 0.1)', padding: '10px', borderRadius: '8px', color: '#0d1117' }}>
                <FiShield size={22} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 'bold' }}>{t('privateSecure')}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#1f2937', opacity: 0.85 }}>{t('privateSecureDesc')}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              <div style={{ backgroundColor: 'rgba(13, 17, 23, 0.1)', padding: '10px', borderRadius: '8px', color: '#0d1117' }}>
                <FiUsers size={22} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 'bold' }}>{t('trustedCommunity')}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#1f2937', opacity: 0.85 }}>{t('trustedCommunityDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ fontSize: '0.85rem', color: '#1f2937', opacity: 0.8 }}>
          {t('allRightsReserved')}
        </div>
      </div>

    </div>
  );
};

Login.displayName = 'Login';
export default Login;