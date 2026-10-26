# AthleteFit Pro — Pre-Coding Readiness Checklist & Exhaustive Problem Analysis
# Scope: Mobile (React Native) | Web Portal (Next.js) | AI Engine (Python) | Database (Supabase)

## 1. Pre-Coding Action Checklist

Complete these six foundational steps in order before writing application UI or backend business logic:

1. **Provision Supabase Database, RLS & Storage (`Phase 1`):** Run `0001_schema.sql`, generate `database.types.ts`, configure RLS policies, enable Realtime on `scheduled_workouts` and `chat_messages`, and create Storage buckets (`avatars`, `club-crests`, `form-check-videos`).
2. **Load Initial Rugby Seed Data (`Phase 2`):** Run `seed.sql` to populate 30–50 rugby exercises, default `MD-4` to `MD+1` templates for Forwards and Backs, and 30 days of synthetic wearable telemetry for mock players.
3. **Configure Native Mobile Builds & API Keys (`Phase 3`):** Set up `expo-dev-client` with Apple HealthKit and Android Health Connect entitlements, register OAuth apps on WHOOP and Fitbit, and obtain an ExerciseDB API key.
4. **Lock In AI Readiness Formulas & Injury Rules (`Phase 4`):** Define the exact mathematical weights for the `0–100%` Readiness Score, workload deload multipliers, and injury-to-exercise exclusion mappings.
5. **Define the 4-Role Navigation Boundaries (`Phase 5`):** Lock in route guards for Athlete Mobile (`M-01`–`M-13`), Coach Mobile (`CM-01`–`CM-07`, no registration), Coach Web (`W-01`–`W-09`), and Athlete Web (`AW-01`–`AW-06`, view-only wearables).
6. **Set Up Academic Evaluation Hooks (`Phase 6`):** Finalize ERD/Use Case/DFD diagrams (`Chapter 3.10`) and add API latency/sync logging counters (`Chapter 3.7`).

---

## 2. Exhaustive Catalog of Problems You Will Face If You Skip Pre-Coding Setup

### Category A: Database, Schema & Multi-Tenant Security Problems (Supabase)

1. **Generated Column Insert Crashes (`bmi` & `baseline_max_hr`):**
   * **Why it happens:** In `athlete_profiles`, `bmi` and `baseline_max_hr` are PostgreSQL `GENERATED ALWAYS` columns.
   * **The problem you will face:** If you code the onboarding form (`M-03`) without generating `database.types.ts` first, your frontend code will try to `INSERT` calculated `bmi` values directly, and PostgreSQL will reject every sign-up with `ERROR: cannot insert a non-DEFAULT value into column "bmi"`.
2. **Mismatched Column Names Across Mobile and Web:**
   * **Why it happens:** Coding React Native and Next.js forms before locking in the shared schema.
   * **The problem you will face:** One app will use `weight` or `userId` while the database expects `weight_kg` and `athlete_id`, causing silent `null` inserts and forcing you to rewrite forms across 28 screens.
3. **RLS Infinite Recursion & Silent Empty Arrays (`[]`):**
   * **Why it happens:** Writing self-referencing Row-Level Security policies on `organization_members` or `squad_members` without testing them first.
   * **The problem you will face:** Supabase will either throw `infinite recursion detected in policy` or silently return `[]` on every Coach Dashboard query (`W-03`), causing you to waste days debugging frontend React code that isn't actually broken.
4. **Cross-Club Medical & Biometric Data Leaks:**
   * **Why it happens:** Disabling RLS during coding to "make queries work quickly."
   * **The problem you will face:** Any authenticated user or rival club coach can query `athlete_injuries` and `daily_readiness_logs` for every player in the system, violating medical privacy requirements (`Chapter 2.3` & `3.5`).
