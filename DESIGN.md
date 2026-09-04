# AAROH Disaster Resilience Design System

> **Design Movement:** Mission Command & Spatial Intelligence (Tactical Minimalist Futurism)  
> **Source Project:** `Remix of Remix of Remix of AAROH Disaster Resilience Design System`  
> **Stitch Project ID:** `projects/1338932752003920610`  
> **Target Audience:** Disaster management commissioners, emergency responders, and tactical convoy dispatchers operating in 24/7 command theaters and rugged field environments.

---

## 1. Executive Summary & Brand Identity

This design system establishes an authoritative, mission-critical operational intelligence environment designed for rapid triage, high-stress decision-making, and precision logistics coordination across challenging terrain. It blends the refined aesthetic economy of premier engineering SaaS with the real-time telemetry density of tactical geospatial dispatch platforms.

### Aesthetic Principles
- **Surgical Precision:** Every pixel, boundary, and metric readout communicates certainty. Chromatic clutter is eliminated to elevate data salience.
- **Calm Authority Under Crisis:** High-density layouts maintain structural calm through deliberate vertical rhythms, micro-borders, and strict semantic color allocation.
- **Predictive Intelligence:** Distinct treatment for deterministic real-world facts versus machine-learning simulated probabilities, providing users with immediate epistemic clarity.
- **Tactical Minimalist Futurism:** Deep slate-charcoal tonal foundations, translucent HUD-style glass surfaces with calibrated background blurs (`backdrop-filter: blur(12px)`), hairline mechanical dividers (`1px`), and monospaced telemetry data tables.

---

## 2. Color Palette & Tonal System

The system operates on an ultra-low optical fatigue tonal matrix optimized for continuous 24/7 command center monitoring while maintaining strict WCAG AAA contrast for critical telemetry.

### Core Strategic Palette

| Role | Token / Hex | Description |
|---|---|---|
| **Primary Action** | `#4F46E5` / `#C3C0FF` | Primary interactive verbs, structural chrome focus indicators, system navigation, and dispatch confirmations. |
| **Predictive AI** | `#8B5CF6` / `#D0BCFF` | Dedicated exclusively to ML inferences, predictive landslide probability corridors, alternative route simulations. *Never applied to static ground truths.* |
| **Nominal / Passable** | `#10B981` (tint: `rgba(16,185,129,0.12)`) | Unobstructed corridors, operational bridges, clear weather sectors. |
| **Degraded / Advisory** | `#F59E0B` (tint: `rgba(245,158,11,0.12)`) | Torrential rainfall thresholds, bottleneck warnings, impending road-slip risks. |
| **Critical / Interdicted** | `#EF4444` / `#DC2626` (tint: `rgba(239,68,68,0.16)`) | Active flash floods, bridge collapses, blockades, immediate evacuation orders. |
| **Canvas Base** | `#0B0F19` / `#0F131D` | Deepest foundation layer behind vector maps and radar tiles. |
| **Surface Card** | `#111827` / `#1C1F2A` | Floating HUD modules, drawers, and secondary inspection cards. |
| **Elevated / Interactive** | `#1E293B` / `#262A35` | Hover states, active dropdowns, and flyout overlays. |
| **Hairline Borders** | `rgba(148, 163, 184, 0.12)` (`#464555`) | Mechanical separators, grid dividers, and card borders. |

### Complete Named Color Tokens (Material 3 Matrix)

