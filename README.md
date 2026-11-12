# 🏰 MouseHop • Disney World Wait Times & Hopper PWA

[![Live Demo](https://img.shields.io/badge/Live%20PWA-Open%20App-0ea5e9?style=for-the-badge&logo=safari)](https://mikeboeselager-eng.github.io/disney-wait-times/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/mikeboeselager-eng/disney-wait-times)

> **Live Web App:** [https://mikeboeselager-eng.github.io/disney-wait-times/](https://mikeboeselager-eng.github.io/disney-wait-times/)

**MouseHop** is a mobile Progressive Web App (PWA) tailored specifically for your iPhone while touring **Walt Disney World Resort**. It monitors live ride wait times, tracks your **Must-Do** and **Backup** priorities, hides rides you **Never Ride**, alerts you when wait times drop to **≤ 20 minutes**, and lets you sync plans seamlessly with your family.

---

## ✨ Features & Upgrades

### 1. 💾 Permanent Storage & Family Sync
- **Independent Phone Persistence:** Your saved Must-Dos, Backups, Ignored rides, and alert preferences are stored permanently in your device's `localStorage`. You can close Safari or swipe away the app from iOS multitasking, and your plan will be right there when you reopen.
- **Family Member Independence:** When family members open MouseHop on their iPhones, they have their own independent saved lists so individual family members can customize their own day.
- **1-Tap Family Sharing:** Tap the **Share** button (`📤`) in the top navigation to send your complete touring plan via iMessage, WhatsApp, or AirDrop. When a family member taps the link, MouseHop prompts them to save the exact Must-Dos and Backups to their phone with a single tap!

### 2. 🚫 "Never Ride" (Ignore) Feature
- Next to each ride's priority star, tap the **🚫 Ignore** button for attractions you will never ride (e.g. motion-sickness triggers or rides your kids have outgrown).
- Ignored rides are **automatically hidden from your park list** to keep your screen clutter-free.
- Ignored rides are **excluded from all drop alerts**, so you'll never be notified for a ride you have no interest in.
- A dedicated **🚫 Ignored** filter chip lets you view and restore ignored attractions anytime.

### 3. ⭐ Multi-Tier Priority System
Tap the star icon on any attraction to cycle through priorities:
- **★ Must-Do (Priority 1):** Your headline, bucket-list attractions (e.g. *Tron, Cosmic Rewind, Rise of the Resistance, Flight of Passage*). Highlighted with a warm golden glow.
- **◆ Backup (Priority 2):** Attractions you'd love to hit if your Must-Dos have long queues or during afternoon lulls. Highlighted with a cyan glow.
- **☆ Normal:** Standard ride list.
- **🚫 Ignored:** Completely hidden from regular view.

### 4. 🚨 Short Wait Opportunity Alerts (≤ 20 Min Drop Alert)
- When any of your **Must-Do** or **Backup** rides drops to **20 minutes or less** (or your customizable threshold), a prominent alert banner slides down at the top of your screen.
- **Magical Disney Chime:** Synthesizes an authentic 4-note ascending Disney chime (`G5 -> C6 -> E6 -> G6`) using the browser's Web Audio API (no external sound files required).
- **iOS Web Notifications:** Option to receive push-style drop alerts when installed on your Home Screen (iOS 16.4+).

### 5. 🏰 Park Hopping & Expert Insights
- 1-tap switching between **Magic Kingdom**, **EPCOT**, **Disney's Hollywood Studios**, and **Disney's Animal Kingdom**.
- Tap the **HOP** button to compare live park averages, open ride counts, and top headliner queues across all 4 parks.
- Filter by specific Disney lands (*Fantasyland, Tomorrowland, Star Wars: Galaxy's Edge, Toy Story Land, World Discovery, Pandora*).
- Tap **💡 Insider Tip** on headliners for expert advice on single-rider lines, fireworks crowd drops, and rope-drop strategy.

---

## 📲 How to Install MouseHop on Your iPhone

1. On your iPhone, open **Safari** and visit:  
   👉 **[https://mikeboeselager-eng.github.io/disney-wait-times/](https://mikeboeselager-eng.github.io/disney-wait-times/)**
2. Tap the **Share** button (`⎋`) at the bottom of Safari.
3. Scroll down and tap **"Add to Home Screen"**.
4. Confirm the name **MouseHop** and tap **Add**.
5. Tap the new Cinderella Castle icon on your iPhone Home Screen to launch in full-screen standalone mode!
