import React from 'react';

// Skin tone mapping
const SKIN_TONES = {
  fair: { fill: '#fed7aa', shadow: '#fba575', outline: '#ea580c' },
  honey: { fill: '#e0ac69', shadow: '#c68b59', outline: '#b45309' },
  olive: { fill: '#c68642', shadow: '#9f5a1d', outline: '#854d0e' },
  espresso: { fill: '#5c4033', shadow: '#3d251c', outline: '#1c1917' }
};

// Hair color mapping
const HAIR_COLORS = {
  black: '#18181b',
  'dark-brown': '#451a03',
  blonde: '#facc15',
  ginger: '#ea580c',
  'silver-gray': '#9ca3af'
};

export default function Avatar({ outfit, customization, profile }) {
  const skin = SKIN_TONES[customization.skinTone] || SKIN_TONES.fair;
  const hairColorHex = HAIR_COLORS[customization.hairColor] || HAIR_COLORS['dark-brown'];
  const hairStyle = customization.hairStyle || 'short';

  // Get user body attributes (fallback to standard averages)
  const userProfile = profile || { height: 170, weight: 65 };
  const heightVal = userProfile.height || 170;
  const weightVal = userProfile.weight || 65;

  // Sizing multipliers
  // normalized around 170cm height and 70kg weight
  const hFactor = Math.min(1.2, Math.max(0.8, heightVal / 170));
  const wFactor = Math.min(1.4, Math.max(0.65, weightVal / 70));

  // Dynamic Y-coordinates based on height
  const legLength = 80 * hFactor;
  const ankleY = Math.min(196, Math.max(160, 115 + legLength));

  // Dynamic X-coordinates based on weight and gender proportions
  let shoulderMultiplier = 1.0;
  let hipMultiplier = 1.0;
  let waistMultiplier = 1.0;

  const gender = userProfile.gender || 'non-binary';
  if (gender === 'female') {
    shoulderMultiplier = 0.88;
    hipMultiplier = 1.15;
    waistMultiplier = 0.92;
  } else if (gender === 'male') {
    shoulderMultiplier = 1.12;
    hipMultiplier = 0.88;
    waistMultiplier = 1.04;
  }

  const sL = 50 - 18 * wFactor * shoulderMultiplier; // Left shoulder
  const sR = 50 + 18 * wFactor * shoulderMultiplier; // Right shoulder
  const hL = 50 - 14 * wFactor * hipMultiplier;      // Left hip
  const hR = 50 + 14 * wFactor * hipMultiplier;      // Right hip
  const wL = 50 - 16 * wFactor * waistMultiplier;    // Left waist
  const wR = 50 + 16 * wFactor * waistMultiplier;    // Right waist

  // Check if today is their birthday (same month & day)
  const isBirthdayToday = () => {
    if (!userProfile.birthday) return false;
    const dob = new Date(userProfile.birthday);
    const today = new Date();
    return dob.getMonth() === today.getMonth() && dob.getDate() === today.getDate();
  };

  // Limb thicknesses
  const armWidth = 5.5 * Math.sqrt(wFactor);
  const legWidth = 6.5 * Math.sqrt(wFactor);

  // Classification Helpers
  const classifyTop = (name = '') => {
    const n = name.toLowerCase();
    if (n.includes('sweater') || n.includes('knit') || n.includes('longsleeve') || n.includes('cardigan')) return 'longsleeve';
    if (n.includes('crop') || n.includes('ribbed')) return 'croptop';
    if (n.includes('button-up') || n.includes('shirt') || n.includes('blouse')) return 'blouse';
    return 'tshirt';
  };

  const classifyBottom = (name = '') => {
    const n = name.toLowerCase();
    if (n.includes('skirt')) return 'skirt';
    if (n.includes('shorts')) return 'shorts';
    return 'pants';
  };

  const classifyOuterwear = (name = '') => {
    const n = name.toLowerCase();
    if (n.includes('trench') || n.includes('coat')) return 'trench';
    if (n.includes('vest') || n.includes('puffer vest')) return 'vest';
    return 'jacket';
  };

  const classifyShoe = (name = '') => {
    const n = name.toLowerCase();
    if (n.includes('boot')) return 'boots';
    if (n.includes('sandal') || n.includes('heel') || n.includes('strappy')) return 'sandals';
    return 'sneakers';
  };

  const classifyAccessory = (name = '') => {
    const n = name.toLowerCase();
    if (n.includes('sunglasses') || n.includes('sunnies') || n.includes('glass')) return 'sunglasses';
    if (n.includes('scarf')) return 'scarf';
    if (n.includes('hat') || n.includes('cap') || n.includes('boater')) return 'hat';
    if (n.includes('bag') || n.includes('purse') || n.includes('crossbody') || n.includes('saddle')) return 'bag';
    if (n.includes('necklace') || n.includes('chain') || n.includes('gold') || n.includes('herringbone')) return 'necklace';
    return 'necklace';
  };

  // Extract outfit elements
  const topItem = outfit?.top;
  const bottomItem = outfit?.bottom;
  const outerwearItem = outfit?.outerwear;
  const shoeItem = outfit?.shoe;
  const accessoryItem = outfit?.accessory;

  // Classify types
  const topType = topItem ? classifyTop(topItem.name) : null;
  const bottomType = bottomItem ? classifyBottom(bottomItem.name) : null;
  const outerwearType = outerwearItem ? classifyOuterwear(outerwearItem.name) : null;
  const shoeType = shoeItem ? classifyShoe(shoeItem.name) : null;
  const accessoryType = accessoryItem ? classifyAccessory(accessoryItem.name) : null;

  return (
    <svg viewBox="0 0 100 200" className="avatar-mannequin-render">
      <defs>
        <radialGradient id="body-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(168, 85, 247, 0.15)" />
          <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
        </radialGradient>
        <linearGradient id="party-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>

      <circle cx="50" cy="100" r="80" fill="url(#body-glow)" />

      {/* ================= 1. BACK HAIR LAYER ================= */}
      {hairStyle === 'long' && (
        <path
          d="M 36 22 C 34 32, 33 55, 36 68 C 39 68, 41 62, 42 50 C 44 38, 56 38, 58 50 C 59 62, 61 68, 64 68 C 67 55, 66 32, 64 22 Z"
          fill={hairColorHex}
        />
      )}
      {hairStyle === 'ponytail' && (
        <>
          <path
            d="M 37 22 C 35 29, 34 40, 37 48 C 40 40, 42 32, 42 22 Z"
            fill={hairColorHex}
          />
          <path
            d="M 58 24 C 64 26, 73 35, 71 52 C 68 52, 64 42, 59 28 Z"
            fill={hairColorHex}
          />
        </>
      )}

      {/* ================= 2. SKIN BODY LAYERS ================= */}
      {/* Left Leg */}
      <path
        d={`M ${50 - 9 * wFactor} 115 C ${50 - 9 * wFactor} 140, ${50 - 8 * wFactor} 168, ${50 - 8 * wFactor} ${ankleY}`}
        fill="none"
        stroke={skin.fill}
        strokeWidth={legWidth}
        strokeLinecap="round"
      />
      {/* Right Leg */}
      <path
        d={`M ${50 + 9 * wFactor} 115 C ${50 + 9 * wFactor} 140, ${50 + 8 * wFactor} 168, ${50 + 8 * wFactor} ${ankleY}`}
        fill="none"
        stroke={skin.fill}
        strokeWidth={legWidth}
        strokeLinecap="round"
      />

      {/* Torso & Hips */}
      <path
        d={`M ${sL} 42 C 40 40, 60 40, ${sR} 42 C ${sR + 2} 46, ${hR + 3} 85, ${hR} 92 L ${hL} 92 C ${hL - 3} 85, ${sL - 2} 46, ${sL} 42 Z`}
        fill={skin.fill}
      />
      <path
        d={`M ${hL} 92 L ${hR} 92 L ${wR} 112 C ${50 + 12 * wFactor} 118, ${50 - 12 * wFactor} 118, ${wL} 112 Z`}
        fill={skin.fill}
      />

      {/* Left Arm */}
      <path
        d={`M ${sL} 42 C ${sL - 4} 55, ${sL - 6} 75, ${sL - 5} 94`}
        fill="none"
        stroke={skin.fill}
        strokeWidth={armWidth}
        strokeLinecap="round"
      />
      {/* Right Arm */}
      <path
        d={`M ${sR} 42 C ${sR + 4} 55, ${sR + 6} 75, ${sR + 5} 94`}
        fill="none"
        stroke={skin.fill}
        strokeWidth={armWidth}
        strokeLinecap="round"
      />

      {/* Neck */}
      <rect x="47.5" y="30" width="5" height="10" fill={skin.fill} />

      {/* Head */}
      <circle cx="50" cy="22" r="11" fill={skin.fill} />

      {/* Chest Details / Shadow */}
      <path
        d="M 44 42 C 47 48, 53 48, 56 42 Z"
        fill="none"
        stroke={skin.shadow}
        strokeWidth="1"
        opacity="0.6"
      />

      {/* ================= 3. FRONT HAIR LAYER ================= */}
      {hairStyle === 'short' && (
        <path
          d="M 37 20 C 35 12, 65 12, 63 20 C 63 24, 60 25, 59 22 C 55 17, 45 17, 41 22 C 40 25, 37 24, 37 20 Z"
          fill={hairColorHex}
        />
      )}
      {hairStyle === 'long' && (
        <path
          d="M 37 20 C 35 8, 65 8, 63 20 C 63 22, 61 24, 59 21 C 55 17, 45 17, 41 21 C 39 24, 37 22, 37 20 Z"
          fill={hairColorHex}
        />
      )}
      {hairStyle === 'ponytail' && (
        <path
          d="M 37 20 C 35 12, 65 12, 63 20 C 63 23, 61 24, 59 21 C 55 17, 45 17, 41 21 C 39 23, 37 20, 37 20 Z"
          fill={hairColorHex}
        />
      )}
      {hairStyle === 'curly' && (
        <>
          <circle cx="50" cy="17" r="14.5" fill={hairColorHex} opacity="0.95" />
          <circle cx="40" cy="16" r="4.5" fill={hairColorHex} />
          <circle cx="60" cy="16" r="4.5" fill={hairColorHex} />
          <circle cx="50" cy="10" r="5" fill={hairColorHex} />
          <circle cx="44" cy="11" r="4.5" fill={hairColorHex} />
          <circle cx="56" cy="11" r="4.5" fill={hairColorHex} />
        </>
      )}

      {/* ================= 4. CLOTHING: TOPS ================= */}
      {topItem && (
        <g filter="url(#shadow)">
          {/* T-Shirt */}
          {topType === 'tshirt' && (
            <path
              d={`M ${sL} 42 L ${sL - 4} 52 L ${sL + 2} 54 L ${sL + 5} 46 L ${sL + 5} 80 L ${sR - 5} 80 L ${sR - 5} 46 L ${sR - 2} 54 L ${sR + 4} 52 L ${sR} 42 Z`}
              fill={topItem.color}
            />
          )}

          {/* Crop Top */}
          {topType === 'croptop' && (
            <path
              d={`M ${sL} 42 L ${sL - 4} 50 L ${sL + 1} 52 L ${sL + 5} 45 L ${sL + 5} 66 L ${sR - 5} 66 L ${sR - 5} 45 L ${sR - 1} 52 L ${sR + 4} 50 L ${sR} 42 Z`}
              fill={topItem.color}
            />
          )}

          {/* Long sleeve sweater */}
          {topType === 'longsleeve' && (
            <>
              {/* Sleeves */}
              <path
                d={`M ${sL} 42 C ${sL - 4} 55, ${sL - 6} 75, ${sL - 5} 89`}
                fill="none"
                stroke={topItem.color}
                strokeWidth={armWidth + 0.8}
                strokeLinecap="round"
              />
              <path
                d={`M ${sR} 42 C ${sR + 4} 55, ${sR + 6} 75, ${sR + 5} 89`}
                fill="none"
                stroke={topItem.color}
                strokeWidth={armWidth + 0.8}
                strokeLinecap="round"
              />
              {/* Torso Body */}
              <path
                d={`M ${sL} 42 L ${sL + 5} 46 L ${sL + 5} 82 L ${sR - 5} 82 L ${sR - 5} 46 L ${sR} 42 Z`}
                fill={topItem.color}
              />
            </>
          )}

          {/* Blouse / Button-up */}
          {topType === 'blouse' && (
            <>
              <path
                d={`M ${sL} 42 L ${sL - 4} 53 L ${sL + 2} 55 L ${sL + 5} 47 L ${sL + 5} 80 L ${sR - 5} 80 L ${sR - 5} 47 L ${sR - 2} 55 L ${sR + 4} 53 L ${sR} 42 Z`}
                fill={topItem.color}
              />
              <path d="M 45 42 L 50 51 L 55 42" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
              <path d="M 45 42 L 48 48 L 50 42 Z" fill="rgba(255,255,255,0.15)" />
              <path d="M 55 42 L 52 48 L 50 42 Z" fill="rgba(255,255,255,0.15)" />
            </>
          )}

          {/* Collar cutout overlay for skin reveal */}
          <path
            d="M 45 42 C 47 46, 53 46, 55 42 C 55 42, 55 42, 55 42 Z"
            fill={skin.fill}
          />
        </g>
      )}

      {/* ================= 5. CLOTHING: BOTTOMS ================= */}
      {bottomItem && (
        <g filter="url(#shadow)">
          {/* Pants / Jeans */}
          {bottomType === 'pants' && (
            <path
              d={`M ${50 - 16 * wFactor} 78 L ${50 + 16 * wFactor} 78 C ${50 + 17 * wFactor} 92, ${50 + 16 * wFactor} 102, ${wR} 112 L ${50 + 12.5 * wFactor} ${ankleY - 5} L ${50 + 3.5 * wFactor} ${ankleY - 5} L 50 115 L ${50 - 3.5 * wFactor} ${ankleY - 5} L ${50 - 12.5 * wFactor} ${ankleY - 5} L ${wL} 112 Z`}
              fill={bottomItem.color}
            />
          )}

          {/* Skirt */}
          {bottomType === 'skirt' && (
            <path
              d={`M ${50 - 16 * wFactor} 78 L ${50 + 16 * wFactor} 78 C ${50 + 18 * wFactor} 95, ${50 + 19 * wFactor} 110, ${50 + 24 * wFactor} 145 L ${50 - 24 * wFactor} 145 C ${50 - 19 * wFactor} 110, ${50 - 18 * wFactor} 95, ${50 - 16 * wFactor} 78 Z`}
              fill={bottomItem.color}
            />
          )}

          {/* Shorts */}
          {bottomType === 'shorts' && (
            <path
              d={`M ${50 - 16 * wFactor} 78 L ${50 + 16 * wFactor} 78 C ${50 + 17 * wFactor} 92, ${50 + 16 * wFactor} 102, ${wR} 122 L ${50 + 3 * wFactor} 122 L 50 102 L ${50 - 3 * wFactor} 122 L ${50 - 16 * wFactor} 122 Z`}
              fill={bottomItem.color}
            />
          )}
        </g>
      )}

      {/* ================= 6. CLOTHING: OUTERWEAR ================= */}
      {outerwearItem && (
        <g filter="url(#shadow)">
          {/* Jacket */}
          {outerwearType === 'jacket' && (
            <>
              {/* Sleeves */}
              <path
                d={`M ${sL - 1} 41 C ${sL - 5} 55, ${sL - 7} 75, ${sL - 6} 90`}
                fill="none"
                stroke={outerwearItem.color}
                strokeWidth={armWidth + 1.8}
                strokeLinecap="round"
              />
              <path
                d={`M ${sR + 1} 41 C ${sR + 5} 55, ${sR + 7} 75, ${sR + 6} 90`}
                fill="none"
                stroke={outerwearItem.color}
                strokeWidth={armWidth + 1.8}
                strokeLinecap="round"
              />
              {/* Main Vest-like open torso */}
              <path
                d={`M ${sL - 1} 41 L ${sL + 5} 47 L ${sL + 3} 83 L ${50 - 8 * wFactor} 83 L ${50 - 6 * wFactor} 49 L 50 63 L ${50 + 6 * wFactor} 49 L ${50 + 8 * wFactor} 83 L ${sR - 3} 83 L ${sR - 5} 47 L ${sR + 1} 41 Z`}
                fill={outerwearItem.color}
              />
            </>
          )}

          {/* Trench Coat */}
          {outerwearType === 'trench' && (
            <>
              {/* Sleeves */}
              <path
                d={`M ${sL - 1} 41 C ${sL - 5} 55, ${sL - 7} 75, ${sL - 6} 90`}
                fill="none"
                stroke={outerwearItem.color}
                strokeWidth={armWidth + 1.8}
                strokeLinecap="round"
              />
              <path
                d={`M ${sR + 1} 41 C ${sR + 5} 55, ${sR + 7} 75, ${sR + 6} 90`}
                fill="none"
                stroke={outerwearItem.color}
                strokeWidth={armWidth + 1.8}
                strokeLinecap="round"
              />
              {/* Long Open Body */}
              <path
                d={`M ${sL - 1} 41 L ${sL + 5} 47 L ${50 - 17 * wFactor} 150 L ${50 - 7 * wFactor} 150 L ${50 - 6 * wFactor} 50 L 50 64 L ${50 + 6 * wFactor} 50 L ${50 + 7 * wFactor} 150 L ${50 + 17 * wFactor} 150 L ${sR - 5} 47 L ${sR + 1} 41 Z`}
                fill={outerwearItem.color}
              />
            </>
          )}

          {/* Vest */}
          {outerwearType === 'vest' && (
            <path
              d={`M ${sL - 1} 41 L ${sL + 5} 47 L ${sL + 3} 83 L ${50 - 7 * wFactor} 83 L ${50 - 5 * wFactor} 49 L 50 61 L ${50 + 5 * wFactor} 49 L ${50 + 7 * wFactor} 83 L ${sR - 3} 83 L ${sR - 5} 47 L ${sR + 1} 41 Z`}
              fill={outerwearItem.color}
            />
          )}
        </g>
      )}

      {/* ================= 7. CLOTHING: SHOES ================= */}
      {shoeItem && (
        <g filter="url(#shadow)">
          {/* Sneakers */}
          {shoeType === 'sneakers' && (
            <>
              {/* Left Sneaker */}
              <path d={`M ${50 - 12 * wFactor} ${ankleY - 4} L ${50 - 4 * wFactor} ${ankleY - 4} C ${50 - 4 * wFactor} ${ankleY}, ${50 - 5 * wFactor} ${ankleY + 3}, ${50 - 12 * wFactor} ${ankleY + 3} Z`} fill={shoeItem.color} />
              <path d={`M ${50 - 12.5 * wFactor} ${ankleY + 2} L ${50 - 4 * wFactor} ${ankleY + 2} L ${50 - 4 * wFactor} ${ankleY + 4} L ${50 - 12.5 * wFactor} ${ankleY + 4} Z`} fill="#ffffff" />
              {/* Right Sneaker */}
              <path d={`M ${50 + 12 * wFactor} ${ankleY - 4} L ${50 + 4 * wFactor} ${ankleY - 4} C ${50 + 4 * wFactor} ${ankleY}, ${50 + 5 * wFactor} ${ankleY + 3}, ${50 + 12 * wFactor} ${ankleY + 3} Z`} fill={shoeItem.color} />
              <path d={`M ${50 + 12.5 * wFactor} ${ankleY + 2} L ${50 + 4 * wFactor} ${ankleY + 2} L ${50 + 4 * wFactor} ${ankleY + 4} L ${50 + 12.5 * wFactor} ${ankleY + 4} Z`} fill="#ffffff" />
            </>
          )}

          {/* Boots */}
          {shoeType === 'boots' && (
            <>
              {/* Left Boot */}
              <path d={`M ${50 - 12 * wFactor} ${ankleY - 17} L ${50 - 6 * wFactor} ${ankleY - 17} L ${50 - 6 * wFactor} ${ankleY + 3} C ${50 - 7 * wFactor} ${ankleY + 4}, ${50 - 14 * wFactor} ${ankleY + 4}, ${50 - 14 * wFactor} ${ankleY + 2} Z`} fill={shoeItem.color} />
              {/* Right Boot */}
              <path d={`M ${50 + 12 * wFactor} ${ankleY - 17} L ${50 + 6 * wFactor} ${ankleY - 17} L ${50 + 6 * wFactor} ${ankleY + 3} C ${50 + 7 * wFactor} ${ankleY + 4}, ${50 + 14 * wFactor} ${ankleY + 4}, ${50 + 14 * wFactor} ${ankleY + 2} Z`} fill={shoeItem.color} />
            </>
          )}

          {/* Sandals */}
          {shoeType === 'sandals' && (
            <>
              {/* Left Sandal */}
              <path d={`M ${50 - 12 * wFactor} ${ankleY + 1} L ${50 - 5 * wFactor} ${ankleY + 1}`} fill="none" stroke={shoeItem.color} strokeWidth="2.5" strokeLinecap="round" />
              {/* Right Sandal */}
              <path d={`M ${50 + 12 * wFactor} ${ankleY + 1} L ${50 + 5 * wFactor} ${ankleY + 1}`} fill="none" stroke={shoeItem.color} strokeWidth="2.5" strokeLinecap="round" />
            </>
          )}
        </g>
      )}

      {/* ================= 8. CLOTHING: ACCESSORIES ================= */}
      {accessoryItem && (
        <g filter="url(#shadow)">
          {/* Sunglasses */}
          {accessoryType === 'sunglasses' && (
            <>
              <path
                d="M 42 20 L 58 20 L 57 25 L 53 25 L 50 21.5 L 47 25 L 43 25 Z"
                fill={accessoryItem.color}
              />
              <circle cx="45" cy="22.5" r="2" fill="#09090b" />
              <circle cx="55" cy="22.5" r="2" fill="#09090b" />
            </>
          )}

          {/* Scarf */}
          {accessoryType === 'scarf' && (
            <>
              <path
                d="M 45 32 C 45 42, 55 42, 55 32 Z"
                fill="none"
                stroke={accessoryItem.color}
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M 52 36 L 53 60"
                fill="none"
                stroke={accessoryItem.color}
                strokeWidth="4"
                strokeLinecap="round"
              />
            </>
          )}

          {/* Hat */}
          {accessoryType === 'hat' && (
            <>
              <ellipse cx="50" cy="16" rx="20" ry="3.5" fill={accessoryItem.color} />
              <path d="M 40 16 C 40 6, 60 6, 60 16 Z" fill={accessoryItem.color} />
            </>
          )}

          {/* Bag */}
          {accessoryType === 'bag' && (
            <>
              <path
                d="M 23 92 C 23 60, 48 42, 48 42"
                fill="none"
                stroke={accessoryItem.color}
                strokeWidth="1.5"
                opacity="0.85"
              />
              <rect x="20" y="88" width="10" height="12" rx="2" fill={accessoryItem.color} />
              <path d="M 23 88 C 23 85, 27 85, 27 88" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
            </>
          )}

          {/* Necklace */}
          {accessoryType === 'necklace' && (
            <>
              <path
                d="M 44 38 C 44 46, 56 46, 56 38"
                fill="none"
                stroke={accessoryItem.color}
                strokeWidth="1.5"
              />
              <circle cx="50" cy="46" r="2.5" fill={accessoryItem.color} />
            </>
          )}
        </g>
      )}

      {/* Birthday Easter Egg Party Hat */}
      {isBirthdayToday() && (
        <g filter="url(#shadow)">
          {/* Hat Cone */}
          <path d="M 43 12 L 50 -4 L 57 12 Z" fill="url(#party-grad)" />
          {/* Stripes */}
          <path d="M 45 8 L 52 -1" stroke="#ffd700" strokeWidth="1" />
          <path d="M 48 11 L 55 2" stroke="#ffffff" strokeWidth="1" />
          {/* Pom pom */}
          <circle cx="50" cy="-5" r="2.5" fill="#facc15" />
        </g>
      )}
    </svg>
  );
}
