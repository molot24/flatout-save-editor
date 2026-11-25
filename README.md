# 🚗 FlatOut Online Save Editor (Web Edition)

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen?logo=github)](https://molot24.github.io/flatout-save-editor/)
[![Languages](https://img.shields.io/badge/Languages-15%20Locales-blue)](locales.js)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero%20(Pure%20Vanilla%20JS)-orange)]()
[![Platform](https://img.shields.io/badge/Platform-Web%20%2F%20In--Browser-red)]()
[![License](https://img.shields.io/badge/License-MIT-green)]()

A high-performance, responsive, browser-based savegame editor for the legendary **FlatOut** racing series. No installation, no Python, no dependencies required — edit your saves directly in your browser with 100% client-side privacy.

---

👉 **Launch Web Editor:** **[https://molot24.github.io/flatout-save-editor/](https://molot24.github.io/flatout-save-editor/)**

*(Compatible with all modern browsers on PC, Mac, Linux & mobile • 100% Free • Works offline once loaded)*

---

## 🎮 Supported Games & Features

| Game | Supported Files | Key Features |
| :--- | :--- | :--- |
| **FlatOut 1** (2004) | `player*.sav` (8 KB) | Profile money, active car selector, Stage 3 Pro upgrades, unlock all 16 cars, 36 division races (100% Gold), 36 track records. |
| **FlatOut 2** (2006) | `player*.sav` (16 KB)<br>`options.sav` (131 KB) | Colored nickname live-preview & palette slider, career money, unlock Derby/Race/Street classes, 56 cups 100% Gold, garage manager (43 cars max tune / dealership / stock reset), Hall of Fame Stunts (12 mini-games world records). |
| **FlatOut: Ultimate Carnage** | `player_*.sav` (~94 KB) | Automated **CRC-32 recalculation**, color nickname, money, 44 cars garage & upgrades, 100% Gold in Career & Carnage Mode (36 events), stats & track records. |
| **FlatOut 4: Total Insanity** | `Save.dat` (~21 KB) | Career & Garage credits, unlock all cars/skins/arenas, maximum wins, stunt & destruction records. |

---

## ✨ Key Highlights

- **🔒 100% Client-Side Privacy:** Your savegame files are processed locally in your browser memory using JavaScript `DataView` and typed arrays. Zero data leaves your computer.
- **⚡ Automated CRC-32 Recalculation:** FlatOut: Ultimate Carnage saves require custom CRC-32 header verification (`0x312e30`). The editor automatically recalculates and writes valid checksums so the game accepts the save without corruption warnings.
- **🎨 Interactive Colored Nickname Builder:** Real-time preview plate recreating the in-game lobby font styles and original game color codes (`#7`, `#40`, `#31`, `#46`, `#999`, etc.) with a slider and palette selector.
- **📦 Multi-File & Combined Save Support:** FlatOut 2 stores career in `player001.sav` and stunt records in `options.sav`. You can drag and drop both files simultaneously or attach `options.sav` on the fly.
- **🎮 Built-In Demo Saves:** Test all features instantly with one click using embedded demo saves for FlatOut 1, 2, UC, and 4.
- **🌍 15 Native Languages Supported:** Full localized interface and stunt names:
  - 🇬🇧 English, 🇷🇺 Русский, 🇺🇦 Українська, 🇩🇪 Deutsch, 🇪🇸 Español, 🇫🇷 Français, 🇮🇹 Italiano, 🇵🇱 Polski, 🇵🇹 Português, 🇨🇿 Čeština, 🇹🇷 Türkçe, 🇨🇳 简体中文, 🇯🇵 日本語, 🇮🇳 हिन्दी, 🇸🇦 العربية (with automatic RTL layout).
  - Auto-detection based on user's browser language with instant fallback.

---

## 📁 Save Game File Locations

| Game | Default Savegame Path on Windows |
| :--- | :--- |
| **FlatOut 1** | `...\Steam\steamapps\common\FlatOut\Savegame\player001.sav` |
| **FlatOut 2** | `...\Steam\steamapps\common\FlatOut 2\Savegame\player001.sav` and `options.sav` |
| **FlatOut: UC** | `%LOCALAPPDATA%\FlatOut Ultimate Carnage\Savegame\player_*.sav` |
| **FlatOut 4** | `...\Steam\userdata\<YourSteamID>\402130\remote\Save.dat` |

---

## 🚀 How to Run Locally

You don't need any build steps, npm, node, or web servers:

1. Clone this repository:
   ```bash
   git clone https://github.com/molot24/flatout-save-editor.git
   ```
2. Double-click `index.html` to open it directly in any modern browser (Chrome, Firefox, Edge, Safari, Opera).

---

## 🛠️ GitHub Pages Deployment (GitHub Actions)

This repository includes a ready-to-use GitHub Actions workflow located in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

Every push to the `main` branch automatically deploys and updates the live web application on GitHub Pages.

---

## 📄 Disclaimer & Credits

- FlatOut® is a registered trademark of Bugbear Entertainment Ltd. and Strategy First Inc.
- This project is an unofficial fan-made tool created for game preservation and player convenience.
- All game files and intellectual property belong to their respective owners.

---

## 💖 Support & Donations

If this project saved your time or brought back nostalgic memories of FlatOut, feel free to support development via the built-in crypto donation dialog in the web editor (USDT, BTC, ETH, SOL, TON, BNB).
