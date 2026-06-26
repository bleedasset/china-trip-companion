# China Trip Companion

> An AI-powered mobile companion that helps travelers navigate China — translating signs, explaining payments, and answering questions in real time.

Built with React Native (Expo) and powered by Groq's fast LLM inference, China Trip Companion bundles the five things every first-time traveler to China struggles with into one clean, native app.

## Features

- **Scanner** — Point your camera at any Chinese text (menus, signs, labels). The app recognizes the characters, translates them, and explains the context — what a dish is, whether a sign is a warning, and useful tips for travelers.
- **Payment Guide** — Step-by-step setup for WeChat Pay and Alipay with foreign cards, plus the key facts every visitor needs to pay like a local.
- **Transport** — How to use the metro, taxis (Didi), and buses, with copy-to-clipboard Chinese phrases to show drivers.
- **SOS** — One-tap emergency numbers, medical phrases for hospital visits, and safety tips.
- **AI Assistant** — A conversational guide that answers anything about Chinese culture, etiquette, food, and travel.

## Tech Stack

- **Framework:** React Native + Expo (SDK 54)
- **Language:** TypeScript
- **Routing:** Expo Router (file-based)
- **AI:** Groq API (vision model for OCR/translation, LLM for chat)
- **Build:** EAS Build

## Architecture

The project is organized for clarity and maintainability:
app/(tabs)/      # Five screens, file-based routing

constants/       # Design system: colors, typography, spacing

data/            # Static content for guides (payment, transport, SOS)

services/        # Groq API integration

hooks/           # Shared logic (theme)

A central design system (`constants/`) drives consistent colors, typography, and spacing across every screen, with full light and dark mode support.

## Getting Started

```bash
# Install dependencies
npm install

# Add your Groq API key
echo "EXPO_PUBLIC_GROQ_API_KEY=your_key_here" > .env

# Start the dev server
npx expo start
```

Get a free Groq API key at [console.groq.com](https://console.groq.com).

## Roadmap

- [ ] Offline phrasebook caching
- [ ] Language toggle (RU/EN) across all screens
- [ ] Chat history persistence
- [ ] Google Play release

## License

MIT

---

Built as a portfolio project exploring mobile development, AI integration, and Chinese travel culture.