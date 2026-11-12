/**
 * ROPEDROP v2.1 - DISNEY WORLD WAIT TIMES & PARK HOPPER PWA
 * Tiered Hierarchy: Must-Dos (Top) -> Backups (Second) -> Regular -> Hidden (Bottom).
 */

// =============================================================================
// 1. PARK DEFINITIONS & METADATA
// =============================================================================

const PARKS = {
  '75ea578a-adc8-4116-a54d-dccb60765ef9': {
    id: '75ea578a-adc8-4116-a54d-dccb60765ef9',
    name: 'Magic Kingdom',
    shortName: 'Magic Kingdom',
    code: 'mk',
    crest: '🏰',
    theme: 'theme-mk',
    badgeId: 'badge-mk',
    lands: ['Fantasyland', 'Tomorrowland', 'Adventureland', 'Frontierland', 'Liberty Square', 'Main Street, U.S.A.'],
    headliners: ['Seven Dwarfs Mine Train', 'Space Mountain', 'TRON Lightcycle / Run', 'Big Thunder Mountain Railroad', 'Peter Pan\'s Flight', 'Haunted Mansion']
  },
  '47f90d2c-e191-4239-a466-5892ef59a88b': {
    id: '47f90d2c-e191-4239-a466-5892ef59a88b',
    name: 'EPCOT',
    shortName: 'EPCOT',
    code: 'epcot',
    crest: '🌐',
    theme: 'theme-epcot',
    badgeId: 'badge-epcot',
    lands: ['World Discovery', 'World Celebration', 'World Nature', 'World Showcase'],
    headliners: ['Guardians of the Galaxy: Cosmic Rewind', 'Remy\'s Ratatouille Adventure', 'Frozen Ever After', 'Soarin\' Around the World', 'Test Track', 'Spaceship Earth']
  },
  '288747d1-8b4f-4a64-867e-ea7c9b27bad8': {
    id: '288747d1-8b4f-4a64-867e-ea7c9b27bad8',
    name: "Disney's Hollywood Studios",
    shortName: 'Hollywood Studios',
    code: 'dhs',
    crest: '🎬',
    theme: 'theme-dhs',
    badgeId: 'badge-dhs',
    lands: ["Star Wars: Galaxy's Edge", 'Toy Story Land', 'Sunset Boulevard', 'Echo Lake', 'Hollywood Boulevard', 'Animation Courtyard'],
    headliners: ['Star Wars: Rise of the Resistance', 'Slinky Dog Dash', 'The Twilight Zone Tower of Terror', 'Millennium Falcon: Smugglers Run', 'Mickey & Minnie\'s Runaway Railway', 'Toy Story Mania!']
  },
  '1c84a229-8862-4648-9c71-378ddd2c7693': {
    id: '1c84a229-8862-4648-9c71-378ddd2c7693',
    name: "Disney's Animal Kingdom",
    shortName: 'Animal Kingdom',
    code: 'dak',
    crest: '🦁',
    theme: 'theme-dak',
    badgeId: 'badge-dak',
    lands: ['Pandora – The World of Avatar', 'Africa', 'Asia', 'Discovery Island', 'DinoLand U.S.A.'],
    headliners: ['Avatar Flight of Passage', 'Expedition Everest - Legend of the Forbidden Mountain', 'Kilimanjaro Safaris', 'Na\'vi River Journey', 'DINOSAUR', 'Kali River Rapids']
  }
};

