const STORAGE_KEYS = {
  CLOSET: 'what_to_wear_closet',
  HISTORY: 'what_to_wear_history',
  CUSTOMIZATION: 'what_to_wear_customization',
  PROFILE: 'what_to_wear_user_profile',
  VERSION: 'what_to_wear_seed_version_w',
  CUSTOM_SHOPS: 'what_to_wear_custom_shops',
  LOGIN_STATE: 'what_to_wear_login_state'
};

const DEFAULT_CLOSET = [
  // ================= TOPS =================
  {
    id: 'w_top_1',
    name: 'Silk Linen Blouse',
    category: 'tops',
    color: '#ffffff',
    colorName: 'Off-White',
    season: 'summer',
    occasion: 'smart-casual',
    image: 'https://images.unsplash.com/photo-1548624149-f7b2e8886656?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 2500000
  },
  {
    id: 'w_top_2',
    name: 'Oversized Knit Sweater',
    category: 'tops',
    color: '#d2b48c',
    colorName: 'Camel',
    season: 'winter',
    occasion: 'casual',
    image: 'https://images.unsplash.com/photo-1574164904299-3a102b110380?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 2400000
  },
  {
    id: 'w_top_3',
    name: 'Striped Breton Longsleeve',
    category: 'tops',
    color: '#000080',
    colorName: 'Navy/White',
    season: 'all',
    occasion: 'casual',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 2300000
  },
  {
    id: 'w_top_4',
    name: 'Classic White Button-Up',
    category: 'tops',
    color: '#ffffff',
    colorName: 'Pure White',
    season: 'all',
    occasion: 'formal',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 2200000
  },
  {
    id: 'w_top_5',
    name: 'Ribbed Sage Crop Top',
    category: 'tops',
    color: '#8fbc8f',
    colorName: 'Sage Green',
    season: 'summer',
    occasion: 'casual',
    image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 2100000
  },

  // ================= BOTTOMS =================
  {
    id: 'w_bot_1',
    name: 'High-Waist Wide trousers',
    category: 'bottoms',
    color: '#1a1a1a',
    colorName: 'Charcoal Black',
    season: 'all',
    occasion: 'smart-casual',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 2000000
  },
  {
    id: 'w_bot_2',
    name: 'Pleated A-Line Midi Skirt',
    category: 'bottoms',
    color: '#8b0000',
    colorName: 'Burgundy',
    season: 'summer',
    occasion: 'formal',
    image: 'https://images.unsplash.com/photo-1583496661160-fb48862c6a7a?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 1900000
  },
  {
    id: 'w_bot_3',
    name: 'Distressed Blue Mom Jeans',
    category: 'bottoms',
    color: '#2a52be',
    colorName: 'Denim Blue',
    season: 'all',
    occasion: 'casual',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 1800000
  },
  {
    id: 'w_bot_4',
    name: 'Linen Wide-Leg Pants',
    category: 'bottoms',
    color: '#f5f5dc',
    colorName: 'Oatmeal Beige',
    season: 'summer',
    occasion: 'casual',
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 1700000
  },
  {
    id: 'w_bot_5',
    name: 'Sleek Leather Midi Skirt',
    category: 'bottoms',
    color: '#1a1a1a',
    colorName: 'Black Leather',
    season: 'winter',
    occasion: 'smart-casual',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 1600000
  },

  // ================= OUTERWEAR =================
  {
    id: 'w_out_1',
    name: 'Classic Trench Coat',
    category: 'outerwear',
    color: '#c5b358',
    colorName: 'Beige Khaki',
    season: 'winter',
    occasion: 'smart-casual',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 1500000
  },
  {
    id: 'w_out_2',
    name: 'Cropped Moto Leather Jacket',
    category: 'outerwear',
    color: '#111111',
    colorName: 'Black Leather',
    season: 'winter',
    occasion: 'casual',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 1400000
  },
  {
    id: 'w_out_3',
    name: 'Corduroy Shacket',
    category: 'outerwear',
    color: '#556b2f',
    colorName: 'Olive Green',
    season: 'all',
    occasion: 'casual',
    image: 'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 1300000
  },
  {
    id: 'w_out_4',
    name: 'Oversized Double Blazer',
    category: 'outerwear',
    color: '#808080',
    colorName: 'Ash Gray',
    season: 'all',
    occasion: 'formal',
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 1200000
  },
  {
    id: 'w_out_5',
    name: 'Beige Puffer Vest',
    category: 'outerwear',
    color: '#f5f5dc',
    colorName: 'Cream Warm',
    season: 'winter',
    occasion: 'casual',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 1100000
  },

  // ================= SHOES =================
  {
    id: 'w_sho_1',
    name: 'Leather Block Ankle Boots',
    category: 'shoes',
    color: '#3d2314',
    colorName: 'Dark Brown',
    season: 'winter',
    occasion: 'smart-casual',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 1000000
  },
  {
    id: 'w_sho_2',
    name: 'Minimalist Canvas Sneakers',
    category: 'shoes',
    color: '#ffffff',
    colorName: 'Pure White',
    season: 'all',
    occasion: 'casual',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 900000
  },
  {
    id: 'w_sho_3',
    name: 'Lug-Sole Platform Loafers',
    category: 'shoes',
    color: '#1a1a1a',
    colorName: 'Polished Black',
    season: 'all',
    occasion: 'smart-casual',
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 800000
  },
  {
    id: 'w_sho_4',
    name: 'Strappy Block Sandals',
    category: 'shoes',
    color: '#deb887',
    colorName: 'Tan Nude',
    season: 'summer',
    occasion: 'smart-casual',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 700000
  },
  {
    id: 'w_sho_5',
    name: 'Suede Utility Chelsea Boots',
    category: 'shoes',
    color: '#8b8589',
    colorName: 'Taupe Gray',
    season: 'winter',
    occasion: 'casual',
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 600000
  },

  // ================= ACCESSORIES =================
  {
    id: 'w_acc_1',
    name: 'Leather Crossbody Saddle Bag',
    category: 'accessories',
    color: '#1a1a1a',
    colorName: 'Black Leather',
    season: 'all',
    occasion: 'smart-casual',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 500000
  },
  {
    id: 'w_acc_2',
    name: 'Tortoiseshell Sunglasses',
    category: 'accessories',
    color: '#a0522d',
    colorName: 'Amber Brown',
    season: 'summer',
    occasion: 'casual',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 400000
  },
  {
    id: 'w_acc_3',
    name: 'Classic Gold Herringbone Chain',
    category: 'accessories',
    color: '#ffd700',
    colorName: '18K Gold',
    season: 'all',
    occasion: 'formal',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 300000
  },
  {
    id: 'w_acc_4',
    name: 'Wide-Brim Straw Boater Hat',
    category: 'accessories',
    color: '#f5f5dc',
    colorName: 'Natural Straw',
    season: 'summer',
    occasion: 'casual',
    image: 'https://images.unsplash.com/photo-1572451479139-6a308211d8be?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 2000000
  },
  {
    id: 'w_acc_5',
    name: 'Cozy Wool Tassel Scarf',
    category: 'accessories',
    color: '#e5e5e5',
    colorName: 'Melange Gray',
    season: 'winter',
    occasion: 'casual',
    image: 'https://images.unsplash.com/photo-1520903928273-0f44b2a2edd8?auto=format&fit=crop&q=80&w=600',
    createdAt: Date.now() - 100000
  }
];

