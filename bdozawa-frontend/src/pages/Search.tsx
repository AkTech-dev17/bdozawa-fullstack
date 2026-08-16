import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiSearch, FiMapPin, FiEye, FiX, FiBookmark, FiGrid, FiList, FiAlertCircle, FiChevronDown, FiSliders, FiCheck, FiCheckCircle, FiBell } from 'react-icons/fi';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { HiOutlineDocumentText } from 'react-icons/hi2';
import AlertModal from '../components/AlertModal';

interface Item {
  id: number;
  title: string;
  description: string;
  type: string;
  category?: string;
  location?: string;
  views?: number;
  timeAgo?: string;
  image_url?: string;
  contact_info: string;
  reward?: string;
  owner_name?: string;
  is_verified_hub?: boolean;
}

const CATEGORIES = [
  'Electronics', 'Wallets & Cards', 'Keys', 'Bags & Luggage', 
  'Jewelry', 'Documents', 'Pets', 'Clothing', 'Accessories', 'Other'
];

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

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, dir } = useThemeLanguage();
  const isRtl = dir === 'rtl';
  
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [showFilters, setShowFilters] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [sortOption, setSortOption] = useState('Most recent');
  
  const sortRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const query = searchParams.get('q') || '';
  const typeFilter = searchParams.get('type') || 'all';
  const categoryFilter = searchParams.get('category') || 'all';
  
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  
  // LIVE DATABASE FETCH
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/items');
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items from Laravel:", error);
        setItems([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) setIsSortOpen(false);
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) setIsTypeOpen(false);
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) setIsCategoryOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
  };

  const clearFilters = () => setSearchParams(new URLSearchParams());

  const filteredItems = items.filter(item => {
    const matchesQuery = query === '' || item.title.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesCategory = categoryFilter === 'all' || (item.category && item.category.toLowerCase() === categoryFilter.toLowerCase());
    return matchesQuery && matchesType && matchesCategory;
  });

  const typeOptions = [
    { value: 'all', label: t('allTypes') || 'All items' },
    { value: 'lost', label: t('badgeLost') || 'Lost' },
    { value: 'found', label: t('badgeFound') || 'Found' }
  ];

  return (
    <div style={{ width: '100%', padding: '3rem 3%', backgroundColor: '#0F0F0F', color: '#FFFFFF', boxSizing: 'border-box', minHeight: '80vh', position: 'relative', textAlign: isRtl ? 'right' : 'left' }}>
      
      {/* Toast Notification */}
      {showToast && (
        <div style={{
          position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)',
          backgroundColor: '#450a0a', color: '#fca5a5', border: '1px solid #7f1d1d',
          padding: '12px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px',
          zIndex: 9999, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', fontWeight: '600', fontSize: '0.95rem',
          animation: 'slideDown 0.3s ease-out', flexDirection: isRtl ? 'row-reverse' : 'row'
        }}>
          <FiAlertCircle size={20} /> {t('signInToSave')}
        </div>
      )}

      {/* Centered Container */}
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#FFFFFF', margin: '0 0 0.5rem 0' }}>{t('searchPageTitle')}</h1>
          <p style={{ color: '#AAAAAA', fontSize: '1.05rem', margin: 0 }}>{t('searchPageSubtitle')}</p>
        </div>

        {/* Main Search Bar */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <FiSearch size={20} style={{ position: 'absolute', [isRtl ? 'right' : 'left']: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#AAAAAA' }} />
          <input 
            type="text" 
            placeholder={t('searchInputPlaceholder')}
            value={query}
            onChange={(e) => updateFilter('q', e.target.value)}
            style={{
              width: '100%', padding: isRtl ? '1rem 3.25rem 1rem 1.25rem' : '1rem 1.25rem 1rem 3.25rem',
              backgroundColor: '#1A1A1A', border: '1px solid #262626', borderRadius: '99px', color: '#FFFFFF',
              fontSize: '1.05rem', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s', textAlign: isRtl ? 'right' : 'left'
            }}
            onFocus={(e) => e.target.style.borderColor = '#FBCD04'}
            onBlur={(e) => e.target.style.borderColor = '#262626'}
          />
        </div>

        {/* Active Filter Chips Pill Row */}
        {(typeFilter !== 'all' || categoryFilter !== 'all') && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
            <span style={{ color: '#AAAAAA', fontSize: '0.85rem' }}>Active filters:</span>
            
            {typeFilter !== 'all' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#FBCD0415', border: '1px solid #FBCD04', color: '#FBCD04', padding: '4px 12px', borderRadius: '99px', fontSize: '0.85rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <span>Type: {typeFilter}</span>
                <FiX size={14} style={{ cursor: 'pointer' }} onClick={() => updateFilter('type', 'all')} />
              </div>
            )}

            {categoryFilter !== 'all' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#FBCD0415', border: '1px solid #FBCD04', color: '#FBCD04', padding: '4px 12px', borderRadius: '99px', fontSize: '0.85rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                <span>Category: {categoryFilter}</span>
                <FiX size={14} style={{ cursor: 'pointer' }} onClick={() => updateFilter('category', 'all')} />
              </div>
            )}
          </div>
        )}

        {/* Main Actions Row */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: showFilters ? '1.5rem' : '2.5rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
          
          <div style={{ display: 'flex', gap: '1rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '8px', 
                backgroundColor: showFilters ? '#FBCD0415' : 'transparent', 
                border: `1px solid ${showFilters ? '#FBCD04' : '#262626'}`, 
                color: showFilters ? '#FBCD04' : '#FFFFFF', 
                padding: '0.6rem 1.2rem', borderRadius: '99px', fontSize: '0.95rem', cursor: 'pointer',
                flexDirection: isRtl ? 'row-reverse' : 'row', transition: 'all 0.2s'
              }}
            >
              <FiSliders size={16} /> Filters
            </button>

            {/* SET ALERT BUTTON */}
            <button 
              onClick={() => setIsAlertModalOpen(true)}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '8px', 
                backgroundColor: 'rgba(251, 205, 4, 0.1)', 
                border: '1px solid #FBCD04', 
                color: '#FBCD04', 
                padding: '0.6rem 1.2rem', borderRadius: '99px', fontSize: '0.95rem', cursor: 'pointer',
                flexDirection: isRtl ? 'row-reverse' : 'row', transition: 'all 0.2s'
              }}
            >
              <FiBell size={16} /> Set Alert
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
            
            {/* Sort Dropdown */}
            <div ref={sortRef} style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'transparent', 
                  border: isSortOpen ? '1px solid #FBCD04' : '1px solid #262626', color: '#FFFFFF', 
                  padding: '0.6rem 1.2rem', borderRadius: '99px', fontSize: '0.95rem', cursor: 'pointer',
                  flexDirection: isRtl ? 'row-reverse' : 'row', minWidth: '150px', justifyContent: 'space-between', transition: 'border-color 0.2s'
                }}
              >
                <span>{sortOption}</span>
                <FiChevronDown style={{ transform: isSortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              
              {isSortOpen && (
                <div style={{ 
                  position: 'absolute', top: '100%', [isRtl ? 'left' : 'right']: 0, marginTop: '8px', 
                  backgroundColor: '#1A1A1A', border: '1px solid #262626', borderRadius: '12px', 
                  width: '100%', zIndex: 10, overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                }}>
                  {['Most recent', 'Oldest', 'Highest reward'].map(option => (
                    <div 
                      key={option}
                      onClick={() => { setSortOption(option); setIsSortOpen(false); }}
                      style={{ 
                        padding: '12px 1rem', cursor: 'pointer', fontSize: '0.95rem', 
                        backgroundColor: sortOption === option ? '#262626' : 'transparent',
                        color: sortOption === option ? '#FBCD04' : '#AAAAAA',
                        textAlign: isRtl ? 'right' : 'left'
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Grid / List Toggle */}
            <div style={{ display: 'flex', gap: '8px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              <button 
                onClick={() => setViewMode('grid')}
                style={{ 
                  width: '38px', height: '38px', borderRadius: '50%', border: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s',
                  backgroundColor: viewMode === 'grid' ? '#262626' : 'transparent', color: viewMode === 'grid' ? '#FBCD04' : '#AAAAAA' 
                }}
              >
                <FiGrid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                style={{ 
                  width: '38px', height: '38px', borderRadius: '50%', border: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s',
                  backgroundColor: viewMode === 'list' ? '#262626' : 'transparent', color: viewMode === 'list' ? '#FBCD04' : '#AAAAAA' 
                }}
              >
                <FiList size={18} />
              </button>
            </div>

          </div>
        </div>

        {/* Expandable Filters Row */}
        {showFilters && (
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
            
            <div ref={typeRef} style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
              <button 
                onClick={() => setIsTypeOpen(!isTypeOpen)}
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
                  backgroundColor: 'transparent', border: isTypeOpen ? '1px solid #FBCD04' : '1px solid #262626', 
                  color: '#FFFFFF', padding: '0.8rem 1.2rem', borderRadius: '12px', fontSize: '0.95rem', cursor: 'pointer',
                  flexDirection: isRtl ? 'row-reverse' : 'row', transition: 'border-color 0.2s'
                }}
              >
                <span>{typeOptions.find(opt => opt.value === typeFilter)?.label}</span>
                <FiChevronDown style={{ transform: isTypeOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {isTypeOpen && (
                <div style={{ 
                  position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px', 
                  backgroundColor: '#1A1A1A', border: '1px solid #262626', borderRadius: '12px', 
                  zIndex: 10, overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                }}>
                  {typeOptions.map(option => (
                    <div 
                      key={option.value}
                      onClick={() => { updateFilter('type', option.value); setIsTypeOpen(false); }}
                      style={{ 
                        padding: '12px 1rem', cursor: 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        backgroundColor: typeFilter === option.value ? '#FBCD0415' : 'transparent',
                        color: typeFilter === option.value ? '#FBCD04' : '#AAAAAA',
                        flexDirection: isRtl ? 'row-reverse' : 'row'
                      }}
                    >
                      {option.label}
                      {typeFilter === option.value && <FiCheck size={16} />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div ref={categoryRef} style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
              <button 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
                  backgroundColor: 'transparent', border: isCategoryOpen ? '1px solid #FBCD04' : '1px solid #262626', 
                  color: '#FFFFFF', padding: '0.8rem 1.2rem', borderRadius: '12px', fontSize: '0.95rem', cursor: 'pointer',
                  flexDirection: isRtl ? 'row-reverse' : 'row', transition: 'border-color 0.2s'
                }}
              >
                <span>{categoryFilter === 'all' ? (t('allCategories') || 'All categories') : t(getCategoryTransKey(categoryFilter))}</span>
                <FiChevronDown style={{ transform: isCategoryOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              {isCategoryOpen && (
                <div style={{ 
                  position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px', 
                  backgroundColor: '#1A1A1A', border: '1px solid #262626', borderRadius: '12px', 
                  zIndex: 10, maxHeight: '300px', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                }}>
                  <div 
                    onClick={() => { updateFilter('category', 'all'); setIsCategoryOpen(false); }}
                    style={{ 
                      padding: '12px 1rem', cursor: 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      backgroundColor: categoryFilter === 'all' ? '#FBCD0415' : 'transparent',
                      color: categoryFilter === 'all' ? '#FBCD04' : '#AAAAAA',
                      flexDirection: isRtl ? 'row-reverse' : 'row'
                    }}
                  >
                    {t('allCategories') || 'All categories'}
                    {categoryFilter === 'all' && <FiCheck size={16} />}
                  </div>
                  {CATEGORIES.map(cat => (
                    <div 
                      key={cat}
                      onClick={() => { updateFilter('category', cat); setIsCategoryOpen(false); }}
                      style={{ 
                        padding: '12px 1rem', cursor: 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        backgroundColor: categoryFilter === cat ? '#FBCD0415' : 'transparent',
                        color: categoryFilter === cat ? '#FBCD04' : '#AAAAAA',
                        flexDirection: isRtl ? 'row-reverse' : 'row'
                      }}
                    >
                      {t(getCategoryTransKey(cat))}
                      {categoryFilter === cat && <FiCheck size={16} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        )}

        {/* Results Count & Clear */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
          <span style={{ color: '#AAAAAA', fontSize: '0.95rem' }}>
            {loading ? t('searching') : `${filteredItems.length} ${filteredItems.length === 1 ? t('itemFound') : t('itemsFound')}`}
          </span>
          
          {(query || typeFilter !== 'all' || categoryFilter !== 'all') && (
            <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: '#FBCD04', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              <FiX /> {t('clearFilters')}
            </button>
          )}
        </div>

        {/* Items Grid/List Cards */}
        {!loading && filteredItems.length > 0 && (
          <div style={
            viewMode === 'grid' 
            ? { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }
            : { display: 'flex', flexDirection: 'column', gap: '1rem' }
          }>
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                onClick={() => navigate(`/item/${item.id}`)} 
                style={{ 
                  backgroundColor: '#1A1A1A', border: '1px solid #262626', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', 
                  transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                  display: viewMode === 'list' ? 'flex' : 'block',
                  flexDirection: viewMode === 'list' ? (isRtl ? 'row-reverse' : 'row') : 'column'
                }} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#FBCD04';
                  e.currentTarget.style.boxShadow = '0 12px 30px -10px rgba(251, 205, 4, 0.15)';
                }} 
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#262626';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                
                {/* Card Thumbnail */}
                <div style={{ 
                  height: viewMode === 'grid' ? '200px' : 'auto', 
                  minHeight: viewMode === 'list' ? '180px' : 'auto',
                  width: viewMode === 'list' ? '280px' : '100%',
                  flexShrink: 0,
                  backgroundColor: '#0F0F0F', position: 'relative', overflow: 'hidden',
                  borderRight: (viewMode === 'list' && !isRtl) ? '1px solid #262626' : 'none',
                  borderLeft: (viewMode === 'list' && isRtl) ? '1px solid #262626' : 'none'
                }}>
                  <div 
                    style={{ 
                      width: '100%', height: '100%', 
                      backgroundImage: item.image_url ? `url(${item.image_url})` : 'none', 
                      backgroundSize: 'cover', backgroundPosition: 'center',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                  />

                  <div style={{ position: 'absolute', top: '12px', [isRtl ? 'right' : 'left']: '12px', display: 'flex', gap: '6px', zIndex: 2, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <span style={{ backgroundColor: item.type.toLowerCase() === 'found' ? '#14532d' : '#7f1d1d', color: item.type.toLowerCase() === 'found' ? '#86efac' : '#fca5a5', padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'currentColor' }}></span>
                      {item.type.toLowerCase() === 'found' ? t('badgeFound') : t('badgeLost')}
                    </span>
                    {item.reward && (
                      <span style={{ backgroundColor: '#FBCD04', color: '#0F0F0F', padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        {t('reward')} {item.reward}
                      </span>
                    )}
                  </div>

                  <button 
                    onClick={handleBookmarkClick}
                    style={{ position: 'absolute', top: '12px', [isRtl ? 'left' : 'right']: '12px', width: '32px', height: '32px', backgroundColor: 'rgba(15, 15, 15, 0.8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#AAAAAA', border: 'none', cursor: 'pointer', zIndex: 2, transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#FBCD04'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#AAAAAA'}
                  >
                    <FiBookmark size={16} />
                  </button>
                </div>

                {/* Card Content */}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, justifyContent: viewMode === 'list' ? 'center' : 'flex-start' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#AAAAAA', fontSize: '0.85rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                      <HiOutlineDocumentText size={14} /> {t(getCategoryTransKey(item.category || 'Other'))}
                    </div>
                    <span>{item.timeAgo === 'Just now' ? t('justNow') : (item.timeAgo || t('justNow'))}</span>
                  </div>
                  
                  {/* Verified Hub Badge Rendering */}
                  {item.owner_name && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                      <span style={{ color: '#AAAAAA', fontSize: '0.85rem', fontWeight: 'bold' }}>
                        {item.owner_name}
                      </span>
                      
                      {item.is_verified_hub && (
                        <div 
                          title="Verified Institutional Hub" 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            color: '#FBCD04',
                            backgroundColor: '#FBCD0415', 
                            padding: '2px', 
                            borderRadius: '50%',
                            boxShadow: '0 0 8px rgba(251, 205, 4, 0.4)'
                          }}
                        >
                          <FiCheckCircle size={14} />
                        </div>
                      )}
                    </div>
                  )}

                  <h4 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#FFFFFF', margin: 0, textAlign: isRtl ? 'right' : 'left', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.title}
                  </h4>
                  
                  {viewMode === 'list' && (
                    <p style={{ color: '#AAAAAA', fontSize: '0.95rem', margin: 0, lineHeight: 1.5, textAlign: isRtl ? 'right' : 'left', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.description}
                    </p>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#AAAAAA', fontSize: '0.85rem', marginTop: viewMode === 'grid' ? '0.5rem' : 'auto', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                      <FiMapPin size={14} /> {item.location || t('unknownLocation')}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                      <FiEye size={14} /> {item.views || 0}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* ALERT MODAL MOUNTED HERE */}
      <AlertModal 
        isOpen={isAlertModalOpen} 
        onClose={() => setIsAlertModalOpen(false)} 
        currentCategory={categoryFilter}
        currentQuery={query}
      />

      <style>{`
        @keyframes slideDown { from { top: -20px; opacity: 0; } to { top: 24px; opacity: 1; } }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default Search;