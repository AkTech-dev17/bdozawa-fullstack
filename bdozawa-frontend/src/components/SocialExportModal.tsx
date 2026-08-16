import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';
import { FiX, FiDownload, FiShare2 } from 'react-icons/fi';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface SocialExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: number;
    title: string;
    category?: string;
    location?: string;
    reward?: string;
    image_url?: string;
    type: string;
  };
}

export default function SocialExportModal({ isOpen, onClose, item }: SocialExportModalProps) {
  const { dir } = useThemeLanguage();
  const isRtl = dir === 'rtl';
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const itemUrl = `http://localhost:5173/item/${item.id}`;

  const handleDownload = async () => {
    if (cardRef.current) {
      setDownloading(true);
      try {
        const dataUrl = await toPng(cardRef.current, { cacheBust: true, quality: 0.95 });
        const link = document.createElement('a');
        link.download = `bdozawa-item-${item.id}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Failed to generate image', err);
      } finally {
        setDownloading(false);
      }
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
      <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #262626', borderRadius: '20px', width: '100%', maxWidth: '480px', padding: '2rem', position: 'relative', textAlign: isRtl ? 'right' : 'left' }}>
        
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', [isRtl ? 'left' : 'right']: '1rem', background: 'none', border: 'none', color: '#AAAAAA', cursor: 'pointer' }}>
          <FiX size={24} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
          <FiShare2 size={24} color="#FBCD04" />
          <h2 style={{ color: '#FFFFFF', margin: 0, fontSize: '1.3rem' }}>Social Share Flyer</h2>
        </div>

        <p style={{ color: '#AAAAAA', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.4 }}>
          Download this square graphic to share on Facebook groups, Instagram, or Telegram channels. The built-in QR code drives scanners straight back to Bdozawa!
        </p>

        {/* THE EXPORTABLE CARD FLYER (1:1 Square Ratio) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div 
            ref={cardRef} 
            style={{ 
              width: '400px', height: '400px', backgroundColor: '#0F0F0F', border: '2px solid #FBCD04', 
              borderRadius: '16px', display: 'flex', flexDirection: 'column', padding: '1.5rem', boxSizing: 'border-box',
              position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif'
            }}
          >
            {/* Header Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ 
                backgroundColor: item.type.toLowerCase() === 'found' ? '#14532d' : '#7f1d1d', 
                color: item.type.toLowerCase() === 'found' ? '#86efac' : '#fca5a5', 
                padding: '4px 12px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 'bold' 
              }}>
                {item.type.toUpperCase()}
              </span>
              <span style={{ color: '#FBCD04', fontSize: '0.8rem', fontWeight: 'bold' }}>Bdozawa Network</span>
            </div>

            {/* Content Row */}
            <div style={{ display: 'flex', gap: '12px', flex: 1, alignItems: 'center' }}>
              <div style={{ 
                width: '140px', height: '140px', borderRadius: '12px', backgroundColor: '#1A1A1A', 
                backgroundImage: item.image_url ? `url(${item.image_url})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center',
                flexShrink: 0, border: '1px solid #262626'
              }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflow: 'hidden' }}>
                <h3 style={{ color: '#FFFFFF', fontSize: '1.05rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h3>
                <p style={{ color: '#AAAAAA', fontSize: '0.8rem', margin: 0 }}>📍 {item.location || 'Erbil, Iraq'}</p>
                {item.reward && (
                  <span style={{ color: '#0F0F0F', backgroundColor: '#FBCD04', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', width: 'fit-content' }}>
                    Reward: {item.reward}
                  </span>
                )}
              </div>
            </div>

            {/* Footer / QR Code Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #262626', paddingTop: '10px', marginTop: 'auto' }}>
              <div>
                <p style={{ color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 'bold', margin: '0 0 2px 0' }}>Scan to View & Claim</p>
                <p style={{ color: '#888888', fontSize: '0.7rem', margin: 0 }}>bdozawa.com</p>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '4px', borderRadius: '6px' }}>
                <QRCodeSVG value={itemUrl} size={50} />
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={handleDownload} 
          disabled={downloading}
          style={{ width: '100%', padding: '14px', borderRadius: '99px', backgroundColor: '#FBCD04', color: '#0F0F0F', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <FiDownload size={18} /> {downloading ? 'Generating Flyer...' : 'Download Social Flyer'}
        </button>

      </div>
    </div>
  );
}