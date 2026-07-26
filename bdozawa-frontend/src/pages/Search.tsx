import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch, FiGrid, FiList } from 'react-icons/fi';
import { CiLocationOn } from 'react-icons/ci';
import { BsBookmark } from 'react-icons/bs';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { AiOutlineEye } from 'react-icons/ai';

interface Item {
  id: number;
  title: string;
  description: string;
  type: string;
  contact_info: string;
}

const Search = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All items');
  const [filterCategory, setFilterCategory] = useState('All categories');
  const [sortBy, setSortBy] = useState('Most recent');

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

  // Filtering logic
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = 
      filterType === 'All items' || item.type.toLowerCase() === filterType.toLowerCase();

    return matchesSearch && matchesType;
  });

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', color: '#ffffff', paddingBottom: '4rem' }}>
      
      {/* Page Title & Subtitle */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#f0f6fc' }}>Search items</h2>
        <p style={{ color: '#8b949e', fontSize: '0.95rem' }}>
          Filter by type, category and keywords to find what you're looking for.
        </p>
      </div>

      {/* Search Input Bar */}
      <div style={{ position: 'relative', width: '100%', marginBottom: '1.25rem' }}>
        <FiSearch size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#8b949e' }} />
        <input 
          type="text" 
          placeholder="Search by title, brand, location, keyword..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '0.9rem 1rem 0.9rem 3.25rem', 
            borderRadius: '10px', 
            border: '1px solid #30363d', 
            backgroundColor: '#0d1117', 
            color: 'white', 
            fontSize: '0.95rem',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Filter and Sort Dropdowns Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          {/* All items dropdown */}
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: '0.6rem 1rem',
              backgroundColor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: '8px',
              color: 'white',
              outline: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            <option value="All items">All items</option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>

          {/* All categories dropdown */}
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              padding: '0.6rem 1rem',
              backgroundColor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: '8px',
              color: 'white',
              outline: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            <option value="All categories">All categories</option>
            <option value="Wallets & Cards">Wallets & Cards</option>
            <option value="Electronics">Electronics</option>
            <option value="Keys">Keys</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Sort Dropdown */}
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.6rem 1rem',
              backgroundColor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: '8px',
              color: 'white',
              outline: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            <option value="Most recent">Most recent</option>
            <option value="Oldest">Oldest</option>
          </select>

          {/* View Mode Grid/List Icons */}
          <div style={{ display: 'flex', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '4px', gap: '2px' }}>
            <button style={{ background: '#30363d', border: 'none', padding: '6px', borderRadius: '6px', color: 'white', cursor: 'pointer', display: 'flex' }}>
              <FiGrid size={16} />
            </button>
            <button style={{ background: 'transparent', border: 'none', padding: '6px', borderRadius: '6px', color: '#8b949e', cursor: 'pointer', display: 'flex' }}>
              <FiList size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* Results Count */}
      <p style={{ color: '#8b949e', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        {filteredItems.length} items found
      </p>

      {/* Grid of Item Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredItems.map((item) => {
          const isLost = item.type.toLowerCase() === 'lost';
          return (
            <div key={item.id} style={{
              backgroundColor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: '12px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>
              
              {/* Card Header Image Area (Placeholder simulating photo frame in Dozer) */}
              <div style={{ 
                height: '180px', 
                backgroundColor: '#0d1117', 
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid #30363d'
              }}>
                <div style={{ color: '#30363d', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <HiOutlineDocumentText size={40} />
                  <span style={{ fontSize: '0.8rem', color: '#484f58' }}>No Image Attached</span>
                </div>

                {/* Top-Left Badge (Lost / Found) */}
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  backgroundColor: isLost ? '#7f1d1d' : '#14532d',
                  color: isLost ? '#fca5a5' : '#86efac'
                }}>
                  {item.type}
                </span>

                {/* Top-Right Bookmark Button */}
                <button style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(13, 17, 23, 0.7)',
                  border: '1px solid #30363d',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  cursor: 'pointer'
                }}>
                  <BsBookmark size={14} />
                </button>
              </div>

              {/* Card Content Body */}
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', fontSize: '0.8rem', color: '#8b949e' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <HiOutlineDocumentText size={14} /> Wallets & Cards
                  </span>
                  <span>Just now</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#f0f6fc' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#8b949e', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                  {item.description}
                </p>
              </div>

              {/* Card Footer */}
              <div style={{ borderTop: '1px solid #30363d', padding: '0.85rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#8b949e', backgroundColor: '#0d1117' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CiLocationOn size={16} /> Sulaymaniyah, Iraq
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AiOutlineEye size={16} /> 1
                </span>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Search;