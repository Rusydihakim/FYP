# AthleteFit Pro — Industry-Standard Software Engineering SDLC Master Checklist

**Project Title:** AthleteFit Pro: AI and IoT Integration in Digital Fitness: Bridging the Gap Between Amateur and Professional Training  
**Institution:** Universiti Kuala Lumpur Malaysian Institute of Information Technology (UniKL MIIT)  
**Methodology:** Rapid Application Development (RAD) mapped to Industry-Standard End-to-End SDLC  
**Reviewed Documents:** `AthleteFit Pro Final Report.pdf` (Chapters 1–3), `database.md`, `project_structure.md`, `pre_coding_checklist.md`, and `potential_risks_analysis.md`

## Executive Summary & Progress Scorecard

Across the 5 documents provided, you have completed **Chapters 1–3 of your Final Year Project (FYP) documentation** and **comprehensive technical architecture blueprints** (`database.md`, `project_structure.md`, `pre_coding_checklist.md`, `potential_risks_analysis.md`). However, **0% of the actual source code, database provisioning, API integrations, system testing, and Chapters 4–5 of the thesis** have been executed yet, and there are **critical inconsistencies** between your Final Report PDF and your technical Markdown specifications that must be fixed immediately.

| SDLC Phase | Industry Standard Stage | Completed (Done) | Partially Done / Needs Fix | Not Done Yet (To-Do) | Phase Readiness |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Phase 1** | Project Initiation & Requirements Engineering | 10 items | 4 items | 2 items | **75% Complete** |
| **Phase 2** | System Architecture & Technical Design | 9 items | 5 items | 3 items | **60% Complete** |
| **Phase 3** | Infrastructure, Environment & Pre-Coding Setup | 0 items | 0 items | 14 items | **0% Complete (Specified Only)** |
| **Phase 4** | Core Implementation (Frontend, Backend, AI & IoT) | 0 items | 0 items | 21 items | **0% Complete (Not Started)** |
| **Phase 5** | Quality Assurance, Testing & Security Auditing | 0 items | 1 item | 12 items | **5% Complete (Planned Only)** |
| **Phase 6** | Deployment, CI/CD, Evaluation & Final Thesis (Ch. 4–5) | 0 items | 1 item | 11 items | **5% Complete (Not Started)** |

## Critical Document Discrepancies & Copy-Paste Errors to Fix First

Before writing code or submitting your report, resolve these **6 major mismatches** found across your uploaded documents:

1. **Unintended "NutriWise / Dietitian" Copy-Paste Artifacts in the Final Report PDF:**
   - **Chapter 2.4 Heading (p. 19):** Titled *"2.4 A Review of Existing Nutrition and Food Management Applications"* even though the text reviews fitness apps (Fitbit, Nike Training Club, Freeletics).
   - **Table 3: Administrative System (`A03`, p. 46):** States *"Allows administrator to verify, manage, and control **dietitian** profiles"* instead of coach profiles.
   - **Table 7: Use Case `UC-004` Precondition (p. 52):** States *"Dietitian account exists in the system database. Dietitian profile page is accessible from the dietitian dashboard."*
   - **Table 8: Use Case `UC-005` Brief Description (p. 53):** States *"User, Dietitian, and Administrator are able to securely log out from the **NutriWise** system to end their session"* inside the *Sync Data from Wearable Device* table.
2. **Corrupted Column Descriptions in `Recommendation Table` (Final Report PDF Table 3.51, p. 72):**
   - `recommendationDate (DATE)` is described as *"Heart rate value"*, and `goalType (VARCHAR(100))` is described as *"Number of steps"*.
3. **Database Schema Conflict (`Final Report PDF` vs. `database.md`):**
   - **Final Report PDF (pp. 68–73):** Defines a basic 9-table generic fitness schema (`User`, `Coach`, `Administrator`, `WorkoutPlan`, `Exercise`, `FitnessData`, `Recommendation`, `ProgressReport`, `Message`) using `VARCHAR(10)` primary keys and plaintext/manual `password VARCHAR(255)` columns.
   - **`database.md` & `pre_coding_checklist.md`:** Define an industry-grade 15+ table **Supabase PostgreSQL 15+ schema** with `UUID` primary keys linked to `auth.users`, rugby-specific modules (`organizations`, `squads`, `squad_members`, `athlete_profiles` with generated `bmi`/`baseline_max_hr`, `athlete_injuries`, `wearable_connections`, `daily_readiness_logs`, `athlete_telemetry_samples`, `rugby_benchmarks`, `workout_templates`, `scheduled_workouts`, `workout_execution_logs`, `workout_set_logs`), and Row-Level Security (RLS).
   - **Action Required:** Update pages 68–73 of `AthleteFit Pro Final Report.pdf` to match the Supabase UUID/RLS schema in `database.md` so your thesis documentation and actual codebase match 1:1.
4. **Missing Diagrams & Prototype Screenshots in `AthleteFit Pro Final Report.pdf`:**
   - **Page 36:** Contains the literal placeholder text `Figure 3.1: System Architecture of AthleteFit Pro (Insert System Architecture Diagram Here)`.
   - **Page 73 (`Section 3.2.2.28 Prototyping`):** States *"The following subsections present the prototypes developed for the AthleteFit Pro system"*, but **zero UI screenshots or wireframes** are included.
   - **Page 74 (`Section 3.2.2.29 Testing`):** States *"The following subsections describe the testing approaches used for AthleteFit Pro"*, but no subsections or test case tables follow.
   - **Missing ERD & DFD:** `pre_coding_checklist.md` (Phase 6) mentions finalizing the ERD and DFD Level 0/1 in Chapter 3.10, which are currently absent from the PDF.
5. **Domain Scope Alignment (General Fitness vs. Rugby-Focused Multi-Sport Core):**
   - The Final Report PDF describes a general amateur/professional fitness platform, whereas `database.md`, `project_structure.md`, and `pre_coding_checklist.md` specify a **Multi-Sport Core piloted on Rugby Union/League** (Forwards vs. Backs, `MD-4` to `MD+1` match-week microcycles, Bronco test benchmarks, collision soreness, and concussion guardrails). Ensure Chapter 1.5 (Scope) and Chapter 3 mention Rugby as the pilot sport configuration.
6. **Past-Tense Claims in Chapter 3 (`3.2.2.30 Redefine`, `3.2.3 Iterative Development`, `3.2.4 Deployment`, pp. 74–75):**
   - Sections 3.2.2.30 to 3.2.4 are written in the past tense as if the system was already built, tested, and deployed, even though pre-coding checklists confirm coding has not started.

---

## Phase 1: Project Initiation & Requirements Engineering (SDLC Stage 1)

