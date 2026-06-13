import { useState } from 'react';
import { Sparkles, Shirt, PlusCircle, History, User, ShoppingBag } from 'lucide-react';
import { getClosetItems, saveClosetItems, getOOTDHistory, saveOOTDHistory, getUserProfile, saveUserProfile, getAvatarCustomization, saveAvatarCustomization, getLoginState, saveLoginState } from './utils/storage';

// Import Views
import Dashboard from './components/Dashboard';
import Closet from './components/Closet';
import AddItem from './components/AddItem';
import OOTDHistory from './components/OOTDHistory';
import Profile from './components/Profile';
import Shop from './components/Shop';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [items, setItems] = useState(() => getClosetItems());
  const [history, setHistory] = useState(() => getOOTDHistory());
  const [profile, setProfile] = useState(() => getUserProfile());
  const [customization, setCustomization] = useState(() => getAvatarCustomization());

  // Custom AI States
  const [loginState, setLoginState] = useState(() => getLoginState());

  // Login Form Variables
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleUpdateProfile = (newProfile) => {
    setProfile(newProfile);
    saveUserProfile(newProfile);
  };

  const handleUpdateCustomization = (newCustomization) => {
    setCustomization(newCustomization);
    saveAvatarCustomization(newCustomization);
  };

  const handleUpdateLoginState = (newLoginState) => {
    setLoginState(newLoginState);
    saveLoginState(newLoginState);
  };



  const handleSimulatedLogin = (e) => {
    e.preventDefault();
    if (!emailInput) return alert("Please enter your email");
    setIsLoggingIn(true);
    setTimeout(() => {
      handleUpdateLoginState({ isLoggedIn: true, email: emailInput });
      setIsLoggingIn(false);
    }, 1200);
  };

  const handleGoogleLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      handleUpdateLoginState({ isLoggedIn: true, email: 'google.user@gmail.com' });
      setIsLoggingIn(false);
    }, 1500);
  };

  // Handle adding a new item
  const handleAddItem = (newItem) => {
    const updated = [newItem, ...items];
    setItems(updated);
    saveClosetItems(updated);
    setActiveTab('closet'); // Go straight to closet view to see it!
  };

  // Handle deleting an item
  const handleDeleteItem = (id) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    saveClosetItems(updated);
  };

  // Handle saving an Outfit of the Day log
  const handleSaveOOTD = (newLog) => {
    const updated = [newLog, ...history];
    setHistory(updated);
    saveOOTDHistory(updated);
  };

  // Render the currently selected tab view
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            items={items} 
            onSaveOOTD={handleSaveOOTD} 
            onNavigate={setActiveTab} 
            profile={profile}
            customization={customization}
            onUpdateCustomization={handleUpdateCustomization}
          />
        );
      case 'closet':
        return (
          <Closet 
            items={items} 
            onDeleteItem={handleDeleteItem} 
            onNavigate={setActiveTab} 
          />
        );
      case 'add':
        return (
          <AddItem 
            onAddItem={handleAddItem} 
          />
        );
      case 'history':
        return (
          <OOTDHistory 
            history={history} 
          />
        );
      case 'profile':
        return (
          <Profile 
            profile={profile} 
            onUpdateProfile={handleUpdateProfile} 
            loginState={loginState}
            onUpdateLoginState={handleUpdateLoginState}
          />
        );
      case 'shop':
        return (
          <Shop 
            onAddItem={handleAddItem} 
            profile={profile} 
            onNavigate={setActiveTab} 
            customization={customization}
          />
        );
      default:
        return (
          <Dashboard 
            items={items} 
            onSaveOOTD={handleSaveOOTD} 
            onNavigate={setActiveTab} 
            profile={profile} 
            customization={customization} 
            onUpdateCustomization={handleUpdateCustomization}
          />
        );
    }
  };

  if (!loginState.isLoggedIn) {
    return (
      <div className="login-page-container">
        <div className="login-card glass-card">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div className="login-logo-circle" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto', boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)' }}>
              <Sparkles size={28} color="white" />
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '6px' }}>What To Wear</h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>AI Wardrobe Planner & Avatar Generator</p>
          </div>

          {isLoggingIn ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div className="dot-pulse-loader" style={{ margin: '0 auto 16px auto', width: '12px', height: '12px' }} />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Securing connection and loading wardrobe...</p>
            </div>
          ) : (
            <form onSubmit={handleSimulatedLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label className="form-label" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Email Address</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="name@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                  style={{ width: '100%' }}
                />
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label className="form-label" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '12px', borderRadius: '10px', fontSize: '0.85rem', width: '100%', cursor: 'pointer' }}>
                Sign In
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px 0', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                <span style={{ padding: '0 8px' }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              </div>

              <button 
                type="button" 
                className="btn-secondary" 
                onClick={handleGoogleLogin}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '10px', 
                  padding: '12px', 
                  borderRadius: '10px', 
                  fontSize: '0.85rem',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  width: '100%',
                  color: 'var(--text-primary)'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SVG Linear Gradient definitions for premium glowing icons */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <linearGradient id="accent-gradient-svg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </svg>

      {/* Main App Container */}
      <header className="app-header">
        <h1 className="app-title">What To Wear</h1>
        <span 
          style={{ 
            fontSize: '0.75rem', 
            background: 'rgba(255, 255, 255, 0.07)', 
            padding: '4px 8px', 
            borderRadius: '99px',
            color: 'var(--text-secondary)',
            fontWeight: 500
          }}
        >
          {items.length} Items
        </span>
      </header>

      <main className="app-content">
        {renderContent()}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="app-nav">
        <button 
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <Sparkles />
          <span>Suggest</span>
        </button>

        <button 
          className={`nav-item ${activeTab === 'closet' ? 'active' : ''}`}
          onClick={() => setActiveTab('closet')}
        >
          <Shirt />
          <span>Closet</span>
        </button>

        <button 
          className={`nav-item ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          <PlusCircle />
          <span>Add</span>
        </button>

        <button 
          className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <History />
          <span>History</span>
        </button>

        <button 
          className={`nav-item ${activeTab === 'shop' ? 'active' : ''}`}
          onClick={() => setActiveTab('shop')}
        >
          <ShoppingBag />
          <span>Shop</span>
        </button>

        <button 
          className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <User />
          <span>Profile</span>
        </button>
      </nav>
    </>
  );
}