5. **Time-Zone & Match-Day Desynchronization (`MD-x` Drift):**
   * **Why it happens:** Storing `scheduled_date` and `recorded_at` without a strict UTC-to-local time-zone convention.
   * **The problem you will face:** A Saturday Match Day (`MD`) scheduled by a coach on the Web Portal (`W-06`) will shift to Friday (`MD-1`) or Sunday (`MD+1`) on the athlete's phone, serving the wrong workout on game day.

---

### Category B: Wearable IoT, Bluetooth & OAuth Integration Problems

6. **Fatal Red-Screen Crash in Standard Expo Go (`NativeModule is null`):**
   * **Why it happens:** Standard Expo Go does not bundle native iOS `HealthKit` or Android `Health Connect` C++/Swift/Kotlin binaries.
   * **The problem you will face:** If you build your mobile app in standard Expo Go instead of configuring an **Expo Custom Development Build (`expo-dev-client`)** first, the app will crash immediately upon opening Screen `M-06`.
7. **Silent OAuth Token Expiration After 1 Hour (`401 Unauthorized`):**
   * **Why it happens:** WHOOP and Fitbit OAuth `access_token` credentials expire after 1 to 8 hours.
   * **The problem you will face:** Without coding the automated `refresh_token` rotation service before building the dashboard, wearable syncing will work once during initial pairing and permanently fail the next morning.
8. **OAuth Redirect URI Rejections (`redirect_uri_mismatch`):**
   * **Why it happens:** Cloud wearable portals block unverified callback URLs and custom mobile schemes (`athletefit://`).
   * **The problem you will face:** Users tapping `[ Connect WHOOP ]` or `[ Connect Fitbit ]` (`M-06`) will hit a hard security error page from the provider, blocking your entire IoT integration phase.
9. **Webhook Replay Floods & Duplicate Telemetry Logs:**
   * **Why it happens:** Cloud wearables retry webhook deliveries if your endpoint takes >3 seconds to respond.
   * **The problem you will face:** Without idempotency handling and `UNIQUE(athlete_id, log_date)` constraints, a single night's sleep or workout will be inserted multiple times, skewing tonnage and recovery averages.
10. **Null-Sensor Crashes from Partial Wearable Data:**
    * **Why it happens:** Different devices track different metrics (e.g., an Apple Watch user takes their watch off at night so `sleep_minutes = NULL`, or a basic Fitbit lacks `hrv_rmssd`).
    * **The problem you will face:** If your UI and AI engine assume all sensor fields are always populated, the app will throw `TypeError: Cannot read properties of null` whenever a player misses a sleep sync.
11. **API Rate-Limit Lockouts (`429 Too Many Requests`):**
    * **Why it happens:** Fitbit limits API calls to 150 requests/hour per user.
    * **The problem you will face:** If you code the Coach Dashboard (`W-03`) to fetch live wearable APIs on every page reload instead of reading normalized Supabase tables via background webhooks, your developer API key will be rate-limited mid-demonstration.

---

### Category C: AI Engine, Rugby Periodization & Medical Safety Problems

12. **Day-1 Cold-Start Crash (`ZeroDivisionError` / `NaN`):**
    * **Why it happens:** A newly registered athlete (`M-07`) has 0 historical workouts and 0 baseline HRV entries.
    * **The problem you will face:** When `rugby_periodization.py` tries to compare today's HRV against a 14-day rolling baseline that doesn't exist, the Python service will crash with `ZeroDivisionError` or return `NaN%` on the Readiness Ring (`M-08`).
13. **Dangerous Contact Prescriptions to Concussed or Injured Players:**
    * **Why it happens:** Coding the recommendation endpoint before defining the strict exclusion dictionary between `athlete_injuries` and `exercise_catalog`.
    * **The problem you will face:** The AI engine will prescribe heavy barbell back squats, Zercher squats, or live scrum/tackle drills to a player flagged with `is_concussion = TRUE` or an AC joint sprain—directly failing your project's safety aim.
