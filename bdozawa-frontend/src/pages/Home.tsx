// src/pages/Home.tsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1 style={{ fontSize: '3.5rem', color: '#58a6ff', marginBottom: '1rem' }}>
        Welcome to Bdozawa
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#8b949e', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
        Erbil's premier community platform to track down what you've lost and return what you've found. 
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
        <Link 
          to="/feed" 
          style={{ padding: '1rem 2rem', backgroundColor: '#21262d', color: 'white', textDecoration: 'none', borderRadius: '8px', border: '1px solid #30363d', fontSize: '1.1rem', transition: '0.2s' }}
        >
          🔍 Browse Items
        </Link>
        <Link 
          to="/report" 
          style={{ padding: '1rem 2rem', backgroundColor: '#238636', color: 'white', textDecoration: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold' }}
        >
          ➕ Report an Item
        </Link>
      </div>
    </div>
  );
};

export default Home;