import React, { useState } from 'react';
import { ShoppingBag, Eye, Plus, ShoppingCart, RefreshCw, Star, Search, Globe, Trash2, ArrowUpRight } from 'lucide-react';
import Avatar from './Avatar';
import { getCustomShops, saveCustomShops } from '../utils/storage';

const PRESET_RETAILERS = [
  {
    id: 'cotton-on',
    name: 'Cotton On',
    url: 'https://cottonon.com/AU/',
    searchUrl: 'https://cottonon.com/AU/search/?q=',
    color: '#a855f7',
    desc: 'Trendy & affordable casualwear, denim, basics, and activewear.'
  },
  {
    id: 'zara',
    name: 'Zara',
    url: 'https://www.zara.com/au/',
    searchUrl: 'https://www.zara.com/au/en/search?word=',
    color: '#ec4899',
    desc: 'High-fashion, sharp tailoring, and sleek modern aesthetic pieces.'
  },
  {
    id: 'asos',
    name: 'ASOS',
    url: 'https://www.asos.com/',
    searchUrl: 'https://www.asos.com/search/?q=',
    color: '#06b6d4',
    desc: 'Massive fashion directory with hundreds of global brands and styles.'
  },
  {
    id: 'uniqlo',
    name: 'Uniqlo',
    url: 'https://www.uniqlo.com/au/en/',
    searchUrl: 'https://www.uniqlo.com/au/en/search/?q=',
    color: '#ef4444',
    desc: 'High-quality Japanese basics, clean silhouettes, and utility wear.'
  }
];

// Customization state received as prop

const COTTON_ON_CATALOG = [
  {
    id: 'co_top_1',
    name: 'Cotton On Classic Rib Tee',
    category: 'tops',
    price: 19.99,
    color: '#ffffff',
    colorName: 'Pure White',
    season: 'summer',
    occasion: 'casual',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600',
    buyUrl: 'https://cottonon.com/AU/co/women/clothing/tops/'
  },
  {
    id: 'co_top_2',
    name: 'Cotton On Knit Crew Sweater',
    category: 'tops',
    price: 49.99,
    color: '#d2b48c',
    colorName: 'Camel',
    season: 'winter',
    occasion: 'casual',
    image: 'https://images.unsplash.com/photo-1574164904299-3a102b110380?auto=format&fit=crop&q=80&w=600',
    buyUrl: 'https://cottonon.com/AU/co/women/clothing/sweaters-cardigans/'
  },
  {
    id: 'co_bot_1',
    name: 'Cotton On Wide Leg Denim',
    category: 'bottoms',
    price: 59.99,
    color: '#2a52be',
    colorName: 'Blue Denim',
    season: 'all',
    occasion: 'casual',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600',
    buyUrl: 'https://cottonon.com/AU/co/women/clothing/jeans/'
  },
  {
    id: 'co_bot_2',
    name: 'Cotton On Pleated Midi Skirt',
    category: 'bottoms',
    price: 39.99,
    color: '#1a1a1a',
    colorName: 'Charcoal Black',
    season: 'summer',
    occasion: 'smart-casual',
    image: 'https://images.unsplash.com/photo-1583496661160-fb48862c6a7a?auto=format&fit=crop&q=80&w=600',
    buyUrl: 'https://cottonon.com/AU/co/women/clothing/skirts/'
  },
  {
    id: 'co_out_1',
    name: 'Cotton On Utility Shacket',
    category: 'outerwear',
    price: 69.99,
    color: '#556b2f',
    colorName: 'Olive Green',
    season: 'all',
    occasion: 'casual',
    image: 'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&q=80&w=600',
    buyUrl: 'https://cottonon.com/AU/co/women/clothing/jackets/'
  },
  {
    id: 'co_out_2',
    name: 'Cotton On Classic Trench Coat',
    category: 'outerwear',
    price: 99.99,
    color: '#c5b358',
    colorName: 'Beige Khaki',
    season: 'winter',
    occasion: 'smart-casual',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600',
    buyUrl: 'https://cottonon.com/AU/co/women/clothing/jackets/'
  },
  {
    id: 'co_sho_1',
    name: 'Cotton On Retro Platform Sneaker',
    category: 'shoes',
    price: 39.99,
    color: '#ffffff',
    colorName: 'Pure White',
    season: 'all',
    occasion: 'casual',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=600',
    buyUrl: 'https://cottonon.com/AU/co/women/shoes/'
  },
  {
    id: 'co_sho_2',
    name: 'Cotton On Suede Chelsea Boot',
    category: 'shoes',
    price: 59.99,
    color: '#3d2314',
    colorName: 'Dark Brown',
    season: 'winter',
    occasion: 'smart-casual',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=600',
    buyUrl: 'https://cottonon.com/AU/co/women/shoes/'
  }
];