| Token Name | Hex Value | Primary Usage |
|---|---|---|
| `primary` | `#c3c0ff` | Key brand accent (light tint for dark UI contrast) |
| `primary_container` | `#4f46e5` | Core Indigo action button fill & high-priority CTAs |
| `on_primary` | `#1d00a5` | Text/icon atop primary fill |
| `on_primary_container` | `#dad7ff` | Subtle text/icon atop primary container |
| `primary_fixed` | `#e2dfff` | Light-mode fixed primary accent |
| `primary_fixed_dim` | `#c3c0ff` | Low-emphasis primary element |
| `inverse_primary` | `#4d44e3` | Inverted surface accent |
| `secondary` | `#d0bcff` | Predictive ML / auxiliary data points |
| `secondary_container` | `#571bc1` | Predictive AI card headers & badge backgrounds |
| `on_secondary` | `#3c0091` | Contrast text for secondary fills |
| `on_secondary_container` | `#c4abff` | Telemetry text for AI cards |
| `tertiary` | `#4edea3` | Nominal status / safe operational state |
| `tertiary_container` | `#006e4b` | Safe state card container |
| `on_tertiary` | `#003824` | Text atop safe green fills |
| `on_tertiary_container` | `#67f4b7` | High-visibility telemetry text on green containers |
| `error` | `#ffb4ab` | Severe hazard / interdiction alert text |
| `error_container` | `#93000a` | Emergency callout card background |
| `on_error` | `#690005` | Text atop bright red fills |
| `on_error_container` | `#ffdad6` | Alert body copy |
| `background` | `#0f131d` | Canvas backdrop |
| `on_background` | `#dfe2f1` | Default body text |
| `surface` | `#0f131d` | Standard view surface |
| `surface_dim` | `#0f131d` | Lowest light level background |
| `surface_bright` | `#353944` | High-elevation card top |
| `surface_container_lowest`| `#0a0e18` | Map viewport underlay |
| `surface_container_low` | `#171b26` | Collapsed rails and side panels |
| `surface_container` | `#1c1f2a` | Default card & widget background |
| `surface_container_high` | `#262a35` | Popovers, HUD cards, active toolbars |
| `surface_container_highest`| `#313540` | Hover states, active tabs, floating chips |
| `on_surface` | `#dfe2f1` | Primary heading and high-contrast text |
| `on_surface_variant` | `#c7c4d8` | Secondary labels, descriptions, and timestamps |
| `outline` | `#918fa1` | Structural boundaries and field inputs |
| `outline_variant` | `#464555` | 1px hairline dividers and subtle card borders |

---

## 3. Typography System

The design system implements a **dual-engine typographical architecture**:
- **Manrope:** Anchors narrative readability, spatial hierarchy, structural commands, and conversational triage.
- **JetBrains Mono:** Guarantees jitter-free real-time telemetry, lat/long geospatial coordinates, ISO timestamps, and mission countdowns.

### Typography Scale

| Token | Font Family | Size | Weight | Line Height | Tracking | Usage |
|---|---|---|---|---|---|---|
| `display-hero` | Manrope | 40px (2.5rem) | 800 (Bold) | 48px | -0.025em | Command center hero titles |
| `display-hero-mobile` | Manrope | 28px (1.75rem) | 800 (Bold) | 36px | -0.020em | Field terminal hero headers |
| `headline-lg` | Manrope | 24px (1.5rem) | 700 (Bold) | 32px | -0.020em | Section & drawer headers |
| `headline-md` | Manrope | 18px (1.125rem) | 600 (Semi-bold) | 26px | -0.015em | Tactical card titles & dialogs |
| `body-base` | Manrope | 14px (0.875rem) | 400 (Regular) | 20px | 0em | Primary narrative & descriptions |
| `body-compact` | Manrope | 12px (0.75rem) | 400 (Regular) | 16px | +0.010em | Dense table body & status notes |
| `label-code` | JetBrains Mono | 12px (0.75rem) | 500 (Medium) | 16px | +0.020em | Hardware keys, satellite IDs, timestamps |
| `label-code-sm` | JetBrains Mono | 10px (0.625rem) | 500 (Medium) | 14px | +0.040em | Micro-badges, lat/long coordinates |
| `metric-readout` | JetBrains Mono | 32px (2.0rem) | 700 (Bold) | 36px | -0.030em | Top-level KPI counts & route ETAs |

### Typographic Rules
1. **Tabular Numerals Everywhere:** All numerical counts, sensor telemetry, and coordinates must use `font-variant-numeric: tabular-nums` to eliminate jitter during live WebSocket updates.
2. **Uppercase Micro-Labels:** Hardware keys, protocol pings, and alert badges use `text-transform: uppercase` with `letter-spacing: 0.05em`.
3. **Metric Pairing:** Large `metric-readout` numbers must be paired with small uppercase labels positioned directly above or below the numeral.

---

## 4. Spacing, Geometry & HUD Layout

A strict 4px mathematical rhythm underpins all layout alignments:

### Spacing Tokens
- `2xs`: `0.125rem` (2px)
- `xs`: `0.25rem` (4px)
- `sm`: `0.5rem` (8px)
- `md`: `0.75rem` (12px)
- `base`: `1.0rem` (16px)
- `lg`: `1.25rem` (20px)
- `xl`: `1.5rem` (24px)
- `2xl`: `2.0rem` (32px)
- `3xl`: `3.0rem` (48px)

