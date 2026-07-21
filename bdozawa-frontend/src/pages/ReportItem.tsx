// src/pages/ReportItem.tsx
import { useState } from 'react';
import axios from 'axios';

const ReportItem = () => {
  // 1. Setting up State for our form (ZAS Tech Requirement)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'lost', // Defaulting to 'lost'
    contact_info: ''
  });
  
  const [message, setMessage] = useState('');

  // 2. Event Handling for when the user types in the inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Submitting the data to your Laravel API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from refreshing
    try {
      // Sending a POST request to the API route we made earlier
      await axios.post('http://127.0.0.1:8000/api/items', formData);
      
      setMessage('Success! Your item has been reported.');
      
      // Clear the form after a successful submission
      setFormData({ title: '', description: '', type: 'lost', contact_info: '' });
    } catch (error) {
      console.error(error);
      setMessage('Oops! Something went wrong connecting to the server.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#161b22', padding: '2.5rem', borderRadius: '10px', border: '1px solid #30363d' }}>
      <h2 style={{ marginBottom: '1rem', color: '#ffffff' }}>Report an Item</h2>
      
      {/* Success/Error Message Display */}
      {message && <p style={{ color: '#58a6ff', marginBottom: '1.5rem', fontWeight: 'bold' }}>{message}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        
        <input 
          type="text" name="title" placeholder="Item Name (e.g., iPhone 14 Pro)" 
          value={formData.title} onChange={handleChange} required 
          style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white', fontSize: '1rem' }}
        />
        
        <select 
          name="type" value={formData.type} onChange={handleChange}
          style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white', fontSize: '1rem' }}
        >
          <option value="lost">I lost this item</option>
          <option value="found">I found this item</option>
        </select>

        <textarea 
          name="description" placeholder="Describe the item, where it was lost/found, colors, marks..." 
          value={formData.description} onChange={handleChange} required rows={4}
          style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white', fontSize: '1rem', resize: 'vertical' }}
        />

        <input 
          type="text" name="contact_info" placeholder="Your Phone Number or Email" 
          value={formData.contact_info} onChange={handleChange} required 
          style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white', fontSize: '1rem' }}
        />

        <button type="submit" style={{ padding: '1rem', backgroundColor: '#238636', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
          Submit Report
        </button>
        
      </form>
    </div>
  );
};

export default ReportItem;