export default function Shop({ onAddItem, profile, onNavigate, customization }) {
  const [shopMode, setShopMode] = useState('fitting-room');
  const [customShops, setCustomShops] = useState(() => getCustomShops());
  const [searchQueries, setSearchQueries] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Custom store modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreUrl, setNewStoreUrl] = useState('');
  const [newStoreSearchUrl, setNewStoreSearchUrl] = useState('');
  const [newStoreColor, setNewStoreColor] = useState('#a855f7');

  // Local Try-on State
  const [tryOnOutfit, setTryOnOutfit] = useState({
    top: null,
    bottom: null,
    outerwear: null,
    shoe: null,
    accessory: null
  });

  const categories = ['all', 'tops', 'bottoms', 'outerwear', 'shoes'];

  const filteredCatalog = activeCategory === 'all' 
    ? COTTON_ON_CATALOG 
    : COTTON_ON_CATALOG.filter(item => item.category === activeCategory);

  const handleTryOn = (item) => {
    setTryOnOutfit(prev => ({
      ...prev,
      [item.category]: item
    }));
  };

  const resetTryOn = () => {
    setTryOnOutfit({
      top: null,
      bottom: null,
      outerwear: null,
      shoe: null,
      accessory: null
    });
  };

  const handleAddToCloset = (item) => {
    onAddItem({
      id: `shop-${Date.now()}-${item.id}`,
      name: item.name,
      category: item.category,
      color: item.color,
      colorName: item.colorName,
      season: item.season,
      occasion: item.occasion,
      image: item.image,
      createdAt: Date.now()
    });
    alert(`"${item.name}" has been added to your closet!`);
  };

  const handleAddTryOnToCloset = () => {
    const itemsToAdd = Object.values(tryOnOutfit).filter(Boolean);
    if (itemsToAdd.length === 0) return alert("Nothing in your active Try-on to add!");

    itemsToAdd.forEach((item, idx) => {
      onAddItem({
        id: `shop-bulk-${Date.now()}-${idx}-${item.id}`,
        name: item.name,
        category: item.category,
        color: item.color,
        colorName: item.colorName,
        season: item.season,
        occasion: item.occasion,
        image: item.image,
        createdAt: Date.now()
      });
    });

    alert(`Added ${itemsToAdd.length} item(s) from try-on preview to closet!`);
    resetTryOn();
  };

  // Determine if there are active tried-on items
  const isTryingOn = Object.values(tryOnOutfit).some(Boolean);

  const handleSearchChange = (shopId, value) => {
    setSearchQueries(prev => ({ ...prev, [shopId]: value }));
  };

  const handleSearchSubmit = (shopId, searchUrlTemplate) => {
    const query = searchQueries[shopId] || '';
    if (!query) {
      const shop = [...PRESET_RETAILERS, ...customShops].find(s => s.id === shopId);
      if (shop) window.open(shop.url, '_blank');
      return;
    }
    const fullUrl = `${searchUrlTemplate}${encodeURIComponent(query)}`;
    window.open(fullUrl, '_blank');
  };

  const handleAddCustomShop = (e) => {
    e.preventDefault();
    if (!newStoreName || !newStoreUrl) return alert("Please fill in Store Name and URL");
    
    let formattedUrl = newStoreUrl;
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;
    }

    let formattedSearchUrl = newStoreSearchUrl;
    if (formattedSearchUrl && !/^https?:\/\//i.test(formattedSearchUrl)) {
      if (formattedSearchUrl.startsWith('/')) {
        formattedSearchUrl = formattedUrl.replace(/\/$/, '') + formattedSearchUrl;
      } else {
        formattedSearchUrl = 'https://' + formattedSearchUrl;
      }
    }

    const newShop = {
      id: `custom-shop-${Date.now()}`,
      name: newStoreName,
      url: formattedUrl,
      searchUrl: formattedSearchUrl || null,
      color: newStoreColor,
      desc: 'Custom boutique added by you.',
      isCustom: true
    };

    const updated = [...customShops, newShop];
    setCustomShops(updated);
    saveCustomShops(updated);

    setNewStoreName('');
    setNewStoreUrl('');
    setNewStoreSearchUrl('');
    setNewStoreColor('#a855f7');
    setShowAddModal(false);
  };

  const handleDeleteCustomShop = (shopId) => {
    if (window.confirm("Are you sure you want to remove this store?")) {
      const updated = customShops.filter(s => s.id !== shopId);
      setCustomShops(updated);
      saveCustomShops(updated);
    }
  };

  return (
    <div className="shop-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-header)', display: 'flex', alignItems: 'center', gap: '8px', margin: '0' }}>
          <ShoppingBag size={20} color="var(--accent-primary)" /> {shopMode === 'fitting-room' ? 'Virtual Fitting Room' : 'My Shopping Hub'}
        </h2>
        
        {/* Mode Switcher Tabs */}
        <div className="shop-mode-tabs">
          <button
            type="button"
            className={`shop-mode-btn ${shopMode === 'fitting-room' ? 'active' : ''}`}
            onClick={() => setShopMode('fitting-room')}
          >
            Fitting Room
          </button>
          <button
            type="button"
            className={`shop-mode-btn ${shopMode === 'hub' ? 'active' : ''}`}
            onClick={() => setShopMode('hub')}
          >
            Shopping Hub
          </button>
        </div>
      </div>

      {shopMode === 'fitting-room' ? (
        <>
          {/* Split Screen Try-On Live Preview */}
          <div className="glass-card shop-preview-panel">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', alignItems: 'center', gap: '16px' }}>
              
              {/* Mannequin Preview */}
              <div className="shop-mannequin-container" style={{ background: 'rgba(9, 9, 11, 0.4)', borderRadius: '16px', padding: '8px', height: '220px', position: 'relative' }}>
                <Avatar outfit={tryOnOutfit} customization={customization} profile={profile} />
                
                {/* Absolute indicator badge */}
                <span className="preview-indicator">
                  {isTryingOn ? 'Trying On' : 'Model'}
                </span>
              </div>

              {/* Try-on Info & Call to Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={14} color="var(--accent-secondary)" />
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 600 }}>Virtual Fitting Room</h3>
                </div>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  Select items from the catalog below to try them on your model instantly.
                </p>

                {isTryingOn ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={handleAddTryOnToCloset}
                      style={{ padding: '8px 12px', fontSize: '0.75rem', borderRadius: '10px' }}
                    >
                      <Plus size={12} /> Add Outfit to Closet
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={resetTryOn}
                      style={{ padding: '8px 12px', fontSize: '0.75rem', borderRadius: '10px' }}
                    >
                      <RefreshCw size={12} /> Reset Preview
                    </button>
                  </div>
                ) : (
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '12px' }}>
                    No active try-on items. Tap "Try On" below!
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Category Tabs */}
          <div className="closet-tabs">
            {categories.map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeCategory === tab ? 'active' : ''}`}
                onClick={() => setActiveCategory(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Product Catalog Grid */}
          <div className="closet-grid">
            {filteredCatalog.map(product => {
              // Check if currently trying on
              const isItemTriedOn = tryOnOutfit[product.category]?.id === product.id;

              return (
                <div key={product.id} className="closet-card shop-product-card">
                  <div className="closet-img-container" style={{ aspectRatio: '1' }}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="closet-img" 
                      loading="lazy" 
                    />
                    
                    {/* Price Tag Overlay */}
                    <span className="shop-price-tag">
                      ${product.price}
                    </span>
                  </div>
                  
                  <div className="closet-info" style={{ padding: '10px', gap: '8px' }}>
                    <div className="closet-name" style={{ fontSize: '0.8rem', height: '36px', overflow: 'hidden', whiteSpace: 'normal', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {product.name}
                    </div>

                    {/* Color and Category indicators */}
                    <div className="closet-tags" style={{ marginBottom: '4px' }}>
                      <span className="tag-badge" style={{ borderLeft: `3px solid ${product.color}` }}>
                        {product.colorName}
                      </span>
                    </div>

                    {/* Shop Action Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', marginTop: 'auto' }}>
                      <button
                        type="button"
                        className={`btn-secondary ${isItemTriedOn ? 'active-tryon' : ''}`}
                        onClick={() => handleTryOn(product)}
                        style={{ padding: '6px', fontSize: '0.7rem', width: '100%', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                      >
                        <Eye size={12} /> {isItemTriedOn ? 'Trying On' : 'Try On'}
                      </button>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => handleAddToCloset(product)}
                          title="Add to Closet"
                          style={{ flex: 1, padding: '6px', borderRadius: '8px' }}
                        >
                          <Plus size={12} />
                        </button>
                        <a
                          href={product.buyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                          title="Buy on Cotton On"
                          style={{ flex: 1.5, padding: '6px', borderRadius: '8px', boxShadow: 'none' }}
                        >
                          <ShoppingCart size={12} />
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* SHOPPING HUB CONTENT */
        <div className="shopping-hub-content" style={{ animation: 'fade-in-view 0.3s ease' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              My Favorite Stores
            </h3>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setShowAddModal(true)}
              style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Plus size={12} /> Add Custom Store
            </button>
          </div>

          <div className="shopping-hub-grid">
            {[...PRESET_RETAILERS, ...customShops].map((shop) => (
              <div 
                key={shop.id} 
                className="retailer-card glass-card"
                style={{ 
                  borderLeft: `4px solid ${shop.color}`,
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.01) 0%, ${shop.color}07 100%)`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0' }}>
                    {shop.name}
                  </h4>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <a
                      href={shop.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="retailer-link-btn"
                      title={`Visit ${shop.name}`}
                      style={{ color: shop.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <ArrowUpRight size={16} />
                    </a>
                    {shop.isCustom && (
                      <button
                        type="button"
                        className="delete-shop-btn"
                        onClick={() => handleDeleteCustomShop(shop.id)}
                        title="Delete Store"
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', minHeight: '36px', lineHeight: '1.4', margin: '0 0 16px 0' }}>
                  {shop.desc}
                </p>

                {/* Direct Search Bar */}
                {shop.searchUrl ? (
                  <div className="retailer-search-box">
                    <input
                      type="text"
                      className="retailer-search-input"
                      placeholder={`Search ${shop.name}...`}
                      value={searchQueries[shop.id] || ''}
                      onChange={(e) => handleSearchChange(shop.id, e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(shop.id, shop.searchUrl)}
                    />
                    <button
                      type="button"
                      className="retailer-search-btn"
                      onClick={() => handleSearchSubmit(shop.id, shop.searchUrl)}
                      style={{ background: shop.color }}
                    >
                      <Search size={12} color="white" />
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: 'var(--text-muted)', fontStyle: 'italic', padding: '6px 0' }}>
                    <Globe size={10} /> Search shortcut not configured.
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Custom Store Modal Overlay */}
          {showAddModal && (
            <div className="custom-store-modal-overlay">
              <div className="custom-store-modal glass-card">
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>
                  Add Custom Store
                </h4>
                
                <form onSubmit={handleAddCustomShop} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Store Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. H&M, Everlane, Myer"
                      value={newStoreName}
                      onChange={(e) => setNewStoreName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Store URL</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. www.hm.com"
                      value={newStoreUrl}
                      onChange={(e) => setNewStoreUrl(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Search Query URL (Optional)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. /search?q= or search/index.html?query="
                      value={newStoreSearchUrl}
                      onChange={(e) => setNewStoreSearchUrl(e.target.value)}
                    />
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block', lineHeight: '1.3' }}>
                      To search directly from the dashboard card, provide the URL search parameter. If left blank, it will just open the store's homepage.
                    </span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Theme Color Accent</label>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                      {['#a855f7', '#ec4899', '#3b82f6', '#10b981', '#ef4444', '#f59e0b', '#6b7280'].map((color) => (
                        <button
                          key={color}
                          type="button"
                          className="color-swatch-btn"
                          style={{ 
                            background: color,
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            border: newStoreColor === color ? '2px solid white' : '2px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onClick={() => setNewStoreColor(color)}
                        />
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ flex: 1, padding: '10px', borderRadius: '8px', fontSize: '0.8rem' }}
                    >
                      Save Store
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      style={{ flex: 1, padding: '10px', borderRadius: '8px', fontSize: '0.8rem' }}
                      onClick={() => setShowAddModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
