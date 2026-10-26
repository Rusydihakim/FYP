
# AthleteFit Pro — Pre-Coding Readiness Checklist & Risk Analysis

# Scope: Mobile (React Native) | Web Portal (Next.js) | AI Engine (Python) | Database (Supabase)

## 1. Pre-Coding Action Checklist

Complete these six foundational steps in order before writing application UI or backend business logic

### Phase 1: Supabase Database, Auth & Storage Setup

- [ ] **Create Supabase Project & Run `0001_schema.sql`:** Initialize all 15 tables, custom enums (`user_role`, `sport_code`, `positional_unit`), and foreign-key constraints.
- [ ] **Generate Shared TypeScript Definitions:** Run `npx supabase gen types typescript` to populate `packages/database/src/database.types.ts`.
- [ ] **Configure Authentication Providers:** Enable Email/Password, Google OAuth, and Apple ID in Supabase Auth, and set deep-link redirect URLs (`athletefit://auth/callback` for mobile, `http://localhost:3000/auth/callback` for web).
- [ ] **Create Supabase Storage Buckets:** Provision `avatars` (public), `club-crests` (public), and `form-check-videos` (authenticated, 50MB limit, `video/mp4` and `video/quicktime` MIME types).
- [ ] **Enable Supabase Realtime:** Turn on Postgres Changes replication for `scheduled_workouts`, `daily_readiness_logs`, and `chat_messages`.

### Phase 2: Database Seed Data (`seed.sql`)

- [ ] **Seed Rugby Exercise Catalog:** Insert 30–50 core rugby exercises across categories (*Scrum & Maul Engine*, *Contact Durability*, *Explosive Power*, *Repeat Sprint Ability*, *Injury Prehab*).
- [ ] **Seed Match-Week Microcycle Templates:** Pre-load standard `MD-4`, `MD-3`, `MD-2`, `MD-1`, and `MD+1` templates for both the **Forwards Pack** and **Backline**.
- [ ] **Seed Test Accounts & 30-Day Telemetry:** Create 1 test rugby club (*Harlequins RFC*), 1 Head Coach account, 4 Athlete accounts (2 Forwards, 2 Backs), and 30 days of historical heart rate, sleep, HRV, and Bronco test records.

### Phase 3: Mobile Native Environment & Wearable API Registration

- [ ] **Set Up Expo Custom Dev Client (`expo-dev-client`):** Configure native iOS (`ios/`) and Android (`android/`) builds rather than relying on standard Expo Go.
- [ ] **Enable Apple HealthKit & Android Health Connect Entitlements:** Add `NSHealthShareUsageDescription` in `app.json` / `Info.plist` and Health Connect permissions in `AndroidManifest.xml`.
- [ ] **Register Cloud Wearable OAuth Apps:** Create developer applications on the WHOOP Developer Platform, Fitbit Developer Portal, and Garmin Connect IQ to obtain `CLIENT_ID` and `CLIENT_SECRET` credentials.
- [ ] **Obtain ExerciseDB API Key:** Subscribe to ExerciseDB (via RapidAPI) and store `EXERCISEDB_API_KEY` in `.env` for the Coach Plan Authoring Studio (`W-05`).

### Phase 4: AI Engine Mathematical Rules & Contracts

- [ ] **Lock In the Daily Readiness Formula:** Define the exact weights for HRV (`35%`), Sleep Duration (`30%`), Resting Heart Rate (`20%`), and Inverse Collision Soreness (`15%`).
- [ ] **Define Workload Scaling Multipliers:** Establish deterministic thresholds (`Readiness >= 80%` = 100% volume; `50–79%` = -25% sets & RPE cap at 7; `< 50%` = active recovery flush).
- [ ] **Map Injury-to-Exercise Exclusion Rules:** Define the lookup dictionary mapping `body_part` (`shoulder`, `hamstring`, `head_neck`) and `is_concussion = TRUE` to prohibited exercise tags.

### Phase 5: Role-Based Navigation & Design Token Wiring