### What You Have Already Done
- [x] **Define Project Background, Problem Statement, Aim & Objectives (Ch. 1.1–1.4):** Established the core problem (generic workout plans, poor progress analytics, expensive coaching, fragmented apps) and 4 project objectives aligned with SDG 3.
- [x] **Define Project Scope (Ch. 1.5):** Documented User Scope (Amateur Athletes, Fitness Enthusiasts, Coaches/Trainers), System Scope (TypeScript, Node.js/Express, Python, Supabase, Fitbit API, ExerciseDB API), and Data Scope.
- [x] **Conduct Literature Review & Competitive Analysis (Ch. 2.1–2.7):** Reviewed AI in sports training and IoT in fitness monitoring; benchmarked **Fitbit**, **Nike Training Club (NTC)**, and **Freeletics** across 16 criteria (Table 1, pp. 25–27).
- [x] **Select Software Development Methodology (Ch. 3.1–3.2):** Selected and justified the **Rapid Application Development (RAD)** model (Requirements Planning, User Design, Iterative Construction, Cutover/Deployment).
- [x] **Specify Hardware, Software & Functional Requirements (Ch. 3.2.1 & 3.3):** Listed development hardware/software resources and 21 functional features (`F01`–`F15` for Mobile/Coach, `A01`–`A06` for Admin).
- [x] **Create Use Case Diagrams & 10 Use Case Specifications (Ch. 3.2.2.17):** Created master Use Case Diagram (Figures 5 & 12) and tabular specifications for `UC-001` through `UC-010`.
- [x] **Build Requirement Traceability Matrix (RTM) (Ch. 3.2.2.20, Table 14):** Mapped `FR01`–`FR24` to System Modules and Use Cases.
- [x] **Define Non-Functional Requirements (Ch. 3.2.2.21–3.2.2.26):** Specified Performance (`PR1`–`PR10`), Usability (`UR1`–`UR10`), Reliability (`RR1`–`RR10`), Security (`SR1`–`SR7`), Scalability (`SC1`–`SC3`), and Compatibility (`CR1`–`CR4`) requirements.
- [x] **Document Constraints, Assumptions & Dependencies (Ch. 3.2.2.18–3.2.2.19):** Defined technical, hardware, software, network, security, and timeline constraints.
- [x] **Draft 24-Week Project Schedule & Gantt Chart (Ch. 3.4, Figure 3.55):** Mapped Milestones `M1`–`M5` across Months 1–6.

### What Needs Fixing / Is Partially Done
- [ ] **Purge "NutriWise" and "Dietitian" Artifacts from Report PDF:** Fix Chapter 2.4 heading (p. 19), Table 3 `A03` (p. 46), `UC-004` Precondition (p. 52), and `UC-005` Brief Description (p. 53).
- [ ] **Fix Numbering & Heading Hierarchy in Report PDF:** Fix duplicate `1.4 Aim` / `1.4 Objectives` numbering (p. 14), missing `1.5.1` / `1.5.2` numbering, jump from `3.2.2.7` directly to `3.2.2.17` (p. 47), duplicate `3.2.2.22` section numbers (p. 65), typo `"Scability Requirements"` (p. 67), and standalone `27 Class Diagram` / `28 System Database Design` headings (p. 68).
- [ ] **Reconcile User Role Scope Across Documents:** Align the 3 roles in the Report (`Athlete`, `Coach`, `Admin`) with the 5 roles in `database.md` (`athlete`, `coach`, `head_coach`, `physio`, `admin`) and the 4 platform views in `pre_coding_checklist.md` (`Athlete Mobile`, `Coach Mobile`, `Coach Web`, `Athlete Web`).
- [ ] **Align Wearable Scope in Report:** Update the Report (which mainly mentions Fitbit, HealthKit, Health Connect, and Garmin Connect IQ) to also reflect WHOOP if keeping WHOOP from `database.md`, or scope WHOOP out consistently.

### What You Haven't Done Yet
- [ ] **Formal API Contract Specification (OpenAPI / Swagger):** Define request/response JSON schemas for the Python FastAPI AI endpoints (`/recommendations`, `/readiness-audit`) and Next.js wearable webhook endpoints (`/api/wearables/fitbit`, `/api/wearables/whoop`).
- [ ] **Data Privacy & Medical Consent Specification:** Document explicit athlete consent flows for collecting biometric telemetry and concussion/injury status (`athlete_injuries`) in compliance with Malaysia's PDPA / health data standards.

---

## Phase 2: System Architecture & Technical Design (SDLC Stage 2)

