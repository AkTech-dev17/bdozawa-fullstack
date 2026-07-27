import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiMapPin, FiEye, FiChevronRight, FiBookmark, FiShare2, FiFlag, FiMessageSquare, FiX, FiShield, FiAlertCircle } from 'react-icons/fi';
import { HiOutlineDocumentText, HiOutlineCalendar, HiOutlineColorSwatch } from 'react-icons/hi';

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

// Complete mock database matching your Search page items
const MOCK_DB = [
  {
    id: 1,
    title: 'جزادانيكي رە ش',
    type: 'Lost',
    views: 37,
    timeAgo: '5d ago',
    location: 'Sulaymaniyah, Iraq',
    coordinates: [35.5558, 45.4351] as [number, number],
    description: 'جزادانيكي رە ش وێنوه عه‌لامه‌تی bmw لەسەر، بڕێک پارەو کارتی نیشتمانی و ئیجازەی تیایە',
    category: 'Wallets & Cards',
    dateLost: 'July 17, 2026',
    color: 'Black',
    tags: ['#Wallets', '#Black', '#جزادانيكي', '#رە ش', '#نیشتمانی', '#ئیجازەی', '#پارەو', '#بڕێک', '#لەسەر', '#bmw', '#عه‌لامه‌تی', '#وێنوه'],
    images: ['https://via.placeholder.com/800x400/21262d/8b949e?text=Black+Wallet', 'https://via.placeholder.com/800x400/21262d/8b949e?text=Inside', 'https://via.placeholder.com/800x400/21262d/8b949e?text=Back'],
    owner: { name: 'Cj Cj', reports: 1, reunited: 0, helpful: '0%' }
  },
  {
    id: 2,
    title: 'جزادانيكي نيلى',
    type: 'Lost',
    views: 72,
    timeAgo: 'Jul 18',
    location: 'Sulaymaniyah, Iraq',
    coordinates: [35.5600, 45.4400] as [number, number],
    description: 'Blue wallet lost near the park. Contains some cash and an ID.',
    category: 'Wallets & Cards',
    dateLost: 'July 18, 2026',
    color: 'Blue',
    tags: ['#Wallets', '#Blue', '#Lost'],
    images: ['https://via.placeholder.com/800x400/21262d/8b949e?text=Blue+Wallet'],
    owner: { name: 'Nova Hersh', reports: 3, reunited: 1, helpful: '100%' }
  },
  {
    id: 3,
    title: 'كارتي نيشتماني',
    type: 'Found',
    views: 67,
    timeAgo: 'Jul 15',
    location: 'Sulaymaniyah, Iraq',
    coordinates: [35.5500, 45.4300] as [number, number],
    description: 'National ID card found on the main street.',
    category: 'Wallets & Cards',
    dateLost: 'July 15, 2026',
    color: 'White/Blue',
    tags: ['#ID', '#Found', '#Card'],
    images: ['https://via.placeholder.com/800x400/21262d/8b949e?text=ID+Card'],
    owner: { name: 'Bdozawa Team', reports: 50, reunited: 45, helpful: '98%' }
  },
  {
    id: 4,
    title: 'MacBook Pro 14"',
    type: 'Lost',
    views: 112,
    timeAgo: '2d ago',
    location: 'Erbil, Iraq',
    coordinates: [36.1901, 44.0090] as [number, number],
    description: 'Lost my silver MacBook Pro 14-inch in a coffee shop downtown. It has a black hard case on it.',
    category: 'Electronics',
    dateLost: 'July 24, 2026',
    color: 'Silver',
    tags: ['#Laptop', '#MacBook', '#Apple', '#Electronics'],
    images: ['https://via.placeholder.com/800x400/21262d/8b949e?text=MacBook+Pro', 'https://via.placeholder.com/800x400/21262d/8b949e?text=Keyboard'],
    owner: { name: 'Ahmad M.', reports: 1, reunited: 0, helpful: '0%' }
  },
  {
    id: 5,
    title: 'AirPods Pro',
    type: 'Found',
    views: 45,
    timeAgo: '12h ago',
    location: 'Duhok, Iraq',
    coordinates: [36.8679, 42.9489] as [number, number],
    description: 'Found a white AirPods Pro case with both earbuds inside on a park bench. It has a small scratch on the back.',
    category: 'Electronics',
    dateLost: 'July 26, 2026',
    color: 'White',
    tags: ['#AirPods', '#Apple', '#Found', '#Electronics'],
    images: ['https://via.placeholder.com/800x400/21262d/8b949e?text=AirPods+Pro', 'https://via.placeholder.com/800x400/21262d/8b949e?text=Case+Open'],
    owner: { name: 'Sara K.', reports: 2, reunited: 1, helpful: '100%' }
  },
  {
    id: 6,
    title: 'Toyota Car Keys',
    type: 'Found',
    views: 18,
    timeAgo: '1d ago',
    location: 'Sulaymaniyah, Iraq',
    coordinates: [35.5650, 45.4200] as [number, number],
    description: 'Found a set of Toyota car keys with a black leather keychain attached.',
    category: 'Keys',
    dateLost: 'July 25, 2026',
    color: 'Black/Silver',
    tags: ['#Keys', '#Toyota', '#Found'],
    images: ['https://via.placeholder.com/800x400/21262d/8b949e?text=Car+Keys'],
    owner: { name: 'Karim', reports: 1, reunited: 1, helpful: '100%' }
  },
  {
    id: 7,
    title: 'Black Backpack',
    type: 'Lost',
    views: 89,
    timeAgo: '1w ago',
    location: 'Erbil, Iraq',
    coordinates: [36.1950, 44.0150] as [number, number],
    description: 'Lost a black Nike backpack on the bus. It has my university notebooks inside.',
    category: 'Bags & Luggage',
    dateLost: 'July 20, 2026',
    color: 'Black',
    tags: ['#Backpack', '#Bag', '#Lost'],
    images: ['https://via.placeholder.com/800x400/21262d/8b949e?text=Backpack'],
    owner: { name: 'Nazanin', reports: 1, reunited: 0, helpful: '0%' }
  },
  {
    id: 8,
    title: 'White Cat (Husky Eyes)',
    type: 'Lost',
    views: 204,
    timeAgo: 'Just now',
    location: 'Kirkuk, Iraq',
    coordinates: [35.4674, 44.3831] as [number, number],
    description: 'Our white cat went missing yesterday. She has one blue eye and one brown eye. Very friendly but easily scared.',
    category: 'Pets',
    dateLost: 'July 26, 2026',
    color: 'White',
    tags: ['#Cat', '#Pet', '#WhiteCat', '#LostPet'],
    images: ['https://via.placeholder.com/800x400/21262d/8b949e?text=White+Cat'],
    owner: { name: 'Hassan Family', reports: 1, reunited: 0, helpful: '0%' }
  }
];