14. **Positional Mismatch (Training Forwards Like Backs):**
    * **Why it happens:** Coding generic workout generators before locking in `rugby.config.ts` positional pillars.
    * **The problem you will face:** The system will assign high-volume maximal velocity sprint blocks to a 120 kg Tighthead Prop (risking joint/tendon overload) or heavy static scrummaging holds to a Fly-Half.
15. **Match-Week Taper Failure (Overtraining Before Kickoff):**
    * **Why it happens:** Generating workouts without strict `MD-4` to `MD-1` intensity caps.
    * **The problem you will face:** The AI will prescribe high-tonnage `85% 1RM` eccentric leg sessions on Friday (`MD-1` Captain's Run), leaving players with severe DOMS (Delayed Onset Muscle Soreness) on Saturday match day.

---

### Category D: Cross-Platform UI/UX, Role-Routing & Offline Sync Problems

16. **Gym-Floor & Pitch-Side Offline Data Loss:**
    * **Why it happens:** Basement weight rooms and outdoor rugby pitches frequently have dead cellular/Wi-Fi zones.
    * **The problem you will face:** If you code Screen `M-09` (Active Workout Logger) to write directly to cloud Supabase without `sqliteOffline.ts` local queuing first, an athlete who logs 50 minutes of sets will lose their entire workout when tapping "Save" in a poor-signal area.
17. **Role-Boundary Feature Bleed & Broken Desktop Buttons:**
    * **Why it happens:** Not enforcing the 4-role specification before generating UI screens.
    * **The problem you will face:** AI coding tools will put Bluetooth/HealthKit pairing buttons on the Athlete Web Portal (`AW-05`)—which throw browser errors on desktop—or add self-registration forms to the Coach Mobile View (`CM-01`), allowing athletes to register themselves as head coaches.
18. **Infinite Login Redirect Loops (`ERR_TOO_MANY_REDIRECTS`):**
    * **Why it happens:** Uncoordinated auth guards between Next.js `middleware.ts` and React Native `RootNavigator.tsx`.
    * **The problem you will face:** A coach logging into the mobile app or an athlete logging into the website will bounce endlessly between `/login`, `/portal/dashboard`, and `/athlete/dashboard`.
19. **Memory Crashes on Uncompressed Form-Check Videos (`M-12`, `W-08`):**
    * **Why it happens:** Modern smartphones record 30-second tackle/scrum videos at 4K resolution (100–200 MB).
    * **The problem you will face:** Without pre-defining client-side video compression and Supabase Storage upload limits, selecting a video in chat will freeze the React Native thread or fail with `OutOfMemoryError`.
20. **Illegible Buttons in Sunlight (Gradient 04 Contrast Error):**
    * **Why it happens:** Volt Lime (`#D8F878`) has very high luminance.
    * **The problem you will face:** If developers default to white text (`#FFFFFF`) on `#D8F878` primary buttons instead of enforcing Midnight Indigo (`#1E1545`) text via `theme.ts`, primary CTA buttons will be unreadable outdoors on the rugby pitch.

---

### Category E: Monorepo Build & Academic Evaluation Problems

21. **Metro Bundler & Next.js React Version Collisions:**
    * **Why it happens:** Next.js App Router and Expo React Native require different React peer dependencies inside a monorepo.
    * **The problem you will face:** Running `npm install` without proper workspace hoisting rules causes React Native's Metro bundler to crash with `Invalid hook call: Multiple copies of React loaded`.
22. **Missing Quantitative Data & Empty Charts During Final Project Defense (Viva):**
    * **Why it happens:** Skipping `seed.sql` and forgetting to log API latency/sync counters (`Chapter 3.7`).
    * **The problem you will face:** During your final presentation, your Bronco progression charts (`M-11`) and Squad Telemetry graphs (`W-07`) will be completely empty, and you will lack the empirical metrics (*Synchronization Success Rate*, *System Response Time*) required to complete Chapters 4 and 5 of your thesis.
