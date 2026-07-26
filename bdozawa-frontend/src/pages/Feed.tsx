// src/pages/Feed.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';

interface Item {
  id: number;
  title: string;
  description: string;
  type: string;
  contact_info: string;
}

const Feed = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 1. New State for the Search Engine
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/items');
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // 2. Real-time filtering logic
  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#ffffff', marginBottom: '1.5rem', textAlign: 'center' }}>Latest Lost & Found Items</h2>
      
      {/* 3. The Search Bar UI */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
        <input 
          type="text" 
          placeholder="🔍 Search for a lost or found item..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            width: '100%', 
            maxWidth: '500px', 
            padding: '1rem 1.5rem', 
            borderRadius: '30px', 
            border: '1px solid #30363d', 
            backgroundColor: '#0d1117', 
            color: 'white', 
            fontSize: '1rem',
            outline: 'none'
          }}
        />
      </div>
      
      {/* 4. Displaying the Filtered Results */}
      {loading ? (
        <p style={{ color: '#8b949e', textAlign: 'center' }}>Loading items...</p>
      ) : filteredItems.length === 0 ? (
        <p style={{ color: '#8b949e', textAlign: 'center' }}>No items match your search.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredItems.map((item) => (
          <ItemCard 
  key={item.id} 
  id={item.id} // YOU MUST ADD THIS LINE
  title={item.title} 
  description={item.description} 
  type={item.type} 
  contact_info={item.contact_info} 
/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;