const LAND_RULES = [
  // Magic Kingdom
  { match: /mine train|peter pan|pooh|dumbo|under the sea|small world|tea party|carrousel|barnstormer|philharmagic|fairytale hall|ariel/i, land: 'Fantasyland' },
  { match: /space mountain|tron|buzz lightyear|speedway|peoplemover|carousel of progress|astro orbiter|monsters/i, land: 'Tomorrowland' },
  { match: /thunder mountain|country bear|tiana|tom sawyer/i, land: 'Frontierland' },
  { match: /pirates of the caribbean|jungle cruise|magic carpets|tiki room|swiss family/i, land: 'Adventureland' },
  { match: /haunted mansion|hall of presidents|riverboat/i, land: 'Liberty Square' },
  { match: /railroad|main street|town square/i, land: 'Main Street, U.S.A.' },

  // EPCOT
  { match: /cosmic rewind|guardians|test track|mission: space/i, land: 'World Discovery' },
  { match: /soarin|living with the land|the seas|nemo|moana|journey of water|awesome planet/i, land: 'World Nature' },
  { match: /spaceship earth|figment|imagination|short film/i, land: 'World Celebration' },
  { match: /remy|ratatouille|frozen|gran fiesta|mexico|france|norway|american adventure|canada|china|reflections/i, land: 'World Showcase' },

  // Hollywood Studios
  { match: /rise of the resistance|smugglers run|galaxy's edge|falcon/i, land: "Star Wars: Galaxy's Edge" },
  { match: /slinky dog|toy story mania|alien swirling/i, land: 'Toy Story Land' },
  { match: /tower of terror|rock 'n' roller|fantasmic|beauty and the beast/i, land: 'Sunset Boulevard' },
  { match: /star tours|indiana jones|frozen sing-along|echo lake/i, land: 'Echo Lake' },
  { match: /runaway railway/i, land: 'Hollywood Boulevard' },
  { match: /muppet|disney junior|animation courtyard/i, land: 'Animation Courtyard' },

  // Animal Kingdom
  { match: /flight of passage|avatar|na'vi/i, land: 'Pandora – The World of Avatar' },
  { match: /safaris|lion king|gorilla falls|rafiki|wildlife express/i, land: 'Africa' },
  { match: /everest|kali river|maharajah|feathered friends/i, land: 'Asia' },
  { match: /dinosaur|triceratop|nemo: the big blue|dinoland/i, land: 'DinoLand U.S.A.' },
  { match: /tough to be a bug|tree of life|discovery island|zootopia/i, land: 'Discovery Island' }
];

const EXPERT_TIPS = {
  'seven dwarfs mine train': '💡 Disney Expert Tip: Peak waits are 11 AM - 4 PM. Rope drop this or hop in line 10 minutes before park close for the shortest queue!',
  'space mountain': '💡 Disney Expert Tip: Waits drop significantly right after Happily Ever After fireworks. Incredible night ride!',
  'tron lightcycle / run': '💡 Disney Expert Tip: Keep an eye out for evening standby drops. Night rides are unmatched when the canopy glows.',
  'haunted mansion': '💡 Disney Expert Tip: The queue moves very steadily. Ideal mid-afternoon attraction with shaded outdoor & cool indoor areas.',
  'pirates of the caribbean': '💡 Disney Expert Tip: Refreshingly air-conditioned! Waits usually bottom out during the 3 PM parade and after 8 PM.',
  'big thunder mountain railroad': '💡 Disney Expert Tip: "The Wildest Ride in the Wilderness" is twice as magical at night when Cinderella Castle is lit in the background.',
  'peter pan\'s flight': '💡 Disney Expert Tip: Slow-loading classic with consistently long lines. Best to ride within the first 45 minutes of park opening.',
  'guardians of the galaxy: cosmic rewind': '💡 Disney Expert Tip: Disney’s smoothest reverse-launch omnicoaster! Ask for Row 9 or 10 if you love intense speed sensation.',
  'remy\'s ratatouille adventure': '💡 Disney Expert Tip: Check for the Single Rider line in the France Pavilion! Often saves 30-40 minutes over standby.',
  'frozen ever after': '💡 Disney Expert Tip: World Showcase crowds swell after 11 AM. Best to ride early or late evening before Luminous fireworks.',
  'soarin\' around the world': '💡 Disney Expert Tip: Request Concourse B, Row 1 from the Cast Member for an uncurved, center-screen view of the Eiffel Tower!',
  'star wars: rise of the resistance': '💡 Disney Expert Tip: If this ride temporarily breaks down, stay alert! Head straight there the moment it reopens for a walk-on.',
  'slinky dog dash': '💡 Disney Expert Tip: High afternoon sun with minimal queue shade. Try to ride during early morning or right at golden hour.',
  'the twilight zone tower of terror': '💡 Disney Expert Tip: Waits plunge during the Fantasmic! showtimes. Fantastic opportunity for back-to-back drops!',
  'avatar flight of passage': '💡 Disney Expert Tip: Disney World’s most immersive simulator! If you didn’t rope-drop, jump in line 15 mins before park close.',
  'expedition everest': '💡 Disney Expert Tip: The Single Rider line is a legendary Disney hack—usually under 15 minutes even when standby exceeds an hour!',
  'kilimanjaro safaris': '💡 Disney Expert Tip: Animals are most active and visible during early morning feedings or right before dusk.'
};

const THRILL_RIDE_KEYWORDS = [
  'mountain', 'tron', 'guardians', 'cosmic', 'everest', 'tower of terror', 'rock', 
  'flight of passage', 'slinky', 'dinosaur', 'smugglers', 'rise of the resistance', 'test track'
];

function cleanKey(name) {
  if (!name) return '';
  return name.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}

// =============================================================================
// 2. STATE & STORAGE ENGINE
// =============================================================================

const state = {
  currentParkId: '75ea578a-adc8-4116-a54d-dccb60765ef9', // Default: Magic Kingdom

  // Favorites Dictionaries: { [cleanKey(name)]: { id, name, parkId } }
  mustDos: {},
  secondaries: {},
  ignored: {},

  alertThreshold: 20,       // minutes
  soundEnabled: true,
  notificationsEnabled: false,
  autoRefreshMinutes: 5,
  
  parkData: {},             // parkId -> enriched attractions array
  parkMeta: {},             // parkId -> { avgWait, openCount, walkonCount, lastUpdated }
  allAttractionsMap: {},    // id -> attraction object

  searchQuery: '',
  selectedFilter: 'all',    // all, must-do, secondary, under20, thrill, family, ignored, down
  selectedLand: 'all',
  selectedSort: 'priority', // Default: Must-Dos & Backups at Top!

  secondsRemaining: 300,
  timerInterval: null,
  isRefreshing: false,
  lastAlertedIds: new Set(),

  pendingSharedPlan: null
};

const STORAGE_KEYS = {
  FAVS_V2: 'ropedrop_favorites_v2',
  PARK_ID: 'ropedrop_current_park_id',
  THRESHOLD: 'ropedrop_alert_threshold',
  SOUND: 'ropedrop_sound_enabled',
  NOTIFICATIONS: 'ropedrop_notifications_enabled',
  REFRESH_MINS: 'ropedrop_refresh_interval'
};

// =============================================================================
// 3. PERSISTENCE ENGINE (LOCALSTORAGE + COOKIE + INDEXEDDB)
// =============================================================================

function savePriorities() {
  try {
    const payload = {
      mustDos: state.mustDos,
      secondaries: state.secondaries,
      ignored: state.ignored,
      parkId: state.currentParkId,
      threshold: state.alertThreshold
    };

    const json = JSON.stringify(payload);

    // 1. Primary LocalStorage
    localStorage.setItem(STORAGE_KEYS.FAVS_V2, json);
    localStorage.setItem(STORAGE_KEYS.PARK_ID, state.currentParkId);

    // 2. Backup Cookie (survives Safari private mode clears)
    const expires = new Date(Date.now() + 365*24*60*60*1000).toUTCString();
    document.cookie = `ropedrop_backup=${encodeURIComponent(json)}; expires=${expires}; path=/; SameSite=Lax`;

    // 3. Backup IndexedDB
    saveToIndexedDb('favorites', payload);

    updateSettingsUI();
  } catch (err) {
    console.warn('Could not save priorities:', err);
  }
}

function loadStoredPreferences() {
  try {
    let raw = localStorage.getItem(STORAGE_KEYS.FAVS_V2);

    if (!raw) {
      const match = document.cookie.match(/ropedrop_backup=([^;]+)/);
      if (match) {
        raw = decodeURIComponent(match[1]);
      }
    }

    if (raw) {
      const parsed = JSON.parse(raw);
      state.mustDos = parsed.mustDos || {};
      state.secondaries = parsed.secondaries || {};
      state.ignored = parsed.ignored || {};
      if (parsed.parkId && PARKS[parsed.parkId]) {
        state.currentParkId = parsed.parkId;
      }
    } else {
      migrateLegacyStorage();
    }

    const savedPark = localStorage.getItem(STORAGE_KEYS.PARK_ID);
    if (savedPark && PARKS[savedPark]) state.currentParkId = savedPark;

    const savedThreshold = localStorage.getItem(STORAGE_KEYS.THRESHOLD);
    if (savedThreshold) state.alertThreshold = parseInt(savedThreshold, 10) || 20;

    const savedSound = localStorage.getItem(STORAGE_KEYS.SOUND);
    if (savedSound !== null) state.soundEnabled = savedSound === 'true';

    const savedNotifs = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (savedNotifs !== null) state.notificationsEnabled = savedNotifs === 'true';

    const savedRefresh = localStorage.getItem(STORAGE_KEYS.REFRESH_MINS);
    if (savedRefresh) state.autoRefreshMinutes = parseInt(savedRefresh, 10) || 5;

    state.secondsRemaining = state.autoRefreshMinutes * 60;
  } catch (err) {
    console.warn('Error loading preferences:', err);
  }

  updateSettingsUI();
}

function migrateLegacyStorage() {
  const legacyKeys = [
    'ropedrop_must_dos_v2', 'ropedrop_must_dos', 'mousehop_must_dos', 'disney_must_dos', 'disney_favorites'
  ];

  for (const k of legacyKeys) {
    const val = localStorage.getItem(k);
    if (val) {
      try {
        const items = JSON.parse(val);
        if (Array.isArray(items)) {
          items.forEach(item => {
            if (typeof item === 'string') {
              state.mustDos[item] = { id: item, name: '' };
            } else if (item && typeof item === 'object') {
              const key = cleanKey(item.name) || item.id;
              state.mustDos[key] = { id: item.id || '', name: item.name || '' };
            }
          });
        }
        break;
      } catch (e) {}
    }
  }

  const legacySecKeys = ['ropedrop_secondaries_v2', 'ropedrop_secondaries', 'mousehop_secondaries', 'disney_secondaries'];
  for (const k of legacySecKeys) {
    const val = localStorage.getItem(k);
    if (val) {
      try {
        const items = JSON.parse(val);
        if (Array.isArray(items)) {
          items.forEach(item => {
            if (typeof item === 'string') {
              state.secondaries[item] = { id: item, name: '' };
            } else if (item && typeof item === 'object') {
              const key = cleanKey(item.name) || item.id;
              state.secondaries[key] = { id: item.id || '', name: item.name || '' };
            }
          });
        }
        break;
      } catch (e) {}
    }
  }

  savePriorities();
}

function openDb() {
  return new Promise(resolve => {
    if (!('indexedDB' in window)) return resolve(null);
    const req = indexedDB.open('ropedrop_db', 2);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('store')) {
        db.createObjectStore('store');
      }
    };
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = () => resolve(null);
  });
}

async function saveToIndexedDb(key, val) {
  try {
    const db = await openDb();
    if (!db) return;
    const tx = db.transaction('store', 'readwrite');
    tx.objectStore('store').put(val, key);
  } catch (e) {}
}

async function getFromIndexedDb(key) {
  try {
    const db = await openDb();
    if (!db) return null;
    return new Promise(resolve => {
      const tx = db.transaction('store', 'readonly');
      const req = tx.objectStore('store').get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    });
  } catch (e) {
    return null;
  }
}

// =============================================================================
// 4. HIERARCHY & MATCHING HELPERS
// =============================================================================

function isRideMustDo(item) {
  if (!item) return false;
  const k = cleanKey(item.name);
  return Boolean((k && state.mustDos[k]) || (item.id && state.mustDos[item.id]));
}

function isRideSecondary(item) {
  if (!item) return false;
  const k = cleanKey(item.name);
  return Boolean((k && state.secondaries[k]) || (item.id && state.secondaries[item.id]));
}

function isRideIgnored(item) {
  if (!item) return false;
  const k = cleanKey(item.name);
  return Boolean((k && state.ignored[k]) || (item.id && state.ignored[item.id]));
}

// Hierarchy Tier:
// 1 = Must-Do (Top)
// 2 = Backup (Directly below Must-Do)
// 3 = Regular Park Rides (Middle)
// 4 = Hidden Rides (Moved to Bottom)
function getRideTier(item) {
  if (isRideIgnored(item)) return 4;
  if (isRideMustDo(item)) return 1;
  if (isRideSecondary(item)) return 2;
  return 3;
}

// =============================================================================
// 5. INITIALIZATION & LIFECYCLE
// =============================================================================

document.addEventListener('DOMContentLoaded', async () => {
  loadStoredPreferences();

  // Async restore from IndexedDB if localStorage was empty
  const mustCount = Object.keys(state.mustDos).length;
  if (mustCount === 0) {
    const idbData = await getFromIndexedDb('favorites');
    if (idbData && idbData.mustDos && Object.keys(idbData.mustDos).length > 0) {
      state.mustDos = idbData.mustDos;
      state.secondaries = idbData.secondaries || {};
      state.ignored = idbData.ignored || {};
      savePriorities();
    }
  }

  checkSharedPlanUrl();
  initServiceWorker();
  initEventListeners();
  initTheme(state.currentParkId);
  startAutoRefreshTimer();
  fetchParkData(state.currentParkId);
  fetchAllParksForHopper();
});

function initTheme(parkId) {
  const park = PARKS[parkId] || PARKS['75ea578a-adc8-4116-a54d-dccb60765ef9'];
  document.body.className = park.theme;
  
  const currentParkName = document.getElementById('currentParkName');
  if (currentParkName) currentParkName.textContent = park.name;

  const parkCrest = document.getElementById('parkCrest');
  if (parkCrest) parkCrest.textContent = park.crest;

  document.querySelectorAll('.park-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.park === parkId);
  });
}

function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => {
          reg.update();
        })
        .catch(err => console.log('SW registration error:', err));
    });
  }
}

// =============================================================================
// 6. DATA FETCHING & PARSING
// =============================================================================

async function fetchParkData(parkId, isManual = false) {
  state.isRefreshing = true;
  const refreshBtn = document.getElementById('refreshBtn');
  const svg = refreshBtn ? refreshBtn.querySelector('.refresh-svg') : null;
  if (svg) svg.classList.add('spinning');

  try {
    const url = `https://api.themeparks.wiki/v1/entity/${parkId}/live`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    processParkData(parkId, data);
    state.secondsRemaining = state.autoRefreshMinutes * 60;

    if (isManual) {
      showToast('✨ Wait times refreshed!');
    }
  } catch (err) {
    console.error('Error fetching live wait times:', err);
    showToast('⚠️ Using cached times.');
  } finally {
    state.isRefreshing = false;
    if (svg) svg.classList.remove('spinning');
  }
}

function processParkData(parkId, rawData) {
  const items = rawData.liveData || [];

  const attractions = items.filter(item => {
    if (item.entityType === 'ATTRACTION') return true;
    if (item.entityType === 'SHOW' && item.queue && item.queue.STANDBY && item.queue.STANDBY.waitTime !== null) return true;
    return false;
  }).map(item => enrichAttraction(item, parkId));

  state.parkData[parkId] = attractions;

  // Cache in global map by ID
  attractions.forEach(a => {
    state.allAttractionsMap[a.id] = a;

    // Associate legacy IDs with actual attraction names
    const k = cleanKey(a.name);
    if (state.mustDos[a.id] && !state.mustDos[k]) {
      state.mustDos[k] = { id: a.id, name: a.name, parkId: a.parkId };
    }
    if (state.secondaries[a.id] && !state.secondaries[k]) {
      state.secondaries[k] = { id: a.id, name: a.name, parkId: a.parkId };
    }
  });

  // Calculate stats (excluding ignored rides)
  const activeAttractions = attractions.filter(a => !isRideIgnored(a) && a.status === 'OPERATING' && a.waitTime !== null);
  const openCount = activeAttractions.length;
  const totalWait = activeAttractions.reduce((sum, a) => sum + a.waitTime, 0);
  const avgWait = openCount > 0 ? Math.round(totalWait / openCount) : 0;
  const walkonCount = activeAttractions.filter(a => a.waitTime <= state.alertThreshold).length;

  state.parkMeta[parkId] = {
    avgWait,
    openCount,
    walkonCount,
    lastUpdated: new Date()
  };

  if (parkId === state.currentParkId) {
    renderStatsRibbon();
    renderLandChips(attractions);
    renderRidesList();
    checkPriorityAlerts();
  }

  const park = PARKS[parkId];
  if (park) {
    const badge = document.getElementById(park.badgeId);
    if (badge) badge.textContent = `${avgWait}m`;
  }
}