### What You Have Already Done
- [x] **Define Monorepo Architecture (`project_structure.md`):** Designed Turborepo/pnpm workspace structure separating `apps/mobile` (React Native/Expo), `apps/web` (Next.js App Router), `services/ai-engine` (Python FastAPI), and shared `packages/` (`database`, `sport-configs`, `design-system`).
- [x] **Design Production PostgreSQL 15+ / Supabase Schema (`database.md`):** Specified 7 relational modules (Organizations/Roster, Athlete Biometrics/Injuries, Wearables/Telemetry, Exercise Catalog, Training Programs/Microcycles, Session Execution/Tonnage Logs, Real-Time Chat/Video Feedback).
- [x] **Specify Database Indexes & Row-Level Security (RLS) Policies (`database.md` Sections 4–5):** Defined composite B-tree time-series indexes (`idx_telemetry_athlete_time`, `idx_readiness_athlete_date`, `idx_scheduled_athlete_date`, `idx_chat_thread_time`) and RLS policies (`athlete_self_manage`, `coach_view_roster`, physio access).
- [x] **Create System Process Flowcharts (Final Report PDF Figures 6–11, pp. 38–43):** Completed Athlete Flowchart, Coach Flowchart, Admin Flowchart, Manage Workouts Flowchart, Receive Notifications Flowchart, and Full User System Flow.
- [x] **Create UML Class Diagram (Final Report PDF Figure 23, p. 68):** Drafted initial 9-class object-oriented domain diagram.
- [x] **Specify Shared Query & Realtime Sync Patterns (`project_structure.md` Sections 2–4):** Designed typed Supabase client factories for Mobile (`AsyncStorage`) and Web (`@supabase/ssr`) plus `postgres_changes` real-time channel listeners.
- [x] **Define AI Readiness Weights & Workload Scaling Rules (`pre_coding_checklist.md` Phase 4):** Specified the readiness score weights (HRV `35%`, Sleep `30%`, RHR `20%`, Inverse Collision Soreness `15%`) and volume scaling thresholds (`>=80%` full volume, `50-79%` -25% sets & RPE<=7, `<50%` active recovery flush).
- [x] **Define 4-Role Screen & Navigation Architecture (`pre_coding_checklist.md` Phase 5 & `project_structure.md`):** Mapped all 35 screens across Athlete Mobile (`M-01`–`M-13`), Coach Mobile (`CM-01`–`CM-07`), Coach Web (`W-01`–`W-09`), and Athlete Web (`AW-01`–`AW-06`).
- [x] **Conduct Pre-Coding Risk & Failure Mode Analysis (`potential_risks_analysis.md`):** Identified 22 technical failure modes across Database/RLS, Wearable IoT/OAuth, AI Engine/Safety, Offline Sync/UI, and Monorepo/Academic Evaluation.