const ItemDetail = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAuthToast, setShowAuthToast] = useState(false);
  
  const item = MOCK_DB.find(i => i.id === Number(id));

  const handleSendMessage = () => {
    setShowAuthToast(true);
    setTimeout(() => {
      setShowAuthToast(false);
    }, 3000);
  };

  if (!item) {
    return (
      <div style={{ width: '100%', textAlign: 'center', padding: '5rem 2rem', color: '#f0f6fc' }}>
        <h2>Item not found</h2>
        <p style={{ color: '#8b949e' }}>The item you are looking for doesn't exist or has been removed.</p>
        <Link to="/search" style={{ color: '#60a5fa', textDecoration: 'none' }}>Go back to search</Link>
      </div>
    );
  }

  const contactFirstName = item.owner.name.split(' ')[0];

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '2rem 3%', color: '#ffffff', boxSizing: 'border-box', position: 'relative' }}>
      
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
          animation: 'slideDown 0.3s ease-out'
        }}>
          <FiAlertCircle size={20} />
          You must be signed in
        </div>
      )}

      {/* Contact Modal Overlay */}
      {showContactModal && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0, 0, 0, 0.75)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '12px', width: '100%', maxWidth: '500px', padding: '1.5rem', position: 'relative', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
            <button onClick={() => setShowContactModal(false)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer' }}>
              <FiX size={20} />
            </button>
            
            <h2 style={{ color: '#f0f6fc', margin: '0 0 0.25rem 0', fontSize: '1.25rem' }}>Send a secure message</h2>
            <p style={{ color: '#8b949e', margin: '0 0 1.5rem 0', fontSize: '0.9rem' }}>Introduce yourself and explain how you can help with this item.</p>

            <div style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)', border: '1px solid rgba(5, 150, 105, 0.2)', color: '#34d399', padding: '0.85rem 1rem', borderRadius: '8px', display: 'flex', gap: '10px', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
              <FiShield size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ lineHeight: '1.4' }}>Tip: share details only the true owner would know to verify ownership.</span>
            </div>

            <textarea
              placeholder={`Hi ${contactFirstName}, I think this might be mine...`}
              style={{ width: '100%', height: '140px', backgroundColor: 'transparent', border: '1px solid #30363d', borderRadius: '8px', padding: '1rem', color: '#f0f6fc', fontSize: '0.95rem', resize: 'none', outline: 'none', boxSizing: 'border-box', marginBottom: '1rem', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
              onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
              onBlur={(e) => e.target.style.borderColor = '#30363d'}
            ></textarea>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={handleSendMessage} style={{ padding: '0.6rem 1.25rem', backgroundColor: '#60a5fa', color: '#0d1117', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.95rem' }}>
                Send message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b949e', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
        <FiChevronRight size={14} />
        <Link to={`/search?type=${item.type.toLowerCase()}`} style={{ color: 'inherit', textDecoration: 'none' }}>{item.type}</Link>
        <FiChevronRight size={14} />
        <span style={{ color: '#f0f6fc' }}>{item.title}</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        
        {/* LEFT COLUMN - Image & Details */}
        <div style={{ flex: '1 1 60%', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Image Gallery */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '100%', height: '400px', backgroundColor: '#161b22', borderRadius: '12px', border: '1px solid #30363d', backgroundImage: `url(${item.images[activeImage]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            
            {item.images.length > 1 && (
              <div style={{ display: 'flex', gap: '1rem' }}>
                {item.images.map((img, idx) => (
                  <div key={idx} onClick={() => setActiveImage(idx)} style={{ width: '80px', height: '80px', backgroundColor: '#161b22', borderRadius: '8px', border: `2px solid ${activeImage === idx ? '#60a5fa' : '#30363d'}`, backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }}></div>
                ))}
              </div>
            )}
          </div>

          {/* Title & Meta Info */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ backgroundColor: item.type === 'Found' ? '#14532d' : '#7f1d1d', color: item.type === 'Found' ? '#86efac' : '#fca5a5', padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'currentColor' }}></span>
                  {item.type}
                </span>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f0f6fc', margin: 0 }}>{item.title}</h1>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8b949e', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                <FiEye /> {item.views} views
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8b949e', fontSize: '0.95rem' }}>
              <FiMapPin /> {item.location} • {item.timeAgo}
            </div>
          </div>

          {/* Description */}
          <div style={{ borderTop: '1px solid #30363d', paddingTop: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f0f6fc', marginBottom: '1rem' }}>Description</h3>
            <p style={{ color: '#c9d1d9', fontSize: '1rem', lineHeight: '1.6' }}>{item.description}</p>
          </div>

          {/* Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            <div>
              <div style={{ color: '#8b949e', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '0.9rem' }}><HiOutlineDocumentText size={18} /> Category</div>
              <div style={{ color: '#f0f6fc', fontWeight: 'bold' }}>{item.category}</div>
            </div>
            <div>
              <div style={{ color: '#8b949e', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '0.9rem' }}><HiOutlineCalendar size={18} /> Date {item.type.toLowerCase()}</div>
              <div style={{ color: '#f0f6fc', fontWeight: 'bold' }}>{item.dateLost}</div>
            </div>
            <div>
              <div style={{ color: '#8b949e', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '0.9rem' }}><HiOutlineColorSwatch size={18} /> Colour</div>
              <div style={{ color: '#f0f6fc', fontWeight: 'bold' }}>{item.color}</div>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
            {item.tags.map(tag => (
              <span key={tag} style={{ padding: '6px 12px', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '6px', color: '#8b949e', fontSize: '0.85rem' }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN - Cards */}
        <div style={{ flex: '1 1 30%', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Owner Card */}
          <div style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#21262d', color: '#58a6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                {item.owner.name.charAt(0)}
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#f0f6fc', margin: 0 }}>{item.owner.name}</h4>
                <div style={{ fontSize: '0.8rem', color: '#8b949e' }}>Owner • {item.owner.reunited} reunited</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center', marginBottom: '1.5rem', borderTop: '1px solid #30363d', borderBottom: '1px solid #30363d', padding: '1rem 0' }}>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f0f6fc' }}>{item.owner.reports}</div>
                <div style={{ fontSize: '0.75rem', color: '#8b949e' }}>Reports</div>
              </div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f0f6fc' }}>{item.owner.reunited}</div>
                <div style={{ fontSize: '0.75rem', color: '#8b949e' }}>Reunited</div>
              </div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f0f6fc' }}>{item.owner.helpful}</div>
                <div style={{ fontSize: '0.75rem', color: '#8b949e' }}>Helpful</div>
              </div>
            </div>

            <button onClick={() => setShowContactModal(true)} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#60a5fa', color: '#0d1117', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '1rem', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
              <FiMessageSquare size={18} /> Contact {contactFirstName}
            </button>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={handleSendMessage} style={{ flex: 1, padding: '0.75rem', backgroundColor: 'transparent', color: '#f0f6fc', border: '1px solid #30363d', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <FiBookmark /> Save
              </button>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ width: '44px', padding: '0', backgroundColor: 'transparent', color: '#8b949e', border: '1px solid #30363d', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiShare2 />
                </button>
                <button onClick={handleSendMessage} style={{ width: '44px', padding: '0', backgroundColor: 'transparent', color: '#8b949e', border: '1px solid #30363d', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiFlag />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Map Location Card (Linked to Google Maps) */}
          <div style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #30363d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b949e', fontSize: '0.85rem', fontWeight: 'bold' }}>
                <FiMapPin size={16} /> LOCATION
              </div>
              <span style={{ fontSize: '0.75rem', color: '#60a5fa', fontWeight: '500' }}>Click map for directions →</span>
            </div>
            
            {/* Clickable Wrapper linking directly to Google Maps */}
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${item.coordinates[0]},${item.coordinates[1]}`} 
              target="_blank" 
              rel="noopener noreferrer"
              title="Click to open in Google Maps"
              style={{ display: 'block', height: '250px', width: '100%', backgroundColor: '#0d1117', position: 'relative', cursor: 'pointer' }}
            >
              <MapContainer 
                center={item.coordinates} 
                zoom={14} 
                scrollWheelZoom={false} 
                style={{ height: '100%', width: '100%', zIndex: 1, pointerEvents: 'none' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={item.coordinates}>
                  <Popup>
                    {item.title} <br /> {item.location}
                  </Popup>
                </Marker>
              </MapContainer>
            </a>

            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#0d1117', padding: '1rem', borderRadius: '8px', border: '1px solid #30363d' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#8b949e', marginBottom: '4px' }}>COUNTRY</div>
                  <div style={{ color: '#f0f6fc', fontWeight: 'bold', fontSize: '0.95rem' }}>{item.location.split(',')[1]?.trim() || 'Iraq'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#8b949e', marginBottom: '4px' }}>CITY</div>
                  <div style={{ color: '#f0f6fc', fontWeight: 'bold', fontSize: '0.95rem' }}>{item.location.split(',')[0]}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { top: -20px; opacity: 0; }
          to { top: 24px; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ItemDetail;