function enrichAttraction(item, parkId) {
  const name = item.name || 'Unnamed Attraction';
  const lowerName = name.toLowerCase();

  let assignedLand = 'Other';
  for (const rule of LAND_RULES) {
    if (rule.match.test(name)) {
      assignedLand = rule.land;
      break;
    }
  }

  let waitTime = null;
  if (item.queue && item.queue.STANDBY && typeof item.queue.STANDBY.waitTime === 'number') {
    waitTime = item.queue.STANDBY.waitTime;
  }

  let singleRiderWait = null;
  if (item.queue && item.queue.SINGLE_RIDER && typeof item.queue.SINGLE_RIDER.waitTime === 'number') {
    singleRiderWait = item.queue.SINGLE_RIDER.waitTime;
  }

  let returnTimeState = null;
  if (item.queue && item.queue.RETURN_TIME) {
    returnTimeState = item.queue.RETURN_TIME.state;
  }

  const isThrill = THRILL_RIDE_KEYWORDS.some(k => lowerName.includes(k));

  let expertTip = null;
  for (const [key, tip] of Object.entries(EXPERT_TIPS)) {
    if (lowerName.includes(key)) {
      expertTip = tip;
      break;
    }
  }

  return {
    id: item.id,
    name: name,
    entityType: item.entityType,
    status: item.status || 'CLOSED',
    waitTime: waitTime,
    singleRiderWait: singleRiderWait,
    returnTimeState: returnTimeState,
    land: assignedLand,
    isThrill: isThrill,
    expertTip: expertTip,
    forecast: item.forecast || [],
    parkId: parkId
  };
}

async function fetchAllParksForHopper() {
  for (const pid of Object.keys(PARKS)) {
    if (pid !== state.currentParkId) {
      try {
        const res = await fetch(`https://api.themeparks.wiki/v1/entity/${pid}/live`);
        if (res.ok) {
          const d = await res.json();
          processParkData(pid, d);
        }
      } catch (e) {}
    }
  }
  updateHopperCardsUI();
}

// =============================================================================
// 7. RENDER FUNCTIONS (TIERED SORTING)
// =============================================================================

function renderStatsRibbon() {
  const meta = state.parkMeta[state.currentParkId] || { avgWait: '--', openCount: '--', walkonCount: '--', lastUpdated: new Date() };
  
  const avgElem = document.getElementById('parkAvgWait');
  if (avgElem) avgElem.textContent = meta.avgWait !== '--' ? `${meta.avgWait} min` : '--';

  const openElem = document.getElementById('parkOpenRides');
  if (openElem) openElem.textContent = meta.openCount;

  const walkElem = document.getElementById('parkWalkons');
  if (walkElem) walkElem.textContent = meta.walkonCount;

  const updatedElem = document.getElementById('parkLastUpdated');
  if (updatedElem && meta.lastUpdated) {
    const timeStr = meta.lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    updatedElem.textContent = timeStr;
  }
}

function renderLandChips(attractions) {
  const landBar = document.getElementById('landChipsBar');
  if (!landBar) return;

  const currentPark = PARKS[state.currentParkId];
  const landsSet = new Set();
  
  if (currentPark && currentPark.lands) {
    currentPark.lands.forEach(l => landsSet.add(l));
  }

  attractions.forEach(a => {
    if (a.land && a.land !== 'Other') landsSet.add(a.land);
  });

  const lands = Array.from(landsSet);

  let html = `<button class="land-chip ${state.selectedLand === 'all' ? 'active' : ''}" data-land="all">All Lands</button>`;
  lands.forEach(land => {
    html += `<button class="land-chip ${state.selectedLand === land ? 'active' : ''}" data-land="${escapeHtml(land)}">${escapeHtml(land)}</button>`;
  });

  landBar.innerHTML = html;

  landBar.querySelectorAll('.land-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      state.selectedLand = chip.dataset.land;
      renderLandChips(attractions);
      renderRidesList();
    });
  });
}

function renderRidesList() {
  const container = document.getElementById('ridesContainer');
  const emptyState = document.getElementById('emptyState');
  const emptyDesc = document.getElementById('emptyDesc');
  if (!container) return;

  const allAttractions = state.parkData[state.currentParkId] || [];

  updateFilterCounts(allAttractions);

  let filtered = allAttractions.filter(item => {
    const isIgnored = isRideIgnored(item);

    // If specific filter selected
    if (state.selectedFilter === 'ignored') {
      return isIgnored;
    }
    if (state.selectedFilter === 'must-do') {
      return isRideMustDo(item);
    }
    if (state.selectedFilter === 'secondary') {
      return isRideSecondary(item);
    }
    if (state.selectedFilter === 'under20') {
      return !isIgnored && item.status === 'OPERATING' && item.waitTime !== null && item.waitTime <= state.alertThreshold;
    }
    if (state.selectedFilter === 'thrill') {
      return item.isThrill;
    }
    if (state.selectedFilter === 'family') {
      return !item.isThrill;
    }
    if (state.selectedFilter === 'down') {
      return item.status !== 'OPERATING';
    }

    // In 'all' view: INCLUDE all rides! Hidden rides are naturally sorted to the bottom.
    // Search query filter
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchLand = item.land.toLowerCase().includes(q);
      if (!matchName && !matchLand) return false;
    }

    // Land filter
    if (state.selectedLand !== 'all' && item.land !== state.selectedLand) {
      return false;
    }

    return true;
  });

  // TIERED SORTING:
  // Tier 1: Must-Dos (Top)
  // Tier 2: Backups (Directly below Must-Dos)
  // Tier 3: Regular Rides (Middle)
  // Tier 4: Hidden Rides (Always at bottom)
  filtered.sort((a, b) => {
    const tierA = getRideTier(a);
    const tierB = getRideTier(b);

    // In all sort modes, Hidden rides (Tier 4) always sink to the bottom
    const isIgnA = tierA === 4;
    const isIgnB = tierB === 4;
    if (isIgnA !== isIgnB) {
      return isIgnA ? 1 : -1;
    }

    // If default priority sort is active: Must-Do (1) -> Backup (2) -> Regular (3)
    if (state.selectedSort === 'priority') {
      if (tierA !== tierB) {
        return tierA - tierB;
      }
      // Within the same tier, sort by shortest wait time first
      const waitA = a.status === 'OPERATING' && a.waitTime !== null ? a.waitTime : 9999;
      const waitB = b.status === 'OPERATING' && b.waitTime !== null ? b.waitTime : 9999;
      if (waitA !== waitB) return waitA - waitB;
      return a.name.localeCompare(b.name);
    }

    if (state.selectedSort === 'wait-asc') {
      const waitA = a.status === 'OPERATING' && a.waitTime !== null ? a.waitTime : 9999;
      const waitB = b.status === 'OPERATING' && b.waitTime !== null ? b.waitTime : 9999;
      return waitA - waitB;
    }

    if (state.selectedSort === 'wait-desc') {
      const waitA = a.status === 'OPERATING' && a.waitTime !== null ? a.waitTime : -1;
      const waitB = b.status === 'OPERATING' && b.waitTime !== null ? b.waitTime : -1;
      return waitB - waitA;
    }

    if (state.selectedSort === 'alpha') {
      return a.name.localeCompare(b.name);
    }

    if (state.selectedSort === 'land') {
      return a.land.localeCompare(b.land) || a.name.localeCompare(b.name);
    }

    return 0;
  });

  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'flex';
    if (emptyDesc) {
      if (state.selectedFilter === 'must-do') {
        emptyDesc.textContent = `No Must-Do rides saved for ${PARKS[state.currentParkId]?.name || 'this park'}. Tap the star on any ride to save it to the top!`;
      } else if (state.selectedFilter === 'secondary') {
        emptyDesc.textContent = `No Backup rides saved for ${PARKS[state.currentParkId]?.name || 'this park'}. Tap the star twice to add backups.`;
      } else {
        emptyDesc.textContent = 'Try clearing your filters or changing your search terms.';
      }
    }
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  let cardsHtml = '';
  for (const item of filtered) {
    cardsHtml += buildRideCardHtml(item);
  }

  container.innerHTML = cardsHtml;

  // Direct memory lookup listeners
  container.querySelectorAll('.priority-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const rideId = btn.dataset.rideId;
      const item = state.allAttractionsMap[rideId];
      if (item) cyclePriority(item);
    });
  });

  container.querySelectorAll('.ignore-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const rideId = btn.dataset.rideId;
      const item = state.allAttractionsMap[rideId];
      if (item) toggleIgnore(item);
    });
  });

  container.querySelectorAll('.expert-tip-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = trigger.dataset.target;
      const box = document.getElementById(targetId);
      if (box) {
        const isHidden = box.style.display === 'none';
        box.style.display = isHidden ? 'flex' : 'none';
      }
    });
  });
}

function buildRideCardHtml(item) {
  const isMustDo = isRideMustDo(item);
  const isSecondary = isRideSecondary(item);
  const isIgnored = isRideIgnored(item);
  const isPriority = isMustDo || isSecondary;
  const isOperating = item.status === 'OPERATING';
  const isDropAlert = isPriority && !isIgnored && isOperating && item.waitTime !== null && item.waitTime <= state.alertThreshold;

  let waitClass = 'wait-moderate';
  let waitDisplay = '--';
  let waitUnit = 'MIN';

  if (!isOperating) {
    waitClass = item.status === 'DOWN' ? 'wait-down' : 'wait-closed';
    waitDisplay = item.status === 'DOWN' ? 'DOWN' : 'CLOSED';
    waitUnit = '';
  } else if (item.waitTime !== null) {
    waitDisplay = item.waitTime;
    if (item.waitTime <= 20) {
      waitClass = 'wait-walkon';
    } else if (item.waitTime <= 45) {
      waitClass = 'wait-moderate';
    } else if (item.waitTime <= 75) {
      waitClass = 'wait-high';
    } else {
      waitClass = 'wait-peak';
    }
  }

  let priorityBtnClass = '';
  let priorityIcon = '☆';
  let priorityTagHtml = '';

  if (isMustDo) {
    priorityBtnClass = 'state-mustdo';
    priorityIcon = '★';
    priorityTagHtml = '<span class="priority-tag-pill mustdo">★ Must-Do (Top)</span>';
  } else if (isSecondary) {
    priorityBtnClass = 'state-secondary';
    priorityIcon = '◆';
    priorityTagHtml = '<span class="priority-tag-pill secondary">◆ Backup</span>';
  } else if (isIgnored) {
    priorityTagHtml = '<span class="priority-tag-pill ignored">🚫 Hidden (At Bottom)</span>';
  }

  let featuresHtml = '';
  if (item.singleRiderWait !== null) {
    featuresHtml += `<span class="feature-pill single-rider">🏃 Single: ${item.singleRiderWait}m</span>`;
  }
  if (item.returnTimeState === 'AVAILABLE') {
    featuresHtml += `<span class="feature-pill ll">⚡ LL Open</span>`;
  }
  if (item.expertTip) {
    featuresHtml += `<button class="feature-pill expert-tip-trigger" data-target="tip-${item.id}">💡 Insider Tip</button>`;
  }

  const cardClasses = [
    'ride-card',
    isMustDo ? 'is-mustdo' : '',
    isSecondary ? 'is-secondary' : '',
    isIgnored ? 'is-ignored' : '',
    isDropAlert ? 'drop-alert-active' : ''
  ].filter(Boolean).join(' ');

  return `
    <article class="${cardClasses}" data-ride-id="${item.id}">
      <div class="ride-main-row">
        <div class="ride-info-col">
          <div class="ride-meta-row">
            <span class="land-tag">${escapeHtml(item.land)}</span>
            ${priorityTagHtml}
          </div>
          <h2 class="ride-title" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</h2>
          <div class="ride-subtags">
            ${featuresHtml}
          </div>
        </div>

        <div class="ride-actions-col">
          <!-- Ignore / Move to Bottom Toggle -->
          <button class="ignore-toggle-btn ${isIgnored ? 'is-active' : ''}" 
                  data-ride-id="${item.id}" 
                  title="${isIgnored ? 'Restore this ride to normal' : 'Move to bottom of list'}" 
                  aria-label="Move to Bottom">
            ${isIgnored ? '↩️' : '🚫'}
          </button>

          <!-- Priority Star Toggle -->
          <button class="priority-toggle-btn ${priorityBtnClass}" 
                  data-ride-id="${item.id}" 
                  title="Cycle Priority (None -> Must-Do -> Backup)" 
                  aria-label="Toggle Priority">
            ${priorityIcon}
          </button>

          <!-- Wait Time Bubble -->
          <div class="wait-time-pill ${waitClass}">
            <span class="wait-number">${waitDisplay}</span>
            ${waitUnit ? `<span class="wait-unit">${waitUnit}</span>` : ''}
          </div>
        </div>
      </div>

      <!-- Expert Tip Accordion -->
      ${item.expertTip ? `
        <div class="expert-tip-box" id="tip-${item.id}" style="display: none;">
          <span class="expert-icon">🏰</span>
          <span>${escapeHtml(item.expertTip)}</span>
        </div>
      ` : ''}
    </article>
  `;
}

function updateFilterCounts(attractions) {
  const countAll = document.getElementById('count-all');
  if (countAll) {
    countAll.textContent = attractions.length;
  }

  const countMustDo = document.getElementById('count-mustdo');
  if (countMustDo) {
    const inPark = attractions.filter(a => isRideMustDo(a)).length;
    countMustDo.textContent = inPark;
  }

  const countSec = document.getElementById('count-secondary');
  if (countSec) {
    const inPark = attractions.filter(a => isRideSecondary(a)).length;
    countSec.textContent = inPark;
  }

  const countUnder20 = document.getElementById('count-under20');
  if (countUnder20) {
    const c = attractions.filter(a => !isRideIgnored(a) && a.status === 'OPERATING' && a.waitTime !== null && a.waitTime <= state.alertThreshold).length;
    countUnder20.textContent = c;
  }

  const countIgnored = document.getElementById('count-ignored');
  if (countIgnored) {
    const c = attractions.filter(a => isRideIgnored(a)).length;
    countIgnored.textContent = c;
  }
}

// =============================================================================
// 8. PRIORITY & IGNORE STATE MACHINE
// =============================================================================

