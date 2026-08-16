import { FiHeart, FiUsers, FiLayers, FiTrendingUp } from 'react-icons/fi';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

const StatsDashboard = () => {
  const { t } = useThemeLanguage();

  const stats = [
    { label: t('itemsReunited'), value: '1', icon: <FiHeart size={18} color="#8b949e" /> },
    { label: t('members'), value: '23', icon: <FiUsers size={18} color="#8b949e" /> },
    { label: t('activeListings'), value: '3', icon: <FiLayers size={18} color="#8b949e" /> },
    { label: t('reunionRate'), value: '25%', icon: <FiTrendingUp size={18} color="#8b949e" /> },
  ];

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '2rem auto', padding: '0 3%', boxSizing: 'border-box' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {stats.map((stat, index) => (
          <div 
            key={index} 
            style={{ 
              backgroundColor: '#161b22', 
              border: '1px solid #30363d', 
              borderRadius: '12px', 
              padding: '1.75rem', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b949e', fontSize: '0.95rem', fontWeight: '500' }}>
              {stat.icon}
              {stat.label}
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f0f6fc', lineHeight: '1' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsDashboard;