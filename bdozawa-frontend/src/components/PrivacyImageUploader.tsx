import { useState, useRef } from 'react';
import { FiEyeOff, FiUpload, FiCheck } from 'react-icons/fi';

interface PrivacyImageUploaderProps {
  onImageProcessed: (base64Image: string) => void;
}

export default function PrivacyImageUploader({ onImageProcessed }: PrivacyImageUploaderProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isBlurred, setIsBlurred] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [originalImageObj, setOriginalImageObj] = useState<HTMLImageElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setOriginalImageObj(img);
          setImagePreview(event.target?.result as string);
          setIsBlurred(false);
          onImageProcessed(event.target?.result as string);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleBlur = () => {
    if (!originalImageObj || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = originalImageObj.width;
    canvas.height = originalImageObj.height;

    if (!isBlurred) {
      // Apply heavy Gaussian-like blur filter for privacy masking
      ctx.filter = 'blur(16px)';
      ctx.drawImage(originalImageObj, 0, 0);
      ctx.filter = 'none'; // reset filter
      
      const blurredDataUrl = canvas.toDataURL('image/png');
      setImagePreview(blurredDataUrl);
      onImageProcessed(blurredDataUrl);
      setIsBlurred(true);
    } else {
      // Revert to original
      ctx.drawImage(originalImageObj, 0, 0);
      const originalDataUrl = canvas.toDataURL('image/png');
      setImagePreview(originalDataUrl);
      onImageProcessed(originalDataUrl);
      setIsBlurred(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#1A1A1A', border: '1px solid #262626', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
        <FiEyeOff color="#FBCD04" size={20} />
        <h3 style={{ color: '#FFFFFF', margin: 0, fontSize: '1rem' }}>Privacy Auto-Blur Protection</h3>
      </div>
      
      <p style={{ color: '#888888', fontSize: '0.85rem', marginBottom: '1rem' }}>
        Protect sensitive data (ID numbers, card details, faces) by applying an instant privacy blur mask before publishing.
      </p>

      {!imagePreview ? (
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', border: '2px dashed #404040', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#121212' }}>
          <FiUpload size={28} color="#FBCD04" style={{ marginBottom: '8px' }} />
          <span style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 'bold' }}>Click to upload item image</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
        </label>
      ) : (
        <div>
          <div style={{ position: 'relative', width: '100%', maxHeight: '250px', overflow: 'hidden', borderRadius: '8px', marginBottom: '1rem', backgroundColor: '#0F0F0F', display: 'flex', justifyContent: 'center' }}>
            <img src={imagePreview} alt="Upload preview" style={{ maxWidth: '100%', height: '200px', objectFit: 'contain' }} />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="button" 
              onClick={toggleBlur} 
              style={{ flex: 1, padding: '10px', borderRadius: '8px', backgroundColor: isBlurred ? '#14532d' : '#262626', color: '#FFFFFF', border: '1px solid #404040', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              {isBlurred ? <FiCheck color="#86efac" /> : <FiEyeOff />} 
              {isBlurred ? 'Privacy Blur Active (Click to Remove)' : 'Apply Privacy Blur Mask'}
            </button>
          </div>
        </div>
      )}

      {/* Hidden Canvas for Image Processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}