function cyclePriority(item) {
  if (!item) return;
  const k = cleanKey(item.name);
  const id = item.id;
  const entry = { id: id, name: item.name, parkId: item.parkId };

  // If currently hidden/ignored, unhide first
  delete state.ignored[k];
  if (id) delete state.ignored[id];

  const wasMustDo = isRideMustDo(item);
  const wasSecondary = isRideSecondary(item);

  if (wasMustDo) {
    // Must-Do -> Secondary
    delete state.mustDos[k];
    if (id) delete state.mustDos[id];

    state.secondaries[k] = entry;
    showToast(`◆ "${item.name}" moved to Backup`);
  } else if (wasSecondary) {
    // Secondary -> None
    delete state.secondaries[k];
    if (id) delete state.secondaries[id];
    showToast(`Cleared "${item.name}" from priorities`);
  } else {
    // None -> Must-Do (Pinned to TOP)
    state.mustDos[k] = entry;
    showToast(`★ "${item.name}" moved to Top (Must-Do)!`);
  }

  savePriorities();
  renderRidesList();
  checkPriorityAlerts();
}

function toggleIgnore(item) {
  if (!item) return;
  const k = cleanKey(item.name);
  const id = item.id;
  const entry = { id: id, name: item.name, parkId: item.parkId };

  const wasIgnored = isRideIgnored(item);

  if (wasIgnored) {
    delete state.ignored[k];
    if (id) delete state.ignored[id];
    showToast(`Restored "${item.name}" to normal`);
  } else {
    delete state.mustDos[k];
    if (id) delete state.mustDos[id];
    delete state.secondaries[k];
    if (id) delete state.secondaries[id];

    state.ignored[k] = entry;
    showToast(`🚫 "${item.name}" moved to bottom of list`);
  }

  savePriorities();
  renderRidesList();
  checkPriorityAlerts();
  renderStatsRibbon();
}

function unignoreAllRides() {
  state.ignored = {};
  savePriorities();
  renderRidesList();
  renderStatsRibbon();
  showToast('Restored all hidden rides');
}

function clearAllPriorities() {
  state.mustDos = {};
  state.secondaries = {};
  state.ignored = {};
  savePriorities();
  renderRidesList();
  checkPriorityAlerts();
  showToast('All priorities and hidden rides cleared.');
}

function updateSettingsUI() {
  const thresholdDisplay = document.getElementById('thresholdDisplay');
  if (thresholdDisplay) thresholdDisplay.textContent = `${state.alertThreshold} min`;

  document.querySelectorAll('.threshold-pill').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.val, 10) === state.alertThreshold);
  });

  document.querySelectorAll('.refresh-pill').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.min, 10) === state.autoRefreshMinutes);
  });

  const soundToggle = document.getElementById('soundToggle');
  if (soundToggle) soundToggle.checked = state.soundEnabled;

  const notifyToggle = document.getElementById('notifyToggle');
  if (notifyToggle) notifyToggle.checked = state.notificationsEnabled;

  const settingsIgnoredCount = document.getElementById('settingsIgnoredCount');
  if (settingsIgnoredCount) settingsIgnoredCount.textContent = `${Object.keys(state.ignored).length} at bottom`;

  const storageSummaryText = document.getElementById('storageSummaryText');
  if (storageSummaryText) {
    const mCount = Object.keys(state.mustDos).length;
    const sCount = Object.keys(state.secondaries).length;
    storageSummaryText.textContent = `Saved permanently on this iPhone: ${mCount} Must-Dos (Top), ${sCount} Backups.`;
  }
}

// =============================================================================
// 9. FAMILY SHARING & SYNC
// =============================================================================

function generateShareUrl() {
  const payload = {
    m: state.mustDos,
    s: state.secondaries,
    i: state.ignored,
    p: state.currentParkId
  };

  const jsonStr = JSON.stringify(payload);
  const base64Str = btoa(encodeURIComponent(jsonStr));
  const url = new URL(window.location.href);
  url.hash = `plan=${base64Str}`;
  return url.toString();
}

function checkSharedPlanUrl() {
  const hash = window.location.hash;
  if (!hash || !hash.includes('plan=')) return;

  try {
    const rawBase64 = hash.split('plan=')[1];
    const decodedJson = decodeURIComponent(atob(rawBase64));
    const data = JSON.parse(decodedJson);

    if (data && (typeof data.m === 'object' || typeof data.s === 'object')) {
      state.pendingSharedPlan = data;

      const banner = document.getElementById('familyImportBanner');
      const summary = document.getElementById('familyImportSummary');
      if (banner && summary) {
        const mCount = Object.keys(data.m || {}).length;
        const sCount = Object.keys(data.s || {}).length;
        summary.textContent = `Includes ${mCount} Must-Dos (Top) and ${sCount} Backups.`;
        banner.style.display = 'flex';
      }
    }
  } catch (err) {
    console.warn('Could not parse shared plan URL:', err);
  }
}

function acceptSharedPlan() {
  if (!state.pendingSharedPlan) return;

  const data = state.pendingSharedPlan;
  state.mustDos = data.m || {};
  state.secondaries = data.s || {};
  state.ignored = data.i || {};

  if (data.p && PARKS[data.p]) {
    state.currentParkId = data.p;
    initTheme(data.p);
  }

  savePriorities();
  renderRidesList();
  checkPriorityAlerts();

  window.history.replaceState(null, null, window.location.pathname);
  document.getElementById('familyImportBanner').style.display = 'none';
  state.pendingSharedPlan = null;
  showToast('🎉 Family Plan saved to top of your iPhone list!');
}

function openShareModal() {
  const shareMustDoCount = document.getElementById('shareMustDoCount');
  const shareBackupCount = document.getElementById('shareBackupCount');
  const shareIgnoredCount = document.getElementById('shareIgnoredCount');

  if (shareMustDoCount) shareMustDoCount.textContent = Object.keys(state.mustDos).length;
  if (shareBackupCount) shareBackupCount.textContent = Object.keys(state.secondaries).length;
  if (shareIgnoredCount) shareIgnoredCount.textContent = Object.keys(state.ignored).length;

  document.getElementById('shareModal').style.display = 'flex';
}

async function sharePlanNative() {
  const shareUrl = generateShareUrl();
  const count = Object.keys(state.mustDos).length;
  const shareData = {
    title: 'Our Disney World Touring Plan (RopeDrop)',
    text: `Here are our Disney World Must-Dos (${count}) & Backup rides! Open on your iPhone to save:`,
    url: shareUrl
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      closeModals();
      return;
    } catch (e) {}
  }

  copyShareUrlToClipboard(shareUrl);
}

function copyShareUrlToClipboard(url) {
  const finalUrl = url || generateShareUrl();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(finalUrl).then(() => {
      showToast('📋 Family share link copied to clipboard!');
      closeModals();
    });
  } else {
    prompt('Copy this link and text it to your family:', finalUrl);
  }
}

// =============================================================================
// 10. SHORT WAIT OPPORTUNITY ALERT ENGINE (≤ 20 min)
// =============================================================================

