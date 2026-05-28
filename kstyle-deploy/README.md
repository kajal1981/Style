# K Style Oracle

A personal style app that recommends outfits based on emotional energy, with AI-powered styling advice and photo detection.

## Deploy to Vercel (5 minutes)

1. Upload this folder to a GitHub repository
2. Go to vercel.com → New Project → Import your GitHub repo
3. Add environment variable: `ANTHROPIC_API_KEY` = your key from console.anthropic.com
4. Click Deploy

## Local development

```bash
npm install
# Create .env.local with: ANTHROPIC_API_KEY=your_key_here
npm run dev
```

## Features
- Oracle: 7 mood archetypes with AI styling intelligence
- Closet: Upload photos, AI auto-detects item name/category/colour/vibes
- Style gaps: Visual analysis of your wardrobe's vibe distribution
