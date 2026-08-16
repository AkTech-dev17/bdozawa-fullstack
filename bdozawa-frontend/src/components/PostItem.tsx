import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useThemeLanguage } from '../context/ThemeLanguageContext';
import { FiUpload, FiCheckCircle } from 'react-icons/fi';
import PrivacyImageUploader from '../components/PrivacyImageUploader';

const CATEGORIES = [
  'Electronics', 'Wallets & Cards', 'Keys', 'Bags & Luggage', 
  'Jewelry', 'Documents', 'Pets', 'Clothing', 'Accessories', 'Other'
];

export default function PostItem() {
  const navigate = useNavigate();
  const { dir } = useThemeLanguage();
  const isRtl = dir === 'rtl';

  // SECURITY CHECK: Redirect to sign-in if there is no token
  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      navigate('/login'); // Redirects to your Login.tsx page
    }
  }, [navigate]);

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Lost',
    category: 'Electronics',
    location: '',
    contact_info: '',
    reward: '',
    image_url: '' // Added to track privacy-blurred images
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const token = localStorage.getItem('token'); 

      await axios.post('http://127.0.0.1:8000/api/items', formData, {
        headers: {
          Authorization: `Bearer ${token}` // Sends the user token to Laravel
        }
      });
      
      setStatus('success');
      setTimeout(() => {
        navigate('/search'); 
      }, 2000);
    } catch (error) {
      console.error('Error posting item:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F0F0F', color: '#86efac' }}>
        <FiCheckCircle size={64} style={{ marginBottom: '1rem' }} />
        <h2>Item Posted Successfully!</h2>
        <p style={{ color: '#AAAAAA' }}>Redirecting...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '3rem 3%', backgroundColor: '#0F0F0F', color: '#FFFFFF', minHeight: '80vh', textAlign: isRtl ? 'right' : 'left' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#1A1A1A', padding: '2.5rem', borderRadius: '16px', border: '1px solid #262626' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
          <FiUpload size={28} color="#FBCD04" />
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Post an Item</h1>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#AAAAAA' }}>Item Status</label>
            <div style={{ display: 'flex', gap: '1rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
              <button type="button" onClick={() => setFormData({ ...formData, type: 'Lost' })} style={{ flex: 1, padding: '12px', borderRadius: '8px', cursor: 'pointer', border: `1px solid ${formData.type === 'Lost' ? '#fca5a5' : '#262626'}`, backgroundColor: formData.type === 'Lost' ? 'rgba(127, 29, 29, 0.2)' : 'transparent', color: formData.type === 'Lost' ? '#fca5a5' : '#FFFFFF' }}>
                Lost Something
              </button>
              <button type="button" onClick={() => setFormData({ ...formData, type: 'Found' })} style={{ flex: 1, padding: '12px', borderRadius: '8px', cursor: 'pointer', border: `1px solid ${formData.type === 'Found' ? '#86efac' : '#262626'}`, backgroundColor: formData.type === 'Found' ? 'rgba(20, 83, 45, 0.2)' : 'transparent', color: formData.type === 'Found' ? '#86efac' : '#FFFFFF' }}>
                Found Something
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#AAAAAA' }}>Title *</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} placeholder="e.g., iPhone 15 Pro Max" style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0F0F0F', border: '1px solid #262626', color: '#FFFFFF', boxSizing: 'border-box', textAlign: isRtl ? 'right' : 'left' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#AAAAAA' }}>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0F0F0F', border: '1px solid #262626', color: '#FFFFFF', boxSizing: 'border-box', textAlign: isRtl ? 'right' : 'left' }}>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Privacy Image Uploader with Auto-Blur Canvas */}
          <PrivacyImageUploader 
            onImageProcessed={(base64String) => setFormData({ ...formData, image_url: base64String })} 
          />

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#AAAAAA' }}>Description</label>
            <textarea name="description" rows={4} value={formData.description} onChange={handleChange} placeholder="Distinctive features, colors, etc." style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0F0F0F', border: '1px solid #262626', color: '#FFFFFF', boxSizing: 'border-box', fontFamily: 'inherit', textAlign: isRtl ? 'right' : 'left' }} />
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexDirection: isRtl ? 'row-reverse' : 'row' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#AAAAAA' }}>Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., TIU Library" style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0F0F0F', border: '1px solid #262626', color: '#FFFFFF', boxSizing: 'border-box', textAlign: isRtl ? 'right' : 'left' }} />
            </div>
            {formData.type === 'Lost' && (
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#AAAAAA' }}>Reward (Optional)</label>
                <input type="text" name="reward" value={formData.reward} onChange={handleChange} placeholder="e.g., 25,000 IQD" style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#0F0F0F', border: '1px solid #262626', color: '#FFFFFF', boxSizing: 'border-box', textAlign: isRtl ? 'right' : 'left' }} />
              </div>
            )}
          </div>

          <button type="submit" disabled={status === 'loading'} style={{ width: '100%', padding: '14px', marginTop: '1rem', borderRadius: '99px', backgroundColor: '#FBCD04', color: '#0F0F0F', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', opacity: status === 'loading' ? 0.7 : 1 }}>
            {status === 'loading' ? 'Posting...' : 'Post Item'}
          </button>
        </form>
      </div>
    </div>
  );
}