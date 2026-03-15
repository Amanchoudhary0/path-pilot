4# 🧭 PathPilot – India Multi-Modal Travel Platform

Compare flights, trains, and buses across **Maharashtra, Bihar, Gujarat, Delhi & Rajasthan** — all in one place.

---

## 🗺️ Features

- **Multi-Modal Search** – Compare flights, trains, buses, and taxis side-by-side
- **5-State Coverage** – Maharashtra, Bihar, Gujarat, Delhi, Rajasthan (22 cities)
- **Trip Builder** – Build complex itineraries with multiple segments
- **Eco Score** – CO₂ emission tracking for every route
- **User Accounts** – Supabase Auth (email + Google OAuth)
- **Itinerary Management** – Save, view, edit, delete trips
- **Checkout & Payment** – PayPal integration with card fallback
- **Responsive Design** – Mobile-first, works on all devices

---

## 🏙️ Covered Cities

| State | Cities |
|-------|--------|
| **Delhi** | Delhi (DEL), New Delhi |
| **Maharashtra** | Mumbai, Pune, Nagpur, Aurangabad, Nashik |
| **Gujarat** | Ahmedabad, Surat, Rajkot, Vadodara, Bhavnagar |
| **Rajasthan** | Jaipur, Jodhpur, Udaipur, Bikaner, Ajmer, Kota |
| **Bihar** | Patna, Gaya, Muzaffarpur, Bhagalpur |

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/your-repo/pathpilot.git
cd pathpilot
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to **SQL Editor** and paste the contents of `supabase/schema.sql`
3. Run it — this creates all tables, RLS policies, and seeds city data
4. Enable **Google OAuth** in Authentication → Providers (optional)

### 3. Set Up PayPal

1. Go to [developer.paypal.com](https://developer.paypal.com)
2. Create a **Sandbox** app and copy Client ID & Secret
3. Add your webhook URL: `https://your-domain.com/api/payments/webhook`
4. Listen for `PAYMENT.CAPTURE.COMPLETED` events

### 4. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:

```ini
# Supabase (from Project Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# PayPal (Sandbox for dev, Live for production)
PAYPAL_CLIENT_ID=AYx...
PAYPAL_CLIENT_SECRET=EBx...
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AYx...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🗃️ Database Schema

```
cities              – All 22 cities across 5 states
transports          – Flights, trains, buses, taxis between cities  
itineraries         – Saved user trip plans
itinerary_segments  – Individual transport legs in a trip
payments            – PayPal payment records
```

All tables have Row-Level Security (RLS) enabled. Users can only access their own itineraries and payments.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── search/page.tsx       # Search results + Trip Builder
│   ├── auth/page.tsx         # Sign In / Sign Up
│   ├── itineraries/page.tsx  # My Trips dashboard
│   ├── checkout/page.tsx     # 3-step checkout + PayPal
│   └── api/
│       ├── routes/           # GET route search API
│       ├── itineraries/      # CRUD itineraries API
│       └── payments/         # PayPal create/capture/webhook
├── components/
│   ├── layout/               # Navbar, Footer
│   ├── search/               # SearchForm, RouteCard
│   └── itinerary/            # TripBuilder sidebar
└── lib/
    ├── data.ts               # City & transport data
    ├── utils.ts              # Helper functions
    └── supabase/             # Browser + server clients
```

---

## 🚀 Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repository
3. Add all environment variables from `.env.local`
4. Install the **Supabase-Vercel integration** for auto-sync
5. Deploy!

```bash
# Or via CLI:
npm install -g vercel
vercel --prod
```

Update your PayPal webhook URL to the production domain after deploy.

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Auth + DB | Supabase (PostgreSQL + Auth) |
| Payments | PayPal REST API |
| Deployment | Vercel |

---

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, search, popular destinations |
| `/search` | Route search results with filters & trip builder |
| `/auth` | Sign in / Sign up (email + Google) |
| `/itineraries` | User's saved trips dashboard |
| `/checkout` | 3-step booking (review → passenger → payment) |

---

## 🌿 Popular Routes Included

- Delhi → Jaipur (Flight, Shatabdi Train, RSRTC Bus)
- Delhi → Mumbai (Air India, IndiGo, Rajdhani Train)
- Mumbai → Pune (Deccan Queen Train, MSRTC Bus, Ola Taxi)
- Ahmedabad → Mumbai (SpiceJet, Shatabdi Train)
- Delhi → Patna (IndiGo, Rajdhani Train)
- Jaipur → Udaipur (Chetak Express, RSRTC Bus)
- Delhi → Ahmedabad (Vistara, Rajdhani Train)
- Mumbai → Nagpur (Air India, Vidarbha Express)

---

Made with ❤️ for Indian Travelers 🇮🇳
