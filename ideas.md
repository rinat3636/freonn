# Freonn — Дизайн-концепции

## Контекст бренда
Логотип Freonn: тёмно-синий (#2D3092) + красный (#ED1C24), геометрический круговой символ, жирный шрифт. Инженерная компания — вентиляция, кондиционирование, промышленные системы.

---

<response>
<probability>0.07</probability>
<idea>

**Design Movement:** Industrial Brutalism meets Technical Precision

**Core Principles:**
- Asymmetric grid with hard-edge geometry — no soft rounding
- High-contrast navy/red/white palette with metallic accents
- Data-forward layout: numbers and specs as visual heroes
- Structural honesty — visible grid lines, technical annotations

**Color Philosophy:**
Primary: #1A1F6E (deep navy) as dominant background for dark sections
Accent: #ED1C24 (brand red) for CTAs and key highlights
Steel: #C0C8D8 (cool grey) for secondary text and dividers
White: pure #FFFFFF for content areas
Rationale: Industrial machinery is dark, precise, powerful — the palette mirrors that authority

**Layout Paradigm:**
Diagonal section breaks (clip-path polygon cuts) between sections. Left-heavy asymmetric layouts where text anchors left and visuals bleed right. Navigation bar with left-aligned logo and right-side utility links (top bar).

**Signature Elements:**
1. Diagonal red accent stripe cutting across hero section
2. Technical grid overlay on dark sections (subtle dot matrix)
3. Large outlined numerals (15, 1280) as decorative elements in stats

**Interaction Philosophy:**
Hover states reveal red underlines; cards lift with subtle drop shadow; CTA buttons have a "press" micro-animation

**Animation:**
- Section entrance: elements slide in from left (translateX -40px → 0, 0.4s ease-out)
- Numbers count up on scroll-into-view
- Navbar: solid on scroll (transparent → navy)

**Typography System:**
- Display: Oswald (bold, condensed) — headings, stats, section titles
- Body: Source Sans Pro (regular/semibold) — paragraphs, labels
- Hierarchy: H1 56px/Oswald Bold, H2 36px/Oswald SemiBold, Body 16px/Source Sans Pro

</idea>
</response>

<response>
<probability>0.06</probability>
<idea>

**Design Movement:** Corporate Modernism — Swiss Grid Precision

**Core Principles:**
- Strict 12-column grid with generous gutters
- Typography-first: large, confident headlines dominate sections
- Restrained use of color — navy and red as surgical accents only
- Clean white backgrounds with structured card layouts

**Color Philosophy:**
Background: #F5F6FA (off-white, slightly cool)
Primary: #2D3092 (brand navy)
Accent: #ED1C24 (brand red) — used sparingly for CTAs only
Text: #1A1A2E (near-black)
Rationale: Swiss design values clarity and function — the palette is professional and trustworthy

**Layout Paradigm:**
Strict horizontal bands with alternating white/light-grey backgrounds. Navigation is a clean horizontal bar. Hero uses a split layout: 60% text left, 40% dark panel right with quick-links.

**Signature Elements:**
1. Thin red horizontal rule above section headings
2. Service cards with left navy border accent
3. Stats displayed in large Tabular Numerals with label below

**Interaction Philosophy:**
Minimal — focus on clarity. Hover: background tint on cards. Active nav item: red underline.

**Animation:**
- Fade-in on scroll (opacity 0→1, 0.5s)
- Smooth anchor scroll
- Form field focus: blue outline glow

**Typography System:**
- Display: Montserrat (700/800) — headings
- Body: Inter (400/500) — body text
- Mono: JetBrains Mono — prices, technical specs

</idea>
</response>

<response>
<probability>0.08</probability>
<idea>

**Design Movement:** Bold Technical Expressionism — Engineering as Art

**Core Principles:**
- Dark navy hero sections with glowing red accents
- Oversized typography that commands attention
- Section transitions using geometric shapes (angled cuts, not straight lines)
- Content density varies: hero is spacious, service grid is dense

**Color Philosophy:**
Hero/dark sections: #0F1340 (very dark navy) 
Mid sections: #FFFFFF (white)
Feature sections: #F0F2FF (very light blue tint)
Primary brand: #2D3092 (navy)
Accent: #ED1C24 (red) for buttons, highlights, icons
Rationale: The contrast between deep navy and bright red creates visual energy that matches the industrial power of the company's work

**Layout Paradigm:**
Hero: full-width dark with diagonal bottom cut. Services: 3-column icon grid on white. About: left text + right dark panel with stats. Projects: masonry-style card grid. Pricing: horizontal card row.

**Signature Elements:**
1. Angled section dividers (polygon clip-path) between dark and light sections
2. Red icon circles for service categories
3. Glowing red CTA button with subtle box-shadow pulse animation

**Interaction Philosophy:**
Cards scale up slightly on hover (transform: scale 1.02). Buttons have a red glow pulse. Navigation links have animated underline that slides in from left.

**Animation:**
- Hero text: staggered word-by-word entrance (framer-motion)
- Service cards: stagger fade-up on scroll
- Stats: count-up animation
- Navbar: blur backdrop on scroll

**Typography System:**
- Display: Russo One (ultra-bold, industrial) — hero headline, section titles
- Subheadings: Oswald (semibold) — card titles, labels
- Body: Roboto (400/500) — paragraphs
- Numbers: Oswald Tabular — stats, prices

</idea>
</response>

---

## Выбранная концепция: #3 — Bold Technical Expressionism

Тёмно-синий герой с красными акцентами, угловые переходы между секциями, крупная типографика Russo One + Oswald, анимации на framer-motion. Дизайн передаёт мощь и профессионализм инженерной компании.
