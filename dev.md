# [App Name] — Features & UI Guide (Draft v0.3)

> v0.3: bets removed. The MVP is a solid link-in-bio platform with the core features done properly, in a pixel / blocky 8-bit UI. Items marked **(assumption)** need your call.

## 1. What this is

A link-in-bio platform for creators, with the standard feature set (link blocks, themes, analytics, email capture, selling) and a pixel-art look that stands out from the clean, corporate pages of existing tools. The goal of the MVP is simple: every feature in it works reliably and feels good to use.

## 2. Target user

- Instagram / TikTok / YouTube creator, small business or freelancer
- Wants a page that looks distinctive without design skills
- Wants to share links, collect emails and (later) sell, without paying for basics
- **(assumption)** India first (UPI, INR), global later

## 3. Product principles

- **Works first, then more features:** fewer features, each done properly
- **Fast to set up:** page live in under 3 minutes
- **Fast to load:** light enough for slow mobile data
- **Pixel identity:** the look is the brand, not decoration
- **No fee surprises:** fees are shown plainly wherever money is involved
- **They own their data:** full export, no content used for AI training

## 4. Feature set

Legend: **MVP** = must ship and work properly, **v1** = after real users, **Later** = backlog.

### 4.1 Page and link blocks

| Feature | Phase |
|---------|-------|
| Unlimited links, drag-and-drop reorder | MVP |
| Profile photo, name, short bio | MVP |
| Social profile icons row | MVP |
| Pinned / featured link at top | MVP |
| Content link blocks (video, post, article, podcast) | MVP |
| Email signup block (built-in form) | MVP |
| Booking link block (external calendar URL) | MVP |
| Link icons and thumbnails | MVP |
| Embeds (YouTube, Spotify) | v1 |
| Link scheduling (show / hide by date) | v1 |
| Sensitive-content warning on a link | Later |

### 4.2 Design and customization

| Feature | Phase |
|---------|-------|
| 6–8 ready-made pixel themes | MVP |
| Color palette picker (curated 16-color sets) | MVP |
| Pixel font choice (2–3 options) | MVP |
| Background options (solid, dither pattern, tiled pixel pattern) | MVP |
| Niche templates (fitness, finance, coaching, music, etc.) | v1 |
| Pixel avatar maker | v1 |
| Custom background image upload | v1 |
| Custom CSS | Later |

### 4.3 Analytics

| Feature | Phase |
|---------|-------|
| Page views and link clicks | MVP |
| Traffic source (Instagram, TikTok, YouTube, direct) via referrer and UTM | MVP |
| Reasonable history on the free plan | MVP |
| Audience breakdown (country, device) | v1 |
| Click trends over time, CSV export | v1 |

### 4.4 Earning

| Feature | Phase |
|---------|-------|
| Affiliate link blocks with click tracking | MVP |
| Sell digital products (ebook, template, preset, file) | v1 |
| Native checkout **(assumption: UPI via Razorpay first)** | v1 |
| Sponsored link / brand placement | Later |
| Paid community, UPI AutoPay memberships | Later |
| Courses | Later |

### 4.5 Audience and growth tools

| Feature | Phase |
|---------|-------|
| Email list collection with CSV export | MVP |
| Short links with custom slugs | MVP |
| QR code generator for the page | MVP |
| Email integrations (Mailchimp, Kit, Google Sheets) | v1 |
| Audience manager (subscribers, source, date) | v1 |
| Redirect links | v1 |
| Instagram auto-reply to comments / DMs | Later |

### 4.6 Platform and extras

| Feature | Phase |
|---------|-------|
| Public page at `yourapp.com/username` | MVP |
| Short in-app guides: add your link to Instagram, TikTok, YouTube, LinkedIn | MVP |
| Mobile-friendly editor (responsive web) | MVP |
| Custom domain | v1 |
| Basic SEO (title, description, indexable page) | v1 |
| Native mobile app | Later |
| Integrations marketplace (Shopify, Calendly, etc.) | Later |
| Public API and webhooks | Later |

### Explicitly not building yet

Team accounts, enterprise features, full storefront, email automation.

## 5. "Done means" checklist (MVP)

Each MVP feature isn't finished until all of its checks pass.

**Page and links**
- Add, edit, delete and reorder links with no page reload; order saves instantly and persists
- Drag-and-drop works with mouse and touch (long-press on mobile)
- Invalid URLs are caught with a clear message; `https://` is added automatically if missing
- Public page reflects edits within a few seconds
- Public page works with JavaScript slow or off for the basic link list

