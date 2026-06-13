import React, { useState } from 'react';
import { Trash2, FolderOpen, Plus } from 'lucide-react';

export default function Closet({ items, onDeleteItem, onNavigate }) {
  const [activeTab, setActiveTab] = useState('all');

  const categories = ['all', 'tops', 'bottoms', 'outerwear', 'shoes', 'accessories'];

  const filteredItems = activeTab === 'all' 
    ? items 
    : items.filter(item => item.category === activeTab);

  return (
    <div className="closet-view">
      {/* Category Navigation Tabs */}
      <div className="closet-tabs">
        {categories.map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div className="empty-state">
          <FolderOpen size={48} />
          <p style={{ marginTop: '12px' }}>
            No items found in "{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}".
          </p>
          <button 
            className="btn-primary" 
            onClick={() => onNavigate('add')}
            style={{ marginTop: '16px' }}
          >
            <Plus size={16} /> Add Item
          </button>
        </div>
      ) : (
        <div className="closet-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="closet-card">
              <div className="closet-img-container">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="closet-img" 
                  loading="lazy" 
                />
                <button 
                  className="delete-btn"
                  onClick={() => onDeleteItem(item.id)}
                  title="Remove Item"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="closet-info">
                <div className="closet-name">{item.name}</div>
                <div className="closet-tags">
                  <span 
                    className="tag-badge" 
                    style={{ borderLeft: `3px solid ${item.color || '#ccc'}` }}
                  >
                    {item.colorName}
                  </span>
                  <span className="tag-badge">{item.season}</span>
                  <span className="tag-badge">{item.occasion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