### What Needs Fixing / Is Partially Done
- [ ] **Insert Missing System Architecture Diagram (Report p. 36):** Replace `(Insert System Architecture Diagram Here)` in Figure 3.1 with an actual visual architecture diagram showing React Native, Next.js, Node.js/FastAPI, Supabase, and IoT/ExerciseDB APIs.
- [ ] **Insert Missing UI Prototype Wireframes/Mockups (Report p. 73):** Add the Figma screen mockups promised in Section 3.2.2.28 (`Login`, `Registration`, `Dashboard`, `Workout Management`, `Fitness Tracking`, `Progress Analytics`, `Coach Dashboard`, `Messaging`, `Admin Dashboard`).
- [ ] **Unify Report Database Tables (pp. 68–73) with `database.md`:** Replace the outdated 9-table `VARCHAR(10)` schema (and fix the corrupted `Recommendation Table` descriptions on p. 72) with the 15-table Supabase schema from `database.md`.
- [ ] **Update Class Diagram (Figure 23, p. 68):** Align the UML Class Diagram with the updated database entities (`Organization`, `Squad`, `AthleteProfile`, `AthleteInjury`, `DailyReadinessLog`, `ScheduledWorkout`, `WorkoutExecutionLog`).
- [ ] **Enforce WCAG Contrast Rule on Gradient 04 Theme Tokens (`potential_risks_analysis.md` #20):** Document and enforce Midnight Indigo (`#1E1545`) text over Volt Lime (`#D8F878`) primary CTA buttons in `theme.ts`.

### What You Haven't Done Yet
- [ ] **Create Formal Entity-Relationship Diagram (ERD) & DFD Level 0 / Level 1 (`pre_coding_checklist.md` Phase 6):** Draw the Crow's Foot ERD and Data Flow Diagrams required for academic evaluation.
- [ ] **Design High-Fidelity Figma Prototypes for All 35 Mapped Screens:** Complete interactive Figma prototypes covering `M-01`–`M-13`, `CM-01`–`CM-07`, `W-01`–`W-09`, and `AW-01`–`AW-06`.
- [ ] **Write Complete SQL DDL for All 15 Tables (`0001_schema.sql`):** While `database.md` provides full column tables for 3 core tables (`athlete_profiles`, `daily_readiness_logs`, `workout_execution_logs`), write out the complete `CREATE TABLE` SQL statements and enum definitions for all 15 tables.

---

## Phase 3: Infrastructure, Environment & Pre-Coding Setup (SDLC Stage 3)

*(Note: All items below are well-documented in `pre_coding_checklist.md` and `project_structure.md`, but **none** have been executed yet.)*

### What You Haven't Done Yet
- [ ] **Initialize Git Repository & Monorepo Workspace:** Create GitHub repo (`athletefit-pro`), configure root `package.json`, `turbo.json`, `pnpm-workspace.yaml`, `.gitignore`, and `.env.example`.
- [ ] **Fix Monorepo React Peer Dependency Hoisting (`potential_risks_analysis.md` #21):** Configure `.npmrc` / workspace hoisting rules so Expo Metro Bundler and Next.js App Router do not collide on multiple copies of React.
- [ ] **Provision Supabase Cloud Project (`pre_coding_checklist.md` Phase 1):** Create the Supabase project and link the local Supabase CLI (`supabase/config.toml`).
- [ ] **Execute `0001_schema.sql` Migration:** Run the DDL migration to create all 15 tables, generated columns (`bmi`, `baseline_max_hr`), custom enums, foreign keys, and composite B-tree indexes.
- [ ] **Configure & Test Supabase Row-Level Security (RLS) Policies:** Enable RLS on all tables and verify policies using non-recursive security definer functions so queries do not throw infinite recursion or return silent empty arrays `[]`.
- [ ] **Configure Supabase Auth Providers & Redirect URLs:** Enable Email/Password, Google OAuth, and Apple ID; whitelist `athletefit://auth/callback` (mobile) and `http://localhost:3000/auth/callback` (web).
- [ ] **Provision Supabase Storage Buckets:** Create `avatars` (public), `club-crests` (public), and `form-check-videos` (authenticated, 50MB limit, `video/mp4` & `video/quicktime`).
- [ ] **Enable Supabase Realtime Replication:** Activate `postgres_changes` replication on `scheduled_workouts`, `daily_readiness_logs`, and `chat_messages`.
- [ ] **Auto-Generate Shared TypeScript Database Types:** Run `npx supabase gen types typescript` to output `packages/database/src/database.types.ts` (ensuring `bmi` and `baseline_max_hr` are marked `Insert: never`).
- [ ] **Write & Execute `seed.sql` (`pre_coding_checklist.md` Phase 2):** Seed 30–50 rugby exercises, `MD-4` to `MD+1` templates for Forwards and Backs, 1 test club (*Harlequins RFC*), 1 Head Coach, 4 Athletes, and 30 days of synthetic wearable telemetry and Bronco test records.
- [ ] **Configure Expo Custom Development Client (`expo-dev-client`):** Generate native `ios/` and `android/` builds with `NSHealthShareUsageDescription` (`Info.plist`) and Android Health Connect permissions (`AndroidManifest.xml`) instead of using standard Expo Go.
- [ ] **Register External Wearable OAuth Apps:** Register developer applications on the Fitbit Developer Portal, WHOOP Developer Platform, and Garmin Connect IQ to obtain `CLIENT_ID` and `CLIENT_SECRET` credentials and whitelist callback URLs.
- [ ] **Subscribe to ExerciseDB API:** Obtain `EXERCISEDB_API_KEY` via RapidAPI and configure environment secrets.
- [ ] **Set Up Shared Packages (`@athletefit/design-system` & `@athletefit/sport-configs`):** Implement `theme.ts`, `theme.css`, `types.ts`, and `rugby.config.ts` and wire them into `apps/mobile` and `apps/web/tailwind.config.ts`.

---

## Phase 4: Core System Implementation / Coding (SDLC Stage 4 — RAD Construction)

### 4A. Shared Database Layer (`packages/database`)
- [ ] **Implement Shared Typed Query Hooks:** Code `workouts.ts`, `readiness.ts`, `telemetry.ts`, and `squad.ts` inside `packages/database/src/queries/`.
- [ ] **Enforce UTC-to-Local Date Normalization (`potential_risks_analysis.md` #5):** Standardize timezone handling on `scheduled_date` and `recorded_at` so Match Day (`MD`) never shifts across timezones.

### 4B. Mobile Application (`apps/mobile` — React Native / Expo)
- [ ] **Implement Mobile Supabase Client & Auth Persistence:** Build `apps/mobile/src/lib/supabase.ts` using `AsyncStorage` and `RootNavigator.tsx` role-based routing (`athlete` vs. `coach`).
- [ ] **Build Offline-First Workout Queue (`sqliteOffline.ts`):** Implement local SQLite caching and background retry synchronization so gym-floor or pitch-side workouts (`M-09`) never lose set logs in dead cellular zones (`RR5`).
- [ ] **Build Athlete Auth & 5-Step Rugby Onboarding (`M-01`–`M-07`):** Implement Welcome (`M-01`), Login/Register (`M-02`), Biometrics without inserting generated columns (`M-03`), Positional Selection (`M-04`), Equipment & Injury Baseline (`M-05`), Native Wearable Pairing (`M-06`), and Baseline Summary (`M-07`).
- [ ] **Build Athlete Core Training & Telemetry Screens (`M-08`–`M-13`):** Implement Home & Readiness Ring (`M-08`), Active Workout Logger with Rest Timer & Tonnage Calc (`M-09`), Session Summary (`M-10`), Bronco & HSR Analytics (`M-11`), Coach Chat & Video Form Check (`M-12`), and Profile/Settings (`M-13`).
- [ ] **Build Coach Mobile Pitch-Side View (`CM-01`–`CM-07`):** Implement Coach Login without self-registration (`CM-01`), Squad Readiness Hub (`CM-02`), Roster & Injury Status (`CM-03`), Quick Session Editor (`CM-04`), Microcycle Schedule (`CM-05`), Pitch-Side Chat (`CM-06`), and Settings (`CM-07`).
- [ ] **Implement Client-Side Video Compression (`potential_risks_analysis.md` #19):** Compress 4K form-check videos before uploading to the `form-check-videos` bucket to prevent `OutOfMemoryError`.

### 4C. Web Portal (`apps/web` — Next.js App Router)
- [ ] **Implement SSR Supabase Clients & Role Middleware:** Code `client.ts`, `server.ts`, and `middleware.ts` to guard `/portal/*` (Coach/Admin) and `/athlete/*` (Athlete Web) without redirect loops (`potential_risks_analysis.md` #18).
- [ ] **Build Coach Desktop Command Center (`W-01`–`W-09`):** Implement Coach Login/2FA (`W-01`), Club Onboarding & 6-Digit Invite Code Gen (`W-02`), Squad Command Dashboard (`W-03`), Athlete Positional Profile (`W-04`), Plan Authoring Studio with ExerciseDB (`W-05`), Match-Week Master Calendar `MD-4` to `MD+1` (`W-06`), Squad Telemetry Audit Desk (`W-07`), Video Review & Scrubbable Timestamp Chat (`W-08`), and Staff Roles/Webhooks (`W-09`).
- [ ] **Build Athlete Web Portal (`AW-01`–`AW-06`):** Implement Athlete Web Login (`AW-01`), Training Hub (`AW-02`), Desktop Workout Logger (`AW-03`), Bronco/HSR Charts (`AW-04`), **View-Only** Connected Wearables without Bluetooth pairing buttons (`AW-05`), and Coach Chat (`AW-06`).
- [ ] **Build Administrative System Module (`A01`–`A06` from Final Report Table 3):** Implement Admin Login (`A01`), Manage User Accounts (`A02`), Manage Coach Accounts (`A03`), System Usage Reports (`A04`), System Settings (`A05`), and System Performance/Audit Log Monitor (`A06`).

### 4D. Wearable IoT Bridges & Cloud Webhooks
- [ ] **Implement Native On-Device Health Bridges (`apps/mobile/src/services/wearables/`):** Code `appleHealth.ts` (iOS HealthKit), `healthConnect.ts` (Android Health Connect), and `syncAdapter.ts` with null-safe sensor parsing (`potential_risks_analysis.md` #10).
- [ ] **Implement Cloud Wearable OAuth & Webhook Receivers (`apps/web/src/app/api/wearables/`):** Build OAuth callback handlers, automated `refresh_token` rotation (`potential_risks_analysis.md` #7), and idempotent webhook receivers (`UNIQUE(athlete_id, log_date)`) for Fitbit, WHOOP, and Garmin.

### 4E. AI Recommendation & Periodization Engine (`services/ai-engine` — Python FastAPI)
- [ ] **Scaffold FastAPI Microservice (`main.py` & `requirements.txt`):** Set up Pydantic request/response models, CORS, and Supabase service-role client.
- [ ] **Implement `rugby_periodization.py` with Cold-Start Fallback:** Code the readiness calculation (`35%` HRV, `30%` Sleep, `20%` RHR, `15%` Soreness), `MD-4` to `MD+1` intensity caps, positional bias filtering (`forwards` vs. `backs`), and Day-1 cold-start baseline defaults (`potential_risks_analysis.md` #12) to prevent `ZeroDivisionError`/`NaN`.
- [ ] **Implement `injury_guardrail.py` Medical Safety Filter:** Enforce hard exclusion of high-collision, axial-loading, and incompatible exercises whenever `contact_cleared = FALSE` or `is_concussion = TRUE` (`potential_risks_analysis.md` #13).
- [ ] **Instrument Performance Telemetry & Sync Logging Counters (`pre_coding_checklist.md` Phase 6):** Log API latency (`PR1`–`PR7`) and wearable sync success rates into system audit logs for Chapter 4 evaluation.

---

## Phase 5: Quality Assurance, Testing & Security Auditing (SDLC Stage 5)

### What Is Partially Done
- [ ] **Expand High-Level Testing Plan (Final Report Section 3.2.2.29, pp. 73–74):** You have written a 1-page overview naming Functional, Integration, Performance, and User Acceptance Testing (UAT), but the promised detailed subsections and test case tables are missing.

### What You Haven't Done Yet
- [ ] **Write Formal Test Case Specifications (Test Plan Document):** Author structured test cases (`TC-01` to `TC-24`) mapped 1:1 to `FR01`–`FR24` in your Requirement Traceability Matrix (Table 14) with Test ID, Preconditions, Test Steps, Expected Output, Actual Output, and Pass/Fail Status.
- [ ] **Write Unit Tests for AI Engine (`pytest`):** Test `rugby_periodization.py` and `injury_guardrail.py` across edge cases (Day-1 cold start with 0 history, missing sleep/HRV nulls, concussed player blocked from contact/heavy axial exercises, `MD-1` taper cap).
- [ ] **Write Unit & Component Tests for Shared Queries & UI (`Vitest` / `Jest`):** Test tonnage calculations ($\sum \text{weight} \times \text{reps}$), BMI/HR generated column exclusions, and form validations (`UR10`).
- [ ] **Execute Database RLS & Multi-Tenant Security Audit (`SR1`–`SR7`):** Run automated tests verifying that Athlete A cannot read Athlete B's biometrics, Coach from Club A cannot query Club B's roster or `athlete_injuries`, and unauthenticated requests are rejected.
- [ ] **Execute Wearable Integration & Offline Sync Testing (`RR3`, `RR5`):** Test OAuth token refresh rotation, duplicate webhook idempotency, partial sensor nulls, and airplane-mode workout logging with automatic reconnection sync.
- [ ] **Execute Performance & Load Testing (`PR1`–`PR10`):** Benchmark and record actual empirical metrics against your targets:
  - Login time `< 3s` (`PR1`)
  - Dashboard load `< 5s` (`PR2`)
  - AI recommendation generation `< 10s` (`PR3`)
  - Wearable data sync `< 5s` (`PR4`)
  - Workout history retrieval `< 3s` (`PR6`)
  - Analytics report generation `< 10s` (`PR7`)
- [ ] **Conduct User Acceptance Testing (UAT) with Athletes & Coaches:** Recruit sample athletes and coaches to test the mobile app and web portal, and collect quantitative usability survey scores (e.g., System Usability Scale / SUS) for Chapter 4.

---

## Phase 6: Deployment, CI/CD, Evaluation & Final Thesis Chapters 4–5 (SDLC Stage 6)

### What Is Partially Done
- [ ] **Revise Premature Deployment Narrative (Final Report Section 3.2.4, p. 75):** Update Section 3.2.4 so it accurately describes the *planned* deployment methodology in Chapter 3, moving actual deployment results to Chapter 4.

### What You Haven't Done Yet
- [ ] **Set Up CI/CD Pipeline (GitHub Actions):** Configure automated linting, TypeScript type-checking (`tsc --noEmit`), and `pytest` unit test runs on every pull request.
- [ ] **Deploy Production / Staging Backend & Database:** Deploy Supabase migrations (`0001_schema.sql`), RLS policies, Edge Functions/webhooks, and the Python FastAPI `ai-engine` microservice (e.g., on Render, Railway, or Fly.io) over HTTPS (`SR5`).
- [ ] **Deploy Next.js Web Portal (`apps/web`):** Deploy the Coach & Athlete Web Portal to Vercel with production environment variables and verified OAuth callback URLs.
- [ ] **Build & Distribute Mobile Application (`apps/mobile`):** Build the iOS/Android development/preview binaries via EAS Build (`expo-dev-client`) for live testing on physical smartphones with wearable sensors.
- [ ] **Write Chapter 4: Implementation, Testing & Results (Final Report):**
  - Document the actual code implementation with annotated code snippets (Supabase RLS, FastAPI AI engine, IoT sync adapter).
  - Include real screenshots of all implemented Mobile, Web, and Admin interfaces.
  - Present completed Functional Test Case tables (`Pass/Fail`), Performance Benchmark tables (`PR1`–`PR10` actual vs. target latency), Synchronization Success Rate metrics, and UAT survey findings.
- [ ] **Write Chapter 5: Conclusion & Future Recommendations (Final Report):**
  - Evaluate how each of the 4 Project Objectives (Chapter 1.4) was achieved.
  - Discuss system limitations encountered during implementation.
  - Propose future enhancements (e.g., expanding `@athletefit/sport-configs` from `rugby.config.ts` to `football.config.ts`, computer-vision pose estimation for automated form checks).
- [ ] **Prepare Final Viva Presentation & Live Demo Environment:** Ensure `seed.sql` is loaded so all Bronco progression charts (`M-11`) and Squad Telemetry dashboards (`W-07`) display rich 30-day data during your final defense.
