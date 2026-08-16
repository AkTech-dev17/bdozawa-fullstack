import { useState } from 'react';
import axios from 'axios';
import { FiBell, FiX, FiCheckCircle, FiMessageCircle } from 'react-icons/fi';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCategory?: string;
  currentQuery?: string;
}

export default function AlertModal({ isOpen, onClose, currentCategory, currentQuery }: AlertModalProps) {
  const { dir } = useThemeLanguage();
  const isRtl = dir === 'rtl';
  
  const [phone, setPhone] = useState('');
  const [platform, setPlatform] = useState<'whatsapp' | 'viber'>('whatsapp');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await axios.post('http://127.0.0.1:8000/api/alerts/subscribe', {
        phone_number: phone,
        platform: platform,
        category: currentCategory === 'all' ? null : currentCategory,
        search_keyword: currentQuery || null,
      });
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setPhone('');
      }, 3000);
    } catch (error) {
      console.error("Error setting alert:", error);
      setStatus('error');
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
      <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #262626', borderRadius: '16px', width: '100%', maxWidth: '450px', padding: '2rem', position: 'relative', textAlign: isRtl ? 'right' : 'left' }}>
        
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', [isRtl ? 'left' : 'right']: '1rem', background: 'none', border: 'none', color: '#AAAAAA', cursor: 'pointer' }}>
          <FiX size={24} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
          <FiBell size={28} color="#FBCD04" />
          <h2 style={{ color: '#FFFFFF', margin: 0, fontSize: '1.5rem' }}>Smart Alerts</h2>
        </div>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: '#86efac' }}>
            <FiCheckCircle size={48} style={{ marginBottom: '1rem' }} />
            <h3>Alert Saved!</h3>
            <p style={{ color: '#AAAAAA' }}>We'll message you the moment a matching item is found.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ color: '#AAAAAA', margin: 0, lineHeight: 1.5 }}>
              Don't want to keep refreshing? Set an alert for 
              <strong style={{ color: '#FBCD04' }}> {currentQuery || 'any item'} </strong> 
              in <strong style={{ color: '#FBCD04' }}>{currentCategory === 'all' ? 'All Categories' : currentCategory}</strong>.
            </p>

            <div>
              <label style={{ display: 'block', color: '#FFFFFF', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Select Platform</label>
              <div style={{ display: 'flex', gap: '1rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <button type="button" onClick={() => setPlatform('whatsapp')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${platform === 'whatsapp' ? '#22c55e' : '#262626'}`, backgroundColor: platform === 'whatsapp' ? 'rgba(34, 197, 94, 0.1)' : 'transparent', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                  <FiMessageCircle color={platform === 'whatsapp' ? '#22c55e' : '#AAAAAA'} /> WhatsApp
                </button>
                <button type="button" onClick={() => setPlatform('viber')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${platform === 'viber' ? '#8b5cf6' : '#262626'}`, backgroundColor: platform === 'viber' ? 'rgba(139, 92, 246, 0.1)' : 'transparent', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                  <FiMessageCircle color={platform === 'viber' ? '#8b5cf6' : '#AAAAAA'} /> Viber
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: '#FFFFFF', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Phone Number</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+964 750 XXX XXXX" 
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0F0F0F', border: '1px solid #262626', color: '#FFFFFF', boxSizing: 'border-box', textAlign: isRtl ? 'right' : 'left' }}
              />
            </div>

            <button type="submit" disabled={status === 'loading'} style={{ width: '100%', padding: '14px', borderRadius: '99px', backgroundColor: '#FBCD04', color: '#0F0F0F', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', opacity: status === 'loading' ? 0.7 : 1 }}>
              {status === 'loading' ? 'Saving...' : 'Set Alert'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}