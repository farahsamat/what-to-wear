import React, { useState, useRef } from 'react';
import { Camera, Upload, Check } from 'lucide-react';

const PRESET_COLORS = [
  { name: 'White', hex: '#ffffff' },
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'Navy', hex: '#000080' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Beige', hex: '#f5f5dc' },
  { name: 'Brown', hex: '#5c4033' },
  { name: 'Blue Denim', hex: '#2a52be' },
  { name: 'Olive', hex: '#556b2f' },
  { name: 'Red', hex: '#ef4444' },
  { name: 'Yellow', hex: '#fbbf24' }
];

const STOCK_TEMPLATES = [
  { name: 'Basic Top', url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600' },
  { name: 'Comfy Bottom', url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600' },
  { name: 'Cozy Jacket', url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=600' },
  { name: 'Clean Shoes', url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600' }
];

export default function AddItem({ onAddItem }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('tops');
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [season, setSeason] = useState('all');
  const [occasion, setOccasion] = useState('casual');
  const [image, setImage] = useState('');
  
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Base64 encoding to store in local storage
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetSelect = (url) => {
    setImage(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Please enter an item name');
    if (!image) return alert('Please upload or select an image');

    onAddItem({
      id: `item-${Date.now()}`,
      name: name.trim(),
      category,
      color: color.hex,
      colorName: color.name,
      season,
      occasion,
      image,
      createdAt: Date.now()
    });

    // Reset Form
    setName('');
    setCategory('tops');
    setColor(PRESET_COLORS[0]);
    setSeason('all');
    setOccasion('casual');
    setImage('');
    alert('Item added successfully to closet!');
  };

  return (
    <form className="add-item-view" onSubmit={handleSubmit}>
      <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', fontFamily: 'var(--font-header)' }}>
        Add New Item
      </h2>

      {/* Image Preview & Upload Container */}
      <div 
        className="glass-card" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '180px',
          borderStyle: image ? 'solid' : 'dashed',
          borderColor: image ? 'var(--border-color)' : 'var(--accent-primary)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        {image ? (
          <>
            <img 
              src={image} 
              alt="Preview" 
              style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
            />
            <div 
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                background: 'rgba(9, 9, 11, 0.7)',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Camera size={12} /> Tap to change
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            <Upload size={32} style={{ marginBottom: '8px', color: 'var(--accent-primary)' }} />
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Upload Image</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Supports camera snap or photo files
            </div>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          style={{ display: 'none' }} 
        />
      </div>

      {/* Quick preset stock selector */}
      {!image && (
        <div style={{ marginBottom: '20px' }}>
          <div className="form-label" style={{ marginBottom: '8px' }}>Or use a quick template:</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {STOCK_TEMPLATES.map((tmpl, idx) => (
              <button
                key={idx}
                type="button"
                className="btn-secondary"
                style={{ padding: '6px 10px', fontSize: '0.7rem', flex: 1, borderRadius: '8px' }}
                onClick={() => handlePresetSelect(tmpl.url)}
              >
                {tmpl.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Item Details Form */}
      <div className="glass-card" style={{ marginTop: '16px' }}>
        <div className="form-group">
          <label className="form-label">Item Name</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="e.g. Vintage Denim Jacket" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select 
            className="form-input" 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="tops">Top</option>
            <option value="bottoms">Bottom</option>
            <option value="outerwear">Outerwear</option>
            <option value="shoes">Shoes</option>
            <option value="accessories">Accessory</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Color: {color.name}</label>
          <div className="color-swatch-grid">
            {PRESET_COLORS.map((c) => (
              <button
                key={c.name}
                type="button"
                className={`color-swatch ${color.name === c.name ? 'active' : ''}`}
                style={{ backgroundColor: c.hex }}
                onClick={() => setColor(c)}
                title={c.name}
              />
            ))}
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '8px' }}>
          <label className="form-label">Seasonality</label>
          <select 
            className="form-input" 
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          >
            <option value="all">All Seasons</option>
            <option value="summer">Warm Weather (Summer)</option>
            <option value="winter">Cold Weather (Winter)</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Occasion</label>
          <select 
            className="form-input" 
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          >
            <option value="casual">Casual</option>
            <option value="smart-casual">Smart Casual</option>
            <option value="formal">Formal</option>
          </select>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
          <Check size={16} /> Add to Closet
        </button>
      </div>
    </form>
  );
}
