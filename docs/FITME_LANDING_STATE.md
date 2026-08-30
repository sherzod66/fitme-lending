# FIT.ME Landing — Project State / Handoff

Status date: 2026-08-30. Landing is built **section by section** from `TZ.txt` (root).
The user supplies one section spec at a time and reviews it before the next one.

---

## 0. Build state — read first

`framer-motion` is installed and `npm run build` passes. `tsc -p tsconfig.app.json` and `eslint` are
clean for all landing code; one pre-existing unrelated error remains (unused `CalendarCheck` import in
`src/components/profile/ActiveSubscriptionCard.tsx` — do not fix unless asked).

**Nothing in the landing has been verified visually in a browser yet.** Headless screenshots are
impractical here: the idle float animations use `repeat: Infinity`, which starves Chrome's
`--virtual-time-budget` and hangs the capture. Review with `npm run dev` by eye.

## 1. Stack

Vite · React 18 · TypeScript · Tailwind 3.4 · Framer Motion · lucide-react · react-i18next · react-router-dom.
Tabs for indentation, single quotes, no semicolons (prettier + import sort plugin).

## 2. Visual design system

Cinematic, editorial, minimal. Black canvas, white type, one red accent, generous whitespace,
asymmetric compositions, large typography. No cards-grid layouts, no gradients beyond a single soft
red light source per section, no blue/purple/orange/cyan ever.

## 3. Color palette

Defined in `tailwind.config.js` → `theme.extend.colors`. Always use the tokens, never raw hex in JSX.

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#050505` | page/section background |
| `ink-card` | `#111111` | cards, panels |
| `ink-line` | `#222222` | subtle borders, dividers |
| `accent` | `#D70C0C` | the only accent |
| `accent-soft` | `#F01414` | accent hover |
| `accent-deep` | `#8E0808` | reserved, unused so far |
| `muted` | `#A1A1A1` | secondary text |

Red is allowed only on: progress, active states, primary buttons, important numbers, section index.
Never on food photography or decorative surfaces.

Other tokens: `maxWidth.edge` = `1440px` (container), `letterSpacing.tightest` = `-0.05em`,
`transitionTimingFunction.premium`, `fontFamily.sans` = Inter stack.

## 4. Typography

- Headlines: `font-semibold`, `tracking-tightest`, `leading-[0.9]`–`[0.92]`, size via `clamp()`
  (mobile min ≈ `2.3rem`, desktop max ≈ `5.75rem`). Never `font-bold`.
- Section label: `text-[11px] uppercase tracking-[0.28em]`, index in `text-accent`.
- Body/description: `text-[15px] sm:text-lg leading-relaxed text-muted`, width capped `max-w-[34ch]`–`[38ch]`.
- In-panel UI labels: `text-[9px]`–`text-[10px] uppercase tracking-[0.14em]`–`[0.2em] text-muted`.
- Numbers/metrics: `font-semibold tracking-tight`.

## 5. Global CSS (`src/index.css`)

- `html` background `#050505`, `body` = `bg-ink text-white`, red `::selection`.
- `.grain` utility: film-grain `::before` at `z-index: -1`, opacity `0.04`, SVG `feTurbulence` data URI.
  **The host element must create a stacking context** (every section uses `isolate`).

## 6. Folder / file structure (landing only)

```
public/
  images/screen.png            placeholder device render (see §11)
  images/food/{plate,avocado,berries,greens}.jpg
  locales/{ru,en,uz}/translation.json
src/
  App.tsx                      section order lives here
  index.css
  components/
    layout/{Layout,Header,MobileNav,Footer}.tsx
    sections/{Hero,Training,Progress,Nutrition,Diary,Download,SectionIntro}.tsx
    mockups/{ProgressDashboard,NutritionPanel,DiaryTimeline,DiaryCard}.tsx
    ui/{PhoneShot,FloatingStat,CountUp,ProgressLineChart,LanguageMenu,StoreLink}.tsx
    ui/motion/{Reveal,RevealLine,easing}.ts(x)
  hooks/{useActiveSection,useMediaQuery,useStoreLink}.ts
  constants/nav.ts             NAV_SECTIONS + LANGUAGES
  constants/constants.ts       android_link, ios_link (pre-existing)
```

