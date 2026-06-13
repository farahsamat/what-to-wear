import React from 'react';
import { User, Check, Sparkles, Scale, Ruler, Lock, LogOut } from 'lucide-react';

const STYLE_OPTIONS = [
  { id: 'casual', label: 'Casual & Relaxed' },
  { id: 'minimalist', label: 'Sleek & Minimalist' },
  { id: 'streetwear', label: 'Streetwear' },
  { id: 'formal', label: 'Elegant & Formal' },
  { id: 'vintage', label: 'Vintage Retro' },
  { id: 'bohemian', label: 'Bohemian / Artsy' }
];

const BUILD_OPTIONS = [
  { id: 'slender', label: 'Slender' },
  { id: 'average', label: 'Average' },
  { id: 'athletic', label: 'Athletic' },
  { id: 'curvy', label: 'Curvy' },
  { id: 'broad', label: 'Broad' }
];

const calculateAge = (dobString) => {
  if (!dobString) return null;
  const dob = new Date(dobString);
  const diffMs = Date.now() - dob.getTime();
  const ageDt = new Date(diffMs);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
};

export default function Profile({ 
  profile, 
  onUpdateProfile, 
  loginState, 
  onUpdateLoginState 
}) {
  const handleInputChange = (field, value) => {
    onUpdateProfile({
      ...profile,
      [field]: value
    });
  };

  const handleStyleToggle = (styleId) => {
    const currentList = profile.stylePreferences || [];
    let updatedList;
    if (currentList.includes(styleId)) {
      updatedList = currentList.filter(id => id !== styleId);
    } else {
      updatedList = [...currentList, styleId];
    }
    handleInputChange('stylePreferences', updatedList);
  };

  return (
    <div className="profile-view">
      <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', fontFamily: 'var(--font-header)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <User size={20} color="var(--accent-primary)" /> Personal Profile
      </h2>

      {/* Dynamic Summary Card */}
      <div className="glass-card profile-summary-card" style={{
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.05) 100%)',
        border: '1px solid rgba(168, 85, 247, 0.25)',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <Sparkles size={18} color="var(--accent-secondary)" />
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Your Styling Profile</h3>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
          Your body attributes will shape the virtual 3D stylist mannequin. Your selected styles will highlight matching clothing recommendations.
        </p>
      </div>

      {/* Body Attributes Section */}
      <div className="glass-card">
        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
          Body Coordinates
        </h3>

        {/* Height Slider */}
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Ruler size={14} /> Height
            </label>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
              {profile.height} cm
            </span>
          </div>
          <input 
            type="range" 
            min="140" 
            max="210" 
            value={profile.height}
            className="slider-input"
            onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
          />
        </div>

        {/* Weight Slider */}
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Scale size={14} /> Weight
            </label>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>
              {profile.weight} kg
            </span>
          </div>
          <input 
            type="range" 
            min="40" 
            max="130" 
            value={profile.weight}
            className="slider-input"
            onChange={(e) => handleInputChange('weight', parseInt(e.target.value))}
          />
        </div>

        {/* Gender Selection */}
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label className="form-label" style={{ marginBottom: '10px' }}>Gender Proportions</label>
          <div className="build-selection-grid">
            {[
              { id: 'female', label: 'Feminine' },
              { id: 'male', label: 'Masculine' },
              { id: 'non-binary', label: 'Neutral' }
            ].map(opt => (
              <button
                key={opt.id}
                type="button"
                className={`build-btn ${profile.gender === opt.id ? 'active' : ''}`}
                onClick={() => handleInputChange('gender', opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Birthday Input */}
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label className="form-label">Birthday</label>
            {profile.birthday && (
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
                Age: {calculateAge(profile.birthday)}
              </span>
            )}
          </div>
          <input 
            type="date" 
            className="form-input" 
            value={profile.birthday || ''}
            onChange={(e) => handleInputChange('birthday', e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        {/* Build / Frame Group */}
        <div className="form-group">
          <label className="form-label" style={{ marginBottom: '10px' }}>Body Frame</label>
          <div className="build-selection-grid">
            {BUILD_OPTIONS.map(opt => (
              <button
                key={opt.id}
                type="button"
                className={`build-btn ${profile.build === opt.id ? 'active' : ''}`}
                onClick={() => handleInputChange('build', opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Style Preferences Section */}
      <div className="glass-card">
        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
          Aesthetic Preferences
        </h3>

        <div className="preference-list">
          {STYLE_OPTIONS.map(style => {
            const isSelected = (profile.stylePreferences || []).includes(style.id);
            return (
              <button
                key={style.id}
                type="button"
                className={`preference-pill-btn ${isSelected ? 'active' : ''}`}
                onClick={() => handleStyleToggle(style.id)}
              >
                <span>{style.label}</span>
                {isSelected && <Check size={14} style={{ marginLeft: 'auto', color: 'white' }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Account Session Card */}
      <div className="glass-card" style={{ marginTop: '24px', border: '1px solid rgba(239, 68, 68, 0.25)', background: 'linear-gradient(135deg, rgba(9, 9, 11, 0.6) 0%, rgba(239, 68, 68, 0.02) 100%)' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-header)' }}>
          <Lock size={18} color="#ef4444" /> Account Session
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Logged In As</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{loginState.email}</div>
          </div>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              if (confirm("Are you sure you want to log out?")) {
                onUpdateLoginState({ isLoggedIn: false, email: '' });
              }
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', fontSize: '0.75rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#ef4444', background: 'rgba(239, 68, 68, 0.05)', cursor: 'pointer' }}
          >
            <LogOut size={12} /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
