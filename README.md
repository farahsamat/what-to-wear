# What To Wear 👗👔

*What To Wear* is a modern, responsive mobile-first digital wardrobe planner and styling assistant. It helps you track the clothes you own, visualizes them on a customizable 3D-styled mannequin, and suggests outfits based on the weather and your activities.

---

## 💡 The Problem

Wardrobe fatigue and decision paralysis are common, but they often stem from a deeper issue: **having so many clothes in our closets that we lose track of what we actually own**. 

As a result:
* We look at a full closet and still feel like we have "nothing to wear."
* We keep buying more clothes, mistakenly thinking we don't have enough, which compounds the clutter.
* We end up wearing the same 10% of our wardrobe because the rest is out of sight and out of mind.

## 🚀 The Solution

*What To Wear* is designed to help you **shop your own closet first**. By cataloging your clothing pieces into a digital closet, the app helps you visualize combinations, matches outfits to the current weather and occasion, and logs your daily styles. Everything runs 100% locally in your browser to respect your privacy.

---

## 🛠️ Built with AI Agentic Coding

This application was developed in collaboration with an advanced AI coding agent (**Antigravity**). 

Using an **agentic, plan-driven pair programming workflow**, the agent assisted in:
* Structuring the React state management and local sandbox data persistence.
* Engineering the dynamic SVG stylist mannequin that scales proportions programmatically.
* Cleaning up developer footprints, sanitizing API configurations, and achieving a production-ready codebase with zero compiler or linter errors.

---

## ✨ Features

* **Digital Closet Shelf**: Catalog tops, bottoms, outerwear, shoes, and accessories. Tag items with colors, occasions (casual, smart-casual, formal), and seasons (summer, winter, all).
* **Dynamic Body Coordinates**: Scale and morph the virtual 2D SVG mannequin in real-time. Sliders allow you to adjust height (140-210cm) and weight (40-130kg), customize gender proportions (feminine, masculine, neutral), select your body frame, and set your birthday (with an active party hat Easter egg!).
* **Smart Stylist Suggestion Engine**: Automatically compiles outfits using local weather data (or manual overrides) and filters by your planned occasion or aesthetic style preferences. 
* **OOTD History Log**: Save your favorite combinations to a permanent lookbook list to remember what you wore.
* **100% Local Privacy**: Your body metrics, closet database, and outfit logs are stored purely in your browser's `localStorage` box. No data is sent to external servers.
* **Premium Styling & Micro-Animations**: Built with high-fidelity glassmorphism, vibrant purple/pink gradient overlays, active glowing state buttons, and smooth responsive layout structures.

---

## ⚙️ Local Setup & Run

### Prerequisites
* **Node.js** (v20+ recommended)
* **npm**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/what-to-wear.git
   cd what-to-wear
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. Run the linter check:
   ```bash
   npm run lint
   ```

5. Build the optimized production bundle:
   ```bash
   npm run build
   ```
