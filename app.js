// ==============================================================================
// FlatOut Online Save Editor - Application Engine (100% English Codebase)
// ==============================================================================

let currentLang = "en";

/**
 * Translation helper accessing the locales dictionary
 * @param {string} key - Dictionary key
 * @param {string} fallback - Fallback string if key not found
 * @returns {string}
 */
function tr(key, fallback = "") {
  if (typeof t === "function") {
    return t(key, fallback);
  }
  if (typeof I18N !== "undefined" && I18N[currentLang] && I18N[currentLang][key]) {
    return I18N[currentLang][key];
  }
  return fallback || key;
}

// ==============================================================================
// 2. Exact CRC-32 Table Extracted from Fouc.exe (0x312e30)
// ==============================================================================
const CRC_TABLE = new Uint32Array([
  0x00000000, 0x77073096, 0xee0e612c, 0x990951ba, 0x076dc419, 0x706af48f, 0xe963a535, 0x9e6495a3,
  0x0edb8832, 0x79dcb8a4, 0xe0d5e91e, 0x97d2d988, 0x09b64c2b, 0x7eb17cbd, 0xe7b82d07, 0x90bf1d91,
  0x1db71064, 0x6ab020f2, 0xf3b97148, 0x84be41de, 0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7,
  0x136c9856, 0x646ba8c0, 0xfd62f97a, 0x8a65c9ec, 0x14015c4f, 0x63066cd9, 0xfa0f3d63, 0x8d080df5,
  0x3b6e20c8, 0x4c69105e, 0xd56041e4, 0xa2677172, 0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b,
  0x35b5a8fa, 0x42b2986c, 0xdbbbc9d6, 0xacbcf940, 0x32d86ce3, 0x45df5c75, 0xdcd60dcf, 0xabd13d59,
  0x26d930ac, 0x51de003a, 0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423, 0xcfba9599, 0xb8bda50f,
  0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924, 0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d,
  0x76dc4190, 0x01db7106, 0x98d220bc, 0xefd5102a, 0x71b18589, 0x06b6b51f, 0x9fbfe4a5, 0xe8b8d433,
  0x7807c9a2, 0x0f00f934, 0x9609a88e, 0xe10e9818, 0x7f6a0dbb, 0x086d3d2d, 0x91646c97, 0xe6635c01,
  0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e, 0x6c0695ed, 0x1b01a57b, 0x8208f4c1, 0xf50fc457,
  0x65b0d9c6, 0x12b7e950, 0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3, 0xfbd44c65,
  0x4db26158, 0x3ab551ce, 0xa3bc0074, 0xd4bb30e2, 0x4adfa541, 0x3dd895d7, 0xa4d1c46d, 0xd3d6f4fb,
  0x4369e96a, 0x346ed9fc, 0xad678846, 0xda60b8d0, 0x44042d73, 0x33031de5, 0xaa0a4c5f, 0xdd0d7cc9,
  0x5005713c, 0x270241aa, 0xbe0b1010, 0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f,
  0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17, 0x2eb40d81, 0xb7bd5c3b, 0xc0ba6cad,
  0xedb88320, 0x9abfb3b6, 0x03b6e20c, 0x74b1d29a, 0xead54739, 0x9dd277af, 0x04db2615, 0x73dc1683,
  0xe3630b12, 0x94643b84, 0x0d6d6a3e, 0x7a6a5aa8, 0xe40ecf0b, 0x9309ff9d, 0x0a00ae27, 0x7d079eb1,
  0xf00f9344, 0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb, 0x196c3671, 0x6e6b06e7,
  0xfed41b76, 0x89d32be0, 0x10da7a5a, 0x67dd4acc, 0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5,
  0xd6d6a3e8, 0xa1d1937e, 0x38d8c2c4, 0x4fdff252, 0xd1bb67f1, 0xa6bc5767, 0x3fb506dd, 0x48b2364b,
  0xd80d2bda, 0xaf0a1b4c, 0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55, 0x316e8eef, 0x4669be79,
  0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236, 0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f,
  0xc5ba3bbe, 0xb2bd0b28, 0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31, 0x2cd99e8b, 0x5bdeae1d,
  0x9b64c2b0, 0xec63f226, 0x756aa39c, 0x026d930a, 0x9c0906a9, 0xeb0e363f, 0x72076785, 0x05005713,
  0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0x0cb61b38, 0x92d28e9b, 0xe5d5be0d, 0x7cdcefb7, 0x0bdbdf21,
  0x86d3d2d4, 0xf1d4e242, 0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1, 0x18b74777,
  0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c, 0x8f659eff, 0xf862ae69, 0x616bffd3, 0x166ccf45,
  0xa00ae278, 0xd70dd2ee, 0x4e048354, 0x3903b3c2, 0xa7672661, 0xd06016f7, 0x4969474d, 0x3e6e77db,
  0xaed16a4a, 0xd9d65adc, 0x40df0b66, 0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9,
  0xbdbdf21c, 0xcabac28a, 0x53b39330, 0x24b4a3a6, 0xbad03605, 0xcdd70693, 0x54de5729, 0x23d967bf,
  0xb3667a2e, 0xc4614ab8, 0x5d681b02, 0x2a6f2b94, 0xb40bbe37, 0xc30c8ea1, 0x5a05df1b, 0x2d02ef8d
]);

function calculateFoucCrc(dataBytes) {
  let crc = 0;
  for (let i = 0; i < dataBytes.length; i++) {
    const tableIndex = (dataBytes[i] ^ (crc & 0xFF)) & 0xFF;
    crc = ((crc >>> 8) ^ CRC_TABLE[tableIndex]) >>> 0;
  }
  return crc >>> 0;
}

// ==============================================================================
// 3. Binary Helpers (UTF-16LE, Numbers)
// ==============================================================================
function readUtf16LE(bytes, offset, maxChars) {
  let result = "";
  for (let i = 0; i < maxChars; i++) {
    const pos = offset + i * 2;
    if (pos + 1 >= bytes.length) break;
    const code = bytes[pos] | (bytes[pos + 1] << 8);
    if (code === 0) break;
    result += String.fromCharCode(code);
  }
  return result;
}

function writeUtf16LE(bytes, offset, maxChars, str) {
  for (let i = 0; i < maxChars; i++) {
    const code = i < str.length ? str.charCodeAt(i) : 0;
    bytes[offset + i * 2] = code & 0xFF;
    bytes[offset + i * 2 + 1] = (code >> 8) & 0xFF;
  }
}

// ==============================================================================
// 4. Game Specs & Constants (100% English Definitions)
// ==============================================================================

function getLocalizedColorName(colorName) {
  if (!colorName) return "";
  const key = "color" + colorName.replace(/\s+/g, "");
  return tr(key, colorName);
}

const COLOR_SPECTRUM = [
  { name: "Standard",   code: "",     hex: "#E2E8F0" },
  { name: "Red",        code: "#7",   hex: "#EF4444" },
  { name: "Maroon",     code: "#40",  hex: "#B91C1C" },
  { name: "Orange",     code: "#31",  hex: "#F97316" },
  { name: "Gold",       code: "#3",   hex: "#D4A373" },
  { name: "Amber",      code: "#33",  hex: "#F59E0B" },
  { name: "Yellow",     code: "#6",   hex: "#EAB308" },
  { name: "Lime",       code: "#35",  hex: "#4ADE80" },
  { name: "Green",      code: "#46",  hex: "#10B981" },
  { name: "Cyan",       code: "#71",  hex: "#06B6D4" },
  { name: "Blue",       code: "#45",  hex: "#3B82F6" },
  { name: "Purple",     code: "#72",  hex: "#A855F7" },
  { name: "Pink",       code: "#69",  hex: "#EC4899" },
  { name: "White",      code: "#1",   hex: "#FFFFFF" },
  { name: "Light Grey", code: "#70",  hex: "#CBD5E1" },
  { name: "Grey",       code: "#2",   hex: "#94A3B8" },
  { name: "Dark Grey",  code: "#44",  hex: "#64748B" },
  { name: "Black",      code: "#0",   hex: "#1E293B" },
  { name: "Rainbow",    code: "#999", hex: "rainbow" },
];

const FO2_CARS = [
  "[Derby] Chili", "[Derby] Malice", "[Derby] Roamer", "[Derby] Shaker", "[Derby] Blaster XL",
  "[Derby] Banger", "[Derby] Splitter", "[Derby] Switchblade", "[Derby] Venom",
  "[Race] CTR", "[Race] Boxer", "[Race] Mad Rash", "[Race] Nevada", "[Race] Lancea",
  "[Race] Fortune", "[Race] Insetta", "[Race] Bullet", "[Race] Lentus", "[Race] Ventura", "[Race] Daytana",
  "[Street] Sparrowhawk", "[Street] Sunray", "[Street] Vexter XS", "[Street] Terrator", "[Street] Crusader",
  "[Street] Canyon", "[Street] Road King", "[Street] Bullet GT", "[Street] CTR Sport", "[Street] Chili Pepper",
  "[Street] Scorpion", "[Street] Insetta Sport", "[Street] Speedshifter", "[Street] Speedevil",
  "[Stunt] Trailblazer", "[Stunt] Afterburner", "[Stunt] Rocket", "[Stunt] Starflight", "[Stunt] Nucleon",
  "[Bonus] Pimpster", "[Bonus] Flatmobile", "[Bonus] Mob Car", "[Bonus] School Bus"
];

const FOUC_CARS = [
  "[Race] CTR", "[Derby] Chili", "[Race] Boxer", "[Race] Lancea", "[Race] Mad Rash",
  "[Derby] Malice", "[Race] Fortune", "[Derby] Banger", "[Street] Sparrowhawk", "[Race] Insetta",
  "[Street] Sunray", "[Street] Vexter XS", "[Derby] Shaker", "[Derby] Splitter", "[Street] Terrator",
  "[Race] Bullet", "[Derby] Switchblade", "[Derby] Venom", "[Race] Nevada", "[Derby] Blaster XL",
  "[Street] Crusader", "[Street] Canyon", "[Derby] Roamer", "[Race] Lentus", "[Street] Road King",
  "[Race] Ventura", "[Street] CTR Sport", "[Street] Chili Pepper", "[Street] Bullet GT", "[Street] Scorpion",
  "[Street] Insetta Sport", "[Street] Speedshifter", "[Race] Daytana", "[Street] Speedevil",
  "[Stunt] Trailblazer", "[Stunt] Afterburner", "[Stunt] Rocket", "[Stunt] Starflight", "[Stunt] Nucleon",
  "[Bonus] Pimpster", "[Bonus] Flatmobile", "[Bonus] Mob Car", "[Bonus] School Bus", "[Bonus] Semi Truck"
];

const FO1_CARS = [
  "1. Pepper (Hatchback)", "2. Blockhead (Classic Sedan)", "3. Fasthack (Sport Coupe)", "4. Speedshifter (Muscle Car)",
  "5. Blade (Classic Muscle)", "6. Trailblazer (Pickup)", "7. Road King (SUV)", "8. Ranger (4x4 Offroader)",
  "9. Master (Luxury Sedan)", "10. Grinder (Station Wagon)", "11. Thunder (Coupe)", "12. Boxer (Coupe)",
  "13. Outlaw (Sportscar)", "14. Hunter (Muscle Car)", "15. Firefly (Compact)", "16. Wrath (Flagship Monster)"
];

const FO1_TRACKS = [
  "Forest Track 1", "Forest Track 2", "Forest Sprint",
  "Fields Track 1", "Fields Track 2", "Rural Sprint",
  "Winter Track 1", "Winter Track 2", "Snow Sprint",
  "City Track 1", "City Track 2", "City Sprint",
  "Construction Pit 1", "Construction Pit 2", "Pit Sprint",
  "Raceway 1", "Raceway 2", "Raceway Oval",
  "Forest Reverse 1", "Forest Reverse 2", "Fields Reverse 1",
  "Fields Reverse 2", "Winter Reverse 1", "Winter Reverse 2",
  "City Reverse 1", "City Reverse 2", "Pit Reverse 1",
  "Pit Reverse 2", "Raceway Reverse 1", "Raceway Reverse 2",
  "The Pit Arena", "The Demolition Arena", "High Jump Stunt",
  "Long Jump Stunt", "Darts Stunt", "Bowling Stunt"
];

function getLocalizedCarName(carStr) {
  if (!carStr) return "";
  const derby = tr("classDerby", "Derby");
  const race = tr("classRace", "Race");
  const street = tr("classStreet", "Street");
  const stunt = tr("classStunt", "Stunt");
  const bonus = tr("classBonus", "Bonus");
  return carStr
    .replace("[Derby]", `[${derby}]`)
    .replace("[Race]", `[${race}]`)
    .replace("[Street]", `[${street}]`)
    .replace("[Stunt]", `[${stunt}]`)
    .replace("[Bonus]", `[${bonus}]`);
}

const FO2_STUNTS = [
  { name: "High Jump", off: 0x089c, defScore: 280.0, car: 36, unit: "meters" },
  { name: "Long Jump", off: 0x08ec, defScore: 185.0, car: 36, unit: "meters" },
  { name: "Curling", off: 0x0914, defScore: 1500.0, car: 37, unit: "points" },
  { name: "Stone Skipping", off: 0x0964, defScore: 310.0, car: 36, unit: "meters" },
  { name: "Ring of Fire", off: 0x09dc, defScore: 800.0, car: 38, unit: "points" },
  { name: "Field Goal", off: 0x0a04, defScore: 15000.0, car: 38, unit: "points" },
  { name: "Bowling", off: 0x0a2c, defScore: 120.0, car: 36, unit: "points/strike" },
  { name: "Darts", off: 0x0a7c, defScore: 300.0, car: 37, unit: "points" },
  { name: "Baseball", off: 0x1384, defScore: 1100.0, car: 38, unit: "meters" },
  { name: "Basketball", off: 0x144c, defScore: 750.0, car: 37, unit: "points" },
  { name: "Soccer", off: 0x1474, defScore: 16000.0, car: 37, unit: "points" },
  { name: "Royal Flush", off: 0x149c, defScore: 100.0, car: 37, unit: "points" },
];

// ==============================================================================
// 5. Active Save State Model
// ==============================================================================
let currentSave = {
  filename: "",
  gameType: null, // "fo1", "fo2", "fouc", "fo4", "options"
  rawBytes: null,
  view: null,
  nickname: "",
  money: 0
};

let secondarySave = null;

