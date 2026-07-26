import { HiOutlineSparkles } from 'react-icons/hi2';

const HowItWorks = () => {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1rem', color: '#ffffff', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      
      <div>
        <span style={{ color: '#60a5fa', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>How it works</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginTop: '0.5rem', marginBottom: '1rem', color: '#f0f6fc' }}>
          Four simple steps to a happy ending
        </h1>
        <p style={{ color: '#8b949e', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' }}>
          No accounts to wrestle with, no friction — just a clear path from lost to found.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
        {[
          { step: '1', title: 'Report it', desc: 'Add a photo and a few details. It takes less than a minute.' },
          { step: '2', title: 'Get matched', desc: 'Our engine surfaces likely matches with a confidence score.' },
          { step: '3', title: 'Connect safely', desc: 'Chat securely to verify ownership before meeting up.' },
          { step: '4', title: 'Reunite', desc: 'Arrange a handoff and mark it resolved. Everyone wins.' },
        ].map((s, idx) => (
          <div key={idx} style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: '#60a5fa', backgroundColor: '#0d1117', width: '45px', height: '45px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #30363d' }}>
                <HiOutlineSparkles size={22} />
              </div>
              <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#30363d' }}>{s.step}</span>
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#f0f6fc', marginBottom: '0.5rem' }}>{s.title}</h3>
              <p style={{ color: '#8b949e', fontSize: '0.9rem', lineHeight: '1.5' }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default HowItWorks;