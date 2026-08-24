# Little Dreamers Club — Luxury E-Commerce Platform

> **An ultra-premium children’s & baby lifestyle e-commerce application** built with Next.js 15, React 19, TypeScript, Tailwind CSS, customized shadcn/ui primitives, and Supabase / PostgreSQL. Designed for deployment on **Cloudflare Workers**.

---

## Brand Aesthetic & Direction

**Little Dreamers Club** embodies the emotional serenity of bedtime stories, heirloom craftsmanship, and luxury children's lifestyle.

* **Primary Palette**: Deep Lavender / Plum (`#4A3E56`, `#604E72`), Soft Lavender (`#9F8EB9`, `#EFEAF6`), Warm Gold (`#D4AF37`, `#FDE8B3`), Blush Pink (`#F7E6EB`), Warm Cream (`#FAF8F5`).
* **Typography**: Editorial Serif (`Playfair Display`) paired with clean modern geometric sans (`Plus Jakarta Sans`).
* **Visuals**: Real high-resolution lifestyle and studio photography.

---

## Key Features

### 1. Storefront & Storytelling
* **Atmospheric Hero Section**: Lifestyle imagery, dual CTAs, trust badges.
* **Curated Capsules**: Visual collection cards for *Dreamy Sleep*, *Little Adventures*, *Play & Imagine*, and *Gifts for Little Ones*.
* **New Arrivals Carousel**: Real-time product cards with secondary hover image flip, quick add, and wishlist save.
* **Brand Story ("Made for Little Dreams")**: Editorial photography with core values and sustainability certifications.
* **Bestsellers ("Loved by Little Dreamers")**: Verified parent ratings and reviews.
* **Shop by Department**: Dynamically rendered from the database.
* **Community Social Grid**: Configurable Instagram lookbook feed.

### 2. Shop Catalog & Filtering
* **Real-time Filtering**: By category, size (0-3M, 3-6M, 6-12M, 1-2Y, 2-3Y), color swatches, and stock status.
* **URL Sync**: Shareable query parameters (e.g. `/shop?category=sleepwear&sort=price-low`).
* **Responsive Mobile Sheet**: Seamless filter drawer for mobile devices.

### 3. Product Detail Page (`/product/[slug]`)
* **Interactive Gallery**: High-res display, thumbnail switcher, swipe navigation, and fullscreen zoom.
* **Variant Engine**: Color swatches, size selector, live variant-level stock check.
* **Micro-interactions**: "Add to Bag" transitions to "Added ✓", quantity controls, instant checkout.
* **Accordions**: Story & Details, Materials & GOTS Organic certifications, Size chart, Care instructions.
* **Verified Reviews**: Star breakdown, verified purchaser badges, review submission modal.
* **SEO**: JSON-LD Structured Data Schema for Google rich product results.

### 4. Cart & Checkout Flow
* **Sliding Cart Drawer**: Free shipping milestone progress bar ($75 threshold), quantity steppers, discount tags.
* **Distraction-Free Checkout (`/checkout`)**: Contact info, delivery details, coupon code redemption.
* **Payment Abstraction**: Extensible payment layer supporting Cash on Delivery (COD), Card processing, and Digital Wallets (Apple Pay / eSewa).
* **Order Confirmation (`/checkout/success`)**: Confetti celebration, order number format `LDC-2026-XXXXXX`, delivery tracking, itemized receipt.

### 5. Customer Account (`/account`)
* Live timeline tracking (`Pending` -> `Confirmed` -> `Processing` -> `Packed` -> `Shipped` -> `Delivered`).
* Order history, tracking numbers, and profile preferences.

### 6. Admin Management Suite (`/admin`)
* **Analytics Overview**: Revenue, total orders, active products, and low stock warnings.
* **Products Manager**: Inventory table, stock editor, variant controls, add/archive products.
* **Orders Pipeline**: Live fulfillment status dropdown, carrier tracking updates.
* **Coupons Manager**: Percentage and fixed discount codes with minimum order rules.
* **Content Editor**: Real-time control of hero copy, top announcement bar, and social feed.
* **Settings**: Store profile, shipping rates, and tax policies.

---

## Technology Stack

* **Framework**: Next.js 15 (App Router, Server & Client Components)
* **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React
* **Database & Auth**: PostgreSQL / Supabase with Row Level Security (RLS)
* **Target Runtime**: Cloudflare Workers (Edge-compatible, zero Node-only APIs)
* **Animations**: Canvas Confetti, CSS Smooth Keyframes

---

## Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your Supabase project credentials (if connecting to remote Supabase):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```
*(Note: The app includes a smart fallback store with complete seed data, so it runs out-of-the-box locally and in preview environments).*

### 3. Database Migration
To apply the PostgreSQL schema to your Supabase project:
1. Open Supabase Dashboard -> **SQL Editor**
2. Run the script in [`lib/db/migrations/01_initial_schema.sql`](lib/db/migrations/01_initial_schema.sql)

### 4. Running Locally
```bash
npm run dev
```
Visit `http://localhost:3000` to explore the storefront, or `http://localhost:3000/admin` for the admin portal.

---

## Cloudflare Workers Deployment

This application is built to run smoothly on Cloudflare Workers without Node-only runtime dependencies:

```bash
# Build the project
npm run build

# Deploy via Cloudflare Wrangler
npx wrangler deploy
```

---

## License

© 2026 Little Dreamers Club. All rights reserved.