// ==============================================================================
// 6. Game Format Detection & Parsing Engine
// ==============================================================================
function detectGameType(bytes, filename) {
  const size = bytes.length;
  const lowerName = filename.toLowerCase();

  // 1. FlatOut 1 (8 192 bytes, starts with header 0x00000001)
  if (size === 8192) {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    const magic = view.getUint32(0, true);
    if (magic === 1) return "fo1";
  }

  // 2. FlatOut 2 options.sav (131 072 bytes)
  if (size === 131072 && lowerName.includes("option")) {
    return "options";
  }

  // 3. FlatOut 2 career (16 384 bytes, player00*.sav)
  if (size === 16384) {
    return "fo2";
  }

  // 4. FlatOut: Ultimate Carnage (player_*.sav, typically 20KB - 150KB)
  if (lowerName.startsWith("player_") || (size >= 20000 && size <= 150000)) {
    if (size >= 1024) {
      const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      const storedCrc = view.getUint32(4, true);
      if (calculateFoucCrc(bytes.subarray(8)) === storedCrc) {
        return "fouc";
      }
    }
  }

  // 5. FlatOut 4: Total Insanity (Save.dat, 2 080 bytes)
  if (size === 2080 || lowerName.endsWith(".dat")) {
    return "fo4";
  }

  // Fallback by filename patterns
  if (lowerName.includes("option")) return "options";
  if (lowerName.startsWith("player_")) return "fouc";
  if (lowerName.startsWith("player")) return size <= 8192 ? "fo1" : "fo2";

  return null;
}

function parseSaveData(bytes, filename) {
  const gt = detectGameType(bytes, filename);
  if (!gt) return null;

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let nick = "Player";
  let money = 0;

  if (gt === "fo1") {
    nick = readUtf16LE(bytes, 0x04, 32) || "Player";
    money = view.getUint32(0x84, true);
  } else if (gt === "fo2") {
    nick = readUtf16LE(bytes, 0x04, 64) || "Player";
    money = view.getUint32(0x48, true);
  } else if (gt === "fouc") {
    nick = readUtf16LE(bytes, 0x0C, 64) || "Player";
    money = view.getUint32(0x50, true);
  } else if (gt === "fo4") {
    nick = "Player 1";
    money = view.getUint32(0x0B58, true) || (bytes.length >= 0x3834 ? view.getUint32(0x3830, true) : view.getUint32(0x3C4, true));
  } else if (gt === "options") {
    nick = "Hall of Fame";
    money = 0;
  }

  return {
    filename,
    gameType: gt,
    rawBytes: bytes,
    view,
    nickname: nick,
    money
  };
}

// ==============================================================================
// 7. Core Editor View Controller
// ==============================================================================
function loadSaveFromBuffer(filename, arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  const parsed = parseSaveData(bytes, filename);

  if (!parsed) {
    showToast(tr("toastInvalidFile", "⚠️ Unrecognized or unsupported file format!"));
    return false;
  }

  secondarySave = null;
  currentSave = parsed;
  renderEditorUI();
  return true;
}