export const getClosetItems = () => {
  const version = localStorage.getItem(STORAGE_KEYS.VERSION);
  const data = localStorage.getItem(STORAGE_KEYS.CLOSET);

  // Upgrade version to v3 to force seed the extended collection
  if (version !== 'v3' || !data) {
    localStorage.setItem(STORAGE_KEYS.CLOSET, JSON.stringify(DEFAULT_CLOSET));
    localStorage.setItem(STORAGE_KEYS.VERSION, 'v3');
    return DEFAULT_CLOSET;
  }
  
  try {
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_CLOSET;
  }
};

export const saveClosetItems = (items) => {
  localStorage.setItem(STORAGE_KEYS.CLOSET, JSON.stringify(items));
};

export const getOOTDHistory = () => {
  const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

export const saveOOTDHistory = (history) => {
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
};

export const getAvatarCustomization = () => {
  const data = localStorage.getItem(STORAGE_KEYS.CUSTOMIZATION);
  const defaultCustomization = {
    skinTone: 'fair',
    hairStyle: 'short',
    hairColor: 'dark-brown',
    bodyBuild: 'slender'
  };
  if (!data) return defaultCustomization;
  try {
    return { ...defaultCustomization, ...JSON.parse(data) };
  } catch (e) {
    return defaultCustomization;
  }
};

export const saveAvatarCustomization = (customization) => {
  localStorage.setItem(STORAGE_KEYS.CUSTOMIZATION, JSON.stringify(customization));
};

export const getUserProfile = () => {
  const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
  const defaultProfile = {
    height: 170, // cm
    weight: 65,  // kg
    build: 'average',
    stylePreferences: ['casual', 'minimalist'],
    birthday: '',
    gender: 'non-binary'
  };
  if (!data) return defaultProfile;
  try {
    return { ...defaultProfile, ...JSON.parse(data) };
  } catch (e) {
    return defaultProfile;
  }
};

export const saveUserProfile = (profile) => {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
};

export const getCustomShops = () => {
  const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_SHOPS);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

export const saveCustomShops = (shops) => {
  localStorage.setItem(STORAGE_KEYS.CUSTOM_SHOPS, JSON.stringify(shops));
};

export const getLoginState = () => {
  const data = localStorage.getItem(STORAGE_KEYS.LOGIN_STATE);
  if (!data) return { isLoggedIn: false, email: '' };
  try {
    return JSON.parse(data);
  } catch (e) {
    return { isLoggedIn: false, email: '' };
  }
};

export const saveLoginState = (state) => {
  localStorage.setItem(STORAGE_KEYS.LOGIN_STATE, JSON.stringify(state));
};
