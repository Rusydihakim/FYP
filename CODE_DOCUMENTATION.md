
# AthleteFit Pro — Complete Code & Design Documentation

This document provides a comprehensive breakdown of the AthleteFit Pro codebase, its architecture, design system, and a practical step-by-step guide for customizing the design and modifying key modules (such as [`Assign.tsx`](file:///Users/kodi/Documents/FYP/athletefit-pro/src/pages/coach/Assign.tsx)).

---

## 1. System Architecture & Tech Stack

```
[ Frontend: React 19 + TypeScript + Vite + Tailwind CSS v4 ]
                          │
         ┌────────────────┴────────────────┐
         ▼                                 ▼
   [ UI & Layouts ]                 [ Supabase Client ]
   - Sidebar & Topbar               - PostgreSQL Database
   - Lucide React Icons             - Auth (useAuth hook)
   - Recharts Analytics             - Row Level Security (RLS)
```

| Layer                    | Technology                              | Key Responsibility                                       |
| :----------------------- | :-------------------------------------- | :------------------------------------------------------- |
| **Framework**      | React 19 + Vite 8                       | High-performance SPA with client-side routing            |
| **Language**       | TypeScript                              | Strong typing for UI states, props, and database records |
| **Styling**        | Tailwind CSS v4 (with`@theme`)        | Modern atomic styling, dynamic tokens, CSS variables     |
| **Icons**          | Lucide React                            | Clean, scalable SVG icons                                |
| **Backend & Auth** | Supabase JS (`@supabase/supabase-js`) | Authentication and Postgres database persistence         |
| **Routing**        | React Router v7                         | Protected role-based routing (Admin, Coach, Athlete)     |

---

## 2. Directory Structure

```
FYP/
├── CODE_DOCUMENTATION.md          <-- This documentation guide
├── database_schema.sql            <-- Supabase Postgres table definitions
├── athletefit_pro_diagrams.md     <-- System architectural diagrams
└── athletefit-pro/
    ├── .env                       <-- Supabase URL & publishable key
    ├── index.html                 <-- HTML entry with Google Fonts
    ├── package.json               <-- Project dependencies & scripts
    ├── vite.config.ts             <-- Vite build setup
    └── src/
        ├── App.tsx                <-- Main app routing & query provider
        ├── index.css              <-- Design system tokens & Tailwind theme
        ├── components/
        │   ├── layout/            <-- PageLayout, Sidebar, Topbar
        │   └── ui/                <-- Reusable UI buttons, cards, badges
        ├── hooks/
        │   └── useAuth.tsx        <-- Supabase session & user profile context
        ├── pages/
        │   ├── Landing.tsx        <-- Public landing page
        │   ├── Login.tsx          <-- Authentication / Sign In
        │   ├── Register.tsx       <-- Registration page
        │   ├── coach/
        │   │   ├── Assign.tsx     <-- Workout Assignment & Creator (Coach)
        │   │   ├── Athletes.tsx   <-- Athlete roster & management
        │   │   └── Dashboard.tsx  <-- Coach summary & metrics
        │   ├── athlete/           <-- Athlete dashboard, workouts & logging
        │   └── admin/             <-- User management & analytics
        └── utils/
            └── supabase.ts        <-- Supabase client initialization
```

---

## 3. How to Change the Design

The application uses **Tailwind CSS v4**, which defines all colors, borders, and fonts inside [`athletefit-pro/src/index.css`](file:///Users/kodi/Documents/FYP/athletefit-pro/src/index.css) using the `@theme` directive.

### 3.1 The Global Theme Tokens ([`src/index.css`](file:///Users/kodi/Documents/FYP/athletefit-pro/src/index.css))

All color utility classes (e.g. `bg-bg`, `bg-surface`, `border-border`, `text-green-500`) are mapped directly from CSS variables:

```css
@import "tailwindcss";

@theme {
  /* Backgrounds & Surfaces */
  --color-bg: #080D18;           /* Deep dark navy background */
  --color-surface: #0F1729;      /* Card background */
  --color-surface-2: #162035;    /* Elevated card / dropdown background */
  --color-border: #1E2D47;       /* Card & input borders */
  --color-border-light: #2A3F60; /* Highlighted borders */
  
  /* Primary Brand Accents (Emerald / Lime) */
  --color-green-500: #6FC424;    /* Primary CTA button & active status */
  --color-green-400: #8FDB42;    /* Hover accent */
  
  /* Secondary Accents (Electric Blue) */
  --color-blue-500: #1E78D4;     /* Secondary buttons, links */
  --color-blue-400: #3A91E0;     /* Info indicators */
  
  /* Text Colors */
  --color-text: #EEF3FA;         /* Main headings & text */
  --color-text-muted: #8DA4C0;   /* Subheadings & descriptions */
  --color-text-hint: #5A738F;    /* Input placeholders */

  /* Status Colors */
  --color-danger: #E8453C;       /* Errors & delete buttons */
  --color-warning: #F0A500;      /* In-progress warnings */
}
```

### 3.2 Recipes for Common Design Customizations

#### Recipe A: Changing the Accent Color

To change the primary accent color from green to purple or electric blue:

1. Open [`src/index.css`](file:///Users/kodi/Documents/FYP/athletefit-pro/src/index.css).
2. Change the `--color-green-500` hex value (e.g. to `#8B5CF6` for Purple or `#06B6D4` for Cyan).
3. Any component using `bg-green-500`, `text-green-500`, or `border-green-500` will automatically update across the entire app.

#### Recipe B: Switching to a Sleek Glassmorphic Card Style

In any page or card component:

- **Default:** `bg-surface border border-border`
- **Glassmorphic:** `bg-surface/60 backdrop-blur-md border border-white/10 shadow-2xl`

#### Recipe C: Upgrading Buttons

- **Default Button:**
  ```tsx
  <button className="bg-green-500 hover:bg-green-400 text-bg font-bold py-3 px-4 rounded-lg">
    Submit
  </button>
  ```
- **Modern Gradient Button with Glow:**
  ```tsx
  <button className="bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-400 hover:to-emerald-300 text-slate-950 font-bold py-3 px-6 rounded-xl shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200">
    Submit
  </button>
  ```

---

## 4. In-Depth Code Breakdown: `src/pages/coach/Assign.tsx`

[`Assign.tsx`](file:///Users/kodi/Documents/FYP/athletefit-pro/src/pages/coach/Assign.tsx) allows coaches to assign workout routines to athletes via two modes:

1. **Predefined Templates** (assigning an existing template to multiple athletes at once).
2. **Personal / Custom Workouts** (building custom exercises with dynamic sets, reps, weight, and duration for a specific athlete).

### 4.1 State Management Breakdown

| State Variable                   | Type                    | Purpose                                                         |
| :------------------------------- | :---------------------- | :-------------------------------------------------------------- |
| `activeTab`                    | `'plan' \| 'custom'`   | Controls which tab is active (Template vs Custom Workout)       |
| `athletes`                     | `any[]`               | List of athletes retrieved from Supabase`users` table         |
| `loadingAthletes`              | `boolean`             | Displays spinner while fetching athlete records                 |
| `submitting`                   | `boolean`             | Disables submit button & displays loader while saving           |
| `success` / `successMessage` | `boolean`, `string` | Controls the green success banner                               |
| `errorMsg`                     | `string`              | Stores and displays error alerts                                |
| `selectedPlan`                 | `string`              | ID of template selected in Tab 1                                |
| `selectedAthletes`             | `string[]`            | Array of athlete UUIDs selected via checkboxes                  |
| `startDate`                    | `string`              | Scheduled date for the template workout                         |
| `customAthleteId`              | `string`              | Target athlete UUID for Tab 2                                   |
| `customTitle`                  | `string`              | Workout title (e.g. "Heavy Squat Day")                          |
| `customDate`                   | `string`              | Datetime ISO string for scheduled workout                       |
| `customExercises`              | `ExerciseInput[]`     | Dynamic array of exercise rows (Name, Sets, Reps, Weight, Secs) |

### 4.2 Data Fetching & Self-Healing Logic

```tsx
// 1. Fetching registered athletes
useEffect(() => {
  async function fetchAthletes() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'Athlete')
      .order('full_name', { ascending: true });
    if (!error) setAthletes(data || []);
  }
  fetchAthletes();
}, []);
```

#### The `getCoachId` Helper:

Workouts require a foreign key link to the `coaches` table (`coaches.id`). If the current coach user doesn't have an entry in `coaches`, the function auto-creates one on the fly:

```tsx
const getCoachId = async () => {
  if (!profile) return null;
  const { data: coachData } = await supabase
    .from('coaches')
    .select('id')
    .eq('user_id', profile.id)
    .maybeSingle();

  if (coachData) return coachData.id;

  // Auto-creates coach profile if record is absent
  const { data: newCoach } = await supabase
    .from('coaches')
    .insert({ user_id: profile.id, specialization: 'General Training', certification: 'Certified Coach' })
    .select('id')
    .single();
  return newCoach?.id || null;
};
```

### 4.3 Database Submission Logic

#### Template Assignment (`handleAssignPlan`):

1. Reads the exercises defined in `planTemplates[selectedPlan]`.
2. Loops through each selected athlete ID.
3. Inserts a record into `workouts` (`assigned_by`, `assigned_to`, `title`, `scheduled_for`).
4. Inserts all associated exercises into the `exercises` table linking to `workout.id`.

#### Custom Workout Creation (`handleCreateCustomWorkout`):

1. Validates that every exercise has a name.
2. Inserts a new `workout` row for `customAthleteId`.
3. Maps `customExercises` to format numerical inputs (`weight_kg` as float, `duration_seconds` as integer) and inserts them into `exercises`.

---

## 5. How to Redesign `Assign.tsx` (Step-by-Step)

Here are the specific lines in [`Assign.tsx`](file:///Users/kodi/Documents/FYP/athletefit-pro/src/pages/coach/Assign.tsx) to modify for a design overhaul:

### Step 1: Redesign the Header & Tabs (Lines 265–283)

Replace the basic pill tab selector with a modern glass container and animated indicator:

```tsx
{/* Container */}
<div className="bg-surface/80 backdrop-blur-lg rounded-xl p-1.5 border border-border/80 flex shadow-inner">
  <button 
    onClick={() => setActiveTab('custom')}
    className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
      activeTab === 'custom' 
        ? 'bg-green-500 text-bg shadow-md shadow-green-500/20' 
        : 'text-text-muted hover:text-white'
    }`}
  >
    <Sparkles className="h-4 w-4 inline mr-2" /> Personal Workout
  </button>
</div>
```

### Step 2: Redesign the Athlete Checkbox List (Lines 329–348)

Convert the plain scrollbox into interactive athlete cards:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-56 overflow-y-auto p-1">
  {athletes.map((athlete) => {
    const isSelected = selectedAthletes.includes(athlete.id);
    return (
      <label 
        key={athlete.id} 
        className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${
          isSelected 
            ? 'bg-green-500/10 border-green-500/50 shadow-sm' 
            : 'bg-surface border-border hover:border-border-light'
        }`}
      >
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={...}
          className="rounded border-border text-green-500 focus:ring-green-500" 
        />
        <div>
          <p className="text-sm font-semibold text-white">{athlete.full_name}</p>
          <p className="text-xs text-text-muted">{athlete.email}</p>
        </div>
      </label>
    );
  })}
</div>
```

### Step 3: Redesign the Exercise Input Rows (Lines 447–525)

To give exercise cards a cleaner, card-elevated look:

- Add a subtle left accent border: `border-l-4 border-l-green-500`
- Group sets, reps, weight, and duration with cleaner input labels and background contrast: `bg-bg/60 border border-border`

---

## 6. Development Workflow & Running the System

| Command             | Action                                                           |
| :------------------ | :--------------------------------------------------------------- |
| `npm run dev`     | Starts Vite local development server on`http://localhost:5173` |
| `npm run build`   | Compiles TypeScript and builds production distribution           |
| `npm run preview` | Previews production build locally                                |

### Environment Variables ([`.env`](file:///Users/kodi/Documents/FYP/athletefit-pro/.env))

Ensure the following are configured:

```env
VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```
