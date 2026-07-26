interface ItemCardProps {
  id: number; // Add this so the card knows its database ID!
  title: string;
  description: string;
  type: string;
  contact_info: string;
}

const ItemCard = ({ id, title, description, type, contact_info }: ItemCardProps) => {
  const isLost = type.toLowerCase() === 'lost';

  // The function to talk to Laravel's delete route
  const handleDelete = async (itemId: number) => {
    if (!window.confirm("Are you sure this item has been resolved?")) return;

    try {
      const response = await fetch(`http://localhost:8000/api/items/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Item successfully resolved and removed!');
        window.location.reload(); // Refresh to update the feed
      } else {
        alert('Failed to delete the item.');
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#1f2937', 
      padding: '1.5rem', 
      borderRadius: '12px', 
      border: '1px solid #374151',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f9fafb', margin: 0 }}>
          {title}
        </h3>
        
        {/* Dynamic Badge: Red for Lost, Green for Found */}
        <span style={{ 
          padding: '0.25rem 0.75rem', 
          borderRadius: '999px', 
          fontSize: '0.875rem',
          fontWeight: 'bold',
          backgroundColor: isLost ? '#7f1d1d' : '#14532d',
          color: isLost ? '#fca5a5' : '#86efac'
        }}>
          {type}
        </span>
      </div>
      
      <p style={{ color: '#d1d5db', marginBottom: '1.5rem', lineHeight: '1.5' }}>
        {description}
      </p>
      
      {/* Contact Info Box */}
      <div style={{ 
        backgroundColor: '#111827', 
        padding: '0.75rem 1rem', 
        borderRadius: '8px', 
        fontSize: '0.9rem',
        border: '1px solid #1f2937',
        marginBottom: '1rem' // Added bottom margin to separate from the button
      }}>
        <span style={{ color: '#9ca3af' }}>Contact: </span>
        <span style={{ color: '#60a5fa', fontWeight: '500' }}>{contact_info}</span>
      </div>

      {/* New Resolve Button */}
      <button 
        onClick={() => handleDelete(id)}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#ef4444', // Tailwind red-500
          color: 'white',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Mark as Resolved
      </button>
    </div>
  );
};

export default ItemCard;