import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiAlertCircle, FiArrowLeft, FiShield, FiUsers } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { FcGoogle } from 'react-icons/fc';
import logoImg from '../assets/bdozawa.png';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }
    alert('Account created successfully! (Mock)');
    navigate('/login');
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', backgroundColor: '#0d1117', color: '#ffffff', overflow: 'hidden', boxSizing: 'border-box' }}>
      
      {error && (
        <div style={{
          position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)',
          backgroundColor: '#450a0a', color: '#fca5a5', border: '1px solid #7f1d1d',
          padding: '12px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px',
          zIndex: 10000, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', fontWeight: '600', fontSize: '0.95rem'
        }}>
          <FiAlertCircle size={20} />
          Please fill in all fields to register
        </div>
      )}

      {/* LEFT SIDE - Blue Branding Panel */}
      <div style={{ 
        flex: '1', 
        backgroundColor: '#60a5fa', 
        color: '#0d1117', 
        padding: '4rem', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
          <img src={logoImg} alt="Bdozawa Logo" style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '6px' }} />
          Bdozawa
        </div>

        <div style={{ maxWidth: '450px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: '1.2', margin: '0 0 1.5rem 0', color: '#0d1117' }}>
            Join the community that brings things home.
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'rgba(13, 17, 23, 0.1)', padding: '10px', borderRadius: '8px', color: '#0d1117' }}>
                <HiOutlineSparkles size={22} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 'bold' }}>Smart matching</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#1f2937', opacity: 0.85 }}>Find likely matches instantly.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'rgba(13, 17, 23, 0.1)', padding: '10px', borderRadius: '8px', color: '#0d1117' }}>
                <FiShield size={22} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 'bold' }}>Private & secure</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#1f2937', opacity: 0.85 }}>Your details stay yours.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'rgba(13, 17, 23, 0.1)', padding: '10px', borderRadius: '8px', color: '#0d1117' }}>
                <FiUsers size={22} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 'bold' }}>Trusted community</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#1f2937', opacity: 0.85 }}>126k+ verified members.</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ fontSize: '0.85rem', color: '#1f2937', opacity: 0.8 }}>
          © 2026 Bdozawa
        </div>
      </div>

      {/* RIGHT SIDE - Dark Register Form Panel */}
      <div style={{ flex: '1', backgroundColor: '#0d1117', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem', position: 'relative', boxSizing: 'border-box', overflowY: 'auto' }}>
        
        <Link 
          to="/" 
          style={{ position: 'absolute', top: '2rem', right: '3rem', color: '#8b949e', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: '500' }}
        >
          <FiArrowLeft size={16} /> Back home
        </Link>

        <div style={{ width: '100%', maxWidth: '380px' }}>
          
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#f0f6fc', margin: '0 0 0.5rem 0' }}>Create account</h2>
            <p style={{ color: '#8b949e', fontSize: '0.95rem', margin: 0 }}>Join Bdozawa to report and find lost items.</p>
          </div>

          <button 
            onClick={() => alert('Google Sign-up Mock')}
            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', color: '#f0f6fc', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', marginBottom: '1.25rem', fontSize: '0.95rem' }}
          >
            <FcGoogle size={20} /> Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', color: '#8b949e', fontSize: '0.8rem', margin: '1.25rem 0' }}>
            <div style={{ flex: '1', borderBottom: '1px solid #30363d' }}></div>
            <span style={{ padding: '0 10px' }}>or continue with email</span>
            <div style={{ flex: '1', borderBottom: '1px solid #30363d' }}></div>
          </div>

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#f0f6fc', marginBottom: '0.5rem' }}>Full name</label>
              <div style={{ position: 'relative' }}>
                <FiUser size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#8b949e' }} />
                <input 
                  type="text" 
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', color: '#f0f6fc', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
                  onBlur={(e) => e.target.style.borderColor = '#30363d'}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#f0f6fc', marginBottom: '0.5rem' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <FiMail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#8b949e' }} />
                <input 
                  type="email" 
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', color: '#f0f6fc', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
                  onBlur={(e) => e.target.style.borderColor = '#30363d'}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#f0f6fc', marginBottom: '0.5rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <FiLock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#8b949e' }} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', color: '#f0f6fc', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
                  onBlur={(e) => e.target.style.borderColor = '#30363d'}
                />
              </div>
            </div>

            <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#60a5fa', color: '#0d1117', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              Create account
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#8b949e' }}>
            Already have an account? <Link to="/login" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 'bold' }}>Sign in</Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Registerimport { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiAlertCircle, FiArrowLeft, FiShield, FiUsers } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { FcGoogle } from 'react-icons/fc';