function checkPriorityAlerts() {
  const banner = document.getElementById('priorityAlertBanner');
  const alertList = document.getElementById('alertRidesList');
  const alertCountBadge = document.getElementById('alertCountBadge');
  const alertSubtitle = document.getElementById('alertSubtitle');
  if (!banner || !alertList) return;

  const currentAttractions = state.parkData[state.currentParkId] || [];

  const qualifyingRides = currentAttractions.filter(item => {
    if (isRideIgnored(item)) return false;
    const isFav = isRideMustDo(item) || isRideSecondary(item);
    return isFav && item.status === 'OPERATING' && item.waitTime !== null && item.waitTime <= state.alertThreshold;
  });

  if (qualifyingRides.length === 0) {
    banner.style.display = 'none';
    state.lastAlertedIds.clear();
    return;
  }

  banner.style.display = 'flex';
  if (alertCountBadge) alertCountBadge.textContent = `${qualifyingRides.length} Ready Now`;
  if (alertSubtitle) {
    alertSubtitle.innerHTML = `Your top rides currently have a wait time of <strong>${state.alertThreshold} minutes or less</strong>! Head there now.`;
  }

  let pillsHtml = '';
  let hasNewAlert = false;

  for (const ride of qualifyingRides) {
    const isMustDo = isRideMustDo(ride);
    const starPrefix = isMustDo ? '★ ' : '◆ ';

    pillsHtml += `
      <div class="alert-ride-pill" data-ride-id="${ride.id}">
        <span>${starPrefix}${escapeHtml(ride.name)}</span>
        <span class="wait-tag">${ride.waitTime}m</span>
      </div>
    `;

    if (!state.lastAlertedIds.has(ride.id)) {
      hasNewAlert = true;
      state.lastAlertedIds.add(ride.id);
    }
  }

  alertList.innerHTML = pillsHtml;

  alertList.querySelectorAll('.alert-ride-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const card = document.querySelector(`.ride-card[data-ride-id="${pill.dataset.rideId}"]`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.style.transition = 'box-shadow 0.3s ease';
        card.style.boxShadow = '0 0 25px #10b981';
        setTimeout(() => {
          card.style.boxShadow = '';
        }, 1500);
      }
    });
  });

  if (hasNewAlert) {
    if (state.soundEnabled) playDisneyChime();
    if (state.notificationsEnabled) sendWebNotification(qualifyingRides);
  }
}

function playDisneyChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const now = ctx.currentTime;

    const notes = [783.99, 1046.50, 1318.51, 1567.98];
    const delays = [0.0, 0.12, 0.24, 0.36];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + delays[i]);

      gain.gain.setValueAtTime(0.001, now + delays[i]);
      gain.gain.exponentialRampToValueAtTime(0.2, now + delays[i] + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delays[i] + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delays[i]);
      osc.stop(now + delays[i] + 0.85);
    });
  } catch (err) {}
}

function sendWebNotification(rides) {
  if (!('Notification' in window)) return;

  if (Notification.permission === 'granted') {
    const rideNames = rides.map(r => `${r.name} (${r.waitTime}m)`).join(', ');
    new Notification('🏰 RopeDrop: Short Wait Alert!', {
      body: `Ready now: ${rideNames}`,
      icon: 'apple-touch-icon.png'
    });
  }
}

// =============================================================================
// 11. AUTO-REFRESH TIMER & VISIBILITY
// =============================================================================

function startAutoRefreshTimer() {
  if (state.timerInterval) clearInterval(state.timerInterval);

  state.timerInterval = setInterval(() => {
    state.secondsRemaining--;

    if (state.secondsRemaining <= 0) {
      state.secondsRemaining = state.autoRefreshMinutes * 60;
      fetchParkData(state.currentParkId);
      fetchAllParksForHopper();
    }

    updateTimerDisplay();
  }, 1000);
}

function updateTimerDisplay() {
  const timerCountdown = document.getElementById('timerCountdown');
  if (!timerCountdown) return;

  const mins = Math.floor(state.secondsRemaining / 60);
  const secs = state.secondsRemaining % 60;
  timerCountdown.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    const meta = state.parkMeta[state.currentParkId];
    if (meta && meta.lastUpdated) {
      const elapsedMinutes = (new Date() - meta.lastUpdated) / 1000 / 60;
      if (elapsedMinutes >= 3) {
        fetchParkData(state.currentParkId);
        fetchAllParksForHopper();
      }
    }
  }
});

// =============================================================================
// 12. PARK HOPPER COMPARISON OVERVIEW
// =============================================================================

function updateHopperCardsUI() {
  for (const [pid, park] of Object.entries(PARKS)) {
    const meta = state.parkMeta[pid];
    const attractions = state.parkData[pid] || [];

    const avgEl = document.getElementById(`hopAvg-${park.code}`);
    const openEl = document.getElementById(`hopOpen-${park.code}`);
    const walkEl = document.getElementById(`hopWalk-${park.code}`);
    const favEl = document.getElementById(`hopFav-${park.code}`);
    const headlinersEl = document.getElementById(`hopHeadliners-${park.code}`);

    if (meta && avgEl) {
      avgEl.textContent = `Avg ${meta.avgWait}m`;
      if (openEl) openEl.textContent = `${meta.openCount}`;
      if (walkEl) walkEl.textContent = `${meta.walkonCount}`;
      
      const favCount = attractions.filter(a => !isRideIgnored(a) && (isRideMustDo(a) || isRideSecondary(a))).length;
      if (favEl) favEl.textContent = `${favCount}`;
    }

    if (headlinersEl && attractions.length > 0) {
      const headlinerWaits = park.headliners.slice(0, 3).map(hName => {
        const item = attractions.find(a => a.name.toLowerCase().includes(hName.toLowerCase()));
        if (!item) return null;
        const waitStr = item.status === 'OPERATING' && item.waitTime !== null ? `${item.waitTime}m` : (item.status === 'DOWN' ? 'DOWN' : 'CLOSED');
        return `<strong>${item.name}</strong>: ${waitStr}`;
      }).filter(Boolean);

      if (headlinerWaits.length > 0) {
        headlinersEl.innerHTML = headlinerWaits.join(' • ');
      }
    }
  }
}

function switchPark(parkId) {
  if (!PARKS[parkId]) return;
  state.currentParkId = parkId;
  localStorage.setItem(STORAGE_KEYS.PARK_ID, parkId);

  initTheme(parkId);
  renderStatsRibbon();

  if (state.parkData[parkId]) {
    renderLandChips(state.parkData[parkId]);
    renderRidesList();
    checkPriorityAlerts();
  }

  fetchParkData(parkId);
  closeModals();
}

// =============================================================================
// 13. EVENT LISTENERS & CONTROLS
// =============================================================================

