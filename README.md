# 🏰 Disney World Wait Times & Park Hopper PWA

[![Live Demo](https://img.shields.io/badge/Live%20PWA-Open%20App-0ea5e9?style=for-the-badge&logo=safari)](https://mikeboeselager-eng.github.io/disney-wait-times/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/mikeboeselager-eng/disney-wait-times)

> **Live Web App:** [https://mikeboeselager-eng.github.io/disney-wait-times/](https://mikeboeselager-eng.github.io/disney-wait-times/)

A best-in-class Progressive Web App (PWA) tailored specifically for your iPhone to monitor live ride wait times at **Walt Disney World Resort**, track **Must-Do** and **Backup** priorities, receive **≤ 20-minute Drop Alerts**, and make smart in-park and park-hopping decisions.

---

## ✨ Key Features

### 1. 📱 Designed for iPhone & Home Screen PWA
- **Native iOS Feel:** Custom Apple touch icons, splash screen, notch/Dynamic Island safe-area padding (`env(safe-area-inset-top)` / `bottom`), fluid gestures, and zero tap lag.
- **Offline Capable:** Equipped with a service worker (`sw.js`) and web app manifest (`manifest.json`) that caches the app shell and recent wait times.

### 2. 🏰 Park Navigation & Park Hopping
- **Primary Park Selector & Quick-Tabs:** Switch between all 4 Walt Disney World theme parks with a single tap:
  - 🏰 **Magic Kingdom** (Royal Blue & Cinderella Gold theme)
  - 🌐 **EPCOT** (Spaceship Earth Geodesic Purple & Electric Cyan theme)
  - 🎬 **Disney's Hollywood Studios** (Sunset Boulevard Neon & Glamour theme)
  - 🦁 **Disney's Animal Kingdom** (Pandora Jungle Emerald & Savanna Amber theme)
- **"HOP" Comparison Matrix:** Tap the **HOP** button in the header to view side-by-side live stats across all 4 parks (Average standby wait, open attractions, number of walk-on rides ≤ 20m, and top headliner waits).

### 3. ⭐ Multi-Tier Priority System (Must-Do vs. Backup)
Tap the star icon on any attraction to cycle through priorities:
- **★ Must-Do (Priority 1):** Your headline, bucket-list attractions (e.g. *Tron, Cosmic Rewind, Rise of the Resistance, Flight of Passage*). Cards highlight with a warm golden glow.
- **◆ Backup / Interested (Priority 2):** Attractions you'd love to hit if your Must-Dos have long queues or during afternoon lulls. Cards highlight with a cyan glow.
- **☆ Normal:** Cleared from priority list.
- Dedicated filter chips let you isolate `★ Must-Do` or `◆ Backup` rides instantly.

### 4. 🚨 Short Wait Opportunity Alerts (≤ 20 Min Drop Alert)
- When any of your **Must-Do** or **Backup** rides currently has a wait time of **20 minutes or less** (or your customizable threshold), a prominent alert ribbon appears at the top of your screen:
  - Lists the rides ready to ride right now.
  - Tapping a ride in the alert scrolls directly to its card.
- **Magical Disney Chime:** Generates an authentic Disney fairy-dust ascending chime (`G5 -> C6 -> E6 -> G6`) using the browser's Web Audio API (no external audio files needed).
- **iOS Web Notifications:** Option to receive push-style drop alerts when installed on your Home Screen (iOS 16.4+).

### 5. 🔄 5-Minute Auto-Refresh & Manual Refresh
- **Live Countdown Timer:** Displays a ticking countdown in the header (`5:00` ... `4:59`) so you always know when the next update occurs.
- **Instant Refresh Button:** Tap the spinning refresh button anytime to force a live update.
- **Background Smart Resume:** Automatically checks and refreshes data if more than 3 minutes elapsed while your iPhone was locked or in another app.

### 6. 🗺️ Disney Land & Expert Touring Insights
- **Automatic Land Breakdown:** Classifies rides by official Disney lands (e.g., *Fantasyland, Tomorrowland, Star Wars: Galaxy's Edge, Toy Story Land, World Discovery, Pandora*).
- **💡 Disney Expert Tips:** Tap "Insider Tip" on headliners for Disney insider advice on single-rider lines, fireworks crowd drops, rope-drop strategy, and optimal ride times.
- **Wait Time Color Coding:**
  - 🟢 **Walk-on / Low:** 0–20 min
  - 🟡 **Moderate:** 25–45 min
  - 🟠 **High:** 50–75 min
  - 🔴 **Peak / Surge:** 80+ min
  - ⚠️ **Temporarily Down / Closed:** Highlighted so you can be ready the moment a ride reopens!

---

## 🚀 How to Run Locally

### Option A: Using the included PowerShell Server
1. Open PowerShell in this project folder.
2. Run:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\server.ps1
   ```
3. Open `http://localhost:8080` in your web browser.
4. The server script also prints your local network IP (e.g. `http://192.168.1.X:8080`) so you can open it directly on your iPhone while connected to the same Wi-Fi network!

---

## 📲 How to Install on Your iPhone

1. Open the app URL in **Safari** on your iPhone.
2. Tap the **Share** button (the square with an arrow pointing up at the bottom of Safari).
3. Scroll down and tap **"Add to Home Screen"**.
4. Tap **Add** in the top right.
5. Tap the new **Disney Waits** icon on your Home Screen to launch the full-screen standalone app!

---

## 🌐 Free 1-Minute Cloud Deployment (Recommended for In-Park Use)

Because Safari requires HTTPS for Service Worker caching and Web Notifications, hosting this app online is the most convenient way to use it while walking around the parks:

### GitHub Pages:
1. Create a repository on GitHub (e.g. `disney-wait-times`).
2. Push or upload all files in this directory.
3. Go to **Settings > Pages > Branch: main / root** and click **Save**.
4. Your PWA is live at `https://<your-username>.github.io/disney-wait-times/`!

### Netlify / Vercel / Cloudflare Pages:
- Drag and drop this folder onto [Netlify Drop](https://app.netlify.com/drop) or Cloudflare Pages for an instant HTTPS URL with zero configuration.

---

## 🛠️ File Structure

```
├── index.html           # Main semantic HTML5 iOS application
├── app.css              # Park theme styling, glassmorphism & iOS layout
├── app.js               # Live API integration, priority state & alert engine
├── sw.js                # Service Worker for offline resilience & fast loading
├── manifest.json        # PWA manifest for standalone iPhone experience
├── apple-touch-icon.png # High-res iOS Home Screen icon (180x180)
├── icon-192.png         # PWA icon (192x192)
├── icon-512.png         # PWA icon (512x512)
├── favicon-32.png       # Browser tab favicon
└── server.ps1           # Optional local testing server with Wi-Fi IP display
```