Section shell used everywhere (keep identical for new sections):

```tsx
<section id='...' className='grain relative isolate overflow-hidden bg-ink py-28 sm:py-32 lg:py-40'>
  <ColumnRules />

  <div className='relative mx-auto max-w-edge px-5 sm:px-8 lg:px-14'>
```

`ui/ColumnRules` draws the two `border-white/[0.06]` hairlines at the edges of the `max-w-edge`
container, from `lg` up. Every section renders its own copy with `inset-y-0`; because sections are
adjacent and spaced with padding rather than margins, the copies join into **one continuous rule running
the whole page**. Two constraints keep it working: it must be the section's first child (so content paints
over it), and sections must never gain vertical margins.

## 7. Implemented sections

Order in `App.tsx`: `Hero` → `Training` → `Progress` → `Nutrition` → `Diary` → `SubscriptionSection`
→ `Download`. `App.tsx` is now nothing but this list; every block on the page is a real component.

### Header + mobile nav — `COMPLETED — DO NOT REDESIGN`

`layout/Header.tsx`, `layout/MobileNav.tsx`. Fixed, minimal, nearly dissolved into the page.
Desktop: logo left, four centred nav items, `LanguageMenu` (`RU`) + red pill CTA "Скачать приложение".
Height animates `92 → 68` px (mobile `68 → 56`) past 24px of scroll; a separate layer fades in with
`backdrop-blur-xl`, `bg-ink/70` and a `border-ink-line` bottom border. Active nav item is red with a
sliding `layoutId='header-active-section'` underline. Mobile: two-line mark + "Меню" opens a fullscreen
overlay (large uppercase items with `01–04` indices, staggered, red CTA, `RU EN UZ`, account link,
body scroll lock, Escape to close). Interior routes (`/profile`, `/auth`) hide the section nav and show
an account link instead; the header is always compact there.

### Hero — `COMPLETED — DO NOT REDESIGN`

`sections/Hero.tsx`. No `id`. Purpose: make the visitor download the app within 3 seconds.
Layout: `min-h-[92svh] lg:min-h-[100svh]`, 12-col grid. Left col-span-6: three-line headline
"Твоё тело. / Твой план. / Твой прогресс." with **прогресс** in red, short lead, large red CTA
"Скачать FitMe" + small "App Store · Google Play". Right col-span-6: device sized by height
(`lg:h-[min(78vh,800px)]`), bleeding `-mb-16` below the row and `-mr-4/-mr-6` into the container padding.
Three `FloatingStat` cards (12 тренировок / **+18%** сила / 86% регулярность) overlap the device edges,
hidden below `md`. One red radial glow, editorial `border-x` column rules on `lg`.
Load sequence: glow fade 1.8s → headline lines unmask at 0.1/0.22/0.34 → device fade+scale 0.95→1 (1.5s,
delay 0.3) → cards at 1.05/1.2/1.35. Device then breathes `y: [0,-12,0]` over 11s.

### 01 Training — `COMPLETED — DO NOT REDESIGN`

`sections/Training.tsx`, `id='training'`. Message: FIT.ME gives structure, you stay in control.
`SectionIntro` (`01 / ТРЕНИРОВКИ`, headline "Тренировки") is top-left; 128px lower sits a row of three
devices — deliberately unequal: `262/300/262` px at `lg` (`290/340/290` at `xl`) with baselines offset
`+64 / -32 / +24` px, centre device on `z-10`. One `accent/8` glow at `blur-[150px]` behind the group.
Devices slide up with 0 / 0.16 / 0.32 s stagger. Mobile: stacked vertically at `min(80vw,330px)`.

### 02 Progress — `COMPLETED — DO NOT REDESIGN`

