import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiMapPin, FiEye, FiChevronRight, FiChevronLeft, FiBookmark, FiFlag, FiMessageSquare, FiX, FiShield, FiAlertCircle, FiShare2 } from 'react-icons/fi';
import { HiOutlineDocumentText, HiOutlineCalendar, HiOutlineColorSwatch } from 'react-icons/hi';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import axios from 'axios';
import SocialExportModal from '../components/SocialExportModal';

// Import Leaflet Map Components & CSS
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// FIX: This ensures default map pins load correctly in Vite/React
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Helper mapping to translate Database English categories into your Translation Keys
const getCategoryTransKey = (catStr: string) => {
  const map: Record<string, string> = {
    'Electronics': 'catElectronics',
    'Wallets & Cards': 'catWallets',
    'Keys': 'catKeys',
    'Bags & Luggage': 'catBags',
    'Jewelry': 'catJewelry',
    'Documents': 'catDocuments',
    'Pets': 'catPets',
    'Clothing': 'catClothing',
    'Accessories': 'catAccessories',
    'Other': 'catOther'
  };
  return map[catStr] || catStr;
};

const ItemDetail = () => {
  const { id } = useParams();
  const { t, dir } = useThemeLanguage();
  
  // use any for item to simplify access to dynamic API fields in this file
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeImage, setActiveImage] = useState(0);
  
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAuthToast, setShowAuthToast] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Fetch the specific item directly by ID from the Laravel API
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/items/${id}`)
      .then(res => {
        const found = res.data;
        if (found) {
          setItem({
            ...found,
            images: found.image_url ? [found.image_url] : ['https://via.placeholder.com/800x400/21262d/8b949e?text=Bdozawa+Item'],
            coordinates: [36.1901, 44.0090] as [number, number],
            dateLost: found.timeAgo || 'Recently',
            color: 'Standard',
            tags: [found.category ? `#${found.category}` : '#Item', found.type === 'Found' ? '#Found' : '#Lost'],
            owner: {
              name: found.owner_name || 'TIU Security Desk',
              reports: 3,
              reunited: 1,
              helpful: '100%',
              is_verified_hub: found.is_verified_hub,
              hero_badge: found.hero_badge || 'New User',
              trust_points: found.trust_points || 0
            }
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching item details:', err);
        setLoading(false);
      });
  }, [id]);

  const isRtl = dir === 'rtl';

  const handleSendMessage = () => {
    setShowAuthToast(true);
    setTimeout(() => {
      setShowAuthToast(false);
    }, 3000);
  };

  if (loading) {
    return <div style={{ width: '100%', textAlign: 'center', padding: '5rem 2rem', color: '#8b949e' }}>Loading item details...</div>;
  }

  if (!item) {
    return (
      <div style={{ width: '100%', textAlign: 'center', padding: '5rem 2rem', color: '#f0f6fc' }}>
        <h2>{t('itemNotFound')}</h2>
        <p style={{ color: '#8b949e' }}>{t('itemNotFoundDesc')}</p>
        <Link to="/search" style={{ color: '#60a5fa', textDecoration: 'none' }}>{t('goBackSearch')}</Link>
      </div>
    );
  }

  const contactFirstName = item.owner.name.split(' ')[0];
  const typeTranslated = item.type === 'Found' ? t('badgeFound') : t('badgeLost');

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '2rem 3%', color: '#ffffff', boxSizing: 'border-box', position: 'relative', textAlign: isRtl ? 'right' : 'left' }}>
      
      {/* Auth Error Toast */}
      {showAuthToast && (
        <div style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#450a0a', 
          color: '#fca5a5',          
          border: '1px solid #7f1d1d',
          padding: '12px 24px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 10000, 
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
          fontWeight: '600',
          fontSize: '0.95rem',
          animation: 'slideDown 0.3s ease-out',
          flexDirection: isRtl ? 'row-reverse' : 'row'
        }}>
          <FiAlertCircle size={20} />
          {t('mustBeSignedIn')}
        </div>
      )}

      {/* Contact Modal Overlay */}
      {showContactModal && (
        <div style={{ 
          position: 'fixed', 
          top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0, 0, 0, 0.75)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '12px', width: '100%', maxWidth: '500px', padding: '1.5rem', position: 'relative', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)', textAlign: isRtl ? 'right' : 'left' }}>
            <button onClick={() => setShowContactModal(false)} style={{ position: 'absolute', top: '1.25rem', [isRtl ? 'left' : 'right']: '1.25rem', background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer' }}>
              <FiX size={20} />
            </button>
            
            <h2 style={{ color: '#f0f6fc', margin: '0 0 0.25rem 0', fontSize: '1.25rem' }}>{t('sendSecureMessage')}</h2>
            <p style={{ color: '#8b949e', margin: '0 0 1.5rem 0', fontSize: '0.9rem' }}>{t('introduceYourself')}</p>

            <div style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)', border: '1px solid rgba(5, 150, 105, 0.2)', color: '#34d399', padding: '0.85rem 1rem', borderRadius: '8px', display: 'flex', gap: '10px', marginBottom: '1.25rem', fontSize: '0.9rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              <FiShield size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ lineHeight: '1.4' }}>{t('shareDetailsTip')}</span>
            </div>

            <textarea
              placeholder={t('messagePlaceholder')}
              style={{ width: '100%', height: '140px', backgroundColor: 'transparent', border: '1px solid #30363d', borderRadius: '8px', padding: '1rem', color: '#f0f6fc', fontSize: '0.95rem', resize: 'none', outline: 'none', boxSizing: 'border-box', marginBottom: '1rem', fontFamily: 'inherit', transition: 'border-color 0.2s', textAlign: isRtl ? 'right' : 'left' }}
              onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
              onBlur={(e) => e.target.style.borderColor = '#30363d'}
            ></textarea>

            <div style={{ display: 'flex', justifyContent: isRtl ? 'flex-start' : 'flex-end' }}>
              <button onClick={handleSendMessage} style={{ padding: '0.6rem 1.25rem', backgroundColor: '#60a5fa', color: '#0d1117', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem' }}>
                {t('sendMessageBtn')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b949e', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>{t('home')}</Link>
        {isRtl ? <FiChevronLeft size={14} /> : <FiChevronRight size={14} />}
        <Link to={`/search?type=${item.type.toLowerCase()}`} style={{ color: 'inherit', textDecoration: 'none' }}>{typeTranslated}</Link>
        {isRtl ? <FiChevronLeft size={14} /> : <FiChevronRight size={14} />}
        <span style={{ color: '#f0f6fc' }}>{item.title}</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        
        {/* LEFT COLUMN - Image & Details */}
        <div style={{ flex: '1 1 60%', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Image Gallery */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '100%', height: '400px', backgroundColor: '#161b22', borderRadius: '12px', border: '1px solid #30363d', backgroundImage: `url(${item.images[activeImage]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          </div>

          {/* Title & Meta Info */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <span style={{ backgroundColor: item.type === 'Found' ? '#14532d' : '#7f1d1d', color: item.type === 'Found' ? '#86efac' : '#fca5a5', padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'currentColor' }}></span>
                  {typeTranslated}
                </span>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f0f6fc', margin: 0 }}>{item.title}</h1>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8b949e', fontSize: '0.9rem', whiteSpace: 'nowrap', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <FiEye /> {item.views} {t('views')}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8b949e', fontSize: '0.95rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              <FiMapPin /> {item.location} • {item.timeAgo}
            </div>
          </div>

          {/* Description */}
          <div style={{ borderTop: '1px solid #30363d', paddingTop: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f0f6fc', marginBottom: '1rem' }}>{t('description')}</h3>
            <p style={{ color: '#c9d1d9', fontSize: '1rem', lineHeight: '1.6' }}>{item.description || 'No description provided.'}</p>
          </div>

          {/* Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            <div>
              <div style={{ color: '#8b949e', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '0.9rem', flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: isRtl ? 'flex-end' : 'flex-start' }}><HiOutlineDocumentText size={18} /> {t('category')}</div>
              <div style={{ color: '#f0f6fc', fontWeight: 'bold' }}>{t(getCategoryTransKey(item.category))}</div>
            </div>
            <div>
              <div style={{ color: '#8b949e', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '0.9rem', flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: isRtl ? 'flex-end' : 'flex-start' }}><HiOutlineCalendar size={18} /> {item.type === 'Found' ? t('dateFoundStr') : t('dateLostStr')}</div>
              <div style={{ color: '#f0f6fc', fontWeight: 'bold' }}>{item.dateLost}</div>
            </div>
            <div>
              <div style={{ color: '#8b949e', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '0.9rem', flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: isRtl ? 'flex-end' : 'flex-start' }}><HiOutlineColorSwatch size={18} /> {t('colour')}</div>
              <div style={{ color: '#f0f6fc', fontWeight: 'bold' }}>{item.color}</div>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
            {item.tags.map((tag: string) => (
              <span key={tag} style={{ padding: '6px 12px', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '6px', color: '#8b949e', fontSize: '0.85rem' }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN - Cards */}
        <div style={{ flex: '1 1 30%', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Owner Card with Gamified Hero Trust Badge */}
          <div style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#21262d', color: '#58a6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                {item.owner.name.charAt(0)}
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#f0f6fc', margin: 0, display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  {item.owner.name}
                  {item.owner.is_verified_hub && <span title="Verified Hub">✅</span>}
                  <span style={{ backgroundColor: 'rgba(251, 205, 4, 0.15)', color: '#FBCD04', border: '1px solid #FBCD04', padding: '2px 8px', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                    {item.owner.hero_badge}
                  </span>
                </h4>
                <div style={{ fontSize: '0.8rem', color: '#8b949e', marginTop: '4px' }}>
                  {item.owner.is_verified_hub ? 'Verified Institutional Hub' : t('ownerStr')} • Trust Points: {item.owner.trust_points} pts
                </div>
              </div>
            </div>

            <button onClick={() => setShowContactModal(true)} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#60a5fa', color: '#0d1117', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '1rem', transition: 'opacity 0.2s', flexDirection: isRtl ? 'row-reverse' : 'row' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
              <FiMessageSquare size={18} /> {t('contactBtn')} {contactFirstName}
            </button>
            
            <div style={{ display: 'flex', gap: '1rem', flexDirection: isRtl ? 'row-reverse' : 'row', marginBottom: '1rem' }}>
              <button onClick={handleSendMessage} style={{ flex: 1, padding: '0.75rem', backgroundColor: 'transparent', color: '#f0f6fc', border: '1px solid #30363d', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <FiBookmark /> {t('saveBtn')}
              </button>
              <button onClick={handleSendMessage} style={{ width: '44px', padding: '0', backgroundColor: 'transparent', color: '#8b949e', border: '1px solid #30363d', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiFlag />
              </button>
            </div>

            {/* Social Share Flyer Button */}
            <button 
              onClick={() => setIsShareModalOpen(true)}
              style={{ width: '100%', padding: '0.75rem', backgroundColor: '#21262d', color: '#f0f6fc', border: '1px solid #30363d', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexDirection: isRtl ? 'row-reverse' : 'row' }}
            >
              <FiShare2 color="#FBCD04" /> Share to Socials
            </button>
          </div>

          {/* Interactive Map Location Card */}
          <div style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #30363d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b949e', fontSize: '0.85rem', fontWeight: 'bold', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <FiMapPin size={16} /> {t('locationStr')}
              </div>
            </div>
            
            <div style={{ height: '200px', width: '100%', backgroundColor: '#0d1117' }}>
              <MapContainer center={item.coordinates} zoom={13} style={{ height: '100%', width: '100%', zIndex: 1 }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={item.coordinates}>
                  <Popup>{item.title}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

        </div>
      </div>

      {/* Social Export Modal Popup */}
      <SocialExportModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        item={item} 
      />
    </div>
  );
};

export default ItemDetail;