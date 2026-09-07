# FIT.ME Landing — Project State / Handoff

Status date: 2026-08-30. Landing is built **section by section** from `TZ.txt` (root).
The user supplies one section spec at a time and reviews it before the next one.

---

## 0. Build state — read first

`framer-motion` is installed and `npm run build` passes. `tsc -p tsconfig.app.json` and `eslint` are
clean for all landing code; one pre-existing unrelated error remains (unused `CalendarCheck` import in
`src/components/profile/ActiveSubscriptionCard.tsx` — do not fix unless asked).

**Verified visually: the hero only, at 1440×900 and at 500×1000.** Everything below the hero still needs
a human eye, and so does a real phone.

If you screenshot this page with headless Chrome, three things will waste your afternoon unless you know
them:
1. **A window narrower than ~500px is silently clamped.** Chrome lays the page out at ~516px and the
   capture shows only the left 390px of it, so every "phone" screenshot looks like the layout overflows
   and is cut on the right. It is an artifact — `index.html` has a correct
   `width=device-width, initial-scale=1` and real phones are fine. Capture at **500×1000**: still the
   mobile breakpoint (<640px), no clamping, phone-like proportions.
2. **Pass `--force-prefers-reduced-motion`.** The idle floats use `repeat: Infinity`, which starves
   `--virtual-time-budget`; without it the capture times out and `whileInView` reveals stay at
   `opacity: 0`, so the store buttons appear to be missing.
3. **Start the preview server and take the shot in the same shell command.** A backgrounded server does
   not survive into the next command, and the capture silently becomes a screenshot of
   `ERR_CONNECTION_REFUSED`.

Two real layout bugs were found this way regardless (see §11.8 and the sizing note in §7), so the tool is
worth using — just verify the capture is of the actual page before reading anything into it.

## 1. Stack

Vite · React 18 · TypeScript · Tailwind 3.4 · Framer Motion · lucide-react · react-i18next · react-router-dom.
Tabs for indentation, single quotes, no semicolons (prettier + import sort plugin).

## 1a. Client's product direction — read before proposing anything

The client restated the goal in Sept 2026, and it overrides the storytelling instinct of `TZ.txt`:
**people will not read the page.** They come for a result, and the site's only job is to get them to the
store with the least possible time spent deciding. His order: a photo of real bodies, then the store
buttons, then before/after shots of his own clients. No feature explanations — that copy already lives in
the app stores.

The page follows that at the top (`Hero` → `Results`) and keeps the earlier narrative sections
underneath for the minority who scroll. **When in doubt, cut text and shorten the path to the store
buttons.** Do not add explanatory copy to the first screen.

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
  images/hero.{png,webp} + hero-mobile.webp  the athletes, alpha cut-out (see §11)
  images/screen.png            placeholder device render (see §11)
  images/food/{plate,avocado,berries,greens}.jpg
  images/results/              EMPTY — real before/after photos go here
  locales/{ru,en,uz}/translation.json
src/
  App.tsx                      section order lives here, nothing else
  index.css
  components/
    layout/{Layout,Header,MobileNav,Footer}.tsx
    sections/{Hero,Results,Training,Progress,Nutrition,Diary,Download,SectionIntro}.tsx
    subscription/SubscriptionSection.tsx
    mockups/{ProgressDashboard,NutritionPanel,DiaryTimeline,DiaryCard}.tsx
    ui/{PhoneShot,FloatingStat,CountUp,ProgressLineChart,LanguageMenu,ColumnRules}.tsx
    ui/{StoreButtons,StoreLink}.tsx
    ui/motion/{Reveal,RevealLine,easing}.ts(x)
  hooks/{useActiveSection,useMediaQuery,useStoreLink}.ts
  constants/nav.ts             NAV_SECTIONS + LANGUAGES
  constants/stores.ts          store links + brand glyph paths
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

Order in `App.tsx`: `Hero` → `Results` → `Training` → `Progress` → `Nutrition` → `Diary` →
`SubscriptionSection` → `Download`. `App.tsx` is now nothing but this list; every block on the page is a
real component.

The first two blocks are the conversion path the client asked for (§1a): photo, store buttons, proof.
Everything from `Training` down is the earlier narrative tour, kept below the fold on purpose — the user
chose to keep it rather than delete it, so it must stay reachable but must never be promoted above
`Results`. The numbered sections therefore start after an unnumbered block; that is intended, since
`Results` is proof, not part of the product tour.

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

`sections/Hero.tsx`. No `id`. Rebuilt in Sept 2026 around the client's direction (§1a): the athletes and
the two stores, nothing else. **The phone mockup, the lead paragraph and the floating stat cards were
removed from this section on purpose — do not put them back.**
Layout: `min-h-[88svh] sm:min-h-[100svh]` flex column, centred. Three-line headline "Твоё тело. /
Твой план. / Твой прогресс." (**прогресс** in red), `StoreButtons` pinned to the bottom, and the shot
between them, bottom-anchored. The current photo is the couple with the red hat (Sept 2026, second
version — the first one was a different pair on a black background).

**Sizing — the part that keeps breaking.** The photo is sized by its **box**, never by the image:
`<picture>` carries `w-full sm:h-[58svh] xl:h-[64svh]` and the `<img>` is
`w-full sm:h-full sm:object-contain sm:object-bottom`. So phones fit it to the screen width, and from
`sm` up the box owns the height and `object-contain` fits the shot inside it. A narrow or short window
then scales the athletes down instead of slicing an arm off the frame, which matters because the bodies
*are* the message. Two rules follow:
- `picture` **must** carry the sizing. As a bare child it shrinks to the image's intrinsic width and the
  whole layout silently drifts wider than the screen (this shipped twice before being caught).
