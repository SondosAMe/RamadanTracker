# Ramadan Tracker 🌙

A beautiful Progressive Web App for tracking your Ramadan spiritual practices with an authentic Islamic design aesthetic.

## Features

### Core Trackers
- **Daily Prayer Tracker** - Track all 5 prayers with accurate times based on your location
- **Quran Reading Tracker** - Visual 30 Juz grid to track your Quran completion
- **Morning & Evening Azkar** - Mark daily azkar with streak tracking
- **Daily Tafsir Tracker** - Log your Quran reflection and notes
- **Taraweh Prayer Tracker** - Track nightly prayers with location (mosque/home)
- **Good Deeds Tracker** - Log acts of kindness with categories
- **Tasbeeh Counter** - Digital counter for SubhanAllah, Alhamdulillah, Allahu Akbar
- **Period Days Tracker** - Manage prayer exemptions

### Key Features
- Real-time prayer countdown
- Streak tracking for consistency
- Dark/Light theme support
- Offline-capable PWA
- Location-based prayer times via Aladhan API
- Beautiful Islamic design with geometric patterns
- Smooth animations and transitions

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v6
- **State**: React Context + localStorage
- **Prayer Times**: Aladhan API
- **PWA**: Vite PWA Plugin

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ramadan-tracker.git
cd ramadan-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment to GitHub Pages

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

**Quick Steps:**
1. Create a GitHub repository
2. Push your code to the `main` branch
3. Enable GitHub Pages in repository settings
4. The GitHub Actions workflow will automatically deploy

Your app will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Project Structure

```
src/
├── api/          # API integrations (Aladhan)
├── components/   # Reusable UI components
│   ├── common/   # Shared components (Button, Card, etc.)
│   ├── layout/   # Layout components (Header, BottomNav)
│   ├── prayer/   # Prayer tracker components
│   ├── quran/    # Quran tracker components
│   └── ...       # Other feature components
├── context/      # React Context providers
├── hooks/        # Custom React hooks
├── pages/        # Route pages
└── utils/        # Utility functions
```

## Color Palette

- Primary: Deep Teal (#1B4965)
- Secondary: Soft Gold (#D4AF37)
- Background: Off-white (#FAF9F6)
- Success: Soft Green (#4A7C59)

## License

MIT

## Acknowledgments

- [Aladhan API](https://aladhan.com/) for prayer times
- Islamic geometric patterns inspired by traditional art