**Themes and design**
- Switching a theme updates the live preview immediately
- Every theme passes 4.5:1 text contrast
- Palette and font changes persist and render the same on the public page as in the preview

**Analytics**
- Every view and click is counted exactly once (no double counting from refreshes or bots)
- Source detection falls back to "Direct" cleanly when the referrer is missing
- Numbers on the dashboard match the raw event data for any date range
- Free plan retains history long enough to be useful **(assumption: 12 months)**

**Email signup**
- Form validates email format, blocks duplicates, shows success and error states
- Subscribers appear in the dashboard within seconds and export to CSV cleanly
- Basic spam protection (rate limiting, honeypot field)

**Short links and QR**
- Custom slug uniqueness checked live
- Redirects are fast and always correct
- QR code downloads as PNG and SVG and scans reliably

**Public page performance and reliability**
- Loads in under ~2 seconds on a mid-range phone on 4G
- Total page weight kept small (sprites as SVG or small PNG sheets)
- No layout shift while the page loads
- Works in current Chrome, Safari, Firefox and in Instagram / TikTok in-app browsers

**Account**
- Sign up, login, logout, password reset work end to end
- Username change handled safely (old link behavior defined)
- Delete account removes data fully

## 6. Information architecture

```
Landing page
Sign up / Login
App
├── Home (dashboard: views, clicks, subscribers)
├── My Page (editor + live preview)
├── Audience (emails)
├── Links (short links, QR)
├── Insights (views, clicks, sources)
└── Settings (profile, export, plan)
Public bio page → yourapp.com/username
```

## 7. Key flows

### 7.1 Onboarding (under 3 minutes)

1. Sign up (Google or email)
2. Pick username, see live URL preview
3. Add name, photo, one-line bio
4. Pick a pixel theme
5. Add first link (with a few suggested block types)
6. Publish, copy URL, see short guide for pasting it into Instagram / TikTok / YouTube

### 7.2 Editing a page

1. Open My Page
2. Add a block from the block grid
3. Fill in title and URL (or form fields)
4. Reorder by dragging
5. Watch the live preview update; autosave confirms with "SAVED"

### 7.3 Collecting emails

1. Add an Email signup block
2. Set the button text and a short thank-you message
3. Visitors submit; subscribers appear in Audience
4. Export to CSV anytime

### 7.4 Creating a short link and QR

1. Open Links → New short link
2. Enter destination and custom slug
3. Copy the link or download the QR code

## 8. Screen-by-screen UI guide

### 8.1 Public bio page

- Single column, centered, max width ~480px
- Order: avatar → name → one-line bio → pinned link → other links → social icons
- Link blocks are full-width chunky pixel buttons
- Footer: small "Made with [App Name]" on the free plan
- Loads fast on slow connections

### 8.2 Editor (My Page)

- Desktop: editor left, live phone-frame preview right
- Mobile: editor with a "Preview" toggle
- Blocks reorder with a pixel drag handle
- "Add block" opens a grid of block types, each with a 16×16 pixel icon
- Autosave with a visible "SAVED" indicator

### 8.3 Dashboard (Home)

- Top row of stat cards: Views, Clicks, Click rate, Subscribers
- Range switcher: 7 days / 30 days / All time
- Top links list and top sources list
- Empty state: mascot plus a short 3-step checklist (add a link, pick a theme, share your page)

### 8.4 Audience

- Table of subscribers: email, date, source
- Search, sort, CSV export button
- Empty state with the mascot

### 8.5 Links (short links and QR)

- List of short links with destination, clicks, copy button
- "New short link" primary button
- QR preview with PNG / SVG download

### 8.6 Insights

- Views and clicks over time (blocky bar chart)
- Traffic sources (bar chart)
- Per-link click table, sortable

### 8.7 Settings

Profile, username, data export, plan and billing, delete account. Custom domain and payments appear here in v1.

## 9. Pixel design system

**Goal:** a blocky 8-bit look that feels playful and original. Inspired by pixel aesthetics in general, with no copied assets.

### 9.1 IP guardrails

- Do **not** use Minecraft's logo, font, textures, block art, mobs, music or sound effects, or anything resembling specific Minecraft characters or items.
- Do not reuse other games' sprites or characters either.
- Draw original sprites, icons and mascot. Invented creatures and objects only.
- Use open-licensed fonts only.

### 9.2 Core visual rules

