# Franko Eventos Corporativos — Landing Page

A premium corporate events landing page built with **Vite + React + Tailwind CSS + Framer Motion**.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
franko-eventos/
├── index.html                        # Root HTML — update SEO meta tags here
├── vite.config.js
├── tailwind.config.js                # Design tokens (colors, fonts, animations)
├── postcss.config.js
├── public/
│   ├── favicon.svg                   # ← SWAP your favicon
│   ├── images/
│   │   ├── hero-bg.jpg               # ← Hero background
│   │   ├── about-1.jpg               # ← About section photo 1
│   │   ├── about-2.jpg               # ← About section photo 2
│   │   ├── gallery/                  # ← Gallery event photos (gi-1.jpg … gi-7.jpg)
│   │   └── clients/                  # ← Client logos (SVG preferred)
│   └── videos/
│       └── hero-reel.mp4             # ← Optional hero background video
└── src/
    ├── main.jsx                      # React entry point
    ├── App.jsx                       # Root component — assembles all sections
    ├── index.css                     # Global styles, CSS variables, Tailwind imports
    ├── hooks/
    │   └── useReveal.js              # Lightweight IntersectionObserver scroll hook
    └── components/
        ├── Navbar.jsx                # Sticky nav + mobile drawer
        ├── Hero.jsx                  # Full-screen hero section
        ├── AboutUs.jsx               # Split layout — text + image composition
        ├── Stats.jsx                 # "By the numbers" stats bar
        ├── Services.jsx              # 6-card services grid
        ├── ExperienceGallery.jsx     # Asymmetric masonry image gallery
        ├── ClientsCarousel.jsx       # Infinite scrolling clients marquee
        ├── Testimonials.jsx          # 3-column testimonial cards
        ├── FAQ.jsx                   # Animated accordion
        ├── Contact.jsx               # Split layout — info + floating-label form
        └── Footer.jsx                # Corporate footer
```

---

## 🎨 Design Tokens

All color and font tokens live in two places:

| File                  | Purpose                                      |
|-----------------------|----------------------------------------------|
| `src/index.css`       | CSS custom properties (`--gold`, `--obsidian`, etc.) |
| `tailwind.config.js`  | Tailwind color/font extension (mirrors CSS vars) |

To change the color palette, update both files.

### Color Palette

| Token        | Value                      | Usage                    |
|--------------|----------------------------|--------------------------|
| `--obsidian` | `#0b0c10`                  | Primary background       |
| `--ink`      | `#12141a`                  | Alternate section BG     |
| `--charcoal` | `#1a1d26`                  | Tertiary section BG      |
| `--card`     | `#1e2230`                  | Card backgrounds         |
| `--gold`     | `#b4985a`                  | Primary accent           |
| `--gold-light`| `#d4b878`                 | Hover/italic accent      |
| `--cream`    | `#f0ece4`                  | Primary text             |
| `--mist`     | `rgba(240,236,228,0.55)`   | Secondary text           |
| `--border`   | `rgba(180,152,90,0.18)`    | Borders & dividers       |

---

## 🖼️ Asset Swap Guide

Every placeholder is marked with a `/* SWAP: ... */` or `{/* SWAP: ... */}` comment. Here's the full list:

### Hero Background
In `src/components/Hero.jsx`, replace the inline `background` style with:

```jsx
// Option A — static image
style={{
  backgroundImage: "url('/images/hero-bg.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}}

// Option B — video (uncomment the <video> block in Hero.jsx)
```

### About Photos
In `src/components/AboutUs.jsx`, add to `.img-a` and `.img-b` divs:
```jsx
style={{ backgroundImage: "url('/images/about-1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
```
Or replace the div entirely with an `<img>` tag.

### Gallery Photos
In `src/components/ExperienceGallery.jsx`, add to each `GALLERY_ITEMS` entry:
```js
{ id: 'gi-1', label: '...', src: '/images/gallery/event-1.jpg', bg: '...' }
```
Then in the JSX, add:
```jsx
<img src={item.src} className="w-full h-full object-cover" alt={item.label} />
```

### Client Logos
In `src/components/ClientsCarousel.jsx`, replace the `<span>` inside each marquee item with:
```jsx
<img
  src={`/images/clients/${client.slug}.svg`}
  alt={client.name}
  className="h-8 object-contain"
  style={{ filter: 'grayscale(1) brightness(1.8)' }}
/>
```

### Logo
In `Navbar.jsx` and `Footer.jsx`, replace the text logo:
```jsx
<img src="/logo.svg" alt="Franko Eventos Corporativos" className="h-8" />
```

### Contact Form
In `src/components/Contact.jsx`, wire `handleSubmit` to your backend:
```js
// Example: Formspree
const handleSubmit = async (e) => {
  e.preventDefault()
  const data = new FormData(e.target)
  await fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: data })
  setSubmitted(true)
}
```

---

## 📦 Dependencies

| Package          | Version  | Purpose                         |
|------------------|----------|---------------------------------|
| `react`          | ^18.3    | UI framework                    |
| `react-dom`      | ^18.3    | DOM rendering                   |
| `framer-motion`  | ^11.2    | Scroll & hover animations       |
| `lucide-react`   | ^0.383   | Icon library                    |
| `tailwindcss`    | ^3.4     | Utility-first CSS               |
| `vite`           | ^5.3     | Dev server & bundler            |

---

## 🌐 Deployment

### Vercel (recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload the /dist folder to Netlify
```

### Manual
```bash
npm run build
# Serve the /dist folder from any static host (S3, GitHub Pages, etc.)
```

---

## 📞 Contact Form Providers

| Provider      | Free Tier | Notes                        |
|---------------|-----------|------------------------------|
| **Formspree** | 50/month  | Drop-in, no backend needed   |
| **EmailJS**   | 200/month | Send directly from browser   |
| **Web3Forms** | Unlimited | No registration required     |
| **HubSpot**   | Free CRM  | Best if you want a CRM       |

---

*© 2025 Franko Eventos Corporativos*
# franko-eventos
