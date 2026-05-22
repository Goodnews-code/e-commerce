# Understated Luxury (Quiet Luxury) Design System

## 🎯 Psychological Vibe
**Understated, Exclusive, Minimalist, Grounded.**
This design avoids "flashy" or gaudy elements. It focuses on the quality of whitespace, the elegance of the typography, and a very grounded, quiet color palette. It whispers rather than shouts.

---

## 🎨 Color Palette (60-30-10 Rule)
*   **60% Dominant (Surfaces):** Off-White (`#FAFAFA`) or Deep Charcoal (`#121212`) depending on theme. We will use a highly refined **Dark Mode** default.
    *   `--bg-base`: `#0A0A0A` (Pure minimalist black)
    *   `--bg-surface`: `#111111` (Very dark gray for slight elevation)
*   **30% Secondary (Cards & Borders):** 
    *   `--bg-card`: `#161616` (Slightly lighter dark gray)
    *   Borders: `#2A2A2A` (Ultra-thin, barely visible structural lines)
*   **10% Accent (CTAs & Highlights):** Muted Champagne/Silver instead of flashy gold.
    *   `--accent`: `#D4AF37` (Muted Gold/Champagne, used extremely sparingly)
    *   `--text-primary`: `#EDEDED`
    *   `--text-secondary`: `#A3A3A3`

---

## 🔤 Typography
*   **Headings:** *Playfair Display* (Serif). Used minimally for large impact statements. High contrast, elegant.
*   **Body & Data:** *Inter* (Sans-Serif). Clean, geometric, legible.
*   **Spacing:** Extremely generous line-heights and letter-spacing (tracking) for headings (`tracking-wide`).

---

## 📐 Shapes & Layout
*   **Corners:** Sharp. `rounded-none` or absolute minimal `rounded-sm`. No bubbly or playful pill shapes.
*   **Shadows:** Almost non-existent. We rely on border lines (`border-neutral-800`) and slight background color shifts instead of drop shadows.
*   **Density:** Low. High amount of whitespace/padding around products.

---

## 🎞️ Motion & Animation
*   **Physics:** Slow, cinematic, and ease-out heavy.
*   **Transitions:** `duration-500 ease-out` or `duration-700`.
*   **Hover States:** 
    *   Images: Very slow, subtle scale-up (`scale-105`) with a `duration-700`.
    *   Buttons: Color fades slowly. No bouncing, no skewing, no aggressive snapping.
*   **Page Load:** Elements should fade in softly without dramatic sliding.