`sections/Progress.tsx`, `id='progress'`. Emotional message: every workout adds up.
Asymmetric: device in `col-start-1 col-span-6`, text in `col-start-8 col-span-5` pushed down `lg:mt-36`.
Headline "Видь, как меняешься." Device `350/380` px lifts `+48 → -48` px on scroll.
`mockups/ProgressDashboard.tsx` floats over the device's right edge (`lg:-right-[180px]`, `xl:-right-[200px]`)
and contains: bench-press 80 кг / 6 months header, red `ProgressLineChart`, start/end values, 31-day month
calendar (red = trained, white ring = today), body measurements, red streak chip.
Three `FloatingStat`s anchored at `10% / 27% / 52%` use `CountUp` (24, +18%, 86%).
Animations: chart `pathLength` 2.2s → area fade → end dot; calendar days stagger 18ms; numbers count up.
Mobile: headline → device → dashboard at full column width → 3-up stats row.

### 03 Nutrition — `COMPLETED — DO NOT REDESIGN`

`sections/Nutrition.tsx`, `id='nutrition'`. Message: control without obsession.
Mirrored vs. 02 on purpose: text `col-start-1 col-span-5` (`lg:mt-28`), device `col-start-7 col-span-6`,
`ml-auto`. Headline "Держи питание под контролем."
Three-plane depth of field: blurred plate (`blur-[3px]`, `opacity-40`, radial `mask-image` so no rectangle
edge shows) → circular ingredient crops (`blur-[1px]`–`[2px]`, `opacity-60`–`80`) → sharp device.
**Food is placed before the device in the DOM so it always renders behind it.**
`mockups/NutritionPanel.tsx` floats on the device's left edge: 1 480 / 2 100 ккал with red bar, three macro
bars, three meals with a red active state. Food drifts 12–26px on scroll in alternating directions; device
fades + scales 0.96→1; all bars fill on entering view. Mobile: only the blurred plate survives (circles are
`hidden lg:block`), panel goes full width below the device.

### 04 Diary — `COMPLETED — DO NOT REDESIGN`

`sections/Diary.tsx`, `id='diary'`. Emotional close of the product story: "I'm building my own story."
Headline "Твой путь — в одном месте."
Third composition type on purpose — a two-column grid where the **left column carries both the text and
the history** (`lg:grid-rows-[auto_1fr]`, intro at `col-start-1 col-span-5 row-start-1`,
`mockups/DiaryTimeline` at `col-start-1 col-span-4 row-start-2 self-start`) while the device owns the
right column across both rows (`col-start-7 col-span-6 row-span-2`). The device is the largest on the page
(`lg:w-[400px] xl:w-[460px]`) and lifts `+36 → -36` px on scroll.
`DiaryTimeline`: four dated entries on a hairline rail that draws itself downwards (`scaleY` 0→1, 1.8s) and
fades out at the bottom via `bg-gradient-to-b … to-transparent`, so history reads as continuing; entries
reveal sequentially with a 0.14s stagger; closes with "Ещё 18 записей". Deliberately a flat list, **not**
cards and **not** a dashboard.
Three `mockups/DiaryCard`s float around the device (`hidden lg:block`, mobile keeps the first two in a
`sm:grid-cols-2` row): "Тренировка завершена" (red check), "14 дней подряд", "Новый максимум".
This is the calmest section: the red glow is the faintest on the page (`bg-accent/[0.07]`) and red appears
only three times — the `04` index, the today dot in the rail, and the completion check.

### 05 Subscription — `COMPLETED — DO NOT REDESIGN`

`components/subscription/SubscriptionSection.tsx`, `id='subscription'`. Kept in its original folder on
purpose: it is a **live product surface**, not marketing copy. The redesign changed styling only — the
react-query fetch, `isActive` filter, `position` sort, `getPlanLabel` language fallback, `formatSum`,
per-month maths, `isPopular` flag, loading and empty states, the `/profile` CTA and the
`/subscription-terms` link are all untouched. The profile payment flow uses separate components
(`payment/PlanCard.tsx`, `payment/PlanList.tsx`) and was not affected.
Layout: `SectionIntro` with index `05` and label `t('nav.subscription')` across the top, then a 12-col
body — included features at `col-start-1 col-span-5`, tariffs at `col-start-7 col-span-6`.
The feature list is a **flat `divide-y` list with small red checks**, not a bordered card, so the section
does not read as a card grid. Tariffs are quiet `bg-ink-card` cards; the popular one gets
`border-accent/40` plus a soft red shadow and a small uppercase badge. Red is limited to the price, the
popular badge, the checks and the CTA. One faint `bg-accent/[0.08]` glow behind the tariff column.
Everything reveals on scroll: labels, then features with a 0.07s stagger, then tariffs with 0.1s.

