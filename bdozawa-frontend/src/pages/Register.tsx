import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { MdOutlineEmail } from 'react-icons/md';

const Register = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0d1117', // Dozer dark background
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* Top Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '2rem 3rem' 
      }}>
        <Link to="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          color: '#9ca3af', 
          textDecoration: 'none',
          fontSize: '0.95rem'
        }}>
          <FiArrowLeft size={18} />
          Back home
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '1.25rem' }}>
          <span style={{ fontSize: '1.5rem' }}>◵</span> 
          Dozer {/* Replace with Bdozawa */}
        </div>
      </div>

      {/* Centered Form Container */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingBottom: '10vh' // Slightly offsets it upwards for visual balance
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>
          
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Create your account
          </h2>
          <p style={{ color: '#9ca3af', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Join a community that gives things back.
          </p>

          {/* Google Button */}
          <button style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#0d1117',
            border: '1px solid #30363d',
            borderRadius: '8px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            fontSize: '0.95rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '1.5rem'
          }}>
            <FcGoogle size={20} />
            Google
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#30363d' }}></div>
            <span style={{ padding: '0 10px', color: '#6b7280', fontSize: '0.85rem' }}>or continue with email</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#30363d' }}></div>
          </div>

          {/* Email Input */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Email</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: '8px',
                color: 'white',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: '8px',
                color: 'white',
                fontSize: '0.95rem',
                outline: 'none',
                letterSpacing: '2px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Submit Button */}
          <button style={{
            width: '100%',
            padding: '0.85rem',
            backgroundColor: '#60a5fa', // Dozer blue
            color: '#0d1117',
            border: 'none',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '1.5rem'
          }}>
            <MdOutlineEmail size={20} />
            Create account
          </button>

          {/* Bottom Links */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <button style={{ 
              background: 'none', 
              border: 'none', 
              color: '#60a5fa', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '6px',
              fontSize: '0.95rem',
              fontWeight: '500',
              cursor: 'pointer' 
            }}>
              <HiOutlineSparkles size={18} />
              Email me a magic link instead
            </button>
            
            <div style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
              Already have an account? <Link to="/login" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 'bold' }}>Sign in</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;