function initEventListeners() {
  const refreshBtn = document.getElementById('refreshBtn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      fetchParkData(state.currentParkId, true);
      fetchAllParksForHopper();
    });
  }

  document.querySelectorAll('.park-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const parkId = tab.dataset.park;
      switchPark(parkId);
    });
  });

  const parkHeaderTitle = document.getElementById('parkHeaderTitle');
  if (parkHeaderTitle) {
    parkHeaderTitle.addEventListener('click', () => {
      document.getElementById('parkSelectModal').style.display = 'flex';
    });
  }

  document.querySelectorAll('.park-choice-card').forEach(card => {
    card.addEventListener('click', () => {
      const parkId = card.dataset.park;
      switchPark(parkId);
    });
  });

  const openHopperBtn = document.getElementById('openHopperBtn');
  if (openHopperBtn) {
    openHopperBtn.addEventListener('click', () => {
      updateHopperCardsUI();
      document.getElementById('hopperModal').style.display = 'flex';
    });
  }

  document.querySelectorAll('.btn-hop').forEach(btn => {
    btn.addEventListener('click', () => {
      const parkId = btn.dataset.park;
      switchPark(parkId);
    });
  });

  const quickShareBtn = document.getElementById('quickShareBtn');
  if (quickShareBtn) {
    quickShareBtn.addEventListener('click', openShareModal);
  }

  const settingsOpenShareBtn = document.getElementById('settingsOpenShareBtn');
  if (settingsOpenShareBtn) {
    settingsOpenShareBtn.addEventListener('click', () => {
      closeModals();
      openShareModal();
    });
  }

  const nativeShareBtn = document.getElementById('nativeShareBtn');
  if (nativeShareBtn) {
    nativeShareBtn.addEventListener('click', sharePlanNative);
  }

  const copyShareLinkBtn = document.getElementById('copyShareLinkBtn');
  if (copyShareLinkBtn) {
    copyShareLinkBtn.addEventListener('click', () => copyShareUrlToClipboard());
  }

  const closeShareModalBtn = document.getElementById('closeShareModalBtn');
  if (closeShareModalBtn) {
    closeShareModalBtn.addEventListener('click', closeModals);
  }

  const acceptFamilyPlanBtn = document.getElementById('acceptFamilyPlanBtn');
  if (acceptFamilyPlanBtn) {
    acceptFamilyPlanBtn.addEventListener('click', acceptSharedPlan);
  }

  const declineFamilyPlanBtn = document.getElementById('declineFamilyPlanBtn');
  if (declineFamilyPlanBtn) {
    declineFamilyPlanBtn.addEventListener('click', () => {
      document.getElementById('familyImportBanner').style.display = 'none';
      window.history.replaceState(null, null, window.location.pathname);
    });
  }

  const openSettingsBtn = document.getElementById('openSettingsBtn');
  if (openSettingsBtn) {
    openSettingsBtn.addEventListener('click', () => {
      updateSettingsUI();
      document.getElementById('settingsModal').style.display = 'flex';
    });
  }

  document.getElementById('closeHopperModalBtn').addEventListener('click', closeModals);
  document.getElementById('closeSettingsModalBtn').addEventListener('click', closeModals);
  document.getElementById('closeParkSelectBtn').addEventListener('click', closeModals);

  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModals();
    });
  });

  const dismissAlertBtn = document.getElementById('dismissAlertBtn');
  if (dismissAlertBtn) {
    dismissAlertBtn.addEventListener('click', () => {
      document.getElementById('priorityAlertBanner').style.display = 'none';
    });
  }

  // Search Input
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (clearSearchBtn) clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
      renderRidesList();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.searchQuery = '';
      clearSearchBtn.style.display = 'none';
      renderRidesList();
    });
  }

  // Sort Dropdown
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.selectedSort = e.target.value;
      renderRidesList();
    });
  }

  // Filter Chips
  document.querySelectorAll('.filter-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chips .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.selectedFilter = chip.dataset.filter;
      renderRidesList();
    });
  });

  // Reset Filters in Empty State
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      state.searchQuery = '';
      state.selectedFilter = 'all';
      state.selectedLand = 'all';
      if (searchInput) searchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.style.display = 'none';
      document.querySelectorAll('.filter-chips .chip').forEach(c => c.classList.remove('active'));
      document.querySelector('.filter-chips .chip[data-filter="all"]').classList.add('active');
      renderLandChips(state.parkData[state.currentParkId] || []);
      renderRidesList();
    });
  }

  // Threshold Setting Pills
  document.querySelectorAll('.threshold-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      state.alertThreshold = parseInt(btn.dataset.val, 10);
      localStorage.setItem(STORAGE_KEYS.THRESHOLD, state.alertThreshold);
      updateSettingsUI();
      checkPriorityAlerts();
      renderStatsRibbon();
      renderRidesList();
      showToast(`Alert threshold set to ${state.alertThreshold} min`);
    });
  });

  // Refresh Interval Setting Pills
  document.querySelectorAll('.refresh-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      state.autoRefreshMinutes = parseInt(btn.dataset.min, 10);
      localStorage.setItem(STORAGE_KEYS.REFRESH_MINS, state.autoRefreshMinutes);
      state.secondsRemaining = state.autoRefreshMinutes * 60;
      updateSettingsUI();
      const refreshIntervalDisplay = document.getElementById('refreshIntervalDisplay');
      if (refreshIntervalDisplay) refreshIntervalDisplay.textContent = `${state.autoRefreshMinutes} min`;
      showToast(`Auto-refresh set to every ${state.autoRefreshMinutes} mins`);
    });
  });

  // Unignore all button
  const unignoreAllBtn = document.getElementById('unignoreAllBtn');
  if (unignoreAllBtn) {
    unignoreAllBtn.addEventListener('click', () => {
      unignoreAllRides();
      closeModals();
    });
  }

  // Sound Toggle
  const soundToggle = document.getElementById('soundToggle');
  if (soundToggle) {
    soundToggle.addEventListener('change', (e) => {
      state.soundEnabled = e.target.checked;
      localStorage.setItem(STORAGE_KEYS.SOUND, state.soundEnabled);
      if (state.soundEnabled) playDisneyChime();
    });
  }

  // Test Chime
  const testSoundBtn = document.getElementById('testSoundBtn');
  if (testSoundBtn) {
    testSoundBtn.addEventListener('click', () => {
      playDisneyChime();
      showToast('🎶 Played Disney Fairy Chime');
    });
  }

  // Notification Toggle
  const notifyToggle = document.getElementById('notifyToggle');
  if (notifyToggle) {
    notifyToggle.addEventListener('change', async (e) => {
      if (e.target.checked) {
        if ('Notification' in window) {
          const perm = await Notification.requestPermission();
          if (perm === 'granted') {
            state.notificationsEnabled = true;
            localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, 'true');
            showToast('✅ Notifications enabled!');
          } else {
            notifyToggle.checked = false;
            state.notificationsEnabled = false;
            showToast('⚠️ Notifications denied in browser settings.');
          }
        }
      } else {
        state.notificationsEnabled = false;
        localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, 'false');
      }
    });
  }

  // Reset All Priorities
  const resetPrioritiesBtn = document.getElementById('resetPrioritiesBtn');
  if (resetPrioritiesBtn) {
    resetPrioritiesBtn.addEventListener('click', () => {
      if (confirm('Clear all your Must-Dos, Backups, and Hidden rides?')) {
        clearAllPriorities();
        closeModals();
      }
    });
  }
}

function closeModals() {
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.style.display = 'none';
  });
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.style.display = 'flex';

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.display = 'none';
  }, 2400);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