import logoImg from '../assets/bdozawa.png';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

const Register = () => {
  const navigate = useNavigate();
  const { t, dir } = useThemeLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }
    alert('Account created successfully! (Mock)');
    navigate('/login');
  };

  const isRtl = dir === 'rtl';

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: isRtl ? 'row-reverse' : 'row', backgroundColor: '#0d1117', color: '#ffffff', overflow: 'hidden', boxSizing: 'border-box' }}>
      
      {error && (
        <div style={{
          position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)',
          backgroundColor: '#450a0a', color: '#fca5a5', border: '1px solid #7f1d1d',
          padding: '12px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px',
          zIndex: 10000, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', fontWeight: '600', fontSize: '0.95rem'
        }}>
          <FiAlertCircle size={20} />
          Please fill in all fields to register
        </div>
      )}

      {/* LEFT SIDE - Blue Branding Panel */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-0.5px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
          <img src={logoImg} alt="Bdozawa Logo" style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '6px' }} />
          Bdozawa
        </div>

        <div style={{ maxWidth: '450px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: '1.2', margin: '0 0 1.5rem 0', color: '#0d1117' }}>
            {t('rightSideTitle')}
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

      {/* RIGHT SIDE - Dark Register Form Panel */}
      <div style={{ flex: '1', backgroundColor: '#0d1117', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem', position: 'relative', boxSizing: 'border-box', overflowY: 'auto', textAlign: isRtl ? 'right' : 'left' }}>
        
        <Link 
          to="/" 
          style={{ position: 'absolute', top: '2rem', [isRtl ? 'left' : 'right']: '3rem', color: '#8b949e', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: '500', flexDirection: isRtl ? 'row-reverse' : 'row' }}
        >
          <FiArrowLeft size={16} style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }} /> {t('backHome')}
        </Link>

        <div style={{ width: '100%', maxWidth: '380px' }}>
          
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#f0f6fc', margin: '0 0 0.5rem 0' }}>{t('createAccountTitle')}</h2>
            <p style={{ color: '#8b949e', fontSize: '0.95rem', margin: 0 }}>{t('createAccountSubtitle')}</p>
          </div>

          <button 
            onClick={() => alert('Google Sign-up Mock')}
            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', color: '#f0f6fc', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', marginBottom: '1.25rem', fontSize: '0.95rem' }}
          >
            <FcGoogle size={20} /> Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', color: '#8b949e', fontSize: '0.8rem', margin: '1.25rem 0' }}>
            <div style={{ flex: '1', borderBottom: '1px solid #30363d' }}></div>
            <span style={{ padding: '0 10px' }}>{t('orContinueWithEmail')}</span>
            <div style={{ flex: '1', borderBottom: '1px solid #30363d' }}></div>
          </div>

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#f0f6fc', marginBottom: '0.5rem' }}>{t('fullName')}</label>
              <div style={{ position: 'relative' }}>
                <FiUser size={18} style={{ position: 'absolute', [isRtl ? 'right' : 'left']: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#8b949e' }} />
                <input 
                  type="text" 
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: isRtl ? '0.75rem 2.75rem 0.75rem 1rem' : '0.75rem 1rem 0.75rem 2.75rem', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', color: '#f0f6fc', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', textAlign: isRtl ? 'right' : 'left' }}
                  onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
                  onBlur={(e) => e.target.style.borderColor = '#30363d'}
                />
              </div>
            </div>

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
                  onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
                  onBlur={(e) => e.target.style.borderColor = '#30363d'}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#f0f6fc', marginBottom: '0.5rem' }}>{t('password')}</label>
              <div style={{ position: 'relative' }}>
                <FiLock size={18} style={{ position: 'absolute', [isRtl ? 'right' : 'left']: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#8b949e' }} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: isRtl ? '0.75rem 2.75rem 0.75rem 1rem' : '0.75rem 1rem 0.75rem 2.75rem', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', color: '#f0f6fc', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', textAlign: isRtl ? 'right' : 'left' }}
                  onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
                  onBlur={(e) => e.target.style.borderColor = '#30363d'}
                />
              </div>
            </div>

            <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#60a5fa', color: '#0d1117', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              {t('createAccountBtn')}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#8b949e' }}>
            {t('alreadyHaveAccount')} <Link to="/login" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 'bold', marginInlineStart: '4px' }}>{t('signIn')}</Link>
          </div>

        </div>
      </div>

    </div>
  );
};

Register.displayName = 'Register';
export default Register;