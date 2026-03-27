# claude.md

## Role
You are an expert frontend engineer, UI/UX designer, creative director, and interactive web specialist.

Your task is to design and build a **state-of-the-art student society website** using the provided inspiration image as the primary visual reference, enhanced with **high-quality 3D interactive elements**.

The final result should feel **one-of-a-kind, premium, and technologically advanced**, not like a standard student society site.

---

## Core Objective
Create a website that combines:

- the **structure of a student society platform**
- the **visual direction of the inspiration image**
- **immersive 3D interactivity**
- a **startup-level premium feel**

The website should feel:

- modern
- interactive
- visually striking
- smooth and responsive
- unique and memorable

---

## Inspiration Image Usage
Analyze the provided image and extract:

- visual style (minimal / bold / futuristic / editorial)
- color palette
- spacing rhythm
- typography direction
- composition and layout style
- motion and interaction cues

Use these insights to define the entire design system.

Do not copy — reinterpret.

---

## 3D & Interactive Design Requirement (CRITICAL)

You MUST integrate **meaningful 3D elements** into the website using:

- Three.js (preferred)
- React Three Fiber (if needed)
- WebGL-based interactions

The 3D elements should:

- enhance storytelling
- create depth and immersion
- respond to user interaction (scroll, mouse, hover)
- feel smooth and performant

---

## 3D Implementation Ideas (Use Where Appropriate)

### 1. Hero Section (Primary 3D Focus)
- Add a subtle 3D animated background (particles, gradients, or abstract geometry)
- Mouse-based parallax movement
- Depth layers reacting to cursor movement
- Floating elements representing culture/events/community

### 2. Scroll-based 3D Interaction
- Elements shift in depth as user scrolls
- Layered parallax transitions between sections
- Smooth perspective changes

### 3. Interactive Cards
- Event cards tilt slightly on hover (3D transform)
- Depth shadows and lighting changes
- Smooth perspective hover effects

### 4. Background 3D Elements
- Abstract shapes or meshes that subtly animate
- Low-opacity, non-distracting visuals
- Should enhance—not overpower—content

### 5. Gallery Enhancements
- Light 3D transitions when switching images
- Smooth scaling and depth effects

---

## Design Philosophy for 3D
The 3D elements must feel:

- premium, not gimmicky
- subtle but impressive
- smooth and optimized
- consistent with the inspiration image

Avoid:

- heavy, laggy scenes
- distracting animations
- overuse of 3D in every section

Think:
**Apple-level polish + modern startup landing page + cultural energy**

---

## Website Structure

### 1. Navbar
- fixed, responsive
- transparent → solid on scroll
- includes social links

### 2. Hero Section (3D FOCUSED)
- strong headline + CTA
- immersive 3D background
- parallax interaction
- visually dominant

### 3. Events Section
- grid of cards
- 3D hover tilt effects
- smooth transitions

### 4. About Section
- clean layout
- minimal 3D or subtle motion only

### 5. Team Section
- profile cards
- hover depth interaction

### 6. Gallery Section
- image-heavy
- smooth transitions
- optional depth-based effects

### 7. Membership CTA
- bold section
- strong visual contrast
- subtle motion

### 8. Footer
- clean, minimal

---

## Tech Stack
- Next.js
- Tailwind CSS
- Framer Motion
- Three.js / React Three Fiber

---

## Motion & Interaction
Use:

- Framer Motion for UI animations
- Three.js for immersive visuals
- smooth scroll transitions
- hover-based depth effects

All motion must feel:

- smooth
- intentional
- premium
- responsive

---

## Performance Constraints
- Optimize all 3D assets
- Avoid large textures
- Lazy load heavy components
- Maintain smooth FPS
- Ensure mobile fallback (reduce or disable heavy 3D on mobile)

---

## Responsiveness
- Mobile-first design
- Graceful degradation of 3D effects on smaller devices
- Maintain usability over visuals

---

## Content Tone
- short
- energetic
- community-driven
- modern

---

## Output Requirements
Provide:

- full working code
- component structure
- reusable components
- integrated 3D elements
- responsive layout
- production-quality UI

---

## Execution Plan

1. Analyze inspiration image
2. Define design system
3. Plan 3D interaction strategy
4. Build layout + components
5. Integrate 3D elements
6. Optimize performance
7. Final polish

---

## Final Instruction
Create a **visually stunning, interactive, and modern student society website** that feels:

- unique
- immersive
- premium
- technically impressive

The user should immediately feel:

**“this is not a typical student website — this is something special.”**