### Final CTA / Download — `COMPLETED — DO NOT REDESIGN`

`sections/Download.tsx`, `id='download'` (not in `NAV_SECTIONS`, so it is anchor-only and invisible to
scroll-spy). The closing frame of the page: "Начни сегодня." + "FIT.ME — всё для твоего прогресса."
**The only centred, symmetric section on the page** — every other one is asymmetric, so the symmetry
itself reads as an ending. Single column: headline → subline → device → red CTA → two store links.
Paddings are the one intentional deviation from the standard shell (`py-32 sm:py-40 lg:py-48`) because
the spec called for enormous negative space; internal gaps are `mt-16`–`mt-24`.
Headline reuses the Hero type scale (`clamp(2.4rem,10.5vw,5.5rem)` / `lg:clamp(3rem,5.4vw,5.75rem)`) as a
bookend to the first frame. Device is centred at `lg:w-[380px]`; behind it one `bg-accent/[0.11]`
`blur-[160px]` glow and nothing else.
Animation order follows the spec: device scales `0.9 → 1` over 2.2s, glow fades in at 0.3s, headline at
0.5s, subline at 0.72s, CTA at 1.0s, store links last at 1.2s.
`ui/StoreLink.tsx` renders the quiet secondary options: brand glyph plus name, using the **same SVG paths
the project already shipped**. No official store badge artwork exists in the repo and none was faked; the
primary red button stays platform-aware via `useStoreLink`.

## 8. Animations

Single easing `EASE_PREMIUM = [0.22, 1, 0.36, 1]` from `ui/motion/easing.ts`.
Durations are slow (0.5–2.2s); only fade, translateY, scale, `pathLength`, width, and multi-second idle
float. No bounce, no rotation, no flashy effects. **Every animation checks `useReducedMotion()` and
collapses to its final state.** Entrance animations use `whileInView` with `viewport={{ once: true }}`.

## 9. Responsive behaviour

Tailwind defaults (`sm` 640 / `md` 768 / `lg` 1024 / `xl` 1280). Desktop and mobile are designed
separately, not scaled.

- Horizontal compositions become vertical stacks at `lg`; 12-col grids only apply from `lg`.
- Device width is viewport-driven on mobile (`min(78–82vw, 320–350px)`) and fixed/height-driven at `lg`.
- Decorative food is `hidden lg:block`; hero floating stats are `hidden md:block`.
- Absolutely-positioned floating panels become static full-width blocks below `lg` (rendered twice:
  `hidden lg:block` + `lg:hidden`, deliberately, for correct mobile width).
- Headline `clamp()` minimums are tuned so the longest Russian word fits a 320px viewport.
- Negative offsets never exceed the container padding (`lg:px-14` = 56px), so nothing clips at 1280px.
- CTAs are full width below `sm`.

## 10. Reusable components

