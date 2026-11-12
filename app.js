/**
 * ROPEDROP - DISNEY WORLD WAIT TIMES & PARK HOPPER PWA
 * Act as a Disney World Expert: Live wait times, priority alerts, land mapping, park hopping, and permanent persistence.
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

// =============================================================================
// 2. DISNEY EXPERT LAND MAPPING & INSIDER TIPS
// =============================================================================

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
  'space mountain': '💡 Disney Expert Tip: Waits drop significantly right after the Happily Ever After fireworks display. Great night ride!',
  'tron lightcycle / run': '💡 Disney Expert Tip: Keep an eye out for evening standby drops. Night rides are unmatched when the canopy is illuminated.',
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

// Normalize ride name for resilient string matching
function normalizeRideName(name) {
  if (!name) return '';
  return name.toLowerCase()
    .replace(/[^a-z0-9]/g, '') // remove spaces, punctuation, special chars
    .trim();
}

// =============================================================================
// 3. APPLICATION STATE & STORAGE ENGINE
// =============================================================================

const state = {
  currentParkId: '75ea578a-adc8-4116-a54d-dccb60765ef9', // Default: Magic Kingdom
  
  // Dual-Key Priority Tracking: Maps UUIDs & Normalized Names
  mustDos: [],          // [{ id, name, parkId }]
  secondaries: [],      // [{ id, name, parkId }]
  ignored: [],          // [{ id, name, parkId }]

  mustDoIds: new Set(),
  mustDoNames: new Set(),

  secondaryIds: new Set(),
  secondaryNames: new Set(),

  ignoredIds: new Set(),
  ignoredNames: new Set(),

  alertThreshold: 20,       // minutes
  soundEnabled: true,
  notificationsEnabled: false,
  autoRefreshMinutes: 5,
  
  // Data caches
  parkData: {},             // parkId -> enriched attractions array
  parkMeta: {},             // parkId -> { avgWait, openCount, walkonCount, lastUpdated }
  
  // UI filter state
  searchQuery: '',
  selectedFilter: 'all',    // all, must-do, secondary, under20, thrill, family, ignored, down
  selectedLand: 'all',
  selectedSort: 'wait-asc',

  // Timer & alerts
  secondsRemaining: 300,
  timerInterval: null,
  isRefreshing: false,
  lastAlertedIds: new Set(),

  pendingSharedPlan: null
};

// Storage Keys
const STORAGE_KEYS = {
  PARK_ID: 'ropedrop_current_park_id',
  MUST_DOS: 'ropedrop_must_dos_v2',
  SECONDARIES: 'ropedrop_secondaries_v2',
  IGNORED: 'ropedrop_ignored_v2',
  THRESHOLD: 'ropedrop_alert_threshold',
  SOUND: 'ropedrop_sound_enabled',
  NOTIFICATIONS: 'ropedrop_notifications_enabled',
  REFRESH_MINS: 'ropedrop_refresh_interval'
};

// Legacy keys to auto-migrate from previous versions
const LEGACY_STORAGE_KEYS = {
  MUST_DOS: ['ropedrop_must_dos', 'mousehop_must_dos', 'disney_must_dos', 'disney_favorites'],
  SECONDARIES: ['ropedrop_secondaries', 'mousehop_secondaries', 'disney_secondaries'],
  IGNORED: ['ropedrop_ignored', 'mousehop_ignored', 'disney_ignored']
};

// =============================================================================
// 4. INDEXEDDB DUAL-LAYER STORAGE (iOS SAFARI RESILIENCE)
// =============================================================================

const DB_NAME = 'ropedrop_storage_db';
const DB_VERSION = 1;
const DB_STORE = 'app_preferences';

function openIndexedDb() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      resolve(null);
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(DB_STORE)) {
        db.createObjectStore(DB_STORE);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => resolve(null);
  });
}

async function saveToIndexedDb(key, value) {
  try {
    const db = await openIndexedDb();
    if (!db) return;
    const tx = db.transaction(DB_STORE, 'readwrite');
    tx.objectStore(DB_STORE).put(value, key);
  } catch (err) {
    // Non-critical background save failure
  }
}

async function getFromIndexedDb(key) {
  try {
    const db = await openIndexedDb();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(DB_STORE, 'readonly');
      const req = tx.objectStore(DB_STORE).get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    return null;
  }
}

// =============================================================================
// 5. INITIALIZATION & LIFECYCLE
// =============================================================================

document.addEventListener('DOMContentLoaded', async () => {
  loadStoredPreferences();
  await checkIndexedDbFallback();
  checkSharedPlanUrl();
  initServiceWorker();
  initEventListeners();
  initTheme(state.currentParkId);
  startAutoRefreshTimer();
  fetchParkData(state.currentParkId);
  fetchAllParksForHopper();
});

function loadStoredPreferences() {
  try {
    const savedPark = localStorage.getItem(STORAGE_KEYS.PARK_ID) || localStorage.getItem('mousehop_current_park_id') || localStorage.getItem('disney_current_park_id');
    if (savedPark && PARKS[savedPark]) {
      state.currentParkId = savedPark;
    }

    // Load Must-Dos with legacy fallback
    let rawMustDos = localStorage.getItem(STORAGE_KEYS.MUST_DOS);
    if (!rawMustDos) {
      for (const k of LEGACY_STORAGE_KEYS.MUST_DOS) {
        const val = localStorage.getItem(k);
        if (val) { rawMustDos = val; break; }
      }
    }
    if (rawMustDos) {
      parseAndSetFavorites('mustDos', JSON.parse(rawMustDos));
    }

    // Load Backups with legacy fallback
    let rawSec = localStorage.getItem(STORAGE_KEYS.SECONDARIES);
    if (!rawSec) {
      for (const k of LEGACY_STORAGE_KEYS.SECONDARIES) {
        const val = localStorage.getItem(k);
        if (val) { rawSec = val; break; }
      }
    }
    if (rawSec) {
      parseAndSetFavorites('secondaries', JSON.parse(rawSec));
    }

    // Load Ignored with legacy fallback
    let rawIgnored = localStorage.getItem(STORAGE_KEYS.IGNORED);
    if (!rawIgnored) {
      for (const k of LEGACY_STORAGE_KEYS.IGNORED) {
        const val = localStorage.getItem(k);
        if (val) { rawIgnored = val; break; }
      }
    }
    if (rawIgnored) {
      parseAndSetFavorites('ignored', JSON.parse(rawIgnored));
    }

    // Load settings
    const savedThreshold = localStorage.getItem(STORAGE_KEYS.THRESHOLD) || localStorage.getItem('mousehop_alert_threshold') || localStorage.getItem('disney_alert_threshold');
    if (savedThreshold) state.alertThreshold = parseInt(savedThreshold, 10) || 20;

    const savedSound = localStorage.getItem(STORAGE_KEYS.SOUND) || localStorage.getItem('mousehop_sound_enabled') || localStorage.getItem('disney_sound_enabled');
    if (savedSound !== null) state.soundEnabled = savedSound === 'true';

    const savedNotifs = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || localStorage.getItem('mousehop_notifications_enabled') || localStorage.getItem('disney_notifications_enabled');
    if (savedNotifs !== null) state.notificationsEnabled = savedNotifs === 'true';

    const savedRefresh = localStorage.getItem(STORAGE_KEYS.REFRESH_MINS) || localStorage.getItem('mousehop_refresh_interval') || localStorage.getItem('disney_refresh_interval');
    if (savedRefresh) state.autoRefreshMinutes = parseInt(savedRefresh, 10) || 5;

    state.secondsRemaining = state.autoRefreshMinutes * 60;
  } catch (err) {
    console.warn('Error loading preferences from localStorage:', err);
  }

  updateSettingsUI();
}

// Fallback check against IndexedDB if localStorage was cleared by iOS
async function checkIndexedDbFallback() {
  if (state.mustDos.length === 0) {
    const idbMust = await getFromIndexedDb(STORAGE_KEYS.MUST_DOS);
    if (idbMust && idbMust.length > 0) {
      parseAndSetFavorites('mustDos', idbMust);
    }
  }
  if (state.secondaries.length === 0) {
    const idbSec = await getFromIndexedDb(STORAGE_KEYS.SECONDARIES);
    if (idbSec && idbSec.length > 0) {
      parseAndSetFavorites('secondaries', idbSec);
    }
  }
  if (state.ignored.length === 0) {
    const idbIgn = await getFromIndexedDb(STORAGE_KEYS.IGNORED);
    if (idbIgn && idbIgn.length > 0) {
      parseAndSetFavorites('ignored', idbIgn);
    }
  }
  rebuildIndexSets();
}

function parseAndSetFavorites(type, items) {
  if (!Array.isArray(items)) return;
  
  const targetArr = [];
  items.forEach(item => {
    if (typeof item === 'string') {
      // Legacy ID string
      targetArr.push({ id: item, name: '', parkId: '' });
    } else if (typeof item === 'object' && item !== null) {
      // Upgraded object { id, name, parkId }
      targetArr.push({
        id: item.id || '',
        name: item.name || '',
        parkId: item.parkId || ''
      });
    }
  });

  state[type] = targetArr;
  rebuildIndexSets();
}

function rebuildIndexSets() {
  state.mustDoIds.clear();
  state.mustDoNames.clear();
  state.mustDos.forEach(item => {
    if (item.id) state.mustDoIds.add(item.id);
    if (item.name) state.mustDoNames.add(normalizeRideName(item.name));
  });

  state.secondaryIds.clear();
  state.secondaryNames.clear();
  state.secondaries.forEach(item => {
    if (item.id) state.secondaryIds.add(item.id);
    if (item.name) state.secondaryNames.add(normalizeRideName(item.name));
  });

  state.ignoredIds.clear();
  state.ignoredNames.clear();
  state.ignored.forEach(item => {
    if (item.id) state.ignoredIds.add(item.id);
    if (item.name) state.ignoredNames.add(normalizeRideName(item.name));
  });
}

function savePriorities() {
  try {
    rebuildIndexSets();

    const mustJson = JSON.stringify(state.mustDos);
    const secJson = JSON.stringify(state.secondaries);
    const ignJson = JSON.stringify(state.ignored);

    // Save to primary localStorage
    localStorage.setItem(STORAGE_KEYS.MUST_DOS, mustJson);
    localStorage.setItem(STORAGE_KEYS.SECONDARIES, secJson);
    localStorage.setItem(STORAGE_KEYS.IGNORED, ignJson);
    localStorage.setItem(STORAGE_KEYS.PARK_ID, state.currentParkId);

    // Also mirror to legacy keys so switching versions never loses data
    localStorage.setItem('mousehop_must_dos', mustJson);
    localStorage.setItem('disney_must_dos', mustJson);

    // Save to IndexedDB (asynchronous dual-layer backup)
    saveToIndexedDb(STORAGE_KEYS.MUST_DOS, state.mustDos);
    saveToIndexedDb(STORAGE_KEYS.SECONDARIES, state.secondaries);
    saveToIndexedDb(STORAGE_KEYS.IGNORED, state.ignored);
    saveToIndexedDb(STORAGE_KEYS.PARK_ID, state.currentParkId);
  } catch (err) {
    console.warn('Could not save priorities:', err);
  }
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
  if (settingsIgnoredCount) settingsIgnoredCount.textContent = `${state.ignored.length} hidden`;

  const storageSummaryText = document.getElementById('storageSummaryText');
  if (storageSummaryText) {
    storageSummaryText.textContent = `Active saved list: ${state.mustDos.length} Must-Dos, ${state.secondaries.length} Backups, and ${state.ignored.length} Ignored rides permanently preserved on this device.`;
  }
}

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
        .then(reg => console.log('Service Worker registered:', reg.scope))
        .catch(err => console.log('Service Worker skipped:', err));
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

  // Re-sync attraction names with saved IDs if any name was missing
  attractions.forEach(a => {
    const norm = normalizeRideName(a.name);
    // If ID matches but name was blank in stored items, populate name
    state.mustDos.forEach(m => {
      if (m.id === a.id && !m.name) m.name = a.name;
    });
    state.secondaries.forEach(s => {
      if (s.id === a.id && !s.name) s.name = a.name;
    });
    state.ignored.forEach(i => {
      if (i.id === a.id && !i.name) i.name = a.name;
    });
  });
  savePriorities();

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
    normalizedName: normalizeRideName(name),
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
      } catch (e) {
        // ignore background poll error
      }
    }
  }
  updateHopperCardsUI();
}

// =============================================================================
// 7. MATCHING HELPERS (FAIL-PROOF DUAL KEY)
// =============================================================================

function isRideMustDo(item) {
  if (!item) return false;
  return state.mustDoIds.has(item.id) || state.mustDoNames.has(item.normalizedName || normalizeRideName(item.name));
}

function isRideSecondary(item) {
  if (!item) return false;
  return state.secondaryIds.has(item.id) || state.secondaryNames.has(item.normalizedName || normalizeRideName(item.name));
}

function isRideIgnored(item) {
  if (!item) return false;
  return state.ignoredIds.has(item.id) || state.ignoredNames.has(item.normalizedName || normalizeRideName(item.name));
}

function getPriorityLevel(item) {
  if (isRideIgnored(item)) return -1;
  if (isRideMustDo(item)) return 2;
  if (isRideSecondary(item)) return 1;
  return 0;
}

// =============================================================================
// 8. RENDER FUNCTIONS
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
  const otherParksNotice = document.getElementById('otherParksNotice');
  const otherParksNoticeText = document.getElementById('otherParksNoticeText');
  const switchOtherParkBtn = document.getElementById('switchOtherParkBtn');
  if (!container) return;

  const allAttractions = state.parkData[state.currentParkId] || [];

  updateFilterCounts(allAttractions);

  let filtered = allAttractions.filter(item => {
    const isIgnored = isRideIgnored(item);

    if (state.selectedFilter === 'ignored') {
      return isIgnored;
    }

    if (isIgnored) {
      return false;
    }

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

    // Category Filter Chips
    switch (state.selectedFilter) {
      case 'must-do':
        return isRideMustDo(item);
      case 'secondary':
        return isRideSecondary(item);
      case 'under20':
        return item.status === 'OPERATING' && item.waitTime !== null && item.waitTime <= state.alertThreshold;
      case 'thrill':
        return item.isThrill;
      case 'family':
        return !item.isThrill;
      case 'down':
        return item.status !== 'OPERATING';
      case 'all':
      default:
        return true;
    }
  });

  // Cross-Park Favorites Helper Notice
  if (otherParksNotice) {
    if ((state.selectedFilter === 'must-do' || state.selectedFilter === 'secondary') && filtered.length === 0) {
      const otherParkWithFav = findOtherParkWithFavorites(state.selectedFilter);
      if (otherParkWithFav) {
        otherParksNotice.style.display = 'flex';
        const label = state.selectedFilter === 'must-do' ? 'Must-Dos' : 'Backups';
        otherParksNoticeText.innerHTML = `You have <strong>${otherParkWithFav.count} ${label}</strong> saved at <strong>${otherParkWithFav.name}</strong>!`;
        switchOtherParkBtn.onclick = () => switchPark(otherParkWithFav.id);
      } else {
        otherParksNotice.style.display = 'none';
      }
    } else {
      otherParksNotice.style.display = 'none';
    }
  }

  // Apply Sorting
  filtered.sort((a, b) => {
    if (state.selectedSort === 'priority') {
      const pA = getPriorityLevel(a);
      const pB = getPriorityLevel(b);
      if (pA !== pB) return pB - pA;
      return (a.waitTime ?? 999) - (b.waitTime ?? 999);
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
        emptyDesc.textContent = `No Must-Do rides saved for ${PARKS[state.currentParkId]?.name || 'this park'}. Tap the star on any ride to add it!`;
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

  container.querySelectorAll('.priority-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const rideId = btn.dataset.rideId;
      const rideName = btn.dataset.rideName;
      cyclePriority(rideId, rideName);
    });
  });

  container.querySelectorAll('.ignore-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const rideId = btn.dataset.rideId;
      const rideName = btn.dataset.rideName;
      toggleIgnore(rideId, rideName);
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

function findOtherParkWithFavorites(filterType) {
  for (const [pid, park] of Object.entries(PARKS)) {
    if (pid === state.currentParkId) continue;
    const attractions = state.parkData[pid] || [];
    const count = attractions.filter(a => {
      if (filterType === 'must-do') return isRideMustDo(a);
      if (filterType === 'secondary') return isRideSecondary(a);
      return false;
    }).length;

    if (count > 0) {
      return { id: pid, name: park.name, count: count };
    }
  }
  return null;
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
    priorityTagHtml = '<span class="priority-tag-pill mustdo">★ Must-Do</span>';
  } else if (isSecondary) {
    priorityBtnClass = 'state-secondary';
    priorityIcon = '◆';
    priorityTagHtml = '<span class="priority-tag-pill secondary">◆ Backup</span>';
  } else if (isIgnored) {
    priorityTagHtml = '<span class="priority-tag-pill ignored">🚫 Never Ride</span>';
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
          <!-- Ignore / Never Ride Toggle -->
          <button class="ignore-toggle-btn ${isIgnored ? 'is-active' : ''}" 
                  data-ride-id="${item.id}" 
                  data-ride-name="${escapeHtml(item.name)}" 
                  title="${isIgnored ? 'Restore this ride' : 'Ignore / Never Ride this'}" 
                  aria-label="Never Ride">
            ${isIgnored ? '↩️' : '🚫'}
          </button>

          <!-- Priority Star Toggle -->
          <button class="priority-toggle-btn ${priorityBtnClass}" 
                  data-ride-id="${item.id}" 
                  data-ride-name="${escapeHtml(item.name)}" 
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
    const unignored = attractions.filter(a => !isRideIgnored(a)).length;
    countAll.textContent = unignored;
  }

  const countMustDo = document.getElementById('count-mustdo');
  if (countMustDo) {
    const inPark = attractions.filter(a => !isRideIgnored(a) && isRideMustDo(a)).length;
    countMustDo.textContent = inPark;
  }

  const countSec = document.getElementById('count-secondary');
  if (countSec) {
    const inPark = attractions.filter(a => !isRideIgnored(a) && isRideSecondary(a)).length;
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
// 9. PRIORITY & IGNORE STATE MACHINE
// =============================================================================

function cyclePriority(rideId, rideName) {
  const normName = normalizeRideName(rideName);

  // Helper to remove from list
  const removeFrom = (list) => {
    const idx = list.findIndex(x => (rideId && x.id === rideId) || (normName && normalizeRideName(x.name) === normName));
    if (idx !== -1) list.splice(idx, 1);
  };

  // If currently ignored, remove from ignored first
  removeFrom(state.ignored);

  const currentlyMustDo = state.mustDos.some(x => (rideId && x.id === rideId) || (normName && normalizeRideName(x.name) === normName));
  const currentlySecondary = state.secondaries.some(x => (rideId && x.id === rideId) || (normName && normalizeRideName(x.name) === normName));

  if (currentlyMustDo) {
    // Must-Do -> Secondary
    removeFrom(state.mustDos);
    state.secondaries.push({ id: rideId, name: rideName, parkId: state.currentParkId });
    showToast('◆ Moved to Backup Priority');
  } else if (currentlySecondary) {
    // Secondary -> None
    removeFrom(state.secondaries);
    showToast('Cleared from Priorities');
  } else {
    // None -> Must-Do
    state.mustDos.push({ id: rideId, name: rideName, parkId: state.currentParkId });
    showToast('★ Added to Must-Do!');
  }

  savePriorities();
  renderRidesList();
  checkPriorityAlerts();
  updateSettingsUI();
}

function toggleIgnore(rideId, rideName) {
  const normName = normalizeRideName(rideName);

  const removeFrom = (list) => {
    const idx = list.findIndex(x => (rideId && x.id === rideId) || (normName && normalizeRideName(x.name) === normName));
    if (idx !== -1) list.splice(idx, 1);
  };

  const currentlyIgnored = state.ignored.some(x => (rideId && x.id === rideId) || (normName && normalizeRideName(x.name) === normName));

  if (currentlyIgnored) {
    removeFrom(state.ignored);
    showToast('Restored ride to list');
  } else {
    removeFrom(state.mustDos);
    removeFrom(state.secondaries);
    state.ignored.push({ id: rideId, name: rideName, parkId: state.currentParkId });
    showToast('🚫 Ride ignored (Never Ride)');
  }

  savePriorities();
  updateSettingsUI();
  renderRidesList();
  checkPriorityAlerts();
  renderStatsRibbon();
}

function unignoreAllRides() {
  state.ignored = [];
  savePriorities();
  updateSettingsUI();
  renderRidesList();
  renderStatsRibbon();
  showToast('Restored all ignored rides');
}

function clearAllPriorities() {
  state.mustDos = [];
  state.secondaries = [];
  state.ignored = [];
  savePriorities();
  updateSettingsUI();
  renderRidesList();
  checkPriorityAlerts();
  showToast('All priorities and ignored rides cleared.');
}

// =============================================================================
// 10. FAMILY SHARING & SYNC
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

    if (data && (Array.isArray(data.m) || Array.isArray(data.s))) {
      state.pendingSharedPlan = data;

      const banner = document.getElementById('familyImportBanner');
      const summary = document.getElementById('familyImportSummary');
      if (banner && summary) {
        summary.textContent = `Includes ${(data.m || []).length} Must-Dos, ${(data.s || []).length} Backups, and ${(data.i || []).length} Ignored rides.`;
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
  parseAndSetFavorites('mustDos', data.m || []);
  parseAndSetFavorites('secondaries', data.s || []);
  parseAndSetFavorites('ignored', data.i || []);

  if (data.p && PARKS[data.p]) {
    state.currentParkId = data.p;
    initTheme(data.p);
  }

  savePriorities();
  updateSettingsUI();
  renderRidesList();
  checkPriorityAlerts();

  window.history.replaceState(null, null, window.location.pathname);
  document.getElementById('familyImportBanner').style.display = 'none';
  state.pendingSharedPlan = null;
  showToast('🎉 Family Plan saved permanently to your iPhone!');
}

function openShareModal() {
  const shareMustDoCount = document.getElementById('shareMustDoCount');
  const shareBackupCount = document.getElementById('shareBackupCount');
  const shareIgnoredCount = document.getElementById('shareIgnoredCount');

  if (shareMustDoCount) shareMustDoCount.textContent = state.mustDos.length;
  if (shareBackupCount) shareBackupCount.textContent = state.secondaries.length;
  if (shareIgnoredCount) shareIgnoredCount.textContent = state.ignored.length;

  document.getElementById('shareModal').style.display = 'flex';
}

async function sharePlanNative() {
  const shareUrl = generateShareUrl();
  const shareData = {
    title: 'Our Disney World Touring Plan (RopeDrop)',
    text: `Here are our Disney World Must-Dos (${state.mustDos.length}) & Backup rides for our trip! Open in Safari on your iPhone to save:`,
    url: shareUrl
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      closeModals();
      return;
    } catch (e) {
      // User cancelled
    }
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
// 11. SHORT WAIT OPPORTUNITY ALERT ENGINE (≤ 20 min)
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
    alertSubtitle.innerHTML = `Your priority rides currently have a wait time of <strong>${state.alertThreshold} minutes or less</strong>! Head there now.`;
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
    if (state.soundEnabled) {
      playDisneyChime();
    }
    if (state.notificationsEnabled) {
      sendWebNotification(qualifyingRides);
    }
  }
}

// =============================================================================
// 12. WEB AUDIO API SYNTHESIZER: DISNEY MAGICAL CHIME
// =============================================================================

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
  } catch (err) {
    console.warn('AudioContext error:', err);
  }
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
// 13. AUTO-REFRESH TIMER & VISIBILITY HANDLER
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
// 14. PARK HOPPER COMPARISON OVERVIEW
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
// 15. EVENT LISTENERS & MODAL CONTROLS
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

  // Hopper Modal
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

  // Quick Share Button & Modal
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

  // Family Import Banner Buttons
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

  // Settings Modal
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
      if (confirm('Clear all your Must-Dos, Backups, and Ignored rides?')) {
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
