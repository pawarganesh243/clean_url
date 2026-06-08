# CleanURL

CleanURL is a blazing-fast, beautiful URL cleaner built to instantly strip away messy tracking parameters, marketing data, and session identifiers from long URLs.

## Features
- **Neumorphism Design:** A sleek, "soft 3D" aesthetic with smooth, tactile interactive elements.
- **Dark Mode Support:** Fully responsive dark and light modes with dynamic shadow scaling.
- **One-Click Cleaning:** Strips out `utm_*`, `ref`, `fbclid`, `gclid`, and over 15+ common marketing and session tracking parameters instantly.
- **Responsive:** Fluidly scales down from 4K monitors to small mobile screens.

## File Structure
This project is built with React and Vite.
- `src/components/`: Reusable UI elements (Navbar, Footer).
- `src/utils/`: Core business logic (`urlCleaner.js` for pure logic extraction).
- `src/App.jsx`: Main application orchestrator.
- `src/App.css`: Neumorphism styles and layout configuration.

## Setup & Deployment
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run locally:**
   ```bash
   npm run dev
   ```
3. **Deploy to Vercel:**
   This project includes a `vercel.json` file for immediate production deployment via Vercel. Connect this repository to your Vercel account, and it will deploy flawlessly.

---
*Note: This project was vibe coded using Antigravity and React.*