| Component | Purpose |
| --- | --- |
| `sections/SectionIntro` | label + headline + description with standard rhythm/animation. Use for every new section. |
| `ui/motion/Reveal` | fade + translateY on scroll; props `delay`, `y`, `duration`, `amount`. |
| `ui/motion/RevealLine` | headline line unmasking; padding/negative margins protect Cyrillic descenders and "ё". |
| `ui/PhoneShot` | the placeholder device image; caller sets width **or** height, never both. |
| `ui/FloatingStat` | floating product-UI value + label; `value` accepts a node (e.g. `CountUp`). Caller supplies `absolute` + offsets. |
| `ui/CountUp` | counts a number up once in view. |
| `ui/ProgressLineChart` | self-drawing red line chart (Catmull-Rom → bezier), area fill, end dot. |
| `ui/LanguageMenu` | compact `RU` switcher. |
| `mockups/DiaryCard` | floating product event card: icon + title + meta, same shell and idle float as `FloatingStat`. `accent` turns the icon red. |
| `ui/ColumnRules` | the page-wide editorial column hairlines. Drop it in as the first child of any new section. |
| `ui/StoreLink` | one secondary store option (`platform='ios' \| 'android'`), glyph + name, links from `constants/constants`. |
| `hooks/useActiveSection` | IntersectionObserver scroll-spy; ignores sections that do not exist yet. |
| `hooks/useMediaQuery`, `hooks/useStoreLink` | breakpoint state; Apple UA → App Store, else Google Play. |

## 11. Important implementation decisions

1. **No hand-built app screens.** The user explicitly cancelled them. Every device uses
   `public/images/screen.png` through `PhoneShot`. The PNG is a full device render (1242×2688) on
   **transparent** margins — device occupies L 1.45% / R 3.14% / T 5.58% / B 5.65% — so the shadow is a
   `drop-shadow` filter that follows the silhouette. To swap artwork, change the `SRC` constant in
   `PhoneShot.tsx`. Do not wrap it in an extra device frame.
2. Because the device is a placeholder, **in-app content the spec asks for lives in floating panels beside
   the device** (`ProgressDashboard`, `NutritionPanel`). Keep this pattern for future sections.
3. Food photography is **generated, not stock** (global TZ bans stock photos), shot on near-black
   backgrounds, deliberately free of red food so red stays exclusive to the UI. Optimised to JPEG (~322KB total).
4. Section `id`s must match `NAV_SECTIONS` in `constants/nav.ts` (`training`, `progress`, `nutrition`,
   `diary`) or the header nav and scroll-spy silently stop working.
5. Each section flips the side of the visual to avoid a SaaS two-column rhythm.
6. All user-facing strings, including mockup panel labels, go through i18n in **all three** locales
   (`ru`, `en`, `uz`). Numbers stay in code.
7. Only the download CTA uses `useStoreLink`; no giant store badges anywhere (the user rejected them).
8. Language switcher stays in the header; the account link lives only in the mobile overlay and on
   interior routes.

## 12. Intentionally NOT implemented yet

- **Footer** (`layout/Footer.tsx`) is the last place still on the old `zinc-950` / `red-500` palette —
  the only remaining legacy markup on the page. It is also where the column rules stop: they run from the
  Hero to the closing `Download` frame and deliberately do not enter the footer, since it has a different
  background and is shared with `/profile` and `/auth`. `TODO`
- Three legacy blocks were **removed** as superseded: the `#features` 6-card grid, the `#roles`
  three-column block, and the old final CTA (red gradient, white store buttons). Their translation keys
  (`features.*`, `roles.*`, `cta.*`) are still in all three locales but are now unused — harmless, and
  worth reusing if any of that copy comes back.
- The old CTA's "Стать тренером" button exists nowhere on the page now. The user decided to leave it out
  for the moment. `TODO` — decide where the become-a-trainer action belongs.
- Real app screenshots. `TODO`
- Nothing has been visually reviewed in a browser (see §0). `TODO`

## 13. Next section to implement

The whole page is now on the design system: Hero → 01–04 → 05 Subscription → closing `Download` frame.
The only thing left is the **footer**, which still carries the old palette and ends the page on a jarring
note right after the premium closing frame. Note that `Footer` is rendered by `layout/Layout.tsx`, so it
also appears on `/profile` and `/auth` — check those routes when restyling it. Wait for the user's spec.

---

## DEVELOPMENT RULES

- Do not redesign completed sections unless explicitly requested.
- Do not rewrite existing components unnecessarily.
- Do not change the existing visual language.
- Do not change the existing color system.
- Do not change completed section layouts.
- New sections must visually integrate with the existing design.
- Modify existing code only when technically necessary for integration.
- Preserve existing responsive behavior.
- Preserve existing animations.
- Avoid unnecessary refactoring.
