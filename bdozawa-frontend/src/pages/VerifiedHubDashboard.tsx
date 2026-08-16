import React, { useState } from 'react';
import axios from 'axios';
import { FiShield, FiUploadCloud, FiCheckCircle } from 'react-icons/fi';

export default function VerifiedHubDashboard() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Documents');
    const [location, setLocation] = useState('Computer Education Department, TIU');
    const [contactInfo] = useState('security@tiu.edu.iq');
    const [success, setSuccess] = useState('');

    const handleBulkSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/items', {
                title,
                description,
                type: 'Found',
                category,
                location,
                contact_info: contactInfo,
            });
            setSuccess('Institutional batch successfully published with the verified security badge!');
            setTitle('');
            setDescription('');
        } catch (err) {
            console.error('Error posting hub listing:', err);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '30px', backgroundColor: '#0f172a', borderRadius: '16px', color: '#fff', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <FiShield size={28} color="#fbbf24" />
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fbbf24', margin: 0 }}>TIU Official Verified Hub Dashboard</h2>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Securely publish found institutional items, student cards, or electronics directly to the Bdozawa network.</p>

            {success && (
                <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#34d399', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiCheckCircle /> {success}
                </div>
            )}

            <form onSubmit={handleBulkSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#cbd5e1' }}>Batch Title / Item Summary</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="e.g., Batch of 10 Student IDs Found at Library" 
                        required 
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#020617', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#cbd5e1' }}>Category</label>
                        <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#020617', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box' }}
                        >
                            <option value="Documents">Documents & IDs</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Wallets & Cards">Wallets & Cards</option>
                            <option value="Keys">Keys</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#cbd5e1' }}>Recovery Location</label>
                        <input 
                            type="text" 
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)} 
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#020617', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box' }}
                        />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '6px', color: '#cbd5e1' }}>Detailed Description</label>
                    <textarea 
                        rows={3}
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="List student names or specific identifier numbers if applicable..." 
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: '#020617', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box', resize: 'vertical' }}
                    />
                </div>

                <button 
                    type="submit" 
                    style={{ width: '100%', padding: '14px', backgroundColor: '#fbbf24', color: '#0f172a', fontWeight: 'bold', fontSize: '16px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px' }}
                >
                    <FiUploadCloud size={18} /> Publish Verified Batch to Network
                </button>
            </form>
        </div>
    );
}