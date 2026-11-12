# 🏰 RopeDrop • Disney World Wait Times & Hopper PWA

[![Live Demo](https://img.shields.io/badge/Live%20PWA-Open%20App-0ea5e9?style=for-the-badge&logo=safari)](https://mikeboeselager-eng.github.io/disney-wait-times/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/mikeboeselager-eng/disney-wait-times)

> **Live Web App:** [https://mikeboeselager-eng.github.io/disney-wait-times/](https://mikeboeselager-eng.github.io/disney-wait-times/)

**RopeDrop** is a mobile Progressive Web App (PWA) tailored specifically for your iPhone while touring **Walt Disney World Resort**. It monitors live ride wait times, tracks your **Must-Do** and **Backup** priorities, hides rides you **Never Ride**, alerts you when wait times drop to **≤ 20 minutes**, and lets you sync plans seamlessly with your family.

---

## ✨ Features & Upgrades

### 1. 💾 Bulletproof Permanent Storage (Dual LocalStorage + IndexedDB)
- **Zero Loss Guarantee:** Saves your priorities using both **LocalStorage** and **IndexedDB**.
- **Resilient Dual Matching:** Rides are indexed by both their unique API ID and their normalized ride name (e.g. *Seven Dwarfs Mine Train*), ensuring they never get lost even if API identifiers fluctuate or if the app is closed.
- **Cross-Park Navigation:** If you save Must-Dos at Magic Kingdom and later switch to EPCOT, the filter chip lets you know (`★ Must-Do: 0 in EPCOT • 3 in MK`) with a 1-tap quick jump back to your saved park!

### 2. 👨‍👩‍👧‍👦 Family Member Independence + 1-Tap Sharing
- **Device-Isolated:** When family members open RopeDrop on their own iPhones, their selections remain independent.
- **1-Tap Plan Sharing:** Tap the **Share** button (`📤`) in the top navigation to send your complete touring plan via iMessage, WhatsApp, or AirDrop. Family members can tap **"Save To My Phone"** to import your exact plan in one second!

### 3. 🚫 "Never Ride" (Ignore) Feature
- Next to each ride's priority star, tap the **🚫 Ignore** button for attractions you will never ride.
- Ignored rides are **automatically hidden from your park list** to keep your screen clutter-free.
- Ignored rides are **excluded from all drop alerts**, so you'll never be notified for a ride you have no interest in.
- A dedicated **🚫 Ignored** filter chip lets you view and restore ignored attractions anytime.

### 4. 🚨 Short Wait Opportunity Alerts (≤ 20 Min Drop Alert)
- When any of your **Must-Do** or **Backup** rides drops to **20 minutes or less** (or your customizable threshold), a prominent alert banner slides down at the top of your screen.
- **Magical Disney Chime:** Synthesizes an authentic 4-note ascending Disney chime (`G5 -> C6 -> E6 -> G6`) using the browser's Web Audio API.
- **iOS Web Notifications:** Option to receive push-style drop alerts when installed on your Home Screen (iOS 16.4+).

### 5. 🏰 Park Hopping & Expert Insights
- 1-tap switching between **Magic Kingdom**, **EPCOT**, **Disney's Hollywood Studios**, and **Disney's Animal Kingdom**.
- Tap the **HOP** button to compare live park averages, open ride counts, and top headliner queues across all 4 parks.
- Filter by specific Disney lands (*Fantasyland, Tomorrowland, Star Wars: Galaxy's Edge, Toy Story Land, World Discovery, Pandora*).
- Tap **💡 Insider Tip** on headliners for expert advice on single-rider lines, fireworks crowd drops, and rope-drop strategy.

---

## 📲 How to Install RopeDrop on Your iPhone

1. On your iPhone, open **Safari** and visit:  
   👉 **[https://mikeboeselager-eng.github.io/disney-wait-times/](https://mikeboeselager-eng.github.io/disney-wait-times/)**
2. Tap the **Share** button (`⎋`) at the bottom of Safari.
3. Scroll down and tap **"Add to Home Screen"**.
4. Confirm the name **RopeDrop** and tap **Add**.
5. Tap the new Cinderella Castle icon on your iPhone Home Screen to launch in full-screen standalone mode!
