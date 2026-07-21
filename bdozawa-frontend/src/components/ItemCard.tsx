// src/components/ItemCard.tsx
import React from 'react';

// Defining our Props (What data this card needs to display)
interface ItemProps {
  title: string;
  description: string;
  type: string;
  contact_info: string;
}

const ItemCard: React.FC<ItemProps> = ({ title, description, type, contact_info }) => {
  // Dynamic styling based on whether it's lost or found
  const badgeColor = type === 'lost' ? '#f85149' : '#238636'; 

  return (
    <div style={{ backgroundColor: '#161b22', padding: '1.5rem', borderRadius: '8px', border: '1px solid #30363d', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ color: '#58a6ff', margin: 0 }}>{title}</h3>
        <span style={{ backgroundColor: badgeColor, color: 'white', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
          {type}
        </span>
      </div>
      <p style={{ color: '#c9d1d9', fontSize: '0.95rem', lineHeight: '1.5' }}>{description}</p>
      <hr style={{ borderColor: '#30363d', margin: '0.5rem 0' }} />
      <p style={{ color: '#8b949e', fontSize: '0.9rem' }}>📞 Contact: {contact_info}</p>
    </div>
  );
};

export default ItemCard;