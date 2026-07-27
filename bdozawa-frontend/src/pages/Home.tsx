import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FiSearch, FiArrowRight, FiPhone, FiCreditCard, FiKey, FiBriefcase, FiCompass, FiFileText, FiHeart, FiTag, FiEye, FiBox } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import StatsDashboard from '../components/StatsDashboard';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

interface Item {
  id: number;
  title: string;
  description: string;
  type: string;
  contact_info: string;
}

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, dir } = useThemeLanguage();
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Automatically scroll to the section if arriving from another page via a link like /#how-it-works
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/items');
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/search');
    }
  };

  const categories = [
    { name: 'Electronics', desc: 'Phones, laptops, earbuds', icon: <FiPhone size={22} /> },
    { name: 'Wallets & Cards', desc: 'Wallets, purses, cards', icon: <FiCreditCard size={22} /> },
    { name: 'Keys', desc: 'House & car keys, fobs', icon: <FiKey size={22} /> },
    { name: 'Bags & Luggage', desc: 'Backpacks, suitcases', icon: <FiBriefcase size={22} /> },
    { name: 'Jewelry', desc: 'Rings, watches, necklaces', icon: <FiCompass size={22} /> },
    { name: 'Documents', desc: 'IDs, passports, papers', icon: <FiFileText size={22} /> },
    { name: 'Pets', desc: 'Dogs, cats & companions', icon: <FiHeart size={22} /> },
    { name: 'Clothing', desc: 'Jackets, hats, scarves', icon: <FiTag size={22} /> },
    { name: 'Accessories', desc: 'Glasses, umbrellas', icon: <FiEye size={22} /> },
    { name: 'Other', desc: 'Everything else', icon: <FiBox size={22} /> },
  ];

  const faqs = [
    { q: t('isDozerFree'), a: t('isDozerFreeDesc') },
    { q: t('howKeepSafe'), a: t('howKeepSafeDesc') },
    { q: 'How does smart matching work?', a: 'Our engine surfaces likely matches by comparing keywords, dates, and locations with a confidence score.' },
    { q: t('whatDoBefore'), a: t('whatDoBeforeDesc') },
    { q: 'Can I offer a reward?', a: 'Yes! You can optionally attach a reward amount when reporting a lost item to encourage quick community returns.' },
  ];

  const lostItemsList = items.filter(i => i.type.toLowerCase() === 'lost').slice(0, 2);
  const foundItemsList = items.filter(i => i.type.toLowerCase() === 'found').slice(0, 2);

  return (
    <div style={{ width: '100%', padding: '2rem 3%', color: '#ffffff', display: 'flex', flexDirection: 'column', gap: '5rem', boxSizing: 'border-box', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
    
      {/* 1. HERO SECTION */}
      <section style={{ textAlign: 'center', padding: '3rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', maxWidth: '800px', lineHeight: '1.15', color: '#f0f6fc' }}>
          {t('heroTitle')}
        </h1>
        <p style={{ color: '#8b949e', fontSize: '1.1rem', maxWidth: '600px', lineHeight: '1.5' }}>
          {t('heroSubtitle')}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/register" style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#f59e0b', // Diwaxan warm gold accent
            color: '#0d1117',
            borderRadius: '8px',
            fontWeight: 'bold',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {t('reportLost')} <FiArrowRight size={18} style={{ transform: dir === 'rtl' ? 'scaleX(-1)' : 'none' }} />
          </Link>
          <Link to="/search" style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#161b22',
            color: '#ffffff',
            border: '1px solid #30363d',
            borderRadius: '8px',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}>
            {t('foundSomething')}
          </Link>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} style={{ width: '100%', maxWidth: '700px', marginTop: '1.5rem', position: 'relative' }}>
          <FiSearch size={22} style={{ position: 'absolute', [dir === 'rtl' ? 'right' : 'left']: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#8b949e' }} />
          <input 
            type="text" 
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: dir === 'rtl' ? '1rem 3.5rem 1rem 1rem' : '1rem 1rem 1rem 3.5rem',
              backgroundColor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: '12px',
              color: 'white',
              fontSize: '1rem',
              outline: 'none',
              boxSizing: 'border-box',
              textAlign: dir === 'rtl' ? 'right' : 'left'
            }}
          />
          <button type="submit" style={{
            position: 'absolute',
            [dir === 'rtl' ? 'left' : 'right']: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '0.6rem 1.25rem',
            backgroundColor: '#f59e0b', // Diwaxan warm gold accent
            color: '#0d1117',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            {t('searchButton')}
          </button>
        </form>
      </section>

      {/* 2. STATS BAR */}
      <StatsDashboard />

      {/* 3. BROWSE BY CATEGORY */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ color: '#f59e0b', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('browseCategory')}</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '0.25rem', color: '#f0f6fc' }}>{t('whatAreYouLookingFor')}</h2>
            <p style={{ color: '#8b949e', fontSize: '0.95rem', marginTop: '0.25rem' }}>{t('jumpStraight')}</p>
          </div>
          <Link to="/search" style={{ color: '#f59e0b', textDecoration: 'none', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {t('viewAll')} <FiArrowRight style={{ transform: dir === 'rtl' ? 'scaleX(-1)' : 'none' }} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {categories.map((cat, i) => (
            <Link to={`/search?category=${encodeURIComponent(cat.name)}`} key={i} style={{
              backgroundColor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: '12px',
              padding: '1.5rem',
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              transition: 'border-color 0.2s'
            }}>
              <div style={{ color: '#f59e0b', backgroundColor: '#0d1117', width: '45px', height: '45px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #30363d' }}>
                {cat.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '0.25rem', color: '#f0f6fc' }}>{cat.name}</h3>
                <p style={{ color: '#8b949e', fontSize: '0.85rem', lineHeight: '1.3' }}>{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. RECENTLY LOST & FOUND FEEDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
        
        {/* Recently Lost */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <div>
              <span style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('lostItems')}</span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.25rem' }}>{t('oneOfTheseYours')}</h2>
            </div>
            <Link to="/search?type=lost" style={{ color: '#f59e0b', textDecoration: 'none', fontSize: '0.9rem' }}>{t('viewAll')} →</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {lostItemsList.map(item => (
              <div key={item.id} style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ backgroundColor: '#7f1d1d', color: '#fca5a5', padding: '2px 8px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 'bold' }}>Lost</span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '0.5rem', color: '#f0f6fc' }}>{item.title}</h4>
                  <p style={{ color: '#8b949e', fontSize: '0.85rem', marginTop: '0.25rem' }}>{item.description}</p>
                </div>
                <span style={{ color: '#f59e0b', fontSize: '0.85rem' }}>{item.contact_info}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Found */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <div>
              <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('foundItems')}</span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.25rem' }}>{t('recentlyFound')}</h2>
            </div>
            <Link to="/search?type=found" style={{ color: '#f59e0b', textDecoration: 'none', fontSize: '0.9rem' }}>{t('viewAll')} →</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {foundItemsList.map(item => (
              <div key={item.id} style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ backgroundColor: '#14532d', color: '#86efac', padding: '2px 8px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 'bold' }}>Found</span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '0.5rem', color: '#f0f6fc' }}>{item.title}</h4>
                  <p style={{ color: '#8b949e', fontSize: '0.85rem', marginTop: '0.25rem' }}>{item.description}</p>
                </div>
                <span style={{ color: '#f59e0b', fontSize: '0.85rem' }}>{item.contact_info}</span>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" style={{ textAlign: 'center', padding: '2rem 0' }}>
        <span style={{ color: '#f59e0b', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('howItWorks')}</span>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginTop: '0.25rem', marginBottom: '0.5rem' }}>Four simple steps to a happy ending</h2>
        <p style={{ color: '#8b949e', marginBottom: '3rem' }}>No accounts to wrestle with, no friction — just a clear path from lost to found.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
          {[
            { step: '1', title: 'Report it', desc: 'Add a photo and a few details. It takes less than a minute.' },
            { step: '2', title: 'Get matched', desc: 'Our engine surfaces likely matches with a confidence score.' },
            { step: '3', title: 'Connect safely', desc: 'Chat securely to verify ownership before meeting up.' },
            { step: '4', title: 'Reunite', desc: 'Arrange a handoff and mark it resolved. Everyone wins.' },
          ].map((s, idx) => (
            <div key={idx} style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: '#f59e0b', backgroundColor: '#0d1117', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HiOutlineSparkles size={20} />
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#30363d' }}>{s.step}</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#f0f6fc' }}>{s.title}</h3>
              <p style={{ color: '#8b949e', fontSize: '0.9rem', lineHeight: '1.4' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SUCCESS STORIES */}
      <section id="success-stories" style={{ textAlign: 'center', padding: '2rem 0' }}>
        <span style={{ color: '#f59e0b', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{t('successStories')}</span>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginTop: '0.25rem', marginBottom: '0.5rem' }}>{t('realReunions')}</h2>
        <p style={{ color: '#8b949e', marginBottom: '3rem' }}>{t('peopleReconnect')}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
          {[
            { quote: 'I left my laptop bag near the university campus in Erbil and panicked. Mohammed Sabir helped me track down the listing on Bdozawa within the hour.', name: 'Azad Aram', detail: 'Reunited with equipment • Erbil' },
            { quote: 'Found a misplaced driving license card on the street in Sulaymaniyah. Using the platform, we safely returned it to the owner the same afternoon.', name: 'Akam Ali', detail: 'Returned an ID card • Sulaymaniyah' },
            { quote: 'We coordinated our project research files and lost a flash drive near the library. Arez, Akam, and Zina helped post the alert and we recovered it immediately.', name: 'Zina Abdulla', detail: 'Recovered project data • Duhok' },
          ].map((story, idx) => (
            <div key={idx} style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem' }}>
              <p style={{ color: '#c9d1d9', fontSize: '0.95rem', lineHeight: '1.5', fontStyle: 'italic' }}>"{story.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexDirection: dir === 'rtl' ? 'row-reverse' : 'row' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#21262d', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  {story.name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#f0f6fc' }}>{story.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#8b949e' }}>{story.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section style={{ maxWidth: '800px', margin: '0 auto', width: '100%', padding: '2rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ color: '#f59e0b', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>FAQ</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginTop: '0.25rem', marginBottom: '0.5rem' }}>Questions, answered</h2>
          <p style={{ color: '#8b949e' }}>Everything you need to feel confident using Bdozawa.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '12px', overflow: 'hidden' }}>
                <button 
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#f0f6fc',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: dir === 'rtl' ? 'right' : 'left'
                  }}
                >
                  {faq.q}
                  {isOpen ? <BiChevronUp size={20} /> : <BiChevronDown size={20} />}
                </button>
                {isOpen && (
                  <div style={{ padding: '0 1.5rem 1.25rem 1.5rem', color: '#8b949e', fontSize: '0.95rem', lineHeight: '1.5', textAlign: dir === 'rtl' ? 'right' : 'left' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. BOTTOM CALL-TO-ACTION BANNER */}
      <section style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f0f6fc' }}>{t('lostSomethingTitle')}</h2>
        <p style={{ color: '#8b949e', maxWidth: '500px', fontSize: '0.95rem' }}>{t('lostSomethingSubtitle')}</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/register" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#f59e0b', color: '#0d1117', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}>
            {t('reportAnItem')}
          </Link>
          <Link to="/search" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#0d1117', color: '#ffffff', border: '1px solid #30363d', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}>
            {t('browseItems')}
          </Link>
        </div>
      </section>

    </div>
  );
};

Home.displayName = 'Home';
export default Home;