### Layout Geometry
- `gutter-hud`: `0.75rem` (12px) — Margin offset for HUD panels floating over the map canvas.
- `rail-width`: `4.5rem` (72px) — Compact icon navigation rail (expandable to 240px for admin mode).
- `drawer-width`: `26rem` (416px) — Right-hand tactical inspection and telemetry panel.

### Responsive Viewport Profiles
- **Desktop Command Theater (≥ 1440px):** Persistent simultaneous visibility of left navigation rail, central Mapbox/Deck.gl canvas, right telemetry drawer, and bottom route elevation timeline.
- **Laptop Field View (1024px – 1439px):** Right drawer auto-collapses to flyout; map HUD chips compress to icon toggles.
- **Field Terminal & Mobile (< 1024px):** Bottom-sheet drawer with 3 snapping points (Peek: 72px, Half: 45vh, Full: 90vh). Geospatial HUD controls relocate to ergonomic single-thumb bottom-right cluster.

---

## 5. Shape & Corner Radii

The design system maintains a **calibrated industrial soft curve** (`roundness: ROUND_FOUR`):

| Token | Value | Applied To |
|---|---|---|
| `sm` | `0.125rem` (2px) | Micro badges, telemetry tags |
| `DEFAULT` | `0.25rem` (4px) | Buttons, inputs, table cells, metric boxes |
| `md` | `0.375rem` (6px) | Compact HUD widgets, dropdown menus |
| `lg` | `0.5rem` (8px) | Tactical cards, floating inspection drawers, modals |
| `xl` | `0.75rem` (12px) | Hero callouts, container banners |
| `full` | `9999px` | Live status pills, toggle switches, filter chips |

---

## 6. Elevation & Depth Architecture

Depth is achieved through translucent dark slate glass planes paired with luminous structural hairline borders rather than heavy drop shadows:

### Elevation Hierarchy

- **Level 0 (Base Canvas):** Pure dark space (`#0B0F19`) housing Mapbox/Deck.gl vector rendering layers.
- **Level 1 (HUD Glass Cards):**
  - Background: `rgba(17, 24, 39, 0.78)`
  - Backdrop Blur: `blur(12px)`
  - Border: `1px solid rgba(148, 163, 184, 0.12)`
  - Shadow: `0 4px 20px -2px rgba(0, 0, 0, 0.5)`
- **Level 2 (Modals, POI Callouts, Flyouts):**
  - Background: `rgba(30, 41, 59, 0.92)`
  - Backdrop Blur: `blur(16px)`
  - Border: `1px solid rgba(148, 163, 184, 0.24)`
  - Shadow: `0 12px 32px -4px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.05)`
- **Level 3 (Threat & AI Halos - Conditional):**
  - Interdicted / Hazard glow: `box-shadow: 0 0 24px -4px rgba(239, 68, 68, 0.35)`
  - AI Predictive corridor halo: `box-shadow: 0 0 24px -4px rgba(139, 92, 246, 0.35)`

---

## 7. Component Specifications

### 1. Command Buttons
- **Primary Action:** Solid Indigo fill (`#4F46E5`), text `#FFFFFF`, radius `4px`, height `32px` (dense) or `40px` (dispatch). Inner active glow: `box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2)`.
- **Secondary Glass:** Background `rgba(30, 41, 59, 0.6)`, border `1px solid rgba(148, 163, 184, 0.2)`, text `#F8FAFC`.
- **Emergency Override:** Crimson fill (`#DC2626`), high-contrast white text, pulsating halo on confirmation.
- **AI Action:** Background `rgba(139, 92, 246, 0.10)`, border `1px solid rgba(139, 92, 246, 0.40)`, text `#D0BCFF`, violet hover glow.

### 2. Status Badges & Threat Indicators
- Dimensions: `height: 22px`, `padding: 2px 8px`, `border-radius: 9999px`, font: `JetBrains Mono` 10px uppercase.
- Indicators: 6px circular dot on left.
  - **Passable:** Emerald dot with static glow (`#10B981`).
  - **At Risk:** Amber dot with static halo (`#F59E0B`).
  - **Blocked / Hazard:** Crimson dot with CSS radar ping animation:
    ```css
    @keyframes ping {
      75%, 100% { transform: scale(2); opacity: 0; }
    }
    ```

