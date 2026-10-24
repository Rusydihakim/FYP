# AthleteFit Pro — Monorepo File System & Shared Database Architecture
# Stack: Turborepo | React Native (Mobile) | Next.js (Web) | Node.js & Python | Supabase (PostgreSQL)

## 1. Unified Monorepo File System Structure

Using a **Monorepo architecture** (via Turborepo or pnpm workspaces) allows the **Mobile App** (`apps/mobile`) and **Website Portal** (`apps/web`) to share the exact same Supabase database schema, TypeScript types, sport configurations (`rugby.config.ts`), and Gradient 04 design tokens (`theme.ts`).

```text
athletefit-pro/
├── package.json                        # Root workspace configuration (Turborepo / pnpm)
├── turbo.json                          # Build pipeline orchestration
├── .env.example                        # Shared environment variable template
│
├── packages/                           # SHARED PACKAGES (Used by both Mobile & Web)
│   ├── database/                       # Single Source of Truth for Supabase DB
│   │   ├── supabase/
│   │   │   ├── config.toml             # Supabase CLI project config
│   │   │   ├── migrations/
│   │   │   │   └── 0001_schema.sql     # Complete PostgreSQL schema & RLS policies
│   │   │   └── seed.sql                # Default rugby exercises & test clubs
│   │   ├── src/
│   │   │   ├── database.types.ts       # Auto-generated TypeScript types from schema.sql
│   │   │   ├── queries/                # Reusable typed DB queries
│   │   │   │   ├── workouts.ts         # Fetch/log scheduled_workouts & set_logs
│   │   │   │   ├── readiness.ts        # Fetch/upsert daily_readiness_logs
│   │   │   │   ├── telemetry.ts        # Batch insert athlete_telemetry_samples
│   │   │   │   └── squad.ts            # Coach roster & positional queries
│   │   │   └── index.ts                # Exports types and shared query hooks
│   │   └── package.json
│   │
│   ├── sport-configs/                  # Multi-Sport Adapter Configs
│   │   ├── src/
│   │   │   ├── types.ts                # Universal SportConfig interface
│   │   │   ├── rugby.config.ts         # Active Pilot: Rugby Union/League positions & pillars
│   │   │   ├── football.config.ts      # Future: Football/Soccer preset
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── design-system/                  # Shared Gradient 04 UI Tokens
│       ├── src/
│       │   ├── theme.ts                # #D8F878, #E47CB8, #9448B0, #332277 tokens
│       │   └── theme.css               # CSS variables for Next.js web portal
│       └── package.json
│
├── apps/
│   ├── mobile/                         # REACT NATIVE APP (Athlete + Coach Mobile)
│   │   ├── app.json
│   │   ├── App.tsx
│   │   └── src/
│   │       ├── lib/
│   │       │   ├── supabase.ts         # Mobile Supabase client (with AsyncStorage auth)
│   │       │   └── sqliteOffline.ts    # Offline workout cache & sync queue
│   │       ├── services/
│   │       │   └── wearables/          # On-Device IoT Bridges
│   │       │       ├── appleHealth.ts  # iOS HealthKit integration
│   │       │       ├── healthConnect.ts# Android Health Connect integration
│   │       │       └── syncAdapter.ts  # Normalizes & pushes telemetry to Supabase
│   │       ├── navigation/
│   │       │   ├── RootNavigator.tsx   # Routes by role ('athlete' vs 'coach')
│   │       │   ├── AthleteTabs.tsx     # Screens M-08 to M-13
│   │       │   └── CoachMobileTabs.tsx # Screens CM-01 to CM-07
│   │       └── screens/
│   │           ├── auth/               # M-01 Welcome, M-02 Login/Register
│   │           ├── onboarding/         # M-03 to M-07 (5-step Rugby Onboarding)
│   │           ├── athlete/            # M-08 Home, M-09 Active Logger, M-10 Summary, M-11 Analytics, M-12 Chat
│   │           └── coach/              # CM-02 Squad Hub, CM-03 Roster, CM-04 Quick Editor, CM-05 Schedule
│   │
│   └── web/                            # NEXT.JS WEB PORTAL (Coach Desktop + Athlete Web)
│       ├── next.config.mjs
│       ├── tailwind.config.ts          # Consumes @athletefit/design-system
│       └── src/
│           ├── lib/
│           │   └── supabase/
│           │       ├── client.ts       # Browser Supabase client
│           │       ├── server.ts       # Next.js Server Component Supabase client
│           │       └── middleware.ts   # Role-based route guard (/portal vs /athlete)
│           ├── app/
│           │   ├── (coach-portal)/     # Coach Desktop Command Center
│           │   │   ├── login/          # W-01 Coach Login & 2FA
│           │   │   ├── onboarding/     # W-02 Club Onboarding & Invite Code Gen
│           │   │   ├── dashboard/      # W-03 Squad Command Dashboard
│           │   │   ├── athletes/[id]/  # W-04 Positional Profile Inspection
│           │   │   ├── plans/builder/  # W-05 Rugby Plan Authoring Studio (ExerciseDB)
│           │   │   ├── plans/schedule/ # W-06 Match-Week Master Calendar (MD-4 to MD+1)
│           │   │   ├── analytics/      # W-07 Squad Telemetry Audit Desk
│           │   │   ├── messages/       # W-08 Video Review & Chat Hub
│           │   │   └── settings/       # W-09 Staff Roles & API Webhooks
│           │   │
│           │   ├── (athlete-web)/      # Athlete Web Portal
│           │   │   ├── athlete/login/      # AW-01 Athlete Web Login
│           │   │   ├── athlete/dashboard/  # AW-02 Training Hub & Readiness
│           │   │   ├── athlete/workouts/   # AW-03 Workout Logger & Tonnage Archive
│           │   │   ├── athlete/analytics/  # AW-04 Bronco & HSR Trend Charts
│           │   │   ├── athlete/devices/    # AW-05 View-Only Connected Wearables
│           │   │   └── athlete/messages/   # AW-06 Coach Chat & Video Upload
│           │   │
│           │   └── api/                # Cloud OAuth & Webhook Endpoints
│           │       └── wearables/
│           │           ├── whoop/      # WHOOP OAuth callback & webhook receiver
│           │           ├── fitbit/     # Fitbit OAuth callback & webhook receiver
│           │           └── garmin/     # Garmin Connect IQ webhook receiver
│
└── services/
    └── ai-engine/                      # PYTHON FASTAPI MICROSERVICE
        ├── main.py                     # AI recommendation & workload auditor endpoints
        ├── models/
        │   ├── rugby_periodization.py  # Adjusts MD-4 to MD+1 sets/reps by readiness_score
        │   └── injury_guardrail.py     # Filters exercises against athlete_injuries table
        └── requirements.txt
```

