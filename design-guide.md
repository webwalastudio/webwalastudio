# Webwala Studio — Design Guide

Complete implementation reference for the finalized website design. Hand this to any developer to rebuild the site with pixel-accurate consistency.

---

## 1. Design Tokens (CSS Variables)

Paste this `:root` block into your global stylesheet. Every component references these variables — never hardcode colors directly.

```css
:root {
  /* Primary Colors */
  --blue:        #38BDF8;   /* Sky 400 — highlights, step numbers */
  --blue-mid:    #0EA5E9;   /* Sky 500 — gradient start, links */
  --blue-deep:   #0284C7;   /* Sky 600 — reserved for deeper states */

  /* Secondary Colors */
  --violet:      #A78BFA;   /* Violet 400 — muted accents, dark-bg labels */
  --violet-mid:  #7C3AED;   /* Violet 600 — PRIMARY ACTION color */
  --violet-deep: #6D28D9;   /* Violet 700 — reserved for deeper states */

  /* Backgrounds */
  --bg:          #F8FAFF;   /* Page base background */
  --bg-alt:      #FFFFFF;   /* Card / section white */
  --surface:     #EEF2FF;   /* Indigo-50 — chip bg, icon bg */
  --border:      #E0E7FF;   /* Indigo-100 — all borders */

  /* Text */
  --text-dark:   #1E1B4B;   /* Indigo-950 — headings, logo */
  --text-mid:    #4B5563;   /* Gray-600 — body copy */
  --text-light:  #9CA3AF;   /* Gray-400 — captions, placeholders */

  /* Shape */
  --radius:      16px;      /* Cards, inputs, buttons */
  --radius-lg:   24px;      /* Large cards, modals, pricing */
}
```

---

## 2. Typography

