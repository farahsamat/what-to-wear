import { useState, useEffect } from 'react';
import { Sun, CloudRain, Thermometer, Shuffle, Check, Plus, RefreshCw, Sliders, MapPin, Loader2, Cloud, Sparkles } from 'lucide-react';
import Avatar from './Avatar';
// Customization state elevated to App.jsx

export default function Dashboard({ 
  items, 
  onSaveOOTD, 
  onNavigate, 
  profile, 
  customization, 
  onUpdateCustomization
}) {
  const [weatherType, setWeatherType] = useState('summer');
  const [currentOutfit, setCurrentOutfit] = useState(null);
  const [showCustomizer, setShowCustomizer] = useState(false);

  // Weather detection states
  const [locationName, setLocationName] = useState('Detecting Location...');
  const [realTemp, setRealTemp] = useState(null);
  const [weatherDesc, setWeatherDesc] = useState('Weather Service');
  const [loadingWeather, setLoadingWeather] = useState(false);

  // AI Assistant Options
  const [eventInput, setEventInput] = useState('');
  const [dateInput, setDateInput] = useState(() => new Date().toISOString().split('T')[0]);
  const [overrideMode, setOverrideMode] = useState('ai'); // 'ai' or 'manual'
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('tops');

  const handleCustomizationChange = (key, value) => {
    const updated = { ...customization, [key]: value };
    onUpdateCustomization(updated);
  };

  const isStyleMatch = () => {
    if (!currentOutfit || currentOutfit.error || !profile || !profile.stylePreferences || profile.stylePreferences.length === 0) return false;
    
    const outfitItems = [
      currentOutfit.top,
      currentOutfit.bottom,
      currentOutfit.outerwear,
      currentOutfit.shoe,
      currentOutfit.accessory
    ].filter(Boolean);

    let matchCount = 0;
    
    profile.stylePreferences.forEach(pref => {
      outfitItems.forEach(item => {
        const name = item.name.toLowerCase();
        const occasion = item.occasion;
        const color = item.colorName?.toLowerCase() || '';
        
        if (pref === 'casual' && (occasion === 'casual' || name.includes('jeans') || name.includes('sneakers') || name.includes('sweater') || name.includes('shacket') || name.includes('vest'))) {
          matchCount++;
        }
        if (pref === 'minimalist' && (color.includes('white') || color.includes('black') || color.includes('gray') || color.includes('camel') || name.includes('minimalist') || name.includes('sleek') || name.includes('basic') || name.includes('classic'))) {
          matchCount++;
        }
        if (pref === 'streetwear' && (name.includes('jeans') || name.includes('sneakers') || name.includes('leather') || name.includes('crop') || name.includes('puffer') || name.includes('shacket') || name.includes('platform'))) {
          matchCount++;
        }
        if (pref === 'formal' && (occasion === 'formal' || occasion === 'smart-casual' || name.includes('blazer') || name.includes('trousers') || name.includes('blouse') || name.includes('loafers') || name.includes('skirt') || name.includes('chain') || name.includes('trench'))) {
          matchCount++;
        }
        if (pref === 'vintage' && (name.includes('vintage') || name.includes('breton') || name.includes('trench') || name.includes('loafers') || name.includes('saddle') || name.includes('leather') || name.includes('corduroy'))) {
          matchCount++;
        }
        if (pref === 'bohemian' && (name.includes('linen') || name.includes('straw') || name.includes('sandals') || name.includes('sage') || name.includes('knit') || name.includes('scarf'))) {
          matchCount++;
        }
      });
    });

    return matchCount >= 2;
  };

  const detectWeather = () => {
    if (!navigator.geolocation) {
      setLocationName('Unsupported Browser');
      setWeatherDesc('Manual Mode Only');
      return;
    }

    setLoadingWeather(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // 1. Fetch live weather from Open-Meteo
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
          );
          const weatherData = await weatherRes.json();
          const current = weatherData.current;
          const temp = current.temperature_2m;
          const code = current.weather_code;

          setRealTemp(temp);
          
          if (temp >= 18) {
            setWeatherType('summer');
          } else {
            setWeatherType('winter');
          }

          let desc = 'Clear Sky';
          if (code === 0) desc = 'Clear Sky';
          else if (code >= 1 && code <= 3) desc = 'Partly Cloudy';
          else if (code === 45 || code === 48) desc = 'Foggy';
          else if (code >= 51 && code <= 67) desc = 'Rainy';
          else if (code >= 71 && code <= 77) desc = 'Snowy';
          else if (code >= 80 && code <= 82) desc = 'Rain Showers';
          else if (code >= 95) desc = 'Thunderstorm';
          setWeatherDesc(desc);

          // 2. Reverse Geocode using OpenStreetMap Nominatim
          try {
            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
              {
                headers: {
                  'User-Agent': 'WhatToWearApp/1.0'
                }
              }
            );
            const geoData = await geoRes.json();
            const city = geoData.address.city || 
                         geoData.address.town || 
                         geoData.address.suburb || 
                         geoData.address.village || 
                         'My Location';
            setLocationName(city);
          } catch (geoErr) {
            console.error("Reverse geocoding failed:", geoErr);
            setLocationName('My Location');
          }

        } catch (err) {
          console.error("Weather fetch failed:", err);
          setLocationName('Fetch Failed');
          setWeatherDesc('Offline Mode');
        } finally {
          setLoadingWeather(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setLoadingWeather(false);
        setLocationName('Access Denied');
        setWeatherDesc('Manual Mode');
      },
      { timeout: 8000 }
    );
  };

  const handleManualToggle = () => {
    if (weatherType === 'summer') {
      setWeatherType('winter');
      setRealTemp(12);
      setWeatherDesc('Chilly & Overcast');
      setLocationName('Manual Mode');
    } else {
      setWeatherType('summer');
      setRealTemp(24);
      setWeatherDesc('Warm & Sunny');
      setLocationName('Manual Mode');
    }
  };

  useEffect(() => {
    detectWeather();
  }, []);

  const filterByWeather = (itemList) => {
    return itemList.filter(item => item.season === 'all' || item.season === weatherType);
  };

  const getOccasionPriority = (eventText) => {
    if (!eventText) return null;
    const txt = eventText.toLowerCase();
    if (txt.includes('formal') || txt.includes('dinner') || txt.includes('wedding') || txt.includes('gala') || txt.includes('business') || txt.includes('meeting') || txt.includes('interview') || txt.includes('date') || txt.includes('cocktail')) {
      return ['formal', 'smart-casual'];
    }
    if (txt.includes('sport') || txt.includes('gym') || txt.includes('run') || txt.includes('hike') || txt.includes('workout') || txt.includes('active') || txt.includes('training')) {
      return ['casual'];
    }
    if (txt.includes('casual') || txt.includes('party') || txt.includes('hangout') || txt.includes('club') || txt.includes('shopping') || txt.includes('brunch') || txt.includes('weekend')) {
      return ['casual', 'smart-casual'];
    }
    return null;
  };

  const scoreItem = (item, occasionPriority) => {
    let score = 0;
    if (occasionPriority && occasionPriority.includes(item.occasion)) {
      score += 10;
    }
    if (profile.stylePreferences && profile.stylePreferences.includes(item.occasion)) {
      score += 5;
    }
    if (item.season === weatherType) {
      score += 2;
    }
    return score;
  };

  const selectBestItem = (list, occasionPriority) => {
    if (list.length === 0) return null;
    const scored = list.map(item => ({
      item,
      score: scoreItem(item, occasionPriority)
    }));
    scored.sort((a, b) => b.score - a.score);
    const maxScore = scored[0].score;
    const candidates = scored.filter(s => s.score >= maxScore - 2).map(s => s.item);
    return candidates[Math.floor(Math.random() * candidates.length)];
  };

  // Generate a complete random outfit
  const generateOutfit = () => {
    if (!items || items.length === 0) {
      setCurrentOutfit(null);
      return;
    }

    const tops = filterByWeather(items.filter(i => i.category === 'tops'));
    const bottoms = filterByWeather(items.filter(i => i.category === 'bottoms'));
    const outerwearList = filterByWeather(items.filter(i => i.category === 'outerwear'));
    const shoes = filterByWeather(items.filter(i => i.category === 'shoes'));
    const accessories = filterByWeather(items.filter(i => i.category === 'accessories'));

    if (tops.length === 0 || bottoms.length === 0 || shoes.length === 0) {
      setCurrentOutfit({ error: 'Missing essentials' });
      return;
    }

    const priority = getOccasionPriority(eventInput);

    const selectedTop = selectBestItem(tops, priority);
    const selectedBottom = selectBestItem(bottoms, priority);
    const selectedShoe = selectBestItem(shoes, priority);
    
    let selectedOuterwear = null;
    const weatherTopsOuterwear = filterByWeather(outerwearList);
    if (weatherTopsOuterwear.length > 0) {
      if (weatherType === 'winter' || Math.random() > 0.6 || (priority && priority.includes('formal'))) {
        selectedOuterwear = selectBestItem(weatherTopsOuterwear, priority);
      }
    }

    let selectedAccessory = null;
    if (accessories.length > 0 && (Math.random() > 0.3 || (priority && priority.includes('formal')))) {
      selectedAccessory = selectBestItem(accessories, priority);
    }

    setCurrentOutfit({
      top: selectedTop,
      bottom: selectedBottom,
      outerwear: selectedOuterwear,
      shoe: selectedShoe,
      accessory: selectedAccessory,
      id: `outfit-${Date.now()}`
    });
  };

  // Shuffle a single clothing slot individually!
  const shuffleSlot = (category) => {
    if (!currentOutfit || currentOutfit.error) return;

    const filtered = filterByWeather(items.filter(i => i.category === category));
    if (filtered.length <= 1) return;

    const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    let currentId = currentOutfit[category]?.id;
    let pool = filtered.filter(i => i.id !== currentId);
    let chosen = pool.length > 0 ? randomChoice(pool) : randomChoice(filtered);

    setCurrentOutfit(prev => ({
      ...prev,
      [category]: chosen
    }));
  };

  useEffect(() => {
    if (overrideMode === 'ai') {
      generateOutfit();
    }
  }, [items, weatherType, eventInput, overrideMode]);



  const handleLike = () => {
    if (currentOutfit && !currentOutfit.error) {
      onSaveOOTD({
        date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        season: weatherType,
        items: [
          currentOutfit.top,
          currentOutfit.bottom,
          currentOutfit.outerwear,
          currentOutfit.shoe,
          currentOutfit.accessory
        ].filter(Boolean)
      });
      generateOutfit();
    }
  };

  const handleDislike = () => {
    generateOutfit();
  };

  return (
    <div className="dashboard-view">
      {/* Weather Widget */}
      <div className="glass-card weather-widget">
        <div className="weather-info">
          {loadingWeather ? (
            <Loader2 className="weather-icon spin" size={32} color="#a855f7" />
          ) : weatherDesc.includes('Rain') || weatherDesc.includes('Drizzle') || weatherDesc.includes('Showers') ? (
            <CloudRain className="weather-icon" size={32} color="#60a5fa" />
          ) : weatherDesc.includes('Clear') || weatherDesc.includes('Warm') ? (
            <Sun className="weather-icon" size={32} color="#fbbf24" />
          ) : (
            <Cloud className="weather-icon" size={32} color="#9ca3af" />
          )}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '2px' }}>
              <MapPin size={10} style={{ color: 'var(--accent-secondary)' }} />
              <span>{locationName}</span>
            </div>
            <div className="weather-temp">
              {realTemp !== null ? `${Math.round(realTemp)}°C` : weatherType === 'summer' ? '24°C' : '12°C'}
            </div>
            <div className="weather-desc">{weatherDesc}</div>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={detectWeather}
            disabled={loadingWeather}
            style={{ padding: '6px 10px', fontSize: '0.7rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
          >
            {loadingWeather ? (
              <Loader2 size={12} className="spin" />
            ) : (
              <RefreshCw size={12} />
            )}
            Locate
          </button>
          
          <button
            type="button"
            className="btn-secondary"
            onClick={handleManualToggle}
            style={{ padding: '6px 10px', fontSize: '0.7rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
          >
            <Thermometer size={12} /> Toggle
          </button>
        </div>
      </div>

      {/* AI Assistant Options Card */}
      <div className="glass-card ai-assistant-panel" style={{ marginTop: '16px' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={16} color="var(--accent-primary)" /> Smart Styling Assistant
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label className="form-label" style={{ fontSize: '0.7rem' }}>Date</label>
            <input 
              type="date" 
              className="form-input" 
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              style={{ fontSize: '0.75rem', padding: '8px' }}
            />
          </div>
          
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label className="form-label" style={{ fontSize: '0.7rem' }}>Event / Purpose</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Job Interview, Beach party" 
              value={eventInput}
              onChange={(e) => setEventInput(e.target.value)}
              style={{ fontSize: '0.75rem', padding: '8px' }}
            />
          </div>
        </div>

        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label className="form-label" style={{ fontSize: '0.7rem' }}>Styling Mode</label>
          <div style={{ display: 'flex', background: 'rgba(9, 9, 11, 0.6)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '3px' }}>
            <button
              type="button"
              onClick={() => setOverrideMode('ai')}
              style={{
                flex: 1,
                border: 'none',
                background: overrideMode === 'ai' ? 'var(--accent-gradient)' : 'transparent',
                color: overrideMode === 'ai' ? 'white' : 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '6px 0',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              AI Suggest
            </button>
            <button
              type="button"
              onClick={() => setOverrideMode('manual')}
              style={{
                flex: 1,
                border: 'none',
                background: overrideMode === 'manual' ? 'var(--accent-gradient)' : 'transparent',
                color: overrideMode === 'manual' ? 'white' : 'var(--text-secondary)',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '6px 0',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Let Me Pick
            </button>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.2rem', marginTop: '20px', marginBottom: '12px', fontFamily: 'var(--font-header)' }}>
        Today's Suggestion
      </h2>

      {/* Outfit Suggestion Frame */}
      <div className="deck-container">
        {!currentOutfit ? (
          <div className="empty-state">
            <p>No clothing items found in your closet.</p>
            <button 
              type="button"
              className="btn-primary" 
              onClick={() => onNavigate('add')}
              style={{ marginTop: '16px' }}
            >
              <Plus size={16} /> Add Clothing
            </button>
          </div>
        ) : currentOutfit.error ? (
          <div className="empty-state">
            <p style={{ marginBottom: '12px' }}>
              Add at least one <strong>Top</strong>, one <strong>Bottom</strong>, and one pair of <strong>Shoes</strong> matching the weather to unlock recommendations!
            </p>
            <button 
              type="button"
              className="btn-primary" 
              onClick={() => onNavigate('add')}
            >
              <Plus size={16} /> Add Clothing
            </button>
          </div>
        ) : (
          <div className="outfit-deck-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.3px' }}>
                    {weatherType === 'summer' ? 'Summer Casual' : 'Cozy Layers'}
                  </h3>
                  {isStyleMatch() && (
                    <span className="style-match-badge" title="Aligned with your profile preferred styles!">
                      Style Match
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Tap slots to shuffle, tap avatar to edit
                </p>
              </div>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                onClick={() => setShowCustomizer(true)}
              >
                <Sliders size={12} /> Customize
              </button>
            </div>

            {/* Premium Avatar Stylist Board */}
            <div className="stylist-board">
              
              {/* Left Column (Accessories / Tops) */}
              <div className="stylist-column">
                {/* Accessory Slot (Sunglasses/Bag) */}
                <div 
                  className={`slot-card ${currentOutfit.accessory ? 'has-item' : 'empty'}`}
                  onClick={() => shuffleSlot('accessory')}
                  title="Shuffle Accessory"
                >
                  {currentOutfit.accessory ? (
                    <>
                      <img src={currentOutfit.accessory.image} alt="Accessory" />
                      <div className="slot-label">Bag / Sunnies</div>
                      <div className="slot-refresh"><RefreshCw size={10} /></div>
                    </>
                  ) : (
                    <div className="slot-placeholder">No Acc.</div>
                  )}
                </div>

                {/* Top Slot */}
                <div 
                  className="slot-card has-item"
                  onClick={() => shuffleSlot('top')}
                  title="Shuffle Top"
                >
                  <img src={currentOutfit.top.image} alt="Top" />
                  <div className="slot-label">Top</div>
                  <div className="slot-refresh"><RefreshCw size={10} /></div>
                </div>
              </div>

              {/* Center Silhouette Mannequin column */}
              <div 
                className="avatar-mannequin-container" 
                onClick={() => setShowCustomizer(true)}
                title="Customize avatar"
                style={{ cursor: 'pointer' }}
              >
                <Avatar outfit={currentOutfit} customization={customization} profile={profile} />

                {/* Absolute overlay indicators linking slots to body parts */}
                <div className="connector-dot head" />
                <div className="connector-dot torso" />
                <div className="connector-dot outerwear" />
                <div className="connector-dot legs" />
                <div className="connector-dot feet" />
              </div>

              {/* Right Column (Outerwear / Bottoms / Shoes) */}
              <div className="stylist-column">
                {/* Outerwear Slot (Optional) */}
                <div 
                  className={`slot-card ${currentOutfit.outerwear ? 'has-item' : 'empty'}`}
                  onClick={() => shuffleSlot('outerwear')}
                  title="Shuffle Jacket"
                >
                  {currentOutfit.outerwear ? (
                    <>
                      <img src={currentOutfit.outerwear.image} alt="Outerwear" />
                      <div className="slot-label">Coat / Jacket</div>
                      <div className="slot-refresh"><RefreshCw size={10} /></div>
                    </>
                  ) : (
                    <div className="slot-placeholder">No Coat</div>
                  )}
                </div>

                {/* Bottom Slot */}
                <div 
                  className="slot-card has-item"
                  onClick={() => shuffleSlot('bottom')}
                  title="Shuffle Bottom"
                >
                  <img src={currentOutfit.bottom.image} alt="Bottom" />
                  <div className="slot-label">Bottom</div>
                  <div className="slot-refresh"><RefreshCw size={10} /></div>
                </div>

                {/* Shoes Slot */}
                <div 
                  className="slot-card has-item"
                  onClick={() => shuffleSlot('shoe')}
                  title="Shuffle Shoes"
                >
                  <img src={currentOutfit.shoe.image} alt="Shoes" />
                  <div className="slot-label">Shoes</div>
                  <div className="slot-refresh"><RefreshCw size={10} /></div>
                </div>
              </div>

            </div>

            {/* Bottom Actions inside Card */}
            <div className="action-buttons" style={{ marginTop: '24px' }}>
              <button 
                type="button"
                className="action-btn dislike" 
                onClick={handleDislike}
                title="Shuffle All"
              >
                <Shuffle size={20} />
              </button>
              <button 
                type="button"
                className="action-btn like" 
                onClick={handleLike}
                title="Save Style"
              >
                <Check size={20} />
              </button>
            </div>

            {/* Customizer Drawer Overlay inside the card */}
            {showCustomizer && (
              <div className="customizer-drawer">
                <div className="customizer-header">
                  <h4>Style Model</h4>
                  <button 
                    type="button" 
                    className="done-btn"
                    onClick={() => setShowCustomizer(false)}
                  >
                    Done
                  </button>
                </div>
                <div className="customizer-body">
                  {/* Skin Tone */}
                  <div className="customizer-section">
                    <span className="section-title">Skin Tone</span>
                    <div className="option-row">
                      {['fair', 'honey', 'olive', 'espresso'].map(tone => (
                        <button
                          key={tone}
                          type="button"
                          className={`tone-swatch tone-${tone} ${customization.skinTone === tone ? 'active' : ''}`}
                          onClick={() => handleCustomizationChange('skinTone', tone)}
                          title={tone}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Hair Style */}
                  <div className="customizer-section">
                    <span className="section-title">Hair Style</span>
                    <div className="option-row text-options">
                      {['bald', 'short', 'long', 'curly', 'ponytail'].map(style => (
                        <button
                          key={style}
                          type="button"
                          className={`text-swatch ${customization.hairStyle === style ? 'active' : ''}`}
                          onClick={() => handleCustomizationChange('hairStyle', style)}
                        >
                          {style.charAt(0).toUpperCase() + style.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hair Color */}
                  {customization.hairStyle !== 'bald' && (
                    <div className="customizer-section">
                      <span className="section-title">Hair Color</span>
                      <div className="option-row">
                        {['black', 'dark-brown', 'blonde', 'ginger', 'silver-gray'].map(color => (
                          <button
                            key={color}
                            type="button"
                            className={`color-swatch-hair hair-${color} ${customization.hairColor === color ? 'active' : ''}`}
                            onClick={() => handleCustomizationChange('hairColor', color)}
                            title={color.replace('-', ' ')}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Let Me Pick Item Selector Shelf */}
      {overrideMode === 'manual' && currentOutfit && !currentOutfit.error && (
        <div className="glass-card item-shelf-panel" style={{ marginTop: '16px', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', color: 'var(--text-secondary)' }}>
            Manual Outfit Coordinator
          </h3>
          <div className="shelf-tabs" style={{ display: 'flex', gap: '6px', marginBottom: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
            {['tops', 'bottoms', 'outerwear', 'shoes', 'accessories'].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategoryTab(cat)}
                style={{
                  background: selectedCategoryTab === cat ? 'rgba(236, 72, 153, 0.15)' : 'rgba(255,255,255,0.03)',
                  border: selectedCategoryTab === cat ? '1px solid var(--accent-secondary)' : '1px solid var(--border-color)',
                  color: selectedCategoryTab === cat ? 'white' : 'var(--text-secondary)',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="shelf-items-list" style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '4px 0' }}>
            {items.filter(i => i.category === selectedCategoryTab).length === 0 ? (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '10px 0' }}>
                No closet items in this category.
              </div>
            ) : (
              items.filter(i => i.category === selectedCategoryTab).map(item => {
                const isCurrent = currentOutfit[selectedCategoryTab === 'shoes' ? 'shoe' : selectedCategoryTab === 'accessories' ? 'accessory' : selectedCategoryTab]?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      const slotName = selectedCategoryTab === 'shoes' ? 'shoe' : selectedCategoryTab === 'accessories' ? 'accessory' : selectedCategoryTab;
                      setCurrentOutfit(prev => ({
                        ...prev,
                        [slotName]: item
                      }));
                    }}
                    style={{
                      position: 'relative',
                      width: '64px',
                      height: '64px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: isCurrent ? '2px solid var(--accent-secondary)' : '1px solid var(--border-color)',
                      boxShadow: isCurrent ? '0 0 10px rgba(236, 72, 153, 0.3)' : 'none',
                      cursor: 'pointer',
                      flexShrink: 0,
                      background: 'rgba(0,0,0,0.2)'
                    }}
                    title={item.name}
                  >
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {isCurrent && (
                      <div style={{ position: 'absolute', top: 2, right: 2, background: 'var(--accent-secondary)', borderRadius: '50%', width: '12px', height: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={8} color="white" />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

    </div>
  );
}
