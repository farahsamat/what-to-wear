import React from 'react';
import { History, Calendar } from 'lucide-react';

export default function OOTDHistory({ history }) {
  return (
    <div className="history-view">
      <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', fontFamily: 'var(--font-header)' }}>
        Outfit Log History
      </h2>

      {history.length === 0 ? (
        <div className="empty-state">
          <History size={48} />
          <p style={{ marginTop: '12px' }}>
            No logged outfits yet. Swipe right on recommendations to start saving your styles!
          </p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((log, index) => (
            <div key={index} className="glass-card history-item">
              <div className="history-meta">
                <span className="history-date" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} className="text-secondary" />
                  {log.date}
                </span>
                <span className="history-tag">
                  {log.season.charAt(0).toUpperCase() + log.season.slice(1)}
                </span>
              </div>

              {/* Outfit thumbnails grid */}
              <div className="history-thumbs">
                {log.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="history-thumb" 
                      title={item.name}
                    />
                    <span 
                      style={{ 
                        fontSize: '0.6rem', 
                        color: 'var(--text-muted)', 
                        marginTop: '4px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '100%',
                        textAlign: 'center'
                      }}
                    >
                      {item.category.slice(0, -1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