- Both `<source>`s must stay cropped to the **same 1011:941 box** (see §11.8), because the phone
  headline is positioned from that ratio.

**Where the headline sits.** On phones it is absolutely positioned, hanging off the top edge of the shot:
`absolute inset-x-5 bottom-[calc(93vw_+_0.75rem)]`, where `93vw = 100 / 1.074` is exactly the shot's
height at full screen width. The dark space therefore gathers *above* the words instead of splitting them
from the athletes — the user rejected the top-pinned version for exactly that reason. From `sm` up it
returns to `static` at the top of the frame. **If the crop ratio changes, this number must change with
it.** Mobile scale `clamp(2.25rem,11vw,4rem)` is the largest that still keeps "Твой прогресс." on one
line at 320px; `sm:clamp(2.1rem,5vw,3.4rem)`, `lg:clamp(2.5rem,3.6vw,4rem)`.

A `bg-gradient-to-t from-ink via-ink/80` scrim over the bottom `34svh` seats the athletes in the darkness
and carries the buttons. One `bg-accent/[0.13]` glow behind them. Because that scrim is opaque it hides
the section's own film grain, so the boundary with the next section is ~1.4% brighter than the strip
above it — measurable, effectively invisible on a phone, and the reason the hero stops at `88svh` there:
less dead air above the headline, and the next block peeking invites the scroll to the proof.
Load sequence: glow fades over 2s, the shot fades and scales `1.05 → 1` over 2.4s (a slow push-in),
headline lines unmask at 0.15/0.27/0.39, buttons last at 0.9.

### Results (before / after) — `COMPLETED — DO NOT REDESIGN`

`sections/Results.tsx`, `id='results'`. Directly under the hero because it is the client's proof and his
second priority. Headline "Результаты моих учеников" and **nothing else** — no description by design.
Three pairs of portrait shots in `sm:grid-cols-2 lg:grid-cols-3`, each pair a `grid-cols-2` of 3:4 tiles
with "До" / "После" chips; the "После" chip is the only red in the section.
**The photos are placeholders.** Real ones go in `public/images/results`; fill `before` / `after` in the
`PAIRS` constant at the top of the file and the placeholder state disappears on its own. A drag-to-compare
slider was discussed and deferred until the real photos exist, since it only works with matched poses.

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
| `ui/StoreButtons` | both stores as real buttons; the visitor's platform is listed first and filled red. The page's main action. |
| `ui/StoreLink` | one quiet secondary store option (`platform='ios' \| 'android'`), glyph + name. |
| `hooks/useActiveSection` | IntersectionObserver scroll-spy; ignores sections that do not exist yet. |
| `hooks/useMediaQuery` | breakpoint state. |
| `hooks/useStoreLink` | exports `usePlatform()` (`'ios' \| 'android'` from the UA) and `useStoreLink()` (the matching store href). |

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
7. Store links come in two weights and nothing else: `ui/StoreButtons` (both stores as real buttons, used
   in the hero) and `ui/StoreLink` (a quiet glyph-plus-name link, used in the closing frame). Both read
   from `constants/stores.ts`, which holds the links and the two brand glyph paths. Official store badge
   artwork does not exist in the repo and must not be faked.
8. The hero shot is **cut out on a real alpha channel**, so it needs no mask or frame — it sits straight
   on `bg-ink`. `public/images/hero.png` (1671×941, 1.2MB) is the master and is **not referenced at
   runtime**; only these two WebPs are served, both cropped to the same box so their aspect ratio matches:
   - `hero.webp` (138KB, 1011×941) from 640px up;
   - `hero-mobile.webp` (90KB, 900×838) below 640px.

   The crop removes the transparent air around the couple, who occupy only x 320…1275 of the master (28px
   of air is kept on each side). That air is worth removing: it made the athletes ~40% smaller at every
   breakpoint for no visual gain. There is deliberately **no PNG fallback** — WebP-with-alpha is
   universal since 2020, and a fallback with a different aspect ratio would break the phone headline's
   `93vw` anchor. Regenerate both with:
   ```
   cwebp -q 80 -alpha_q 90 -m 6 -crop 292 0 1011 941 hero.png -o hero.webp
   cwebp -q 74 -alpha_q 88 -m 6 -crop 292 0 1011 941 -resize 900 0 hero.png -o hero-mobile.webp
   ```
   After a new photo: re-measure the alpha bounding box, redo the crop, and update the `<img>`
   `width`/`height`, the crop numbers here, and the `93vw` in `Hero.tsx` (`100 / new aspect`).
9. Language switcher stays in the header; the account link lives only in the mobile overlay and on
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
- **Real before/after photos** for `Results`. The block ships with placeholder tiles; see §7. `TODO`
- Real app screenshots. `TODO`
- The hero no longer shows the app at all — that was the client's call. The device only appears in
  `01–04` now. Do not "fix" this by adding a phone back to the first screen.
- The hero's old copy (`hero.lead`, `hero.cta`, `hero.stores`, `hero.cards.*`) is still in all three
  locales but unused, kept in case any of it comes back.
- Nothing has been visually reviewed in a browser (see §0). `TODO`

## 13. Next section to implement

The conversion path (`Hero` → `Results`) and the whole narrative tour are done. Two things are open:

1. **Swap the before/after placeholders for real photos** once the client sends them, and decide the
   format then — side-by-side pairs (current) or a drag-to-compare slider, which only works if the poses
   and framing match.
2. The **footer**, still on the old `zinc-950` / `red-500` palette, ending the page on a jarring note
   right after the premium closing frame. Note that `Footer` is rendered by `layout/Layout.tsx`, so it
   also appears on `/profile` and `/auth` — check those routes when restyling it.

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