---

## 2. Connecting Both Platforms to the Same Supabase Database

### Step 1: Generate Shared TypeScript Types (`packages/database`)
Whenever `schema.sql` is updated, run the Supabase CLI to generate strict TypeScript interfaces shared by both the React Native mobile app and the Next.js website:

```bash
npx supabase gen types typescript --project-id "$SUPABASE_PROJECT_ID" > packages/database/src/database.types.ts
```

### Step 2: Shared Database Queries (`packages/database/src/queries/workouts.ts`)
Write your database queries once in `packages/database` so both Mobile and Web call the exact same functions:

```typescript
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../database.types';

export type TypedSupabaseClient = SupabaseClient<Database>;

// Used by BOTH Mobile (M-08) and Athlete Web (AW-02) to load today's rugby workout
export async function getAthleteDailySchedule(
  supabase: TypedSupabaseClient,
  athleteId: string,
  date: string
) {
  return await supabase
    .from('scheduled_workouts')
    .select(`
      id,
      scheduled_date,
      microcycle_day,
      status,
      workout_templates (
        id,
        title,
        focus_pillar,
        estimated_duration_min,
        workout_template_exercises (
          id,
          exercise_order,
          target_sets,
          target_reps,
          target_rpe,
          pct_one_rep_max,
          rest_interval_seconds,
          exercise_catalog (
            id,
            name,
            category,
            video_url,
            equipment_required
          )
        )
      )
    `)
    .eq('athlete_id', athleteId)
    .eq('scheduled_date', date)
    .single();
}
```

---

## 3. Platform-Specific Client Initialization

### A. Mobile App Client (`apps/mobile/src/lib/supabase.ts`)
On React Native, the Supabase client uses `AsyncStorage` to persist the athlete or coach login session across app restarts:

```typescript
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@athletefit/database';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

### B. Website Portal Client (`apps/web/src/lib/supabase/client.ts`)
On the Next.js Web Portal, the client connects to the exact same `SUPABASE_URL` and `SUPABASE_ANON_KEY` using browser cookies for SSR authentication:

```typescript
import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@athletefit/database';

export function createWebSupabaseClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

---

## 4. Real-Time Synchronization Between Mobile & Website

Because both apps connect to the same PostgreSQL tables in Supabase, changes made on one platform reflect instantaneously on the other via **Supabase Realtime**:

1. **Coach Publishes Schedule (Web `W-06` or Mobile `CM-05`):**
   Inserts rows into `scheduled_workouts` for the Forwards Pack and Backline.
2. **Athlete Receives Instant Update (Mobile `M-08` & Web `AW-02`):**
   The athlete's app listens to changes on `scheduled_workouts` and refreshes the Match-Week Microcycle card live:

```typescript
// Inside Athlete Mobile Dashboard (Screen M-08)
useEffect(() => {
  const channel = supabase
    .channel('athlete-schedule-sync')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'scheduled_workouts',
        filter: `athlete_id=eq.${userId}`,
      },
      (payload) => {
        // Automatically reload today's rugby workout when Coach updates it!
        refetchDailyWorkout();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [userId]);
```