function renderEditorUI() {
  const dropzone = document.getElementById("dropzone-box");
  if (dropzone) dropzone.style.display = "none";
  const panel = document.getElementById("editor-panel");
  if (panel) panel.style.display = "block";

  updateLoadedBadge();
  const fnEl = document.getElementById("loaded-filename");
  if (fnEl) fnEl.innerText = currentSave.filename;
  const szEl = document.getElementById("loaded-filesize");
  if (szEl) szEl.innerText = `(${currentSave.rawBytes.length.toLocaleString()} bytes)`;

  // Fill Profile Inputs
  const nickInput = document.getElementById("ed-nick-input");
  if (nickInput) nickInput.value = currentSave.nickname;
  const moneyInput = document.getElementById("ed-money-input");
  if (moneyInput) moneyInput.value = currentSave.money;

  // Show/Hide Game Specific Tabs cleanly based on file contents
  const tabProfileBtn = document.querySelector('.ed-tab-btn[data-tab="profile"]');
  const tabGarageBtn  = document.querySelector('.ed-tab-btn[data-tab="garage"]');
  const tabCupsBtn    = document.querySelector('.ed-tab-btn[data-tab="cups"]');
  const tabStuntsBtn  = document.querySelector('.ed-tab-btn[data-tab="stunts"]');
  const tabStatsBtn   = document.querySelector('.ed-tab-btn[data-tab="stats"]');

  if (currentSave.gameType === "options") {
    if (tabProfileBtn) tabProfileBtn.style.display = "none";
    if (tabGarageBtn) tabGarageBtn.style.display = "none";
    if (tabCupsBtn) tabCupsBtn.style.display = "none";
    if (tabStatsBtn) tabStatsBtn.style.display = "none";
    if (tabStuntsBtn) {
      tabStuntsBtn.style.display = "flex";
      document.querySelectorAll(".ed-tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".editor-tab-body").forEach(b => b.classList.remove("active"));
      tabStuntsBtn.classList.add("active");
      const edStunts = document.getElementById("ed-tab-stunts");
      if (edStunts) edStunts.classList.add("active");
    }
  } else if (currentSave.gameType === "fo2") {
    if (tabProfileBtn) tabProfileBtn.style.display = "flex";
    if (tabGarageBtn) tabGarageBtn.style.display = "flex";
    if (tabCupsBtn) tabCupsBtn.style.display = "flex";
    if (tabStuntsBtn) tabStuntsBtn.style.display = "flex";
    if (tabStatsBtn) tabStatsBtn.style.display = "flex";

    document.querySelectorAll(".ed-tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".editor-tab-body").forEach(b => b.classList.remove("active"));
    if (tabProfileBtn) tabProfileBtn.classList.add("active");
    const edProfile = document.getElementById("ed-tab-profile");
    if (edProfile) edProfile.classList.add("active");
  } else {
    if (tabStuntsBtn) tabStuntsBtn.style.display = "none";
    if (tabProfileBtn) tabProfileBtn.style.display = "flex";
    if (tabGarageBtn) tabGarageBtn.style.display = "flex";
    if (tabCupsBtn) tabCupsBtn.style.display = "flex";
    if (tabStatsBtn) tabStatsBtn.style.display = "flex";

    document.querySelectorAll(".ed-tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".editor-tab-body").forEach(b => b.classList.remove("active"));
    if (tabProfileBtn) tabProfileBtn.classList.add("active");
    const edProfile = document.getElementById("ed-tab-profile");
    if (edProfile) edProfile.classList.add("active");
  }

  const dlBtn = document.querySelector(".btn-download-save span");
  if (dlBtn && !secondarySave) {
    dlBtn.innerText = tr("btnDownloadSave", "💾 DOWNLOAD MODIFIED SAVE");
  }

  syncColorSliderWithNick();
  renderPaletteChips();
  updateNicknameBadge();
  renderGarageSection();
  renderCupsSection();
  renderStuntsSection();
  renderStatsSection();
}

function syncColorSliderWithNick() {
  const nick = currentSave.nickname;
  const match = nick.match(/^(#\d+)/);
  const code = match ? match[1] : "";

  let matchedIdx = 0;
  for (let i = 0; i < COLOR_SPECTRUM.length; i++) {
    if (COLOR_SPECTRUM[i].code === code) {
      matchedIdx = i;
      break;
    }
  }

  const slider = document.getElementById("ed-color-slider");
  if (slider) {
    slider.value = matchedIdx;
  }
  updateSliderInfo(matchedIdx);
}

function updateSliderInfo(idx) {
  const item = COLOR_SPECTRUM[idx] || COLOR_SPECTRUM[0];
  const info = document.getElementById("slider-color-info");
  if (info) {
    info.innerText = `${getLocalizedColorName(item.name)} ${item.code ? '(' + item.code + ')' : ''}`;
    if (item.hex === 'rainbow') {
      info.className = "rainbow-anim";
      info.style.color = "transparent";
      info.style.textShadow = "none";
    } else {
      info.className = "";
      info.style.color = item.code === "#0" ? "#94a3b8" : item.hex;
      info.style.textShadow = item.code === "#0" ? "0 0 1px #fff" : `0 0 8px ${item.hex}88`;
    }
  }
}

function initColorSlider() {
  const slider = document.getElementById("ed-color-slider");
  if (!slider) return;

  updateSliderInfo(0);

  slider.addEventListener("input", () => {
    const idx = parseInt(slider.value, 10);
    const item = COLOR_SPECTRUM[idx];
    if (!item) return;

    updateSliderInfo(idx);
    applyColorPreset(item.code);
  });
}

function applyColorPreset(code) {
  currentSave.colorCode = code;
  const inputEl = document.getElementById("ed-nick-input");
  const currentText = (inputEl ? inputEl.value : currentSave.nickname) || "Player";
  const clean = currentText.replace(/^#\d+/, "");
  currentSave.nickname = code ? `${code}${clean}` : clean;
  if (inputEl) inputEl.value = currentSave.nickname;

  document.querySelectorAll("#ed-palette-grid .color-chip").forEach(ch => {
    if (ch.getAttribute("data-code") === code) {
      ch.classList.add("active");
    } else {
      ch.classList.remove("active");
    }
  });

  updateNicknameBadge();
}

function initProfileInputs() {
  const nickInput = document.getElementById("ed-nick-input");
  if (nickInput) {
    nickInput.addEventListener("input", () => {
      currentSave.nickname = nickInput.value;
      updateNicknameBadge();
      syncColorSliderWithNick();
    });
  }

  const moneyInput = document.getElementById("ed-money-input");
  if (moneyInput) {
    moneyInput.addEventListener("input", () => {
      const val = parseInt(moneyInput.value.replace(/\D/g, "") || "0", 10);
      const safeVal = Math.min(999999999, Math.max(0, val));
      currentSave.money = safeVal;
      syncMoneyToBuffer(safeVal);
    });
  }
}

function renderPaletteChips() {
  const container = document.getElementById("ed-palette-grid");
  if (!container) return;
  container.innerHTML = "";

  COLOR_SPECTRUM.forEach((p, idx) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.setAttribute("data-code", p.code);
    chip.className = `color-chip ${p.code === currentSave.colorCode ? 'active' : ''}`;
    chip.style.setProperty('--chip-color', p.hex === 'rainbow' ? '#d946ef' : p.hex);

    const label = document.createElement("span");
    label.className = "color-chip-text";
    label.innerText = getLocalizedColorName(p.name);

    // Apply the actual resulting color to the label text (no emoji icons)
    if (p.hex === 'rainbow') {
      label.classList.add("rainbow-anim");
    } else if (p.code === "#0") {
      // Black color: readable styled dark text with crisp highlight
      label.style.setProperty("color", "#64748b", "important");
      label.style.textShadow = "0 0 1px #cbd5e1, 0 1px 2px #000";
    } else {
      label.style.setProperty("color", p.hex, "important");
      label.style.textShadow = `0 0 10px ${p.hex}66`;
    }

    chip.appendChild(label);

    chip.addEventListener("click", () => {
      const slider = document.getElementById("ed-color-slider");
      if (slider) slider.value = idx;
      updateSliderInfo(idx);
      applyColorPreset(p.code);
    });

    container.appendChild(chip);
  });
}

function updateNicknameBadge() {
  const plate = document.getElementById("ed-plate-nickname");
  if (!plate) return;
  const nick = document.getElementById("ed-nick-input").value.trim() || "Player";
  const clean = nick.replace(/^#\d+/, "");

  const match = nick.match(/^(#\d+)/);
  const code = match ? match[1] : "";
  const spec = COLOR_SPECTRUM.find(s => s.code === code) || COLOR_SPECTRUM[0];

  if (code === "#999" || spec.hex === "rainbow") {
    plate.innerText = clean;
    plate.className = "plate-nickname rainbow-anim";
    plate.style.color = "transparent";
  } else {
    plate.innerText = clean;
    plate.className = "plate-nickname";
    plate.style.color = spec.hex;
    plate.style.textShadow = `0 0 20px ${spec.hex}`;
  }
}

// ==============================================================================
// 8. Granular Section Renders (Individual Edit for Every Single Item)
// ==============================================================================

// ------------------------------------------------------------------------------
// TAB 2: Garage & Cars (Every Car Individually Editable)
// ------------------------------------------------------------------------------
function renderGarageSection() {
  const container = document.getElementById("ed-garage-container");
  container.innerHTML = "";
  const gt = currentSave.gameType;

  if (gt === "fo2") {
    container.innerHTML = `
      <div class="summary-bar" id="fo2-car-summary">
        <div>🏎️ <strong>${tr("fo2FleetStatus", "FlatOut 2 Fleet Status:")}</strong></div>
        <div id="fo2-counts-badge">${tr("statInGarage", "In Garage")}: 0/43 | ${tr("statDealership", "In Dealership")}: 0/43 | ${tr("statLocked", "Locked")}: 0/43</div>
      </div>

      <div class="master-actions-grid">
        <button class="btn-action-card" type="button" onclick="webOwnAndTuneAllFO2()">
          <div class="action-card-icon">🏎️</div>
          <div>
            <div class="action-card-title">${tr("btnMaxTuneAll", "🏎️ Add All Cars to Garage + Pro Tune")}</div>
            <div class="action-card-desc">${tr("btnTuneAllFO2", "All 43 cars into garage + max Pro performance upgrades")}</div>
          </div>
        </button>
        <button class="btn-action-card" type="button" onclick="webUnlockAllCarsDealership()">
          <div class="action-card-icon">🏪</div>
          <div>
            <div class="action-card-title">${tr("btnUnlockAllFO2", "Unlock All 43 Cars in Dealership")}</div>
            <div class="action-card-desc">${tr("btnUnlockAllFO2Desc", "All vehicles available for purchase with in-game credits")}</div>
          </div>
        </button>
        <button class="btn-action-card" type="button" onclick="webStockAllFO2Cars()">
          <div class="action-card-icon">📦</div>
          <div>
            <div class="action-card-title">${tr("btnResetStockFO2", "Reset All Tuning to Stock")}</div>
            <div class="action-card-desc">${tr("btnResetStockFO2Desc", "Factory settings without aftermarket upgraded parts")}</div>
          </div>
        </button>
      </div>

      <div class="table-scroll">
        <table class="editor-table">
          <thead>
            <tr>
              <th style="width: 50px;">#</th>
              <th>${tr("thVehicle", "Vehicle")}</th>
              <th style="width: 140px;">${tr("thClass", "Class")}</th>
              <th style="width: 240px;">${tr("thOwnership", "Ownership Status")}</th>
              <th style="width: 240px;">${tr("thPerformance", "Performance Parts")}</th>
            </tr>
          </thead>
          <tbody id="fo2-cars-tbody">
          </tbody>
        </table>
      </div>
    `;
    renderFO2CarRows();
    updateFO2CarSummary();

  } else if (gt === "fouc") {
    container.innerHTML = `
      <div class="summary-bar" id="fouc-car-summary">
        <div>🏎️ <strong>${tr("foucFleetStatus", "FlatOut: Ultimate Carnage Fleet (44 Cars):")}</strong></div>
        <div id="fouc-counts-badge">${tr("statInGarage", "In Garage")}: 0/44 | ${tr("statDealership", "In Dealership")}: 0/44 | ${tr("statLocked", "Locked")}: 0/44</div>
      </div>

      <div class="master-actions-grid">
        <button class="btn-action-card" type="button" onclick="webOwnAllFOUCCars()">
          <div class="action-card-icon">🏎️</div>
          <div>
            <div class="action-card-title">${tr("btnTuneAllFOUC", "Add All 44 Cars + Max Pro Tune")}</div>
            <div class="action-card-desc">${tr("btnTuneAllFOUCDesc", "All Ultimate Carnage cars into garage with pro performance parts")}</div>
          </div>
        </button>
        <button class="btn-action-card" type="button" onclick="webUnlockAllFOUCShop()">
          <div class="action-card-icon">🏪</div>
          <div>
            <div class="action-card-title">${tr("btnUnlockAllFOUC", "Unlock All 44 Cars in Dealership")}</div>
            <div class="action-card-desc">${tr("btnUnlockAllFOUCDesc", "All vehicles available for purchase with career cash")}</div>
          </div>
        </button>
        <button class="btn-action-card" type="button" onclick="webStockAllFOUCCars()">
          <div class="action-card-icon">📦</div>
          <div>
            <div class="action-card-title">${tr("btnResetStockFO2", "Reset All Tuning to Stock")}</div>
            <div class="action-card-desc">${tr("btnResetStockFOUCDesc", "Factory stock performance parts for all vehicles")}</div>
          </div>
        </button>
      </div>

      <div class="table-scroll">
        <table class="editor-table">
          <thead>
            <tr>
              <th style="width: 50px;">#</th>
              <th>${tr("thVehicle", "Vehicle")}</th>
              <th style="width: 140px;">${tr("thClass", "Class")}</th>
              <th style="width: 240px;">${tr("thOwnership", "Ownership Status")}</th>
              <th style="width: 240px;">${tr("thPerformance", "Performance Parts")}</th>
            </tr>
          </thead>
          <tbody id="fouc-cars-tbody">
          </tbody>
        </table>
      </div>
    `;
    renderFOUCCarRows();
    updateFOUCCarSummary();

  } else if (gt === "fo1") {
    const activeCarId = currentSave.view.getUint32(0x88, true);
    const activeDiv = currentSave.view.getUint32(0x8C, true);
    const activeStage = currentSave.view.getUint32(0x90, true);
    const fo1CarList = FO1_CARS;
    const partsList = [
      tr("partEngine", "Engine"),
      tr("partExhaust", "Exhaust System"),
      tr("partTransmission", "Transmission"),
      tr("partSuspension", "Suspension"),
      tr("partBrakes", "Brakes"),
      tr("partTires", "Racing Tires")
    ];

    container.innerHTML = `
      <div class="master-actions-grid">
        <button class="btn-action-card" type="button" onclick="webUnlockAllFO1Cars()">
          <div class="action-card-icon">🔓</div>
          <div>
            <div class="action-card-title">${tr("btnUnlockAllCars", "🔓 Unlock ALL Vehicles")}</div>
            <div class="action-card-desc">${tr("descUnlockAllFO1", "Unlock all 16 FlatOut 1 vehicles")}</div>
          </div>
        </button>
        <button class="btn-action-card" type="button" onclick="webMaxTuneFO1Active()">
          <div class="action-card-icon">⚡</div>
          <div>
            <div class="action-card-title">${tr("btnMaxTuneActiveFO1", "Max Pro Tune Active Car")}</div>
            <div class="action-card-desc">${tr("descMaxTuneActiveFO1", "Stage 3 Pro upgrades for engine, transmission, suspension and tires")}</div>
          </div>
        </button>
      </div>

      <div class="ed-card">
        <div class="ed-card-title">⚙️ ${tr("cardActiveVehicle", "Active Vehicle & Upgrades")}</div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">${tr("lblActiveCar", "Active Career Vehicle:")}</label>
            <select class="table-select" style="max-width: 100%;" onchange="updateFO1ActiveCar(this.value)">
              ${fo1CarList.map((c, i) => `<option value="${i+1}" ${activeCarId === (i+1) ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblActiveDivision", "Active Vehicle Division:")}</label>
            <select class="table-select" style="max-width: 100%;" onchange="updateFO1ActiveDivision(this.value)">
              <option value="1" ${activeDiv === 1 ? 'selected' : ''}>${tr("divBronze", "Bronze Division (Class 1)")}</option>
              <option value="2" ${activeDiv === 2 ? 'selected' : ''}>${tr("divSilver", "Silver Division (Class 2)")}</option>
              <option value="3" ${activeDiv === 3 ? 'selected' : ''}>${tr("divGold", "Gold Division (Class 3)")}</option>
            </select>
          </div>
        </div>

        <div class="form-grid-2" style="margin-top: 14px;">
          <div class="form-group">
            <label class="form-label">${tr("lblUpgradeLevel", "Overall Upgrade Level (Stage):")}</label>
            <select class="table-select" style="max-width: 100%;" onchange="updateFO1ActiveStage(this.value)">
              <option value="0" ${activeStage === 0 ? 'selected' : ''}>${tr("stageStock", "📦 Stock (Factory)")}</option>
              <option value="1" ${activeStage === 1 ? 'selected' : ''}>${tr("stage1Street", "⚡ Stage 1 (Street)")}</option>
              <option value="2" ${activeStage === 2 ? 'selected' : ''}>${tr("stage2Race", "🏁 Stage 2 (Race)")}</option>
              <option value="3" ${activeStage === 3 ? 'selected' : ''}>${tr("stage3Pro", "🔥 Stage 3 (Pro / Top)")}</option>
            </select>
          </div>
        </div>

        <div style="margin-top: 16px;">
          <label class="form-label">${tr("cardActiveTuning", "Active Vehicle Tuning Parts:")}</label>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; margin-top: 8px;">
            ${partsList.map((part, i) => {
              const val = currentSave.view.getUint32(0x9C + i * 4, true);
              return `
                <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; cursor: pointer;">
                  <input type="checkbox" id="fo1-part-${i}" ${val >= 2 ? 'checked' : ''} onchange="updateFO1Part(${i}, this.checked)" style="width: 18px; height: 18px; cursor: pointer;">
                  <span>${part} (Stage 3)</span>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <div class="table-scroll" style="margin-top: 12px;">
        <table class="editor-table">
          <thead>
            <tr>
              <th style="width: 60px;">#</th>
              <th>${tr("thFO1Vehicle", "FlatOut 1 Vehicle")}</th>
              <th style="width: 200px;">${tr("thAvailability", "Game Availability")}</th>
            </tr>
          </thead>
          <tbody>
            ${fo1CarList.map((c, i) => {
              const maskLo = currentSave.view.getUint32(0xD0, true);
              let isUnlocked = false;
              if (i < 16) {
                isUnlocked = (maskLo & (1 << i)) !== 0;
              }
              return `
                <tr>
                  <td>${i+1}</td>
                  <td><strong>${c}</strong></td>
                  <td>
                    <select class="table-select" onchange="updateFO1CarUnlocked(${i}, this.value)">
                      <option value="1" ${isUnlocked ? 'selected' : ''}>${tr("statusUnlockedText", "🔓 Unlocked")}</option>
                      <option value="0" ${!isUnlocked ? 'selected' : ''}>${tr("optLocked", "🔒 Locked")}</option>
                    </select>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  } else if (gt === "fo4") {
    container.innerHTML = `
      <div class="master-actions-grid">
        <button class="btn-action-card" type="button" onclick="webUnlockAllFO4Content()">
          <div class="action-card-icon">🔓</div>
          <div>
            <div class="action-card-title">${tr("btnUnlockAllFO4", "Unlock ALL Cars, Skins & Arenas")}</div>
            <div class="action-card-desc">${tr("descUnlockAllFO4Matrix", "Sets global 128-byte unlock matrix for all content")}</div>
          </div>
        </button>
      </div>
      <div class="ed-card">
        <div class="ed-card-title">🏎️ ${tr("cardFO4Content", "FlatOut 4: Total Insanity Content")}</div>
        <p style="color: var(--text-secondary); font-size: 14px;">
          ${tr("descFO4Content", "All Derby, Classic, and All-Terrain vehicles are unlocked via the global Save.dat bitmask. Click the button above to instantly unlock the entire roster and all tracks!")}
        </p>
      </div>
    `;
  }
}

// ------------------------------------------------------------------------------
// FO2 Cars Handlers
// ------------------------------------------------------------------------------
function renderFO2CarRows() {
  const tbody = document.getElementById("fo2-cars-tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  FO2_CARS.forEach((carName, i) => {
    const off = 0x2F2 + i * 32;
    const locked = currentSave.view.getUint32(off, true);
    const owned = currentSave.view.getUint32(off + 4, true);

    let statusVal = "locked";
    if (owned === 1) statusVal = "owned";
    else if (locked === 0) statusVal = "shop";

    let isMax = true;
    let hasUpg = false;
    for (let b = 9; b < 28; b++) {
      const byteVal = currentSave.rawBytes[off + b];
      if (byteVal !== 0xFF) isMax = false;
      if (byteVal !== 0) hasUpg = true;
    }
    let tuneVal = "stock";
    if (isMax) tuneVal = "max";
    else if (hasUpg) tuneVal = "med";

    let tagClass = "tag-derby";
    let catKey = "classDerby";
    let catFallback = "Derby";
    if (carName.includes("[Race]")) { tagClass = "tag-race"; catKey = "classRace"; catFallback = "Race"; }
    else if (carName.includes("[Street]")) { tagClass = "tag-street"; catKey = "classStreet"; catFallback = "Street"; }
    else if (carName.includes("[Stunt]")) { tagClass = "tag-stunt"; catKey = "classStunt"; catFallback = "Stunt"; }
    else if (carName.includes("[Bonus]")) { tagClass = "tag-bonus"; catKey = "classBonus"; catFallback = "Bonus"; }
    const catName = tr(catKey, catFallback);

    const rowEl = document.createElement("tr");
    rowEl.innerHTML = `
      <td>${i+1}</td>
      <td><strong>${getLocalizedCarName(carName)}</strong></td>
      <td><span class="tag-pill ${tagClass}">${catName}</span></td>
      <td>
        <select class="table-select" id="fo2-car-status-${i}" onchange="updateFO2CarStatus(${i}, this.value)">
          <option value="owned" ${statusVal === "owned" ? "selected" : ""}>${tr("optInGarage", "🏎️ In Garage (Owned)")}</option>
          <option value="shop" ${statusVal === "shop" ? "selected" : ""}>${tr("optInDealership", "🏪 In Dealership")}</option>
          <option value="locked" ${statusVal === "locked" ? "selected" : ""}>${tr("optLocked", "🔒 Locked")}</option>
        </select>
      </td>
      <td>
        <select class="table-select" id="fo2-car-tune-${i}" onchange="updateFO2CarTuning(${i}, this.value)">
          <option value="max" ${tuneVal === "max" ? "selected" : ""}>${tr("tuneOptMax", "🔥 Max (Pro Parts)")}</option>
          <option value="med" ${tuneVal === "med" ? "selected" : ""}>${tr("tuneOptMid", "⚡ Mid Tune")}</option>
          <option value="stock" ${tuneVal === "stock" ? "selected" : ""}>${tr("stageStock", "📦 Stock (Factory)")}</option>
        </select>
      </td>
    `;
    tbody.appendChild(rowEl);
  });
}

function updateFO2CarStatus(i, val) {
  const off = 0x2F2 + i * 32;
  if (val === "owned") {
    currentSave.view.setUint32(off, 0, true);
    currentSave.view.setUint32(off + 4, 1, true);
    const tuneEl = document.getElementById(`fo2-car-tune-${i}`);
    if (tuneEl && tuneEl.value === "stock") {
      tuneEl.value = "max";
      updateFO2CarTuning(i, "max", false);
    }
  } else if (val === "shop") {
    currentSave.view.setUint32(off, 0, true);
    currentSave.view.setUint32(off + 4, 0, true);
  } else {
    currentSave.view.setUint32(off, 1, true);
    currentSave.view.setUint32(off + 4, 0, true);
  }
  updateFO2CarSummary();
  showToast(`Car #${i+1} (${getLocalizedCarName(FO2_CARS[i])}): ${tr("toastStatusUpdated", "status updated!")}`);
}

function updateFO2CarTuning(i, val, notify = true) {
  const off = 0x2F2 + i * 32;
  if (val === "max") {
    for (let b = 9; b < 28; b++) currentSave.rawBytes[off + b] = 0xFF;
    currentSave.view.setUint32(off + 28, 85000, true);
  } else if (val === "med") {
    for (let b = 9; b < 28; b++) currentSave.rawBytes[off + b] = 0x55;
    currentSave.view.setUint32(off + 28, 35000, true);
  } else {
    for (let b = 9; b < 28; b++) currentSave.rawBytes[off + b] = 0x00;
    currentSave.view.setUint32(off + 28, 0, true);
  }
  if (notify) showToast(`Car #${i+1} (${getLocalizedCarName(FO2_CARS[i])}): ${tr("toastUpgradesUpdated", "upgrades updated!")}`);
}

function updateFO2CarSummary() {
  const badge = document.getElementById("fo2-counts-badge");
  if (!badge) return;
  let ownedCnt = 0, shopCnt = 0, lockedCnt = 0;
  for (let i = 0; i < 43; i++) {
    const off = 0x2F2 + i * 32;
    const locked = currentSave.view.getUint32(off, true);
    const owned = currentSave.view.getUint32(off + 4, true);
    if (owned === 1) ownedCnt++;
    else if (locked === 0) shopCnt++;
    else lockedCnt++;
  }
  const inG = tr("statInGarage", "In Garage");
  const inD = tr("statDealership", "In Dealership");
  const lck = tr("statLocked", "Locked");
  badge.innerText = `${inG}: ${ownedCnt}/43 | ${inD}: ${shopCnt}/43 | ${lck}: ${lockedCnt}/43`;
}

function webOwnAndTuneAllFO2() {
  for (let i = 0; i < 43; i++) {
    const off = 0x2F2 + i * 32;
    currentSave.view.setUint32(off, 0, true);
    currentSave.view.setUint32(off + 4, 1, true);
    for (let b = 9; b < 28; b++) currentSave.rawBytes[off + b] = 0xFF;
    currentSave.view.setUint32(off + 28, 85000, true);
  }
  renderFO2CarRows();
  updateFO2CarSummary();
  showToast(tr("toastFO2AllMax", "🏎️ All 43 FlatOut 2 cars added to garage with max upgrades!"));
}

function webUnlockAllCarsDealership() {
  for (let i = 0; i < 43; i++) {
    const off = 0x2F2 + i * 32;
    currentSave.view.setUint32(off, 0, true);
  }
  renderFO2CarRows();
  updateFO2CarSummary();
  showToast(tr("toastFO2Shop", "🏪 All 43 FlatOut 2 cars unlocked in dealership!"));
}

function webStockAllFO2Cars() {
  for (let i = 0; i < 43; i++) {
    const off = 0x2F2 + i * 32;
    for (let b = 9; b < 28; b++) currentSave.rawBytes[off + b] = 0x00;
    currentSave.view.setUint32(off + 28, 0, true);
  }
  renderFO2CarRows();
  showToast(tr("toastFO2ResetStock", "📦 Upgrades for all FlatOut 2 cars reset to factory stock!"));
}

// ------------------------------------------------------------------------------
// FOUC Cars Handlers
// ------------------------------------------------------------------------------
function renderFOUCCarRows() {
  const tbody = document.getElementById("fouc-cars-tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  FOUC_CARS.forEach((carName, i) => {
    const off = 0x24e + i * 32;
    const locked = currentSave.view.getUint32(off, true);
    const owned = currentSave.view.getUint32(off + 4, true);

    let statusVal = "locked";
    if (owned === 1) statusVal = "owned";
    else if (locked === 0) statusVal = "shop";

    let isMax = true;
    let hasUpg = false;
    for (let b = 9; b < 28; b++) {
      const byteVal = currentSave.rawBytes[off + b];
      if (byteVal !== 0xFF) isMax = false;
      if (byteVal !== 0) hasUpg = true;
    }
    let tuneVal = "stock";
    if (isMax) tuneVal = "max";
    else if (hasUpg) tuneVal = "med";

    let tagClass = "tag-derby";
    let catKey = "classDerby";
    let catFallback = "Derby";
    if (carName.includes("[Race]")) { tagClass = "tag-race"; catKey = "classRace"; catFallback = "Race"; }
    else if (carName.includes("[Street]")) { tagClass = "tag-street"; catKey = "classStreet"; catFallback = "Street"; }
    else if (carName.includes("[Stunt]")) { tagClass = "tag-stunt"; catKey = "classStunt"; catFallback = "Stunt"; }
    else if (carName.includes("[Bonus]")) { tagClass = "tag-bonus"; catKey = "classBonus"; catFallback = "Bonus"; }
    const catName = tr(catKey, catFallback);

    const rowEl = document.createElement("tr");
    rowEl.innerHTML = `
      <td>${i+1}</td>
      <td><strong>${getLocalizedCarName(carName)}</strong></td>
      <td><span class="tag-pill ${tagClass}">${catName}</span></td>
      <td>
        <select class="table-select" id="fouc-car-status-${i}" onchange="updateFOUCCarStatus(${i}, this.value)">
          <option value="owned" ${statusVal === "owned" ? "selected" : ""}>${tr("optInGarage", "🏎️ In Garage (Owned)")}</option>
          <option value="shop" ${statusVal === "shop" ? "selected" : ""}>${tr("optInDealership", "🏪 In Dealership")}</option>
          <option value="locked" ${statusVal === "locked" ? "selected" : ""}>${tr("optLocked", "🔒 Locked")}</option>
        </select>
      </td>
      <td>
        <select class="table-select" id="fouc-car-tune-${i}" onchange="updateFOUCCarTuning(${i}, this.value)">
          <option value="max" ${tuneVal === "max" ? "selected" : ""}>${tr("tuneOptMax", "🔥 Max (Pro Parts)")}</option>
          <option value="med" ${tuneVal === "med" ? "selected" : ""}>${tr("tuneOptMid", "⚡ Mid Tune")}</option>
          <option value="stock" ${tuneVal === "stock" ? "selected" : ""}>${tr("stageStock", "📦 Stock (Factory)")}</option>
        </select>
      </td>
    `;
    tbody.appendChild(rowEl);
  });
}

function updateFOUCCarStatus(i, val) {
  const off = 0x24e + i * 32;
  if (val === "owned") {
    currentSave.view.setUint32(off, 0, true);
    currentSave.view.setUint32(off + 4, 1, true);
    const tuneEl = document.getElementById(`fouc-car-tune-${i}`);
    if (tuneEl && tuneEl.value === "stock") {
      tuneEl.value = "max";
      updateFOUCCarTuning(i, "max", false);
    }
  } else if (val === "shop") {
    currentSave.view.setUint32(off, 0, true);
    currentSave.view.setUint32(off + 4, 0, true);
  } else {
    currentSave.view.setUint32(off, 1, true);
    currentSave.view.setUint32(off + 4, 0, true);
  }
  updateFOUCCarSummary();
  showToast(`Car #${i+1} (${getLocalizedCarName(FOUC_CARS[i])}): ${tr("toastStatusUpdated", "status updated!")}`);
}

function updateFOUCCarTuning(i, val, notify = true) {
  const off = 0x24e + i * 32;
  if (val === "max") {
    for (let b = 9; b < 28; b++) currentSave.rawBytes[off + b] = 0xFF;
  } else if (val === "med") {
    for (let b = 9; b < 28; b++) currentSave.rawBytes[off + b] = 0x55;
  } else {
    for (let b = 9; b < 28; b++) currentSave.rawBytes[off + b] = 0x00;
  }
  if (notify) showToast(`Car #${i+1} (${getLocalizedCarName(FOUC_CARS[i])}): ${tr("toastUpgradesUpdated", "upgrades updated!")}`);
}

function updateFOUCCarSummary() {
  const badge = document.getElementById("fouc-counts-badge");
  if (!badge) return;
  let ownedCnt = 0, shopCnt = 0, lockedCnt = 0;
  for (let i = 0; i < 44; i++) {
    const off = 0x24e + i * 32;
    const locked = currentSave.view.getUint32(off, true);
    const owned = currentSave.view.getUint32(off + 4, true);
    if (owned === 1) ownedCnt++;
    else if (locked === 0) shopCnt++;
    else lockedCnt++;
  }
  const inG = tr("statInGarage", "In Garage");
  const inD = tr("statDealership", "In Dealership");
  const lck = tr("statLocked", "Locked");
  badge.innerText = `${inG}: ${ownedCnt}/44 | ${inD}: ${shopCnt}/44 | ${lck}: ${lockedCnt}/44`;
}

function webOwnAllFOUCCars() {
  for (let i = 0; i < 44; i++) {
    const off = 0x24e + i * 32;
    currentSave.view.setUint32(off, 0, true);
    currentSave.view.setUint32(off + 4, 1, true);
    for (let b = 9; b < 28; b++) currentSave.rawBytes[off + b] = 0xFF;
  }
  renderFOUCCarRows();
  updateFOUCCarSummary();
  showToast(tr("toastFOUCAllMax", "🏎️ All 44 FlatOut: UC cars added to garage with max upgrades!"));
}

function webUnlockAllFOUCShop() {
  for (let i = 0; i < 44; i++) {
    const off = 0x24e + i * 32;
    currentSave.view.setUint32(off, 0, true);
  }
  renderFOUCCarRows();
  updateFOUCCarSummary();
  showToast(tr("toastFOUCShop", "🏪 All 44 FlatOut: UC cars unlocked in dealership!"));
}

function webStockAllFOUCCars() {
  for (let i = 0; i < 44; i++) {
    const off = 0x24e + i * 32;
    for (let b = 9; b < 28; b++) currentSave.rawBytes[off + b] = 0x00;
  }
  renderFOUCCarRows();
  showToast(tr("toastFOUCResetStock", "📦 Upgrades for all FlatOut: UC cars reset to factory stock!"));
}

// ------------------------------------------------------------------------------
// FO1 Cars Handlers
// ------------------------------------------------------------------------------
function updateFO1ActiveCar(val) {
  const num = parseInt(val, 10);
  currentSave.view.setUint32(0x88, num, true);
  showToast(`${tr("toastFO1ActiveCar", "Active vehicle selected")}: ${FO1_CARS[num-1] || num}`);
}

function updateFO1ActiveDivision(val) {
  currentSave.view.setUint32(0x8C, parseInt(val, 10), true);
  showToast(tr("toastDivisionSaved", "Active car division saved!"));
}

function updateFO1ActiveStage(val) {
  currentSave.view.setUint32(0x90, parseInt(val, 10), true);
  showToast(tr("toastStageSaved", "Upgrade Stage level saved!"));
}

function updateFO1Part(idx, checked) {
  currentSave.view.setUint32(0x9C + idx * 4, checked ? 3 : 0, true);
  showToast(`Part #${idx+1}: ${tr("toastResultUpdated", "updated!")}`);
}

function updateFO1CarUnlocked(idx, val) {
  let maskLo = currentSave.view.getUint32(0xD0, true);
  if (val === "1") {
    maskLo |= (1 << idx);
  } else {
    maskLo &= ~(1 << idx);
  }
  currentSave.view.setUint32(0xD0, maskLo >>> 0, true);
  showToast(`Car #${idx+1} (${FO1_CARS[idx]}): ${tr("toastStatusUpdated", "unlock status updated!")}`);
}

function webUnlockAllFO1Cars() {
  currentSave.view.setUint32(0xD0, 0xFFFFFFFF, true);
  currentSave.view.setUint32(0xD4, 0x0000FFFF, true);
  renderGarageSection();
  showToast(tr("toastFO1UnlockAll", "🔓 All 16 FlatOut 1 vehicles unlocked!"));
}

function webMaxTuneFO1Active() {
  currentSave.view.setUint32(0x90, 3, true);
  for (let i = 0; i < 6; i++) {
    currentSave.view.setUint32(0x9C + i * 4, 3, true);
    const cb = document.getElementById(`fo1-part-${i}`);
    if (cb) cb.checked = true;
  }
  renderGarageSection();
  showToast(tr("toastFO1Stage3", "⚡ Stage 3 Pro upgrades applied to active FlatOut 1 car!"));
}

function webUnlockAllFO4Content() {
  const bytes = currentSave.rawBytes;
  for (let i = 0x37AC; i < 0x37AC + 128 && i < bytes.length; i++) {
    bytes[i] = 0x01;
  }
  showToast(tr("toastFO4UnlockAll", "🔓 All FlatOut 4 cars, skins and arenas unlocked!"));
}

// ------------------------------------------------------------------------------
// TAB 3: Cups & Career (Every Cup Individually Editable)
// ------------------------------------------------------------------------------
function renderCupsSection() {
  const container = document.getElementById("ed-cups-container");
  container.innerHTML = "";
  const gt = currentSave.gameType;

  if (gt === "fo2") {
    const derbyUnlocked = currentSave.view.getUint32(0x114, true);
    const raceUnlocked = currentSave.view.getUint32(0x118, true);
    const streetUnlocked = currentSave.view.getUint32(0x11C, true);

    container.innerHTML = `
      <div class="master-actions-grid">
        <button class="btn-action-card" type="button" onclick="webGoldAllFO2Cups()">
          <div class="action-card-icon">🏆</div>
          <div>
            <div class="action-card-title">${tr("btnGoldAllCups", "🏆 100% Gold on ALL Career Cups")}</div>
            <div class="action-card-desc">${tr("descGoldAllFO2Cups", "Saves 1st Place Gold trophies for all 56 career events")}</div>
          </div>
        </button>
        <button class="btn-action-card" type="button" onclick="webUnlockAllFO2Classes()">
          <div class="action-card-icon">🔓</div>
          <div>
            <div class="action-card-title">${tr("btnUnlockAll3Classes", "Unlock All 3 Career Classes")}</div>
            <div class="action-card-desc">${tr("descUnlockAll3Classes", "Derby, Race, and Street classes fully unlocked")}</div>
          </div>
        </button>
      </div>

      <div class="ed-card">
        <div class="ed-card-title">🏁 ${tr("cardTournamentClass", "Tournament Career Class Access")}</div>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <label style="display: flex; align-items: center; gap: 8px; font-weight: 700; cursor: pointer;">
            <input type="checkbox" id="fo2-class-derby" ${derbyUnlocked === 1 ? 'checked' : ''} onchange="updateFO2Class('derby', this.checked)" style="width: 18px; height: 18px;">
            <span>${tr("lblDerbyClass", "Derby Class")}</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; font-weight: 700; cursor: pointer;">
            <input type="checkbox" id="fo2-class-race" ${raceUnlocked === 1 ? 'checked' : ''} onchange="updateFO2Class('race', this.checked)" style="width: 18px; height: 18px;">
            <span>${tr("lblRaceClass", "Race Class")}</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; font-weight: 700; cursor: pointer;">
            <input type="checkbox" id="fo2-class-street" ${streetUnlocked === 1 ? 'checked' : ''} onchange="updateFO2Class('street', this.checked)" style="width: 18px; height: 18px;">
            <span>${tr("lblStreetClass", "Street Class")}</span>
          </label>
        </div>
      </div>

      <div class="table-scroll">
        <table class="editor-table">
          <thead>
            <tr>
              <th style="width: 50px;">#</th>
              <th style="width: 150px;">${tr("thClass", "Class")}</th>
              <th>${tr("thCup", "Event / Cup")}</th>
              <th style="width: 240px;">${tr("thStanding", "Career Standing")}</th>
            </tr>
          </thead>
          <tbody id="fo2-cups-tbody">
          </tbody>
        </table>
      </div>
    `;
    renderFO2CupRows();

  } else if (gt === "fouc") {
    container.innerHTML = `
      <div class="master-actions-grid">
        <button class="btn-action-card" type="button" onclick="webGoldEverythingFOUC()">
          <div class="action-card-icon">🌟</div>
          <div>
            <div class="action-card-title">${tr("btnGoldEverythingFOUC", "100% Complete (Career + Carnage)")}</div>
            <div class="action-card-desc">${tr("descGoldEverythingFOUC", "Absolute Gold across all 154 game events")}</div>
          </div>
        </button>
        <button class="btn-action-card" type="button" onclick="webGoldFOUCCarnage()">
          <div class="action-card-icon">🔥</div>
          <div>
            <div class="action-card-title">${tr("btnGoldCarnage", "🔥 100% Gold in Carnage Mode")}</div>
            <div class="action-card-desc">${tr("descGoldCarnage", "All 36 Carnage Mode challenges won with Gold")}</div>
          </div>
        </button>
        <button class="btn-action-card" type="button" onclick="webGoldAllFOUCCups()">
          <div class="action-card-icon">🏆</div>
          <div>
            <div class="action-card-title">${tr("btnGoldCareerFOUC", "All Career Cups on Gold")}</div>
            <div class="action-card-desc">${tr("descGoldCareerFOUC", "Gold cups across all 108 career events")}</div>
          </div>
        </button>
      </div>

      <div class="table-scroll">
        <table class="editor-table">
          <thead>
            <tr>
              <th style="width: 50px;">#</th>
              <th style="width: 180px;">${tr("thCategory", "Category")}</th>
              <th>${tr("thEventName", "Event Name")}</th>
              <th style="width: 240px;">${tr("thResult", "Result")}</th>
            </tr>
          </thead>
          <tbody id="fouc-cups-tbody">
          </tbody>
        </table>
      </div>
    `;
    renderFOUCCupRows();

  } else if (gt === "fo1") {
    container.innerHTML = `
      <div class="master-actions-grid">
        <button class="btn-action-card" type="button" onclick="webGoldAllFO1Races()">
          <div class="action-card-icon">🏆</div>
          <div>
            <div class="action-card-title">${tr("btnGoldAllFO1Races", "Win ALL 36 races in 1st place (Gold)")}</div>
            <div class="action-card-desc">${tr("descGoldAllFO1Races", "Gold trophies in Bronze, Silver and Gold divisions")}</div>
          </div>
        </button>
        <button class="btn-action-card" type="button" onclick="webUnlockAllFO1Races()">
          <div class="action-card-icon">🔓</div>
          <div>
            <div class="action-card-title">${tr("btnUnlockAllFO1RacesTitle", "Unlock Access to All Races")}</div>
            <div class="action-card-desc">${tr("descUnlockAllFO1RacesSub", "Unlock all career tracks for participation")}</div>
          </div>
        </button>
      </div>

      <div class="table-scroll">
        <table class="editor-table">
          <thead>
            <tr>
              <th style="width: 50px;">#</th>
              <th style="width: 180px;">${tr("thDivision", "Division")}</th>
              <th>${tr("thTrack", "Race Track")}</th>
              <th style="width: 240px;">${tr("thResult", "Result")}</th>
            </tr>
          </thead>
          <tbody id="fo1-races-tbody">
          </tbody>
        </table>
      </div>
    `;
    renderFO1RaceRows();

  } else if (gt === "fo4") {
    container.innerHTML = `
      <div class="master-actions-grid">
        <button class="btn-action-card" type="button" onclick="webMaxWinsFO4()">
          <div class="action-card-icon">🏁</div>
          <div>
            <div class="action-card-title">${tr("btnMaxFO4Wins", "Maximum Career Wins")}</div>
            <div class="action-card-desc">${tr("descMaxFO4Wins", "Sets top wins in circuit races, derbies and stunts")}</div>
          </div>
        </button>
      </div>
      <div class="ed-card">
        <div class="ed-card-title">🏆 ${tr("cardFO4ProgressTitle", "FlatOut 4 Progress")}</div>
        <p style="color: var(--text-secondary); font-size: 14px;">
          ${tr("descFO4ProgressFull", "Career races and arenas synchronize with the total win counter and unlocked content. Use the button above or the \"Stats\" tab for fine-tuning all race metrics.")}
        </p>
      </div>
    `;
  }
}

// ------------------------------------------------------------------------------
// FO2 Cups Handlers
// ------------------------------------------------------------------------------
function renderFO2CupRows() {
  const tbody = document.getElementById("fo2-cups-tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  for (let i = 0; i < 56; i++) {
    const val = currentSave.rawBytes[0x2B8 + i];
    let cat = "Derby";
    let tag = "tag-derby";
    let cupNum = i + 1;
    if (i >= 18 && i < 38) {
      cat = "Race";
      tag = "tag-race";
      cupNum = i - 17;
    } else if (i >= 38) {
      cat = "Street";
      tag = "tag-street";
      cupNum = i - 37;
    }

    const cupName = `${tr("cupPrefix", "Cup")} #${cupNum}`;

    const rowEl = document.createElement("tr");
    rowEl.innerHTML = `
      <td>${i+1}</td>
      <td><span class="tag-pill ${tag}">${cat}</span></td>
      <td><strong>${cupName}</strong></td>
      <td>
        <select class="table-select" id="fo2-cup-${i}" onchange="updateFO2CupStatus(${i}, this.value)">
          <option value="1" ${val === 1 ? 'selected' : ''}>${tr("standingGold1", "🥇 1st Place (Gold)")}</option>
          <option value="2" ${val === 2 ? 'selected' : ''}>${tr("standingSilver2", "🥈 2nd Place (Silver)")}</option>
          <option value="3" ${val === 3 ? 'selected' : ''}>${tr("standingBronze3", "🥉 3rd Place (Bronze)")}</option>
          <option value="254" ${val === 254 ? 'selected' : ''}>${tr("standingOpen", "🔓 Unlocked (Open)")}</option>
          <option value="0" ${val === 0 ? 'selected' : ''}>${tr("optLocked", "🔒 Locked")}</option>
        </select>
      </td>
    `;
    tbody.appendChild(rowEl);
  }
}

function updateFO2CupStatus(i, val) {
  const byteVal = parseInt(val, 10);
  currentSave.rawBytes[0x2B8 + i] = byteVal;
  showToast(`${tr("cupPrefix", "Cup")} #${i+1}: ${tr("toastResultUpdated", "result updated!")}`);
}

function updateFO2Class(cls, checked) {
  const off = cls === 'derby' ? 0x114 : (cls === 'race' ? 0x118 : 0x11C);
  currentSave.view.setUint32(off, checked ? 1 : 0, true);
  showToast(`Class ${cls.toUpperCase()}: ${checked ? tr("statusReady", "unlocked") : tr("statLocked", "locked")}!`);
}

function webGoldAllFO2Cups() {
  currentSave.view.setUint32(0x114, 1, true);
  currentSave.view.setUint32(0x118, 1, true);
  currentSave.view.setUint32(0x11C, 1, true);

  currentSave.view.setUint32(0x2AC, 0x00fa001e, true);
  currentSave.view.setUint32(0x2B0, 0x000f190f, true);
  currentSave.view.setUint32(0x2B4, 0x00003fbd, true);

  for (let b = 0x2B8; b < 0x2F0; b++) {
    currentSave.rawBytes[b] = 0x01;
  }
  renderCupsSection();
  showToast(tr("toastFO2CupsGold", "🏆 All 56 FlatOut 2 career cups completed on 100% Gold!"));
}

function webUnlockAllFO2Classes() {
  currentSave.view.setUint32(0x114, 1, true);
  currentSave.view.setUint32(0x118, 1, true);
  currentSave.view.setUint32(0x11C, 1, true);
  renderCupsSection();
  showToast(tr("toastFO2ClassesUnlocked", "🔓 All 3 career classes (Derby, Race, Street) unlocked!"));
}

// ------------------------------------------------------------------------------
// FOUC Cups Handlers
// ------------------------------------------------------------------------------
function renderFOUCCupRows() {
  const tbody = document.getElementById("fouc-cups-tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  for (let i = 0; i < 154; i++) {
    const val = currentSave.rawBytes[0x150 + i];
    let cat = "Career Event";
    let tag = "tag-race";
    let name = `${tr("stagePrefix", "Stage")} #${i+1}`;

    if (i < 36) {
      cat = "Career: Derby";
      tag = "tag-derby";
      name = `${tr("classDerby", "Derby")} #${i+1}`;
    } else if (i < 72) {
      cat = "Career: Race";
      tag = "tag-race";
      name = `${tr("classRace", "Race")} #${i-35}`;
    } else if (i < 108) {
      cat = "Career: Street";
      tag = "tag-street";
      name = `${tr("classStreet", "Street")} #${i-71}`;
    } else if (i < 144) {
      cat = "Carnage Mode";
      tag = "tag-stunt";
      name = `Carnage #${i-107}`;
    } else {
      cat = "Special Events";
      tag = "tag-bonus";
      name = `Special #${i-143}`;
    }

    const rowEl = document.createElement("tr");
    rowEl.innerHTML = `
      <td>${i+1}</td>
      <td><span class="tag-pill ${tag}">${cat}</span></td>
      <td><strong>${name}</strong></td>
      <td>
        <select class="table-select" id="fouc-cup-${i}" onchange="updateFOUCCupStatus(${i}, this.value)">
          <option value="1" ${val === 1 ? 'selected' : ''}>${tr("standingGold1", "🥇 1st Place (Gold)")}</option>
          <option value="2" ${val === 2 ? 'selected' : ''}>${tr("standingSilver2", "🥈 2nd Place (Silver)")}</option>
          <option value="3" ${val === 3 ? 'selected' : ''}>${tr("standingBronze3", "🥉 3rd Place (Bronze)")}</option>
          <option value="254" ${val === 254 ? 'selected' : ''}>${tr("standingOpen", "🔓 Unlocked (Open)")}</option>
          <option value="0" ${val === 0 ? 'selected' : ''}>${tr("optLocked", "🔒 Locked")}</option>
        </select>
      </td>
    `;
    tbody.appendChild(rowEl);
  }
}

function updateFOUCCupStatus(i, val) {
  const byteVal = parseInt(val, 10);
  currentSave.rawBytes[0x150 + i] = byteVal;
  showToast(`Event #${i+1}: ${tr("toastResultUpdated", "result updated!")}`);
}

function webGoldAllFOUCCups() {
  for (let i = 0; i < 108; i++) {
    currentSave.rawBytes[0x150 + i] = 0x01;
  }
  renderFOUCCupRows();
  showToast(tr("toastFOUCCupsGold", "🏆 All FlatOut: UC tournament career cups completed on Gold!"));
}

function webGoldFOUCCarnage() {
  for (let i = 108; i < 144; i++) {
    currentSave.rawBytes[0x150 + i] = 0x01;
  }
  renderFOUCCupRows();
  showToast(tr("toastFOUCCarnageGold", "🔥 All 36 Carnage Mode challenges completed on Gold!"));
}

function webGoldEverythingFOUC() {
  for (let i = 0; i < 154; i++) {
    currentSave.rawBytes[0x150 + i] = 0x01;
  }
  renderFOUCCupRows();
  showToast(tr("toastFOUCAllGold", "🌟 100% Complete: Career & Carnage Mode all Gold!"));
}

// ------------------------------------------------------------------------------
// FO1 Races Handlers
// ------------------------------------------------------------------------------
function renderFO1RaceRows() {
  const tbody = document.getElementById("fo1-races-tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  for (let i = 0; i < 36; i++) {
    const val = currentSave.rawBytes[0xE0 + i];
    let div = "Bronze Division";
    let tag = "tag-bonus";
    if (i >= 12 && i < 24) { div = "Silver Division"; tag = "tag-race"; }
    else if (i >= 24) { div = "Gold Division"; tag = "tag-stunt"; }

    const trackName = FO1_TRACKS[i] || (`Race #${i+1}`);

    const rowEl = document.createElement("tr");
    rowEl.innerHTML = `
      <td>${i+1}</td>
      <td><span class="tag-pill ${tag}">${div}</span></td>
      <td><strong>${trackName}</strong></td>
      <td>
        <select class="table-select" id="fo1-race-${i}" onchange="updateFO1RaceStatus(${i}, this.value)">
          <option value="1" ${val === 1 ? 'selected' : ''}>${tr("standingGold1", "🥇 1st Place (Gold)")}</option>
          <option value="2" ${val === 2 ? 'selected' : ''}>${tr("standingSilver2", "🥈 2nd Place (Silver)")}</option>
          <option value="3" ${val === 3 ? 'selected' : ''}>${tr("standingBronze3", "🥉 3rd Place (Bronze)")}</option>
          <option value="4" ${val === 4 ? 'selected' : ''}>${tr("standingOpen", "🔓 Unlocked (Open)")}</option>
          <option value="0" ${val === 0 ? 'selected' : ''}>${tr("optLocked", "🔒 Locked")}</option>
        </select>
      </td>
    `;
    tbody.appendChild(rowEl);
  }
}

function updateFO1RaceStatus(i, val) {
  currentSave.rawBytes[0xE0 + i] = parseInt(val, 10);
  showToast(`Race #${i+1}: ${tr("toastResultUpdated", "standing saved!")}`);
}

function webGoldAllFO1Races() {
  for (let i = 0; i < 36; i++) {
    currentSave.rawBytes[0xE0 + i] = 0x01;
  }
  renderFO1RaceRows();
  showToast(tr("toastFO1RacesGold", "🏆 All 36 FlatOut 1 division races completed in 1st place (Gold)!"));
}

function webUnlockAllFO1Races() {
  for (let i = 0; i < 36; i++) {
    if (currentSave.rawBytes[0xE0 + i] === 0) {
      currentSave.rawBytes[0xE0 + i] = 0x04;
    }
  }
  renderFO1RaceRows();
  showToast(tr("toastFO1RacesUnlocked", "🔓 All FlatOut 1 career races unlocked!"));
}

// ------------------------------------------------------------------------------
// TAB 4: Stunts (options.sav & FO2) — Every Stunt Individually Editable
// ------------------------------------------------------------------------------
function getStuntsTarget() {
  if (secondarySave && secondarySave.gameType === "options") {
    return secondarySave;
  }
  return currentSave;
}

function renderStuntsSection() {
  const container = document.getElementById("ed-stunts-container");
  if (!container) return;

  if (currentSave.gameType === "fo2" && !secondarySave) {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 36px 20px; border: 1px dashed var(--accent-orange); max-width: 600px; margin: 20px auto;">
        <div style="font-size: 40px; margin-bottom: 12px;">🏆</div>
        <h3 style="color: var(--accent-gold); font-size: 18px; margin-bottom: 10px; font-weight: 700;">
          ${tr("optReqTitle", "OPTIONS.SAV FILE REQUIRED FOR STUNTS")}
        </h3>
        <p style="color: var(--text-dim); max-width: 480px; margin: 0 auto 20px; font-size: 13px; line-height: 1.6;">
          ${tr("optReqDesc", "In FlatOut 2, stunt records (Hall of Fame) are stored separately in <strong>options.sav</strong> (131,072 bytes), while career progress is in player001.sav.<br>Attach options.sav for full access:")}
        </p>
        <button class="btn-primary" type="button" onclick="document.getElementById('secondary-opt-input').click()" style="margin: 0 auto; display: inline-flex; align-items: center; gap: 8px;">
          📂 ${tr("btnAttachOpt", "Attach options.sav")}
        </button>
        <input type="file" id="secondary-opt-input" style="display: none;" accept=".sav" onchange="handleSecondaryOptFile(this.files)">
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="master-actions-grid">
      <button class="btn-action-card" type="button" onclick="webSetAllWorldRecordsStunts()">
        <div class="action-card-icon">⭐</div>
        <div>
          <div class="action-card-title">${tr("btnWorldRecords", "⭐ Set World Records Across All 12 Stunts")}</div>
          <div class="action-card-desc">${tr("descWorldRecords", "Set record scores and meters in all 12 mini-games")}</div>
        </div>
      </button>
    </div>
    <div class="table-scroll">
      <table class="editor-table">
        <thead>
          <tr>
            <th style="width: 50px;">#</th>
            <th>${tr("thStuntMiniGame", "Stunt Mini-Game")}</th>
            <th style="width: 170px;">${tr("thRecordHolder", "Record Holder (Nick)")}</th>
            <th style="width: 150px;">${tr("thRecordScore", "Record Score")}</th>
            <th style="width: 220px;">${tr("thVehicle", "Vehicle")}</th>
          </tr>
        </thead>
        <tbody id="stunts-tbody">
        </tbody>
      </table>
    </div>
  `;

  const tbody = document.getElementById("stunts-tbody");
  if (!tbody) return;

  const target = getStuntsTarget();
  const defaultNick = currentSave.nickname.replace(/^#\d+/, "") || "Player";

  FO2_STUNTS.forEach((s, i) => {
    let fl = s.defScore;
    let carId = s.car;
    let rName = defaultNick;

    if (target && target.rawBytes && s.off + 40 <= target.rawBytes.length) {
      const readFl = target.view.getFloat32(s.off, true);
      if (readFl > 0 && readFl < 1000000) fl = readFl;
      const readCar = target.view.getUint32(s.off + 4, true);
      if (readCar >= 0 && readCar < FO2_CARS.length) carId = readCar;
      const readN = readUtf16LE(target.rawBytes, s.off + 8, 32);
      if (readN.trim()) rName = readN.trim();
    }

    const stuntName = tr("stunt_" + i, s.name);
    const stuntUnitKey = "unit_" + s.unit.replace(/[^a-zA-Z]/g, "").toLowerCase();
    const stuntUnit = tr(stuntUnitKey, s.unit);

    const rowEl = document.createElement("tr");
    rowEl.innerHTML = `
      <td>${i+1}</td>
      <td><strong>${stuntName}</strong> <span style="color:var(--text-muted); font-size:12px;">(${stuntUnit})</span></td>
      <td>
        <input type="text" class="table-input" id="stunt-name-${i}" value="${rName}" onchange="updateStuntName(${i}, this.value)" maxlength="16">
      </td>
      <td>
        <input type="number" step="0.1" class="table-input" id="stunt-score-${i}" value="${fl.toFixed(2)}" onchange="updateStuntScore(${i}, this.value)">
      </td>
      <td>
        <select class="table-select" id="stunt-car-${i}" onchange="updateStuntCar(${i}, this.value)">
          ${FO2_CARS.map((c, cIdx) => `<option value="${cIdx}" ${cIdx === carId ? 'selected' : ''}>${getLocalizedCarName(c)}</option>`).join('')}
        </select>
      </td>
    `;
    tbody.appendChild(rowEl);
  });
}

function updateStuntName(i, val) {
  const s = FO2_STUNTS[i];
  const target = getStuntsTarget();
  if (target && target.rawBytes && s.off + 40 <= target.rawBytes.length) {
    writeUtf16LE(target.rawBytes, s.off + 8, 32, val.trim() || "Player");
    showToast(`Stunt #${i+1}: ${tr("toastRecordHolderUpdated", "record holder name updated!")}`);
  }
}

function updateStuntScore(i, val) {
  const s = FO2_STUNTS[i];
  const target = getStuntsTarget();
  if (target && target.view && s.off + 4 <= target.rawBytes.length) {
    const num = parseFloat(String(val).replace(',', '.')) || 100.0;
    target.view.setFloat32(s.off, num, true);
    showToast(`Stunt #${i+1}: ${tr("toastRecordScoreSaved", "record score saved!")}`);
  }
}

function updateStuntCar(i, val) {
  const s = FO2_STUNTS[i];
  const target = getStuntsTarget();
  if (target && target.view && s.off + 8 <= target.rawBytes.length) {
    const carIdx = parseInt(val, 10) || 36;
    target.view.setUint32(s.off + 4, carIdx, true);
    showToast(`Stunt #${i+1}: ${tr("toastVehicleChanged", "vehicle changed!")}`);
  }
}

function webSetAllWorldRecordsStunts() {
  const target = getStuntsTarget();
  if (!target || !target.rawBytes || !target.view) return;
  const bytes = target.rawBytes;
  const view = target.view;
  const name = currentSave.nickname.replace(/^#\d+/, "") || "Player";

  FO2_STUNTS.forEach((s, i) => {
    if (s.off + 40 <= bytes.length) {
      view.setFloat32(s.off, s.defScore, true);
      view.setUint32(s.off + 4, s.car, true);
      writeUtf16LE(bytes, s.off + 8, 32, name);

      const nameIn = document.getElementById(`stunt-name-${i}`);
      const scoreIn = document.getElementById(`stunt-score-${i}`);
      const carSel = document.getElementById(`stunt-car-${i}`);
      if (nameIn) nameIn.value = name;
      if (scoreIn) scoreIn.value = s.defScore.toFixed(2);
      if (carSel) carSel.value = s.car;
    }
  });
  showToast(`⭐ ${tr("toastAllStuntsRecords", "World records in all 12 stunts set for")} '${name}'!`);
}

// ------------------------------------------------------------------------------
// TAB 5: Stats & Records Section (Individually Editable)
// ------------------------------------------------------------------------------
function renderStatsSection() {
  const container = document.getElementById("ed-stats-container");
  container.innerHTML = "";
  const gt = currentSave.gameType;

  if (gt === "fo2" || gt === "fouc") {
    const offMap = gt === "fouc"
      ? { totalEarn: 0x11C, cupEarn: 0x120, crashEarn: 0x124, totalSpent: 0x128, races: 0x12C, meters: 0xC52 }
      : { totalEarn: 0x120, cupEarn: 0x124, crashEarn: 0x128, totalSpent: 0x12C, races: 0x148, meters: 0xE32 };

    const whammo = currentSave.view.getUint32(0x138, true);
    const superflip = currentSave.view.getUint32(0x13C, true);
    const blastout = currentSave.view.getUint32(0x140, true);
    const bigair = currentSave.view.getUint32(0x144, true);

    const totalEarn = currentSave.view.getUint32(offMap.totalEarn, true);
    const cupEarn = currentSave.view.getUint32(offMap.cupEarn, true);
    const crashEarn = currentSave.view.getUint32(offMap.crashEarn, true);
    const totalSpent = currentSave.view.getUint32(offMap.totalSpent, true);

    const races = currentSave.view.getUint32(offMap.races, true);
    const wins = currentSave.view.getUint32(0x130, true);
    const secPlaces = currentSave.view.getUint32(0x134, true);
    const meters = offMap.meters + 4 <= currentSave.rawBytes.length ? currentSave.view.getFloat32(offMap.meters, true) : 2500000.0;

    container.innerHTML = `
      <div class="master-actions-grid">
        <button class="btn-action-card" type="button" onclick="webSetProDestructionStats()">
          <div class="action-card-icon">💥</div>
          <div>
            <div class="action-card-title">${tr("statMaxDestruction", "Set Maximum Stunts, Crashes & Destruction Records")}</div>
            <div class="action-card-desc">${tr("descMaxDestruction", "Whammo slams, SuperFlip rolls, BlastOut ejections, BigAir, millions of odometer meters")}</div>
          </div>
        </button>
      </div>

      <div class="ed-card">
        <div class="ed-card-title">💥 ${tr("cardDestructionTitle", "Destruction, Crashes & Stunts")}</div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">${tr("lblWhammo", "Whammo Collisions:")}</label>
            <input type="number" id="ed-stat-whammo" class="form-input" value="${whammo}" onchange="updateRawStatUint32(0x138, this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblSuperflip", "SuperFlip Roof Rolls:")}</label>
            <input type="number" id="ed-stat-superflip" class="form-input" value="${superflip}" onchange="updateRawStatUint32(0x13C, this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblBlastout", "BlastOut Ejections:")}</label>
            <input type="number" id="ed-stat-blastout" class="form-input" value="${blastout}" onchange="updateRawStatUint32(0x140, this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblBigair", "BigAir Jumps:")}</label>
            <input type="number" id="ed-stat-bigair" class="form-input" value="${bigair}" onchange="updateRawStatUint32(0x144, this.value)">
          </div>
        </div>
      </div>

      <div class="ed-card">
        <div class="ed-card-title">🏁 ${tr("cardRacesTitle", "Races, Wins & Odometer")}</div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">${tr("lblTotalRaces", "Total Races Completed:")}</label>
            <input type="number" id="ed-stat-races" class="form-input" value="${races}" onchange="updateRawStatUint32(${offMap.races}, this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblVictories", "Race Victories (1st Place):")}</label>
            <input type="number" id="ed-stat-wins" class="form-input" value="${wins}" onchange="updateRawStatUint32(0x130, this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblSecondPlaces", "Second Place Finishes:")}</label>
            <input type="number" id="ed-stat-sec" class="form-input" value="${secPlaces}" onchange="updateRawStatUint32(0x134, this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblMeters", "Distance Traveled (Meters):")}</label>
            <input type="number" step="1000" id="ed-stat-meters" class="form-input" value="${meters.toFixed(0)}" onchange="updateFO2Distance(this.value)">
          </div>
        </div>
      </div>

      <div class="ed-card">
        <div class="ed-card-title">💰 ${tr("cardEarningsTitle", "Career Earnings & Expenses")}</div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">${tr("lblTotalEarned", "Total Career Earnings (Cr):")}</label>
            <input type="number" id="ed-stat-earn" class="form-input" value="${totalEarn}" onchange="updateRawStatUint32(${offMap.totalEarn}, this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblCupEarned", "Cup Prize Money (Cr):")}</label>
            <input type="number" id="ed-stat-cupearn" class="form-input" value="${cupEarn}" onchange="updateRawStatUint32(${offMap.cupEarn}, this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblCrashBonus", "Crash & Stunt Bonus Cash (Cr):")}</label>
            <input type="number" id="ed-stat-crashearn" class="form-input" value="${crashEarn}" onchange="updateRawStatUint32(${offMap.crashEarn}, this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblTotalSpent", "Total Money Spent (Cr):")}</label>
            <input type="number" id="ed-stat-spent" class="form-input" value="${totalSpent}" onchange="updateRawStatUint32(${offMap.totalSpent}, this.value)">
          </div>
        </div>
      </div>
    `;
  } else if (gt === "fo1") {
    const races = currentSave.view.getUint32(0xB4, true);
    const wins = currentSave.view.getUint32(0xB8, true);
    const earnings = currentSave.view.getUint32(0xC4, true);
    const cupsWon = currentSave.view.getUint32(0xC8, true);
    const trackList = FO1_TRACKS;

    container.innerHTML = `
      <div class="master-actions-grid">
        <button class="btn-action-card" type="button" onclick="webClaimFO1TrackRecords()">
          <div class="action-card-icon">⏱️</div>
          <div>
            <div class="action-card-title">${tr("btnClaimFO1Records", "Claim World Records on All 36 Tracks")}</div>
            <div class="action-card-desc">${tr("descClaimFO1RecordsFull", "Sets your nickname as record holder with top lap times across all 36 tracks")}</div>
          </div>
        </button>
      </div>

      <div class="ed-card">
        <div class="ed-card-title">📊 ${tr("cardFO1OverviewTitle", "FlatOut 1 Career Overview & Stats")}</div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">${tr("lblTotalRaces", "Total Races Completed:")}</label>
            <input type="number" class="form-input" value="${races}" onchange="updateRawStatUint32(0xB4, this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblVictories", "Race Victories (1st Place):")}</label>
            <input type="number" class="form-input" value="${wins}" onchange="updateRawStatUint32(0xB8, this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblCashWon", "Total Cash Won (Cr):")}</label>
            <input type="number" class="form-input" value="${earnings}" onchange="updateRawStatUint32(0xC4, this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblCupEarned", "Cup Prize Money (Cr):")}</label>
            <input type="number" class="form-input" value="${cupsWon}" onchange="updateRawStatUint32(0xC8, this.value)">
          </div>
        </div>
      </div>

      <div class="ed-card">
        <div class="ed-card-title">⏱️ ${tr("cardFO1RecordsTitle", "Hall of Fame Track Records (36 Tracks)")}</div>
        <div class="table-scroll">
          <table class="editor-table">
            <thead>
              <tr>
                <th style="width: 50px;">#</th>
                <th>${tr("thTrack", "Track")}</th>
                <th style="width: 220px;">${tr("thRecordHolder", "Record Holder (Nick)")}</th>
                <th style="width: 160px;">${tr("thLapRecord", "Best Lap Time (sec)")}</th>
              </tr>
            </thead>
            <tbody>
              ${trackList.map((tname, i) => {
                const off = 0x190 + i * 52;
                let rName = readUtf16LE(currentSave.rawBytes, off, 24);
                let rTime = 45.0;
                if (off + 28 <= currentSave.rawBytes.length) {
                  const rawT = currentSave.view.getFloat32(off + 24, true);
                  if (rawT > 5.0 && rawT < 1000.0) rTime = rawT;
                }
                return `
                  <tr>
                    <td>${i+1}</td>
                    <td><strong>${tname}</strong></td>
                    <td>
                      <input type="text" class="table-input" id="fo1-rec-name-${i}" value="${rName || 'PLAYER'}" onchange="updateFO1RecordName(${i}, this.value)" maxlength="16">
                    </td>
                    <td>
                      <input type="number" step="0.01" class="table-input" id="fo1-rec-time-${i}" value="${rTime.toFixed(2)}" onchange="updateFO1RecordTime(${i}, this.value)">
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (gt === "fo4") {
    const races = currentSave.view.getUint32(0x3A8, true);
    const derbies = currentSave.view.getUint32(0x3AC, true);
    const stunts = currentSave.view.getUint32(0x3B0, true);
    const totalEvents = currentSave.view.getUint32(0x3B4, true);
    const destruction = currentSave.view.getUint32(0x3C0, true);
    const assault = currentSave.view.getUint32(0x3DC, true);
    const carnage = currentSave.view.getUint32(0x3F4, true);
    const dist = currentSave.view.getFloat32(0x398, true);

    container.innerHTML = `
      <div class="ed-card">
        <div class="ed-card-title">🏁 ${tr("cardFO4StatsTitle", "FlatOut 4: Total Insanity Career Stats")}</div>
        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">${tr("lblRaceWins", "Race Victories:")}</label>
            <input type="number" class="form-input" value="${races}" onchange="updateRawStatUint32(0x3A8, this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblDerbyWins", "Derby Victories:")}</label>
            <input type="number" class="form-input" value="${derbies}" onchange="updateRawStatUint32(0x3AC, this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblStuntWins", "Stunt Victories:")}</label>
            <input type="number" class="form-input" value="${stunts}" onchange="updateRawStatUint32(0x3B0, this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblTotalEvents", "Total Events Completed:")}</label>
            <input type="number" class="form-input" value="${totalEvents}" onchange="updateRawStatUint32(0x3B4, this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblDestructionScore", "Destruction Score:")}</label>
            <input type="number" class="form-input" value="${destruction}" onchange="updateRawStatUint32(0x3C0, this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblAssaultPoints", "Assault Points:")}</label>
            <input type="number" class="form-input" value="${assault}" onchange="updateRawStatUint32(0x3DC, this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblCarnageScore", "Carnage Mode Score:")}</label>
            <input type="number" class="form-input" value="${carnage}" onchange="updateRawStatUint32(0x3F4, this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">${tr("lblMeters", "Distance Traveled (Meters):")}</label>
            <input type="number" class="form-input" value="${dist.toFixed(0)}" onchange="updateRawStatFloat32(0x398, this.value)">
          </div>
        </div>
      </div>
    `;
  }
}

function updateRawStatUint32(offset, val) {
  const num = parseInt(val, 10) || 0;
  currentSave.view.setUint32(offset, num, true);
  showToast(tr("toastStatSaved", "Stat saved!"));
}

function updateRawStatFloat32(offset, val) {
  const num = parseFloat(val) || 0.0;
  currentSave.view.setFloat32(offset, num, true);
  showToast(tr("toastStatSaved", "Stat saved!"));
}

function updateFO2Distance(val) {
  const off = currentSave.gameType === "fouc" ? 0xC52 : (currentSave.gameType === "fo2" ? 0xE32 : -1);
  if (off !== -1 && off + 4 <= currentSave.rawBytes.length) {
    const num = parseFloat(val) || 4500000.0;
    currentSave.view.setFloat32(off, num, true);
    showToast(tr("toastOdometerUpdated", "Odometer updated!"));
  }
}

function updateFO1RecordName(idx, val) {
  const off = 0x190 + idx * 52;
  if (off + 24 <= currentSave.rawBytes.length) {
    writeUtf16LE(currentSave.rawBytes, off, 24, val.trim() || "PLAYER");
    showToast(`Track #${idx+1}: ${tr("toastRecordHolderUpdated", "record holder name saved!")}`);
  }
}

function updateFO1RecordTime(idx, val) {
  const off = 0x190 + idx * 52 + 24;
  if (off + 4 <= currentSave.rawBytes.length) {
    const num = parseFloat(val) || 45.0;
    currentSave.view.setFloat32(off, num, true);
    showToast(`Track #${idx+1}: ${tr("toastRecordTimeSaved", "lap record time saved!")}`);
  }
}

function webClaimFO1TrackRecords() {
  const bytes = currentSave.rawBytes;
  const name = document.getElementById("ed-nick-input").value.trim() || "PLAYER";
  for (let i = 0; i < 36; i++) {
    const off = 0x190 + i * 52;
    writeUtf16LE(bytes, off, 24, name);
    const inEl = document.getElementById(`fo1-rec-name-${i}`);
    if (inEl) inEl.value = name;
  }
  showToast(`⏱️ '${name}' ${tr("toastAllFO1Records", "recorded as record holder on all 36 FlatOut 1 tracks!")}`);
}

function webSetProDestructionStats() {
  const view = currentSave.view;
  const gt = currentSave.gameType;

  if (gt === "fo2") {
    view.setUint32(0x138, 2400, true);
    view.setUint32(0x13C, 750, true);
    view.setUint32(0x140, 120, true);
    view.setUint32(0x144, 1100, true);
    if (0xE32 + 4 <= currentSave.rawBytes.length) {
      view.setFloat32(0xE32, 4500000.0, true);
    }
  } else if (gt === "fouc") {
    view.setUint32(0x138, 2500, true);
    view.setUint32(0x13C, 800, true);
    view.setUint32(0x140, 150, true);
    view.setUint32(0x144, 1200, true);
    if (0xC52 + 4 <= currentSave.rawBytes.length) {
      view.setFloat32(0xC52, 5000000.0, true);
    }
  }
  renderStatsSection();
  showToast(tr("toastFO2StatsSet", "💥 Stunts, crashes and destruction records set!"));
}

function webMaxWinsFO4() {
  const view = currentSave.view;
  view.setUint32(0x3A8, 150, true);
  view.setUint32(0x3AC, 90, true);
  view.setUint32(0x3B0, 75, true);
  view.setUint32(0x3B4, 250, true);
  view.setUint32(0x3C0, 1500, true);
  view.setUint32(0x3DC, 25000, true);
  view.setUint32(0x3F4, 25000, true);
  renderStatsSection();
  showToast(tr("toastFO4WinsSet", "🏁 Maximum wins and mode records set for FlatOut 4!"));
}

function applyQuickMoney(amt) {
  const input = document.getElementById("ed-money-input");
  let val = parseInt(input.value.replace(/\D/g, "") || "0", 10);
  val = Math.min(999999999, Math.max(0, val + amt));
  input.value = val;
  currentSave.money = val;
  syncMoneyToBuffer(val);
}

function setMaxMoney(maxVal) {
  const input = document.getElementById("ed-money-input");
  const val = Math.min(999999999, Math.max(0, maxVal));
  input.value = val;
  currentSave.money = val;
  syncMoneyToBuffer(val);
}

function syncMoneyToBuffer(val) {
  if (!currentSave.view) return;
  const safeVal = Math.min(999999999, Math.max(0, val || 0));
  const gt = currentSave.gameType;
  if (gt === "fo1") {
    currentSave.view.setUint32(0x84, safeVal, true);
    if (currentSave.rawBytes.length >= 0xC8) {
      const curEarned = currentSave.view.getUint32(0xC4, true);
      if (safeVal > curEarned) {
        currentSave.view.setUint32(0xC4, safeVal, true);
      }
    }
  } else if (gt === "fo2") {
    currentSave.view.setUint32(0x48, safeVal, true);
    if (currentSave.rawBytes.length >= 0x124) {
      const curEarned = currentSave.view.getUint32(0x120, true);
      if (safeVal > curEarned) {
        currentSave.view.setUint32(0x120, safeVal, true);
      }
    }
  } else if (gt === "fouc") {
    currentSave.view.setUint32(0x50, safeVal, true);
    if (currentSave.rawBytes.length >= 0x120) {
      const curEarned = currentSave.view.getUint32(0x11C, true);
      if (safeVal > curEarned) {
        currentSave.view.setUint32(0x11C, safeVal, true);
      }
    }
  } else if (gt === "fo4") {
    if (currentSave.rawBytes.length >= 0x0B5C) {
      currentSave.view.setUint32(0x0B58, safeVal, true);
    }
    currentSave.view.setUint32(0x3C4, safeVal, true);
    if (currentSave.rawBytes.length >= 0x3834) {
      currentSave.view.setUint32(0x3830, safeVal, true);
      currentSave.view.setUint32(0x382C, safeVal, true);
    }
    const curTotal = currentSave.view.getUint32(0x3B8, true);
    if (safeVal > curTotal) {
      currentSave.view.setUint32(0x3B8, safeVal, true);
    }
  }
}

// ==============================================================================
// 9. Combined Saves Loader & Export
// ==============================================================================
function attachSecondaryOptions(optName, optBuf) {
  const optBytes = optBuf instanceof Uint8Array ? optBuf : new Uint8Array(optBuf);
  secondarySave = {
    filename: optName,
    gameType: "options",
    rawBytes: optBytes,
    view: new DataView(optBytes.buffer, optBytes.byteOffset, optBytes.byteLength)
  };

  // Update header badges and labels
  updateLoadedBadge();

  const fnEl = document.getElementById("loaded-filename");
  if (fnEl) fnEl.innerText = `${currentSave.filename} + ${optName}`;

  const szEl = document.getElementById("loaded-filesize");
  if (szEl) szEl.innerText = `(${currentSave.rawBytes.length.toLocaleString()} + ${secondarySave.rawBytes.length.toLocaleString()} bytes)`;

  // Enable ALL 5 tabs for full editing
  const tabStuntsBtn = document.getElementById("tab-btn-stunts");
  const tabProfileBtn = document.querySelector('[data-tab="profile"]');
  const tabGarageBtn = document.querySelector('[data-tab="garage"]');
  const tabCupsBtn = document.querySelector('[data-tab="cups"]');
  const tabStatsBtn = document.querySelector('[data-tab="stats"]');

  if (tabStuntsBtn) tabStuntsBtn.style.display = "flex";
  if (tabProfileBtn) tabProfileBtn.style.display = "flex";
  if (tabGarageBtn) tabGarageBtn.style.display = "flex";
  if (tabCupsBtn) tabCupsBtn.style.display = "flex";
  if (tabStatsBtn) tabStatsBtn.style.display = "flex";

  // Render stunts table connected to options.sav
  renderStuntsSection();

  // Update download button label
  updateDownloadButtonLabel();

  showToast(`🎉 ${optName} ${tr("toastAttached", "attached successfully!")}`);
}

function handleSecondaryOptFile(fileList) {
  if (!fileList || !fileList[0]) return;
  const f = fileList[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    attachSecondaryOptions(f.name, e.target.result);
  };
  reader.readAsArrayBuffer(f);
}

function loadCombinedFO2Saves(pName, pBuf, optName, optBuf) {
  loadSaveFromBuffer(pName, pBuf);
  attachSecondaryOptions(optName, optBuf);
}

function downloadCurrentSave() {
  if (!currentSave.rawBytes) return;

  const bytes = currentSave.rawBytes;
  const view = currentSave.view;
  const gt = currentSave.gameType;

  // 1. Sync Money
  const moneyVal = parseInt(document.getElementById("ed-money-input").value.replace(/\D/g, "") || "0", 10);
  if (gt !== "options") {
    syncMoneyToBuffer(moneyVal);
  }

  // 2. Sync Nickname
  const nickStr = document.getElementById("ed-nick-input").value.trim() || "Player";
  if (gt === "fo1") {
    writeUtf16LE(bytes, 0x04, 32, nickStr);
    writeUtf16LE(bytes, 0x62, 32, nickStr);
  } else if (gt === "fo2") {
    writeUtf16LE(bytes, 0x04, 64, nickStr);
  } else if (gt === "fouc") {
    writeUtf16LE(bytes, 0x0C, 64, nickStr);
  }

  // 3. Checksum Recalculation for FlatOut: Ultimate Carnage
  if (gt === "fouc") {
    const payload = bytes.subarray(8);
    const newCrc = calculateFoucCrc(payload);
    view.setUint32(4, newCrc, true);
  }

  // Trigger primary download
  const blob1 = new Blob([bytes], { type: "application/octet-stream" });
  const url1 = URL.createObjectURL(blob1);
  const a1 = document.createElement("a");
  a1.href = url1;
  a1.download = currentSave.filename || "player001.sav";
  document.body.appendChild(a1);
  a1.click();
  document.body.removeChild(a1);
  setTimeout(() => URL.revokeObjectURL(url1), 1000);

  // If secondary file exists (options.sav), trigger download for it as well!
  const secSave = secondarySave;
  if (secSave && secSave.rawBytes) {
    const secBytes = secSave.rawBytes;
    const secName = secSave.filename || "options.sav";
    const primName = currentSave ? (currentSave.filename || "player001.sav") : "player001.sav";
    setTimeout(() => {
      if (!secBytes) return;
      const blob2 = new Blob([secBytes], { type: "application/octet-stream" });
      const url2 = URL.createObjectURL(blob2);
      const a2 = document.createElement("a");
      a2.href = url2;
      a2.download = secName;
      document.body.appendChild(a2);
      a2.click();
      document.body.removeChild(a2);
      setTimeout(() => URL.revokeObjectURL(url2), 1000);

      showToast(`💾 ${primName} + ${secName}: ${tr("toastBothSaved", "Both files saved successfully!")}`);
    }, 250);
  } else {
    showToast(tr("toastSaved", "Save file downloaded successfully!"));
  }
}

// ==============================================================================
// 10. Pre-Packaged Demo Saves (Realistic Structures for In-Browser Testing)
// ==============================================================================
function loadDemoSave(type) {
  if (type === "fo2") {
    const buf = new Uint8Array(16384);
    buf[0] = 0x92;
    writeUtf16LE(buf, 0x04, 64, "#7Racer");
    const dv = new DataView(buf.buffer);
    dv.setUint32(0x48, 50000, true);
    // Classes
    dv.setUint32(0x114, 1, true);
    dv.setUint32(0x118, 1, true);
    dv.setUint32(0x11C, 0, true);
    // Cars
    // Car 0: Chili owned + max parts
    dv.setUint32(0x2F2, 0, true);
    dv.setUint32(0x2F6, 1, true);
    for (let b = 9; b < 28; b++) buf[0x2F2 + b] = 0xFF;
    dv.setUint32(0x2F2 + 28, 85000, true);
    // Car 1: Malice in shop
    dv.setUint32(0x2F2 + 32, 0, true);
    dv.setUint32(0x2F2 + 36, 0, true);
    // Car 2..42: locked
    for (let i = 2; i < 43; i++) {
      dv.setUint32(0x2F2 + i * 32, 1, true);
      dv.setUint32(0x2F2 + i * 32 + 4, 0, true);
    }
    // Cups: cup 0 = gold, cup 1 = unlocked, rest = 0
    buf[0x2B8] = 0x01;
    buf[0x2B9] = 254;
    // Stats
    dv.setUint32(0x138, 450, true); // Whammo
    dv.setUint32(0x13C, 120, true); // SuperFlip
    dv.setUint32(0x140, 30, true);  // BlastOut
    dv.setUint32(0x144, 210, true); // BigAir
    dv.setFloat32(0xE32, 750000.0, true); // Meters

    // Also prepare options.sav for complete FO2 demo
    const optBuf = new Uint8Array(131072);
    optBuf[0] = 0x92;
    const optDv = new DataView(optBuf.buffer);
    FO2_STUNTS.forEach((s) => {
      optDv.setFloat32(s.off, s.defScore, true);
      optDv.setUint32(s.off + 4, s.car, true);
      writeUtf16LE(optBuf, s.off + 8, 32, "Racer");
    });

    loadCombinedFO2Saves("player001.sav", buf, "options.sav", optBuf);
    showToast(tr("toastDemoLoaded", "🎮 Demo savegame loaded into editor!"));
    return;
  } else if (type === "fouc") {
    const buf = new Uint8Array(94402);
    const dv = new DataView(buf.buffer);
    dv.setUint32(0, 4, true); // length header
    buf[8] = 0x92;
    writeUtf16LE(buf, 0x0C, 64, "#31CarnagePro");
    dv.setUint32(0x50, 85000, true);
    // Car 0: CTR in garage
    dv.setUint32(0x24e, 0, true);
    dv.setUint32(0x24e + 4, 1, true);
    for (let b = 9; b < 28; b++) buf[0x24e + b] = 0xFF;
    // Car 1: Chili in shop
    dv.setUint32(0x24e + 32, 0, true);
    dv.setUint32(0x24e + 36, 0, true);
    // Car 2..43: locked
    for (let i = 2; i < 44; i++) {
      dv.setUint32(0x24e + i * 32, 1, true);
      dv.setUint32(0x24e + i * 32 + 4, 0, true);
    }
    // Cups: cup 0 = gold, cup 1 = unlocked
    buf[0x150] = 0x01;
    buf[0x151] = 254;
    // Stats
    dv.setUint32(0x138, 620, true);
    dv.setUint32(0x13C, 180, true);
    dv.setUint32(0x140, 45, true);
    dv.setUint32(0x144, 320, true);

    const crc = calculateFoucCrc(buf.subarray(8));
    dv.setUint32(4, crc, true);
    loadSaveFromBuffer("player_d73b3000.sav", buf.buffer);
    showToast(tr("toastDemoLoaded", "🎮 Demo savegame loaded into editor!"));

  } else if (type === "fo1") {
    const buf = new Uint8Array(8192);
    buf[0] = 0x90;
    writeUtf16LE(buf, 0x04, 32, "CLASSIC");
    writeUtf16LE(buf, 0x62, 32, "CLASSIC");
    const dv = new DataView(buf.buffer);
    dv.setUint32(0x84, 35000, true);
    dv.setUint32(0x88, 1, true); // Active car: Pepper
    dv.setUint32(0x8C, 1, true); // Bronze div
    dv.setUint32(0x90, 3, true); // Stage 3
    for (let i = 0; i < 6; i++) dv.setUint32(0x9C + i * 4, 3, true);
    // Cars bitmask: car 0 and 1 unlocked
    dv.setUint32(0xD0, 0x00000003, true);
    // Races
    buf[0xE0] = 0x01; // Race 1 Gold
    buf[0xE1] = 0x04; // Race 2 Unlocked
    // Stats
    dv.setUint32(0xB4, 15, true);
    dv.setUint32(0xB8, 12, true);
    dv.setUint32(0xC4, 65000, true);
    dv.setUint32(0xC8, 25000, true);
    // Track records
    for (let i = 0; i < 36; i++) {
      writeUtf16LE(buf, 0x190 + i * 52, 24, "CLASSIC");
      dv.setFloat32(0x190 + i * 52 + 24, 42.50, true);
    }
    loadSaveFromBuffer("player001.sav", buf.buffer);
    showToast(tr("toastDemoLoaded", "🎮 Demo savegame loaded into editor!"));

  } else if (type === "fo4") {
    const buf = new Uint8Array(21424);
    buf[0] = 0x46; buf[1] = 0x4F; buf[2] = 0x4F; buf[3] = 0x20;
    const dv = new DataView(buf.buffer);
    dv.setUint32(0x3C4, 95000, true);
    dv.setUint32(0x3A8, 24, true);
    dv.setUint32(0x3AC, 15, true);
    dv.setUint32(0x3B0, 10, true);
    dv.setUint32(0x3B4, 49, true);
    dv.setUint32(0x3C0, 850, true);
    dv.setFloat32(0x398, 480000.0, true);
    loadSaveFromBuffer("Save.dat", buf.buffer);
    showToast(tr("toastDemoLoaded", "🎮 Demo savegame loaded into editor!"));
  }
}

// ==============================================================================
// 11. Toast System
// ==============================================================================
let toastTimer = null;
function showToast(msg) {
  let toast = document.getElementById("toast-element");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-element";
    toast.className = "toast-msg";
    document.body.appendChild(toast);
  }
  toast.innerText = msg;
  toast.classList.add("show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// ==============================================================================
// 12. Drag & Drop and File Picker Bindings
// ==============================================================================
function initFileDropzone() {
  const dropzone = document.getElementById("dropzone-box");
  const fileInput = document.getElementById("file-input");

  if (!dropzone || !fileInput) return;

  function readFileAsBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  async function handleIncomingFiles(fileList) {
    if (!fileList || fileList.length === 0) return;

    if (fileList.length === 1) {
      secondarySave = null;
      const file = fileList[0];
      try {
        const buf = await readFileAsBuffer(file);
        loadSaveFromBuffer(file.name, buf);
      } catch (err) {
        console.error("File read error:", err);
      }
      return;
    }

    // Two or more files dropped / selected
    const files = Array.from(fileList);
    try {
      const buffers = await Promise.all(files.map(f => readFileAsBuffer(f)));
      const parsed = files.map((f, i) => {
        const bytes = new Uint8Array(buffers[i]);
        return {
          file: f,
          buf: buffers[i],
          bytes: bytes,
          gameType: detectGameType(f.name, bytes)
        };
      });

      // Check if this is a valid FlatOut 2 pair (one is "fo2" career, one is "options")
      const fo2Career = parsed.find(p => p.gameType === "fo2");
      const fo2Options = parsed.find(p => p.gameType === "options");

      if (fo2Career && fo2Options) {
        loadCombinedFO2Saves(fo2Career.file.name, fo2Career.buf, fo2Options.file.name, fo2Options.buf);
        showToast(tr("toastFO2PairLoaded", "🎉 Complete FO2 save set loaded (Career + Hall of Fame)!"));
      } else {
        // Files are NOT a FO2 career+options pair (e.g. FO1 + FOUC, or two saves from different games)
        secondarySave = null;
        const first = parsed[0];
        const other = parsed[1];
        loadSaveFromBuffer(first.file.name, first.buf);

        const gameNames = {
          fo1: "FlatOut 1",
          fo2: "FlatOut 2",
          fouc: "FlatOut: UC",
          fo4: "FlatOut 4",
          options: "options.sav"
        };
        const g1 = gameNames[first.gameType] || first.file.name;
        const g2 = gameNames[other.gameType] || other.file.name;

        showToast(`⚠️ ${tr("errDifferentGames", "Saves from different games cannot be combined.")} (${g1} & ${g2}).`);
      }
    } catch (err) {
      console.error("Files read error:", err);
      showToast(tr("toastFileError", "Error reading files"));
    }
  }

  // File Dropzone click handler
  dropzone.addEventListener("click", (e) => {
    // If the click is on demo chips row or external links, do not trigger file picker
    if (e.target.closest(".demo-saves-row") || e.target.closest("a")) {
      return;
    }
    fileInput.value = "";
    fileInput.click();
  });

  const btnUpload = dropzone.querySelector(".btn-upload");
  if (btnUpload) {
    btnUpload.addEventListener("click", (e) => {
      e.stopPropagation();
      fileInput.value = "";
      fileInput.click();
    });
  }

  fileInput.addEventListener("change", (e) => {
    handleIncomingFiles(e.target.files);
  });

  // Rock-solid drag-and-drop counter to eliminate dragleave flicker on child elements
  let dragCounter = 0;
  dropzone.addEventListener("dragenter", (e) => {
    e.preventDefault();
    dragCounter++;
    dropzone.classList.add("dragover");
  });

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  dropzone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dragCounter--;
    if (dragCounter <= 0) {
      dragCounter = 0;
      dropzone.classList.remove("dragover");
    }
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dragCounter = 0;
    dropzone.classList.remove("dragover");
    if (e.dataTransfer && e.dataTransfer.files) {
      handleIncomingFiles(e.dataTransfer.files);
    }
  });

  // "Load another file" button handler
  const btnChangeFile = document.getElementById("btn-change-file");
  if (btnChangeFile) {
    btnChangeFile.addEventListener("click", (e) => {
      e.stopPropagation();
      secondarySave = null;
      document.getElementById("editor-panel").style.display = "none";
      dropzone.style.display = "block";
      fileInput.value = "";
      fileInput.click();
    });
  }
}

// ==============================================================================
// 13. Editor Tab Switching
// ==============================================================================
function initEditorTabs() {
  const tabs = document.querySelectorAll(".ed-tab-btn");
  const bodies = document.querySelectorAll(".editor-tab-body");

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");
      tabs.forEach(t => t.classList.remove("active"));
      bodies.forEach(b => b.classList.remove("active"));

      btn.classList.add("active");
      const activeBody = document.getElementById(`ed-tab-${target}`);
      if (activeBody) activeBody.classList.add("active");
    });
  });

  const nickIn = document.getElementById("ed-nick-input");
  nickIn.addEventListener("input", () => {
    currentSave.nickname = nickIn.value;
    syncColorSliderWithNick();
    updateNicknameBadge();
  });

  const moneyIn = document.getElementById("ed-money-input");
  moneyIn.addEventListener("input", () => {
    let val = parseInt(moneyIn.value.replace(/\D/g, "") || "0", 10);
    val = Math.min(999999999, Math.max(0, val));
    currentSave.money = val;
    syncMoneyToBuffer(val);
  });
}

// ==============================================================================
// 14. Particle Fire/Sparks (Canvas, Forest Grit Theme: Amber/Gold)
// ==============================================================================
class ParticleCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 65;
    this.themeColor = { r: 234, g: 179, b: 8 }; // Forest Grit Amber

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initParticles();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  setThemeColor(r, g, b) {
    this.themeColor = { r, g, b };
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle(true));
    }
  }

  createParticle(randomY = false) {
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : this.height + Math.random() * 20,
      size: Math.random() * 2.5 + 1.0,
      speedY: Math.random() * 1.5 + 0.6,
      speedX: (Math.random() - 0.5) * 1.0,
      opacity: Math.random() * 0.7 + 0.3,
      fadeSpeed: Math.random() * 0.007 + 0.003,
      pulse: Math.random() * Math.PI,
    };
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.y -= p.speedY;
      p.x += p.speedX;
      p.opacity -= p.fadeSpeed;
      p.pulse += 0.05;

      if (p.opacity <= 0 || p.y < -10) {
        this.particles[i] = this.createParticle(false);
        continue;
      }

      const glow = Math.sin(p.pulse) * 0.2 + 0.8;
      const { r, g, b } = this.themeColor;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * glow, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity})`;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
      this.ctx.fill();
    }

    requestAnimationFrame(() => this.animate());
  }
}

let particleSystem = null;

// ==============================================================================
// 15. FAQ & Language Engine
// ==============================================================================
function initFaqAccordion() {
  document.querySelectorAll(".acc-header").forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isActive = item.classList.contains("active");
      document.querySelectorAll(".acc-item").forEach(i => i.classList.remove("active"));
      if (!isActive) item.classList.add("active");
    });
  });
}

function updateLoadedBadge() {
  const badge = document.getElementById("loaded-type-badge");
  if (!badge || !currentSave.gameType) return;

  const iconMap = {
    fo1: "icons/fo1.png",
    fo2: "icons/fo2.png",
    options: "icons/fo2.png",
    fouc: "icons/fouc.png",
    fo4: "icons/fo4.png"
  };
  const iconSrc = iconMap[currentSave.gameType] || "icons/fo2.png";

  if (secondarySave) {
    const text = tr("gameFO2Complete", "FlatOut 2 (Complete Save)");
    badge.innerHTML = `<img src="${iconSrc}" alt="game icon" class="badge-game-icon"> <span>${text}</span>`;
    return;
  }
  const typeKeys = {
    fo1: "gameFO1",
    fo2: "gameFO2",
    fouc: "gameFOUC",
    fo4: "gameFO4",
    options: "gameOptions"
  };
  const defaultTexts = {
    fo1: "FlatOut 1 (2004)",
    fo2: "FlatOut 2 (2006)",
    fouc: "FlatOut: Ultimate Carnage",
    fo4: "FlatOut 4: Total Insanity",
    options: "FlatOut 2 Hall of Fame (options.sav)"
  };
  const text = tr(typeKeys[currentSave.gameType], defaultTexts[currentSave.gameType] || "Save File");
  badge.innerHTML = `<img src="${iconSrc}" alt="game icon" class="badge-game-icon"> <span>${text}</span>`;
}

function updateDownloadButtonLabel() {
  const dlBtn = document.querySelector(".btn-download-save span");
  if (!dlBtn) return;
  if (secondarySave) {
    dlBtn.innerText = `${tr("dlBothFiles", "💾 DOWNLOAD BOTH FILES")} (${currentSave.filename} + ${secondarySave.filename})`;
  } else {
    dlBtn.innerText = tr("btnDownloadSave", "💾 DOWNLOAD MODIFIED SAVE");
  }
}

function detectInitialLanguage() {
  const saved = localStorage.getItem("flatout_lang");
  if (saved && typeof I18N !== "undefined" && I18N[saved]) {
    return saved;
  }
  const navLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  const code = navLang.slice(0, 2);
  if (typeof I18N !== "undefined" && I18N[code]) {
    return code;
  }
  return "en";
}

function updateLanguageDropdownUI(lang) {
  if (typeof LANGUAGES === "undefined") return;
  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];
  const flagEl = document.getElementById("lang-current-flag");
  const nameEl = document.getElementById("lang-current-name");
  if (flagEl) flagEl.src = current.flag;
  if (nameEl) nameEl.innerText = current.name;

  document.querySelectorAll(".lang-dropdown-item").forEach(item => {
    if (item.getAttribute("data-lang") === lang) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

function setLanguage(lang) {
  if (typeof I18N === "undefined" || !I18N[lang]) {
    lang = "en";
  }
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === "ar" ? "rtl" : "ltr");
  document.title = tr("pageTitle", "FlatOut Online Save Editor — Edit Saves In-Browser");
  localStorage.setItem("flatout_lang", lang);

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (I18N[lang] && I18N[lang][key]) {
      el.innerHTML = I18N[lang][key];
    } else if (I18N["en"] && I18N["en"][key]) {
      el.innerHTML = I18N["en"][key];
    }
  });

  updateLanguageDropdownUI(lang);

  if (currentSave && currentSave.rawBytes) {
    renderPaletteChips();
    syncColorSliderWithNick();
    renderGarageSection();
    renderCupsSection();
    renderStuntsSection();
    renderStatsSection();
    updateLoadedBadge();
    updateDownloadButtonLabel();
  } else {
    updateSliderInfo(0);
  }
}

function initLanguageDropdown() {
  const dropdown = document.getElementById("lang-dropdown");
  const btn = document.getElementById("lang-dropdown-btn");
  const menu = document.getElementById("lang-dropdown-menu");
  if (!dropdown || !btn || !menu) return;

  // Render language options
  if (typeof LANGUAGES !== "undefined") {
    menu.innerHTML = LANGUAGES.map(lang => `
      <button type="button" class="lang-dropdown-item ${lang.code === currentLang ? 'active' : ''}" data-lang="${lang.code}">
        <img src="${lang.flag}" alt="${lang.name}" class="lang-item-flag">
        <span class="lang-item-name">${lang.name}</span>
      </button>
    `).join("");
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  menu.addEventListener("click", (e) => {
    const item = e.target.closest(".lang-dropdown-item");
    if (!item) return;
    e.stopPropagation();
    const code = item.getAttribute("data-lang");
    if (code) {
      setLanguage(code);
    }
    menu.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

// ==============================================================================
// 16. Donation Modal & Crypto Copy Engine
// ==============================================================================
function openDonateModal() {
  const modal = document.getElementById("donate-modal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeDonateModal() {
  const modal = document.getElementById("donate-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function copyCryptoAddress(elemId, btn) {
  const el = document.getElementById(elemId);
  if (!el) return;
  const text = el.innerText.trim();

  function onCopied() {
    btn.classList.add("copied");
    const span = btn.querySelector("span");
    const origText = span ? span.innerText : "";
    if (span) span.innerText = "✓ " + tr("btnCopied", "Copied");
    showToast(tr("toastAddrCopied", "Wallet address copied to clipboard!"));
    setTimeout(() => {
      btn.classList.remove("copied");
      if (span) span.innerText = origText || tr("btnCopy", "Copy");
    }, 2200);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(onCopied).catch(() => {
      fallbackCopy(text);
      onCopied();
    });
  } else {
    fallbackCopy(text);
    onCopied();
  }
}

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } catch (e) {
    console.error("Copy failed:", e);
  }
  document.body.removeChild(ta);
}

function initDonateModal() {
  const openBtn = document.getElementById("btn-open-donate");
  const closeBtn = document.getElementById("donate-close-btn");
  const modal = document.getElementById("donate-modal");

  if (openBtn) openBtn.addEventListener("click", openDonateModal);
  if (closeBtn) closeBtn.addEventListener("click", closeDonateModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeDonateModal();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDonateModal();
  });
}

// ==============================================================================
// 17. App Boot
// ==============================================================================
document.addEventListener("DOMContentLoaded", () => {
  particleSystem = new ParticleCanvas("fire-canvas");
  initFileDropzone();
  initEditorTabs();
  initColorSlider();
  initFaqAccordion();
  initLanguageDropdown();
  initDonateModal();
  initProfileInputs();

  setLanguage(detectInitialLanguage());
});