- **No rounded corners.** Square, or stepped "pixel corners" notched by one pixel step.
- **Hard borders:** 3–4px solid dark outline on every card and button.
- **Hard shadows:** offset shadow with no blur (e.g. 4px 4px 0 dark).
- **Pixel grid:** base unit 4px. Icons on a 16×16 grid, scaled 2× or 3× with `image-rendering: pixelated`.
- **Limited palette:** fixed 16-color set. No gradients. Use dithering for texture.
- **Stepped motion:** animations use `steps()` so movement looks frame-by-frame. Respect reduced-motion settings.
- **Sound:** off by default. Optional soft click sounds in settings (original, not borrowed).

### 9.3 Typography

| Use | Font | Notes |
|-----|------|-------|
| Headings, buttons, big numbers | **Press Start 2P** or **Pixelify Sans** | Open-licensed Google Fonts. Short text only. |
| Body text, labels, tables | **VT323**, **Silkscreen** or a clean sans fallback | Must stay readable at small sizes |

- Pixel fonts for headings and numbers only. Paragraphs use a readable body font.
- Minimum body size 16px.

### 9.4 Color tokens (starter palette, original)

| Token | Use | Value |
|-------|-----|-------|
| `--ink` | Outlines, text | `#1B1B2F` |
| `--paper` | Page background | `#F4EEDC` |
| `--surface` | Cards | `#FFFFFF` |
| `--accent` | CTAs, pinned link | `#FF5D73` |
| `--accent-2` | Secondary highlight | `#3DDC97` |
| `--sky` | Info, links | `#4DA3FF` |
| `--sun` | Warnings, stars | `#FFD23F` |
| `--grape` | Special highlights | `#8E5BFF` |
| `--muted` | Secondary text | `#6B6A7C` |
| `--danger` | Errors, delete | `#E63946` |

- Extend to a full 16-color palette for themes and avatars.
- Dark mode: `--paper` → `#14142B`, `--surface` → `#22223F`, accents unchanged.

### 9.5 Components

| Component | Spec |
|-----------|------|
| **Button** | Square, 4px border, hard shadow. Hover lifts 2px. Pressed moves down 4px and drops the shadow. Primary uses `--accent`. |
| **Card** | `--surface`, 4px border, notched corners, hard shadow |
| **Link block** | Full-width pixel button with 16×16 icon on the left, title, arrow |
| **Stat card** | Big pixel-font number, small label, tiny sprite icon |
| **Input** | Inset look: 4px border, darker top and left edges, blinking block cursor |
| **Toggle** | Chunky 2-frame switch |
| **Progress bar** | Segmented blocks, filling cell by cell |
| **Chips** | Source chips (Instagram, TikTok, YouTube, Direct) with pixel icons |
| **Toast** | Stepped slide-in, short text in the body font |
| **Empty state** | Mascot sprite plus a short checklist |
| **Tooltip** | Dark box with pixel border, body font |

### 9.6 Mascot and iconography

- One **original mascot**, a small invented creature or object not based on any existing character, as a 16×16 or 32×32 sprite with 3–4 poses (idle, happy, celebrating, sleeping).
- Used in empty states, onboarding, success moments and the 404 page.
- Icon set of ~40 icons on a 16×16 grid (link, mail, calendar, chart, lock, QR, share, copy, edit, trash, etc.), drawn in our palette.

### 9.7 Accessibility

- 4.5:1 contrast for text on every theme
- Don't rely on color alone (use icons and labels)
- Pixel fonts never used for paragraphs
- Reduced-motion mode disables stepped animations
- Alt text on all sprites and icons; tap targets at least 44px

### 9.8 Implementation notes

- CSS: `image-rendering: pixelated`, `box-shadow` for hard shadows, `clip-path` or layered borders for notched corners, `steps()` for animation.
- Prefer SVG or small PNG sprite sheets scaled with CSS so they stay crisp and light.
- Keep a design-token file (`tokens.css`) so themes are just token swaps.
- Test on low-end Android devices first.

## 10. Pricing direction

**(assumption)** To be decided:

- Free: unlimited links, themes, basic analytics, email capture
- Paid tier later for custom domain, advanced analytics, integrations, branding removal
- Clear fee display wherever selling is involved; no hidden fees

## 11. Success metrics (first 60 days)

- Time to first published page: under 3 minutes
- % of signups who publish a page
- Public page load time on mid-range mobile
- Error-free rate on core actions (save, reorder, email submit)
- Weekly active creators

## 12. Open questions

1. App name and URL structure?
2. India-first (UPI/Razorpay) or global (Stripe)?
3. Is digital product selling in the MVP or v1? (Currently v1.)
4. Free vs paid split and pricing?
5. Who draws the sprite set and mascot: you, a pixel artist, or generated and cleaned up by hand?
6. Hosting and stack for fast public pages (static or edge-rendered)?