### 3. Circular Risk & Resilience Gauges (0–10 Score Rings)
- Circular SVG meter (`48px` or `72px`) with background track `stroke: rgba(255,255,255,0.08)` and active stroke:
  - `8.0 – 10.0`: Emerald (`#10B981`)
  - `4.0 – 7.9`: Amber (`#F59E0B`)
  - `0.0 – 3.9`: Crimson (`#EF4444`)
- Center readout: Bold tabular number with small `/10` subscript.

### 4. Alert & Corridor Interdiction Cards
- Layout: Surface container with a 4px solid left accent border color-coded to severity (Crimson, Amber, or Violet).
- Top: Timestamp (`label-code-sm`) and severity badge.
- Center: Concise hazard title and geofence tag.
- Bottom: Action triggers ("Initiate Reroute", "Dispatch SAR", "Simulate Drainage").

### 5. High-Density Telemetry Tables
- Row borders: `1px solid rgba(148, 163, 184, 0.08)`.
- Padding: `py-2 px-3`.
- Numeric columns: Right-aligned, `font-family: 'JetBrains Mono'`, `font-variant-numeric: tabular-nums`.
- Hover state: Background `rgba(30, 41, 59, 0.5)` with interactive pointer.

---

## 8. Design Tokens (CSS Custom Properties)

Copy and import this into your root CSS stylesheet (`index.css` or `globals.css`):

```css
:root {
  /* Fonts */
  --font-headline: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Brand & Theme Colors */
  --color-primary: #c3c0ff;
  --color-primary-container: #4f46e5;
  --color-on-primary: #1d00a5;
  --color-on-primary-container: #dad7ff;
  
  --color-secondary: #d0bcff;
  --color-secondary-container: #571bc1;
  --color-on-secondary: #3c0091;
  --color-on-secondary-container: #c4abff;

  --color-tertiary: #4edea3;
  --color-tertiary-container: #006e4b;
  --color-on-tertiary: #003824;
  --color-on-tertiary-container: #67f4b7;

  --color-error: #ffb4ab;
  --color-error-container: #93000a;
  --color-on-error: #690005;
  --color-on-error-container: #ffdad6;

  /* Semantic Operational Spectrum */
  --color-status-nominal: #10b981;
  --color-status-advisory: #f59e0b;
  --color-status-critical: #ef4444;
  --color-ai-inference: #8b5cf6;

  /* Surfaces & Canvas */
  --color-canvas-base: #0b0f19;
  --color-background: #0f131d;
  --color-surface: #0f131d;
  --color-surface-dim: #0f131d;
  --color-surface-bright: #353944;
  --color-surface-container-lowest: #0a0e18;
  --color-surface-container-low: #171b26;
  --color-surface-container: #1c1f2a;
  --color-surface-container-high: #262a35;
  --color-surface-container-highest: #313540;

  /* Content & Hairline Borders */
  --color-on-surface: #dfe2f1;
  --color-on-surface-variant: #c7c4d8;
  --color-outline: #918fa1;
  --color-outline-variant: #464555;
  --color-border-hairline: rgba(148, 163, 184, 0.12);

  /* Geometry & HUD Constants */
  --gutter-hud: 0.75rem;    /* 12px */
  --rail-width: 4.5rem;     /* 72px */
  --drawer-width: 26rem;    /* 416px */

  /* Corner Radii */
  --radius-sm: 0.125rem;    /* 2px */
  --radius-default: 0.25rem;/* 4px */
  --radius-md: 0.375rem;    /* 6px */
  --radius-lg: 0.5rem;      /* 8px */
  --radius-xl: 0.75rem;     /* 12px */
  --radius-full: 9999px;

  /* Elevation Glass Filters */
  --glass-bg-hud: rgba(17, 24, 39, 0.78);
  --glass-blur-hud: blur(12px);
  --glass-bg-modal: rgba(30, 41, 59, 0.92);
  --glass-blur-modal: blur(16px);
}
```

---

## 9. Stitch Project Reference

- **Resource Name:** `projects/1338932752003920610`
- **Project Type:** `TEXT_TO_UI_PRO`
- **Device Target:** Desktop (1280x1024 standard canvas)
- **Screen Inventory:** 20 specialized screen layouts spanning:
  - Tactical Command HUD & Geospatial Map Canvas
  - Multimodal Cutoff Routing & Transit Telemetry Feed
  - Predictive Landslide & Flash Flood Warning Corridor
  - Drone / Convoy Fleet Allocation & Relief Dispatch
  - Historical Crisis Playbook & Sensor Anomaly Logs