**Font family:** `Plus Jakarta Sans` — load from Google Fonts.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
```

```css
body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  line-height: 1.6;
  background: var(--bg);
  color: var(--text-dark);
}
```

### Type Scale

| Role | Size | Weight | Letter Spacing | Usage |
|---|---|---|---|---|
| Hero H1 | `clamp(38px, 4.8vw, 62px)` | 900 | `-2px` | Hero headline only |
| Section H2 | `clamp(26px, 3.2vw, 42px)` | 900 | `-1.2px` | Section titles |
| Card H3 | `15px` | 800 | `0` | Industry/feature card titles |
| Process H3 | `20px` | 800 | `-0.5px` | Process step titles |
| Body | `16px` | 400 | `0` | Section subtitles |
| Body SM | `14px` | 400 | `0` | Card body, list items |
| Caption | `13px` | 400 | `0` | Pricing taglines, footnotes |
| Label | `11–12px` | 700 | `1.5px` | Section tags, pricing tier names |
| Nav | `14px` | 600 | `0` | Navigation links |
| Logo | `17px` | 800 | `-0.4px` | Brand name in nav/footer |

### Gradient Text (headline accents)

```css
.grad {
  background: linear-gradient(135deg, var(--blue-mid), var(--violet-mid));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

Apply the `.grad` class to a `<span>` inside headings for the blue-to-violet accent word.

---

## 3. Color Usage Rules

| Situation | Color |
|---|---|
| Primary CTA button | `linear-gradient(135deg, #0EA5E9, #7C3AED)` |
| Ghost button border & text | `--violet-mid` |
| Section label chips (light bg) | bg `--surface`, text `--violet-mid`, border `--border` |
| Section label chips (dark bg) | bg `rgba(56,189,248,0.12)`, text `--blue` |
| Card hover border | `--blue-mid` |
| Card active/selected border | `--violet-mid` |
| Active card background | `linear-gradient(135deg, #F5F3FF, #EDE9FE)` |
| Step numbers (dark section) | `--blue` |
| Featured pricing card bg | `linear-gradient(160deg, #1E1B4B, #312E81)` |
| Footer / dark section bg | `--text-dark` (#1E1B4B) |
| Process section bg | `linear-gradient(160deg, #1E1B4B 0%, #312E81 50%, #1E1B4B 100%)` |
| Hero section bg | `linear-gradient(160deg, #EFF6FF 0%, #F5F3FF 50%, #EDE9FE 100%)` |
| CTA section bg | `linear-gradient(135deg, #EFF6FF 0%, #EDE9FE 100%)` |

---

## 4. Spacing System

```
Section vertical padding:   100px top / 100px bottom  (desktop)
                            72px top / 72px bottom     (mobile ≤600px)
Section horizontal padding: 5% left/right
Max content width:          1200px  (centered with margin: 0 auto)
Card padding:               28px (industry cards)
                            36px (pricing cards)
                            40px 32px (process steps)
Card gap (grids):           18–24px
Section header → grid gap:  56px
```

---

## 5. Components

### 5.1 Navigation

```css
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  height: 68px;
  padding: 0 5%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

- **Logo mark:** 36×36px, `border-radius: 10px`, `background: linear-gradient(135deg, #0EA5E9, #7C3AED)`
- **Logo text:** 17px / weight 800 / color `--text-dark`
- **Nav links:** 14px / weight 600 / color `--text-mid` → hover/active `--violet-mid`
- **On scroll:** add `box-shadow: 0 4px 24px rgba(99,102,241,0.12)` via JS

```js
window.addEventListener('scroll', () => {
  document.querySelector('nav').style.boxShadow =
    window.scrollY > 40 ? '0 4px 24px rgba(99,102,241,0.12)' : 'none';
});
```

---

### 5.2 Buttons

All buttons share this base:

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 24px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: all 0.22s;
}
```

**Primary (gradient):**
```css
.btn-primary {
  background: linear-gradient(135deg, #0EA5E9, #7C3AED);
  color: white;
  box-shadow: 0 4px 20px rgba(124,58,237,0.25);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(124,58,237,0.35);
}
```

**Ghost (outlined):**
```css
.btn-ghost {
  background: transparent;
  color: var(--violet-mid);
  border: 1.5px solid var(--border);
}
.btn-ghost:hover {
  border-color: var(--violet-mid);
  background: var(--surface);
}
```

**Pricing ghost (used in Starter / Business Pro cards):**
```css
.btn-pricing-ghost {
  width: 100%;
  padding: 14px 24px;
  font-size: 15px;
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--violet-mid);
  border: 1.5px solid var(--border);
}
.btn-pricing-ghost:hover {
  background: var(--border);
  transform: translateY(-1px);
}
```

**Pricing featured (used in Professional card):**
```css
.btn-pricing-featured {
  width: 100%;
  padding: 14px 24px;
  font-size: 15px;
  border-radius: var(--radius);
  background: linear-gradient(135deg, #0EA5E9, #7C3AED);
  color: white;
  border: none;
  box-shadow: 0 6px 20px rgba(124,58,237,0.35);
}
.btn-pricing-featured:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(124,58,237,0.45);
}
```

---

### 5.3 Section Label Chip

```css
.section-label {
  display: inline-block;
  background: var(--surface);
  color: var(--violet-mid);
  padding: 5px 14px;
  border-radius: 50px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 16px;
  border: 1px solid var(--border);
}
```

For use on dark backgrounds (Process section), override:
```css
background: rgba(56,189,248,0.12);
color: #38BDF8;
border-color: rgba(56,189,248,0.2);
```

---

### 5.4 Hero Section

```css
.hero {
  background: linear-gradient(160deg, #EFF6FF 0%, #F5F3FF 50%, #EDE9FE 100%);
  padding: 148px 5% 100px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}
```

**Decorative blob — top right:**
```css
.hero::before {
  content: '';
  position: absolute; top: 5%; right: 5%;
  width: 560px; height: 560px; border-radius: 50%;
  background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%);
  pointer-events: none;
}
```

**Decorative blob — bottom left:**
```css
.hero::after {
  content: '';
  position: absolute; bottom: 0; left: 0;
  width: 400px; height: 400px; border-radius: 50%;
  background: radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%);
  pointer-events: none;
}
```

**Layout:** `display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;`

**Hero badge:**
```css
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: white; border: 1px solid var(--border);
  color: var(--violet-mid);
  padding: 7px 16px; border-radius: 50px;
  font-size: 12px; font-weight: 700; letter-spacing: 0.3px;
  margin-bottom: 28px;
  box-shadow: 0 2px 12px rgba(124,58,237,0.1);
}
/* Dot inside badge */
.hero-badge-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: linear-gradient(135deg, #0EA5E9, #7C3AED);
}
```

**Stats row:**
```css
.hero-stats {
  display: flex; gap: 36px;
  margin-top: 56px; padding-top: 36px;
  border-top: 1.5px solid var(--border);
}
.hero-stat-num {
  font-size: 26px; font-weight: 900; letter-spacing: -1px;
  background: linear-gradient(135deg, #0EA5E9, #7C3AED);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-stat-label { font-size: 12px; color: var(--text-light); font-weight: 600; margin-top: 2px; }
```

**Floating "Site is Live" card:**
```css
.hero-float-card {
  position: absolute; bottom: -16px; right: -16px;
  background: white; border-radius: var(--radius);
  padding: 14px 18px;
  display: flex; align-items: center; gap: 12px;
  box-shadow: 0 16px 48px rgba(99,102,241,0.18);
  border: 1px solid var(--border);
}
/* Icon inside float card */
.float-icon {
  width: 40px; height: 40px; border-radius: 10px;
  background: linear-gradient(135deg, #D1FAE5, #A7F3D0);
  display: flex; align-items: center; justify-content: center; font-size: 18px;
}
```

---

### 5.5 Industry Cards

**Grid:** `grid-template-columns: repeat(3, 1fr); gap: 18px;`

```css
.industry-card {
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  cursor: pointer;
  transition: all 0.25s;
  background: white;
}

/* Hover state */
.industry-card:hover {
  border-color: var(--blue-mid);
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(14,165,233,0.12);
}

/* Active / selected state */
.industry-card.active {
  border-color: var(--violet-mid);
  background: linear-gradient(135deg, #F5F3FF, #EDE9FE);
  box-shadow: 0 8px 32px rgba(124,58,237,0.1);
}

/* Icon block */
.industry-icon {
  width: 48px; height: 48px; border-radius: 12px;
  background: var(--surface); border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; margin-bottom: 16px; transition: background 0.25s;
}

/* Icon on hover */
.industry-card:hover .industry-icon { background: #E0F2FE; border-color: #BAE6FD; }
/* Icon when active */
.industry-card.active .industry-icon { background: #EDE9FE; border-color: #DDD6FE; }

/* Arrow link */
.industry-link {
  font-size: 13px; font-weight: 700; color: var(--blue-mid);
  display: flex; align-items: center; gap: 5px; text-decoration: none;
}
.industry-card.active .industry-link { color: var(--violet-mid); }
.industry-link::after { content: '→'; transition: transform 0.2s; }
.industry-card:hover .industry-link::after { transform: translateX(4px); }
```

**Click behavior (JS):**
```js
document.querySelectorAll('.industry-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.industry-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});
```

**Placeholder cell (no card):**
```css
.industry-preview {
  background: linear-gradient(135deg, #F0F9FF, #F5F3FF);
  border: 1.5px dashed var(--border); border-radius: var(--radius);
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  text-align: center; padding: 28px; min-height: 200px;
}
```

---

### 5.6 Process Section

**Section background:** `linear-gradient(160deg, #1E1B4B 0%, #312E81 50%, #1E1B4B 100%)`

**Steps container:**
```css
.process-steps {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: rgba(255,255,255,0.05);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 36px;
}
```

**Individual step:**
```css
.process-step {
  background: rgba(255,255,255,0.04);
  padding: 40px 32px;
  transition: background 0.25s;
}
.process-step:hover { background: rgba(255,255,255,0.08); }
```

**Step number label:** `font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #38BDF8;`

**Step icon block:** `width: 52px; height: 52px; border-radius: 14px; background: rgba(56,189,248,0.15);`

**Step tag chip:** `background: rgba(56,189,248,0.12); color: #38BDF8; padding: 4px 14px; border-radius: 50px; font-size: 11px; font-weight: 700;`

**Deliverables box:**
```css
.deliverables-box {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius-lg);
  padding: 36px;
}
```

---

### 5.7 Pricing Cards

**Grid:** `grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: start;`

**Base card:**
```css
.pricing-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 36px;
  border: 1.5px solid var(--border);
  position: relative;
  transition: all 0.25s;
}
.pricing-card:hover {
  box-shadow: 0 16px 48px rgba(99,102,241,0.1);
  transform: translateY(-4px);
}
```

**Featured card (Professional):**
```css
.pricing-card.featured {
  background: linear-gradient(160deg, #1E1B4B 0%, #312E81 100%);
  border-color: transparent;
  transform: scale(1.04);
}
.pricing-card.featured:hover { transform: scale(1.04) translateY(-4px); }
```

**"Most Popular" badge:**
```css
.pricing-badge {
  position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
  background: linear-gradient(135deg, #0EA5E9, #7C3AED);
  color: white; font-size: 11px; font-weight: 800;
  padding: 5px 18px; border-radius: 50px; white-space: nowrap;
}
```

**Price number:** `font-size: 48px; font-weight: 900; letter-spacing: -2px; line-height: 1;`

**Feature check icon:**
```css
.pricing-check {
  width: 18px; height: 18px; border-radius: 50%;
  background: rgba(56,189,248,0.15); color: #0EA5E9;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; font-size: 10px;
}
/* On featured card */
.pricing-card.featured .pricing-check {
  background: rgba(167,139,250,0.2); color: #A78BFA;
}
```

---

### 5.8 CTA Section

```css
.cta-section {
  background: linear-gradient(135deg, #EFF6FF 0%, #EDE9FE 100%);
  padding: 100px 5%;
  text-align: center;
  border-top: 1.5px solid var(--border);
  border-bottom: 1.5px solid var(--border);
}
```

---

### 5.9 Footer

**Background:** `#1E1B4B` (same as `--text-dark`)

**Grid layout:** `grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 60px;`

```css
.social-btn {
  width: 36px; height: 36px; border-radius: 9px;
  background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.6);
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; transition: background 0.2s;
}
.social-btn:hover { background: rgba(255,255,255,0.14); color: white; }
```

**Footer divider:** `border-top: 1px solid rgba(255,255,255,0.07);`

---

## 6. Animations

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.fade-up   { animation: fadeUp 0.6s ease both; }
.fade-up-1 { animation-delay: 0.08s; }
.fade-up-2 { animation-delay: 0.18s; }
.fade-up-3 { animation-delay: 0.28s; }
.fade-up-4 { animation-delay: 0.38s; }
```

Apply these classes to hero elements in order: badge → h1 → description → CTA buttons → stats.

For cards and sections outside the hero, trigger `fadeUp` on scroll using an `IntersectionObserver`:

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('fade-up');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.industry-card, .process-step, .pricing-card')
  .forEach(el => observer.observe(el));
```

---

## 7. Responsive Breakpoints

### ≤ 900px (Tablet)

```css
@media (max-width: 900px) {
  .hero-inner        { grid-template-columns: 1fr; gap: 48px; }
  .hero-visual       { display: none; }
  .industries-grid   { grid-template-columns: 1fr 1fr; }
  .process-steps     { grid-template-columns: 1fr; }
  .deliverables-grid { grid-template-columns: 1fr; }
  .pricing-grid      { grid-template-columns: 1fr; }
  .pricing-card.featured { transform: none; }
  .footer-top        { grid-template-columns: 1fr 1fr; gap: 40px; }
  .nav-links         { display: none; } /* Add hamburger menu */
}
```

### ≤ 600px (Mobile)

```css
@media (max-width: 600px) {
  section              { padding: 72px 5%; }
  .hero                { padding: 120px 5% 80px; }
  .industries-grid     { grid-template-columns: 1fr; }
  .footer-top          { grid-template-columns: 1fr; }
  .footer-bottom       { flex-direction: column; gap: 16px; text-align: center; }
  .hero-stats          { flex-wrap: wrap; gap: 24px; }
}
```

---

## 8. Page Sections — Implementation Order

| # | Section | Background | Notes |
|---|---|---|---|
| 1 | Navigation | `rgba(255,255,255,0.85)` blur | Fixed, z-index 100 |
| 2 | Hero | Blue-violet light gradient | Split 2-col layout + mockup visual |
| 3 | Industries | `white` | 3-col card grid, JS click to activate |
| 4 | Process | Deep indigo gradient | Dark section — invert all text to white |
| 5 | Pricing | `var(--bg)` (#F8FAFF) | Featured card scaled 1.04× |
| 6 | CTA | Light blue-violet gradient | Centered, single CTA button |
| 7 | Footer | `#1E1B4B` | 4-col grid, dark text on dark bg |

---

## 9. Shadows Reference

| Usage | Value |
|---|---|
| Primary button hover | `0 8px 30px rgba(124,58,237,0.35)` |
| Featured pricing button | `0 6px 20px rgba(124,58,237,0.35)` |
| Hero mockup | `0 30px 80px rgba(99,102,241,0.15)` |
| Float card | `0 16px 48px rgba(99,102,241,0.18)` |
| Hero badge | `0 2px 12px rgba(124,58,237,0.1)` |
| Industry card hover | `0 12px 40px rgba(14,165,233,0.12)` |
| Pricing card hover | `0 16px 48px rgba(99,102,241,0.1)` |
| Nav on scroll | `0 4px 24px rgba(99,102,241,0.12)` |

---

## 10. Do's and Don'ts

**Do:**
- Always use the gradient `linear-gradient(135deg, #0EA5E9, #7C3AED)` for primary CTAs
- Use `--violet-mid` as the single interactive/hover color on light backgrounds
- Use `--blue` (#38BDF8) exclusively on dark backgrounds (process section)
- Keep section max-width at `1200px` with `margin: 0 auto`
- Apply `border-radius: 50px` to all pill badges and buttons
- Use `backdrop-filter: blur(20px)` on the frosted nav

**Don't:**
- Don't use orange, red, or green as primary accent colors — they break the palette
- Don't use `border-radius` less than `12px` on cards
- Don't hardcode hex values — always reference CSS variables
- Don't use font weights below 400 or above 900
- Don't skip the `letter-spacing: -1.2px` on section titles — it's what makes them look modern
- Don't remove the `transform: scale(1.04)` on the featured pricing card
