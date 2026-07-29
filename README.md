# Birthday Portfolio 🎂✨

A two-stage web experience: an interactive birthday card that opens into a Y2K bubble-pop scrapbook portfolio. Built with Next.js 14+ (App Router), deployable on Vercel.

## Features

### Stage 1 — Birthday Card (`/`)
- Tap-to-open animated envelope/card
- Confetti burst on open (canvas-confetti)
- Birthday song via Howler (loops, fades out on transition)
- Staggered animated wish message
- Full-page transition into portfolio

### Stage 2 — Portfolio (`/portfolio`)
- **Hero** — Bubble-letter PORTFOLIO wordmark, photo, role tags
- **Her Journey** — Bio, skill pills, scroll-triggered timeline
- **Channels** — Social platform sticker cards
- **Selected Work** — Polaroid gallery with lightbox
- **Kind Words** — Testimonials + media kit stats
- **Contact** — Form with Resend email delivery

## Design System

| Token | Value |
|-------|-------|
| Blush background | `#F9D9DE` |
| Cream cards | `#FBF8F3` |
| Hot pink accent | `#F45B9E` |
| Black accent | `#1a1a1a` |
| Display font | Baloo 2 |
| Script font | Caveat |
| Body font | Poppins |

## Quick Start

```bash
# Install dependencies
npm install

# Copy env vars
cp .env.example .env.local

# Add your assets (see below)
# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Assets to Replace

| Path | Description |
|------|-------------|
| `public/audio/birthday-song.mp3` | Birthday song (MP3) |
| `public/images/hero-photo.svg` | Hero portrait (replace with `.jpg`) |
| `public/images/profile-photo.svg` | Circular profile photo |
| `public/images/work-*.svg` | Work sample images (6 total) |
| `lib/data.ts` | All text content: name, bio, journey, channels, work, testimonials |

After adding JPG/PNG photos, update the `src` paths in `Hero.tsx`, `JourneyTimeline.tsx`, and `lib/data.ts`.

## Environment Variables

```env
RESEND_API_KEY=re_xxxxxxxx
CONTACT_EMAIL_TO=you@email.com
```

Get a free API key at [resend.com](https://resend.com).

## Deploy to Vercel

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in project settings
4. Deploy

## Project Structure

```
app/
  page.tsx              → Birthday card
  portfolio/page.tsx    → Portfolio
  api/contact/route.ts  → Contact form handler
components/
  BirthdayCard.tsx      → Stage 1 card + envelope
  AudioPlayer.tsx       → Howler hook
  Confetti.tsx          → Confetti triggers
  AnimatedWish.tsx      → Staggered text reveal
  Hero.tsx              → Portfolio hero slide
  JourneyTimeline.tsx   → About + timeline
  ChannelsGrid.tsx      → Social channels
  WorkGallery.tsx       → Polaroid gallery + lightbox
  ContactForm.tsx       → Contact form
  TestimonialsSection.tsx
  Decorations.tsx       → SVG doodles (starburst, squiggle, etc.)
  ui/BubbleText.tsx     → Bubble text + pill badges + slide cards
lib/
  data.ts               → All customizable content
  emailClient.ts        → Resend integration
```

## Customization

Edit `lib/data.ts` to update:
- Creator name, roles, bio, specialties
- Journey milestones
- Social channel links and handles
- Work samples
- Testimonials and media kit stats
- Birthday wish message

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS 4**
- **Framer Motion** — animations & scroll reveals
- **canvas-confetti** — confetti effects
- **Howler** — audio playback
- **Resend** — contact form emails
