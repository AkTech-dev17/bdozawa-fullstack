import { useState } from 'react';

export default function ItemForm() {
  // State variables to hold the user's typed input
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Lost');
  const [contactInfo, setContactInfo] = useState('');

  // The function that runs when the user clicks "Submit"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing

    // 1. Package the data exactly how your Laravel Controller expects it
    const newItem = {
      title: title,
      description: description,
      type: type,
      contact_info: contactInfo
    };

    try {
      // 2. Send the POST request to your Laravel API
      // REPLACE THIS URL with your exact backend API URL
      const response = await fetch('http://localhost:8000/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newItem)
      });

      if (response.ok) {
        alert('Item successfully saved to the database!');
        // Clear the form fields for the next submission
        setTitle('');
        setDescription('');
        setType('Lost');
        setContactInfo('');
      } else {
        alert('Failed to save the item. Check your terminal or console for errors.');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '40px auto', backgroundColor: '#1e1e1e', borderRadius: '8px', color: 'white' }}>
      <h2 style={{ marginBottom: '20px' }}>Report a Lost or Found Item</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <input 
          type="text" 
          placeholder="What is the item? (e.g., Blue Backpack)" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '4px', border: 'none' }}
        />

        <textarea 
          placeholder="Describe where it was left or found..." 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '4px', border: 'none', minHeight: '100px' }}
        />

        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)} 
          style={{ padding: '10px', borderRadius: '4px', border: 'none' }}
        >
          <option value="Lost">I Lost This Item</option>
          <option value="Found">I Found This Item</option>
        </select>

        <input 
          type="text" 
          placeholder="Contact Info (e.g., Room 402 or Phone Number)" 
          value={contactInfo} 
          onChange={(e) => setContactInfo(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '4px', border: 'none' }}
        />

        <button type="submit" style={{ padding: '12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Submit Item
        </button>

      </form>
    </div>
  );
}