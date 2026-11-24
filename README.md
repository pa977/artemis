# ARTEMIS — The Bio-AI Assistant

ARTEMIS is a nature-inspired AI assistant focused on the biological world: plants, gardening, forestry, agriculture, and biotechnology. It combines a general-purpose plant chat with specialized tools, a personal garden tracker with AI health insights, and an animated glassmorphism interface.

## Features

- **General plant chat** — ask anything about plants, gardening, or biotechnology.
- **Specialized tools** — dedicated assistants for Pest & Disease ID, Soil Health, Garden Planner, Watering Schedule, Harvest Guide, and Companion Planting.
- **Image understanding** — upload a photo in chat or attach one to a journal entry for AI analysis of pests, disease, or nutrient deficiencies.
- **My Garden** — add plants, track planting dates and care info, and keep a photo journal.
- **AI health insights** — per-plant health status (Thriving, Stable, Needs Attention, Vulnerable), daily care tasks, a garden health report, and weather-aware advice.
- **Weather widget** — location weather with AI-generated, plant-specific recommendations (currently backed by mock weather data).
- **Chat history & profiles** — multiple saved conversations and an editable local user profile.
- **Immersive UI** — animated backgrounds, transitions, ambient music toggle, and responsive layouts built with React, Tailwind CSS, and Framer Motion.

## Tech stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Framer Motion
- Google GenAI SDK (`@google/genai`, Gemini models)
- react-markdown

## Getting started

Prerequisites: Node.js and npm.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with your Gemini API key:

   ```bash
   GEMINI_API_KEY=your_key_here
   ```

   Get a free key from [Google AI Studio](https://aistudio.google.com/app/apikey). You can copy `.env.example` as a starting point. Never commit your real key.

3. Start the dev server:

   ```bash
   npm run dev
   ```

   The app runs at `http://localhost:3000`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Type-check with TypeScript (`tsc --noEmit`) |

## Project structure

```
.
├── App.tsx                 # App shell, login flow, API-key guard
├── components/             # UI components, icons, and animated backgrounds
│   ├── backgrounds/        # Per-section animated backgrounds
│   └── icons/              # Reusable SVG icon components
├── services/
│   ├── geminiService.ts    # Gemini API calls and structured AI features
│   ├── weatherService.ts   # Weather data provider (mock)
│   └── soundService.ts     # Ambient music controls
├── types.ts                # Shared TypeScript types
├── index.css               # Global styles and Tailwind setup
└── vite.config.ts          # Vite config and env injection
```

## Notes

- Chat history, garden data, and user profile are stored in the browser's `localStorage`; there is no backend.
- Weather data is currently mocked in `services/weatherService.ts`.
- The Gemini API key is required for all AI features; the app shows a setup screen when it is missing.