- [ ] **Verify Gradient 04 Token Imports:** Confirm `packages/design-system/src/theme.ts` (`#D8F878`, `#E47CB8`, `#9448B0`, `#332277`) is linked into both `apps/mobile` and `apps/web/tailwind.config.ts`.
- [ ] **Define Role Guard Matrix:** Map route permissions for the 4 distinct views:
  1. **Athlete Mobile (`M-01`–`M-13`):** Full workout logging & native wearable pairing.
  2. **Coach Mobile (`CM-01`–`CM-07`):** Pitch-side management, **no coach registration**.
  3. **Coach Web (`W-01`–`W-09`):** Full club onboarding, studio builder, and telemetry audit.
  4. **Athlete Web (`AW-01`–`AW-06`):** Desktop analytics & logging, **view-only wearable status (`AW-05`)**.

### Phase 6: Academic Evaluation & Telemetry Logging Setup

- [ ] **Finalize System Diagrams (Report Chapter 3.10):** Lock in ERD, Use Case Diagram, and DFD Level 0/1 so code matches documentation 1:1.
- [ ] **Add Performance Telemetry Counters (Report Chapter 3.7):** Include response-time and sync-success logging hooks to capture quantitative metrics for your final report evaluation chapter.

---

## 2. Risk & Consequence Matrix: What Happens If You Skip These Steps

| Skipped Pre-Coding Step                                                                       | What Will Happen During Coding (Consequences)                                                                                                                                                                                                                                                  | Severity & Rework Cost                           |
| :-------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------- |
| **1. Coding before running `schema.sql` & generating `database.types.ts`**          | Mobile and Web developers/agents will invent different field names (e.g., `weight` vs. `weight_kg`, `userId` vs. `athlete_id`). Queries will fail at runtime, requiring a rewrite of every form and API call across both apps.                                                         | **Critical** (20+ hours of refactoring)    |
| **2. Using standard Expo Go instead of an Expo Custom Dev Build (`expo-dev-client`)** | Standard Expo Go **cannot load native Apple HealthKit or Android Health Connect bridges**. The mobile app will crash with `NativeModule is null` as soon as you test wearable syncing (`M-06`).                                                                                      | **Critical** (Blocks IoT integration)      |
| **3. Skipping `seed.sql` (No pre-loaded rugby exercises or mock telemetry)**          | Dashboards (`M-08`, `W-03`), Analytics charts (`M-11`, `W-07`), and the Plan Studio (`W-05`) will render blank or throw `NaN` / division-by-zero errors. You will not be able to test or demo the app without weeks of real smartwatch data.                                       | **High** (Halts UI & chart testing)        |
| **4. Not configuring Supabase RLS Policies & Storage Buckets upfront**                  | Either RLS will block all frontend queries with silent empty arrays `[]` (wasting hours debugging UI code that isn't broken), or sensitive concussion/medical records will be exposed across different clubs. Video uploads in chat (`M-12`, `W-08`) will fail with `400 Bad Request`. | **High** (Security & data-flow failure)    |
| **5. Not registering WHOOP / Fitbit OAuth Redirect URIs early**                         | Cloud wearable APIs reject unregistered callback URLs (`redirect_uri_mismatch`). Additionally, some wearable developer portals require manual account approval, which can delay testing if left until the end.                                                                               | **High** (Blocks cloud wearable sync)      |
| **6. Coding the AI Engine without fixed Readiness & Injury formulas**                   | The Python service (`rugby_periodization.py`) will return arbitrary or unsafe recommendations—such as prescribing heavy scrum sled drives or contact drills to a player with a logged concussion or `30%` recovery score.                                                                 | **High** (Fails core project aim)          |
| **7. Not locking in the 4-Role Navigation Boundaries before building screens**          | AI coding assistants or developers will accidentally build Bluetooth/HealthKit pairing buttons on the Website (`AW-05`)—which cannot work in a desktop browser—or build coach self-registration screens on Mobile (`CM-01`), violating your design spec.                                 | **Medium** (Wasted UI code & UX confusion) |
| **8. Forgetting to log sync latency & API response metrics (`Chapter 3.7`)**          | When you finish coding and need to write Chapter 4 & 5 of your project report, you will have **no quantitative data** on "Synchronization Success Rate" or "System Response Time" to prove your system met its objectives.                                                               | **Medium** (Weakens final academic grade)  |
