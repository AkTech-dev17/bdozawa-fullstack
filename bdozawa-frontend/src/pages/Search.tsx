import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// Added FiAlertCircle for the warning icon
import { FiSearch, FiMapPin, FiEye, FiX, FiBookmark, FiGrid, FiList, FiAlertCircle } from 'react-icons/fi';

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
}

const CATEGORIES = [
  'Electronics', 'Wallets & Cards', 'Keys', 'Bags & Luggage', 
  'Jewelry', 'Documents', 'Pets', 'Clothing', 'Accessories', 'Other'
];

// Exact items from the video + added mock data for other categories
const MOCK_ITEMS: Item[] = [
  // Wallets & Cards
  {
    id: 1,
    title: 'جزادانيكي رە ش',
    description: 'Black wallet lost with ID inside...',
    type: 'Lost',
    category: 'Wallets & Cards',
    location: 'Sulaymaniyah, Iraq',
    views: 37,
    timeAgo: '5d ago',
    image_url: 'https://via.placeholder.com/600x400/21262d/8b949e?text=Black+Wallet',
    contact_info: 'Cj Cj'
  },
  {
    id: 2,
    title: 'جزادانيكي نيلى',
    description: 'Blue wallet lost near the park...',
    type: 'Lost',
    category: 'Wallets & Cards',
    location: 'Sulaymaniyah, Iraq',
    views: 72,
    timeAgo: 'Jul 18',
    image_url: 'https://via.placeholder.com/600x400/21262d/8b949e?text=Blue+Wallet',
    contact_info: 'Nova Hersh',
    reward: '25,000'
  },
  {
    id: 3,
    title: 'كارتي نيشتماني',
    description: 'National ID card found...',
    type: 'Found',
    category: 'Wallets & Cards',
    location: 'Sulaymaniyah, Iraq',
    views: 67,
    timeAgo: 'Jul 15',
    image_url: 'https://via.placeholder.com/600x400/21262d/8b949e?text=ID+Card',
    contact_info: 'Bdozawa'
  },
  
  // Electronics
  {
    id: 4,
    title: 'MacBook Pro 14"',
    description: 'Lost my silver MacBook Pro in a coffee shop.',
    type: 'Lost',
    category: 'Electronics',
    location: 'Erbil, Iraq',
    views: 112,
    timeAgo: '2d ago',
    image_url: 'https://via.placeholder.com/600x400/21262d/8b949e?text=MacBook+Pro',
    contact_info: 'Ahmad M.'
  },
  {
    id: 5,
    title: 'AirPods Pro',
    description: 'Found a white AirPods Pro case on a park bench.',
    type: 'Found',
    category: 'Electronics',
    location: 'Duhok, Iraq',
    views: 45,
    timeAgo: '12h ago',
    image_url: 'https://via.placeholder.com/600x400/21262d/8b949e?text=AirPods',
    contact_info: 'Sara K.'
  },

  // Keys
  {
    id: 6,
    title: 'Toyota Car Keys',
    description: 'Found a set of car keys with a black keychain.',
    type: 'Found',
    category: 'Keys',
    location: 'Sulaymaniyah, Iraq',
    views: 18,
    timeAgo: '1d ago',
    image_url: 'https://via.placeholder.com/600x400/21262d/8b949e?text=Car+Keys',
    contact_info: 'Karim'
  },

  // Bags & Luggage
  {
    id: 7,
    title: 'Black Backpack',
    description: 'Lost a black backpack on the bus.',
    type: 'Lost',
    category: 'Bags & Luggage',
    location: 'Erbil, Iraq',
    views: 89,
    timeAgo: '1w ago',
    image_url: 'https://via.placeholder.com/600x400/21262d/8b949e?text=Backpack',
    contact_info: 'Nazanin'
  },

  // Pets
  {
    id: 8,
    title: 'White Cat (Husky Eyes)',
    description: 'Our white cat went missing yesterday.',
    type: 'Lost',
    category: 'Pets',
    location: 'Kirkuk, Iraq',
    views: 204,
    timeAgo: 'Just now',
    image_url: 'https://via.placeholder.com/600x400/21262d/8b949e?text=White+Cat',
    contact_info: 'Hassan Family',
    reward: '50,000'
  }
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State for the toast notification
  const [showToast, setShowToast] = useState(false);

  // Function to show the toast and hide it after 3 seconds
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents navigating to the item detail page
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Disappears after 3 seconds
  };

  const query = searchParams.get('q') || '';
  const typeFilter = searchParams.get('type') || 'all';
  const categoryFilter = searchParams.get('category') || 'all';
  
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/items');
        
        setTimeout(() => {
          if (response.data && response.data.length > 0 && response.data[0].category) {
            setItems(response.data);
          } else {
            setItems(MOCK_ITEMS);
          }
          setLoading(false);
        }, 600); 
      } catch (error) {
        console.error("Error fetching items, using mock data:", error);
        setTimeout(() => {
          setItems(MOCK_ITEMS);
          setLoading(false);
        }, 600);
      }
    };
    fetchItems();
  }, []);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const filteredItems = items.filter(item => {
    const matchesQuery = query === '' || 
      item.title.toLowerCase().includes(query.toLowerCase()) || 
      item.description.toLowerCase().includes(query.toLowerCase());
    
    const matchesType = typeFilter === 'all' || item.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesCategory = categoryFilter === 'all' || 
      (item.category && item.category.toLowerCase() === categoryFilter.toLowerCase());

    return matchesQuery && matchesType && matchesCategory;
  });

  return (
    <div style={{ width: '100%', padding: '2rem 3%', color: '#ffffff', boxSizing: 'border-box', minHeight: '80vh', position: 'relative' }}>
      
      {/* Toast Notification UI */}
      {showToast && (
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
          zIndex: 9999,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
          fontWeight: '600',
          fontSize: '0.95rem',
          animation: 'slideDown 0.3s ease-out'
        }}>
          <FiAlertCircle size={20} />
          Sign in to save listings
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#f0f6fc', marginBottom: '0.5rem' }}>Search items</h1>
        <p style={{ color: '#8b949e', fontSize: '1rem' }}>Filter by type, category and keywords to find what you're looking for.</p>
      </div>

      {/* Main Search Bar */}
      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        <FiSearch size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#8b949e' }} />
        <input 
          type="text" 
          placeholder="Search by title, brand, location, keyword..."
          value={query}
          onChange={(e) => updateFilter('q', e.target.value)}
          style={{
            width: '100%',
            padding: '1rem 1rem 1rem 3.25rem',
            backgroundColor: 'transparent',
            border: '1px solid #30363d',
            borderRadius: '12px',
            color: 'white',
            fontSize: '1rem',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
          onBlur={(e) => e.target.style.borderColor = '#30363d'}
        />
      </div>

      {/* Filters Row */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {/* Type Filter */}
          <select 
            value={typeFilter} 
            onChange={(e) => updateFilter('type', e.target.value)}
            style={{ backgroundColor: '#161b22', border: '1px solid #30363d', color: '#f0f6fc', padding: '0.7rem 2.5rem 0.7rem 1rem', borderRadius: '8px', fontSize: '0.95rem', appearance: 'none', outline: 'none', cursor: 'pointer', backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%238b949e%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto' }}
          >
            <option value="all">All items</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>

          {/* Category Filter */}
          <select 
            value={categoryFilter} 
            onChange={(e) => updateFilter('category', e.target.value)}
            style={{ backgroundColor: '#161b22', border: '1px solid #30363d', color: '#f0f6fc', padding: '0.7rem 2.5rem 0.7rem 1rem', borderRadius: '8px', fontSize: '0.95rem', appearance: 'none', outline: 'none', cursor: 'pointer', backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%238b949e%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto' }}
          >
            <option value="all">All categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <select style={{ backgroundColor: 'transparent', border: 'none', color: '#8b949e', fontSize: '0.95rem', appearance: 'none', outline: 'none', cursor: 'pointer', backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%238b949e%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 top 50%', backgroundSize: '0.65rem auto', paddingRight: '1.5rem' }}>
            <option>Most recent</option>
            <option>Oldest</option>
          </select>
          
          <div style={{ display: 'flex', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', overflow: 'hidden' }}>
            <button style={{ padding: '0.5rem', backgroundColor: '#21262d', border: 'none', color: '#f0f6fc', cursor: 'pointer' }}><FiGrid size={18} /></button>
            <button style={{ padding: '0.5rem', backgroundColor: 'transparent', border: 'none', color: '#8b949e', cursor: 'pointer' }}><FiList size={18} /></button>
          </div>
        </div>
      </div>

      {/* Results Count & Clear */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <span style={{ color: '#8b949e', fontSize: '0.95rem' }}>
          {loading ? 'Searching...' : `${filteredItems.length} item${filteredItems.length !== 1 ? 's' : ''} found`}
        </span>
        
        {(query || typeFilter !== 'all' || categoryFilter !== 'all') && (
          <button onClick={clearFilters} style={{ background: 'none', border: 'none', color: '#f0f6fc', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
            <FiX /> Clear filters
          </button>
        )}
      </div>

      {/* Loading Skeletons */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '12px', height: '320px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '180px', backgroundColor: '#21262d', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', animation: 'pulse 1.5s infinite ease-in-out' }} />
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ width: '40%', height: '14px', backgroundColor: '#21262d', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }} />
                  <div style={{ width: '20%', height: '14px', backgroundColor: '#21262d', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }} />
                </div>
                <div style={{ width: '80%', height: '20px', backgroundColor: '#21262d', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }} />
                <div style={{ width: '60%', height: '14px', backgroundColor: '#21262d', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out', marginTop: 'auto' }} />
              </div>
            </div>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        
        /* Empty State */
        <div style={{ textAlign: 'center', padding: '5rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '64px', height: '64px', backgroundColor: '#161b22', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #30363d', marginBottom: '0.5rem' }}>
            <FiSearch size={28} color="#60a5fa" />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f0f6fc', margin: 0 }}>No matching items</h3>
          <p style={{ color: '#8b949e', fontSize: '1rem', margin: 0 }}>Try adjusting your filters or search terms.</p>
          <button onClick={() => navigate('/register')} style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', backgroundColor: '#60a5fa', color: '#0d1117', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            Report an item
          </button>
        </div>

      ) : (

        /* Items Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredItems.map(item => (
            <div key={item.id} onClick={() => navigate(`/item/${item.id}`)} style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s, transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#60a5fa'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#30363d'}>
              
              {/* Card Image Area */}
              <div style={{ height: '180px', backgroundColor: '#21262d', position: 'relative', backgroundImage: item.image_url ? `url(${item.image_url})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                
                {/* Top left badges: Status & Reward */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                  <span style={{ backgroundColor: item.type.toLowerCase() === 'found' ? '#14532d' : '#7f1d1d', color: item.type.toLowerCase() === 'found' ? '#86efac' : '#fca5a5', padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'currentColor' }}></span>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1).toLowerCase()}
                  </span>
                  
                  {item.reward && (
                    <span style={{ backgroundColor: '#713f12', color: '#fde047', padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      Reward {item.reward}
                    </span>
                  )}
                </div>

                {/* Bookmark Icon */}
                <button 
                  onClick={handleBookmarkClick} // <-- Replaced alert() with handleBookmarkClick
                  style={{ 
                    position: 'absolute', 
                    top: '12px', 
                    right: '12px', 
                    width: '32px', 
                    height: '32px', 
                    backgroundColor: 'rgba(22, 27, 34, 0.8)', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#8b949e',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#8b949e'}
                >
                  <FiBookmark size={16} />
                </button>
              </div>

              {/* Card Content */}
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#8b949e', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FiGrid size={14} /> {item.category || 'Other'}
                  </div>
                  <span>{item.timeAgo || 'Just now'}</span>
                </div>
                
                <h4 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#f0f6fc', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.title}
                </h4>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#8b949e', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FiMapPin size={14} /> {item.location || 'Unknown location'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FiEye size={14} /> {item.views || 0}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Global CSS for skeleton and toast animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes slideDown {
          from { top: -20px; opacity: 0; }
          to { top: 24px; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Search;