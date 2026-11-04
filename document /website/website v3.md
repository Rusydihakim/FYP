# AthleteFit Pro — Coach Web Portal UI/UX Design Specification
# Architecture: Multi-Sport Core Engine (Pilot Focus: Rugby Squad Management)

## 1. Design Vision & Portal Principles

The AthleteFit Pro Web Portal provides coaches, strength and conditioning (S&C) staff, and athletic directors with team-wide command of athlete readiness, positional workload periodization, and injury mitigation.

### Core Portal Principles
* **Energetic & Data-Centric Atmosphere:** High-contrast slate canvas paired with Digital Cyan and Cobalt accents to keep complex team analytics, telemetry curves, and tables glanceable.
* **Modular Multi-Screen Workflows:** Separates roster management, rugby plan building, match scheduling, and telemetry audits into dedicated, uncluttered views.
* **Rapid Actionability:** Enables a coach to inspect team recovery, adjust a match-week microcycle, and push updates to player phones in under two minutes.
* **Multi-Sport Extensibility:** Supports adding new sporting disciplines via modular team presets while maintaining deep, position-specific tooling for Rugby today.

---

## 2. Web Portal Functions

1. **Coach Authentication & Organization Access:** Role-based sign-in (Head Coach, S&C Coach, Medical Staff) via Supabase Auth.
2. **Squad Roster & Positional Management:** Central directory to inspect player readiness, positional depth charts, and injury availability.
3. **Rugby Training Plan Authoring Studio:** Exercise authoring powered by the ExerciseDB API, tailored to scrum/maul power, contact durability, and speed.
4. **Match-Week Master Calendar & Dispatch:** Visual scheduling to distribute match-week microcycles (MD-4 to MD+1) to mobile devices.
5. **IoT Telemetry & Squad Biometric Monitoring:** Deep-dive analytics reviewing synchronized heart rate zones, recovery scores, and high-speed running meters.
6. **Integrated Coach-Athlete Chat Desk:** Split-pane messaging hub with video scrubbing for scrum/tackle analysis and quick-response macros.
7. **System & Integration Diagnostics:** Real-time monitoring of wearable API health (Fitbit, Apple HealthKit, WHOOP, Garmin) and CSV/Excel data export.

---

## 3. Coach & Squad Data Requirements

| Data Category | Required Fields | System Purpose & Role |
| :--- | :--- | :--- |
| **Coach Profile & Credentials** | Full Name, Coaching Role (Head Coach, S&C), Club/Academy Name | Authenticates staff credentials and brands player invitation links. |
| **Positional Roster Mapping** | Player ID, Positional Unit (Forwards/Backs), Jersey Number, Status | Organizes the squad directory and determines automated workout allocations. |
| **Rugby Workout Parameters** | Exercise Name, Muscle Target, Sets, Reps, % 1RM, RPE, Rest Period | Formulates the technical rugby training sessions stored in Supabase. |
| **Biometric Threshold Rules** | Max Heart Rate Ceiling, Min Recovery Score, Overtraining Triggers | Configures automatic alerts flagging high-strain or fatigued players. |
| **Wearable API Webhooks** | OAuth Client Secrets, Webhook Subscriptions, Sync Interval Timers | Manages server-to-server data ingestion from WHOOP, Fitbit, and Garmin. |

---

## 4. Design System & Theme: Category 2 (Digital Cyan & Cobalt)

### 4.1 Core Color Tokens (Desktop Optimized)

| UI Token | Light Mode Hex | Dark Mode Hex | Portal Interface Role |
| :--- | :--- | :--- | :--- |
| **Primary Accent** | `#0284C7` (Cobalt Sky) | `#38BDF8` (Digital Cyan) | Primary action buttons, active tab indicators, telemetry line charts |
| **Secondary Accent** | `#6366F1` (Indigo Glow) | `#818CF8` (Soft Violet) | AI recommendation chips, secondary filters, calendar badges |
| **App Background** | `#F8FAFC` (Slate Canvas) | `#0A0E1A` (Deep Tech Navy) | Base dashboard background behind cards and tables |
| **Card / Surface** | `#FFFFFF` (Pure White) | `#131C2E` (Elevated Navy) | Data tables, player profile panels, builder canvas |
| **Primary Text** | `#0F172A` (Midnight Slate) | `#F1F5F9` (Ice White) | Page titles, player names, numerical KPI values (`28 Active`) |
| **Muted Text** | `#64748B` (Cool Slate) | `#8CA3BA` (Muted Steel) | Column headers, axis labels, sensor timestamps, unit tags |
| **Border / Divider** | `#E2E8F0` (Border Gray) | `#1E293B` (Border Navy) | Table gridlines, card borders, modal separators |

### 4.2 Squad Readiness & Alert Indicators

| State | Light Mode | Dark Mode | Portal Use Case |
| :--- | :--- | :--- | :--- |
| **Cleared / Ready** | `#16A34A` | `#4ADE80` | High recovery score (>80%), full contact cleared, healthy sync |
| **Modified / Attention** | `#EA580C` | `#FB923C` | Moderate fatigue (50–79% recovery), non-contact training only |
| **Medical Hold / Critical** | `#DC2626` | `#F87171` | Severe strain (<50% recovery), concussion protocol, injury hold |
| **Wearable Online** | `#059669` | `#34D399` | IoT device syncing within last 15 minutes |
| **Wearable Stale** | `#64748B` | `#94A3B8` | Device offline or waiting for player mobile sync |

---

## 5. Web Portal: Page-by-Page Specifications

### Desktop Shell & Layout Scaffold
* **Left Sidebar (Width: 260px, Collapsible):** Club crest, coach profile, navigation (`Dashboard`, `Squad Roster`, `Plan Builder`, `Match Schedule`, `Telemetry`, `Messages`, `Settings`).
* **Top Header Bar (Height: 64px):** Global player search (`Cmd + K`), medical alert bell with unread count, theme switcher, and coach profile dropdown.
* **Main Canvas (Fluid Grid):** Padded workspace supporting responsive desktop and tablet layouts.

---

### Screen W-01: Coach Login & 2FA Authentication
* **Route:** `/portal/login`
* **Purpose:** Secure authentication for coaching and medical staff.
* **Layout & Visual Structure:** Split-screen layout: Left hero displaying squad telemetry curves; right panel housing email, password, and two-factor SMS/authenticator code inputs.

### Screen W-02: Organization & Club Onboarding
* **Route:** `/portal/onboarding`
* **Purpose:** Configure rugby club details and generate squad invite credentials.
* **Layout & Visual Structure:** Three-step setup: Club/Academy details, default match microcycle presets (Saturday match-day standard), and squad invite code generator (produces 6-digit code and printable QR code).

### Screen W-03: Squad Command Dashboard
* **Route:** `/portal/dashboard`
* **Purpose:** Daily team readiness and match-countdown operational hub.
* **Layout & Visual Structure:**
  * Match Countdown Banner: "48 Hours to Kickoff — Game vs. Harlequins • Match Day -2 Taper Active".
  * KPI Ribbon: Available Players (`32 / 35 Cleared`), Forwards Unit Readiness (`88% Green`), Backs Unit Readiness (`92% Green`), and Concussion Protocol Watch (`2 Players in Return-to-Play`).
  * Live Activity Feed: Real-time workout completions and wearable syncs.
  * Squad Roster Table: Searchable table toggling between `[ Entire Squad ]`, `[ Forwards Pack ]`, and `[ Backline ]`, showing Player Name, Position, Plan Status, Recovery Ring, and Quick Action buttons.

### Screen W-04: Athlete Directory & Positional Inspection
* **Route:** `/portal/athletes/[id]`
* **Purpose:** Detailed inspection of an individual player's biometrics and match readiness.
* **Layout & Visual Structure:**
  * Player Header Card: Avatar, jersey number, position (`Hooker / Front Row`), age, height, weight, BMI, and connected device badge.
  * Interactive Telemetry Tabs:
    * *Heart Rate & Strain:* Resting HR trends and Zone 1–5 distribution.
    * *Recovery & Sleep:* Nightly recovery score vs. training strain.
    * *Collision & Durability Log:* Completed neck isometric volume and contact history.
  * Coach Actions: `[ Modify Today's Workout ]`, `[ Place on Non-Contact Hold ]`, `[ Send Direct Message ]`.

### Screen W-05: Rugby Training Plan Authoring Studio
* **Route:** `/portal/plans/builder`
* **Purpose:** Drag-and-drop workout creation with integrated rugby exercise databases and AI tools.
* **Layout & Visual Structure:**
  * **Left Column (Exercise Library):** ExerciseDB API integration filtered by rugby categories: Scrum & Maul Engine (Zercher squats, heavy sled drives), Power & Contact (power cleans, trap bar jumps), Rugby Speed (Bronco shuttles, curved sprints), and Injury Mitigation (neck isometrics, Nordic curls).
  * **Center Column (Interactive Builder Canvas):** Drag-and-drop structure by microcycle day, sets, reps, % 1RM, RPE, and rest intervals. Live volume calculation badge (`Tonnage: 8,450 kg`).
  * **Right Column (AI Rugby Assistant):** Prompts: "Generate in-season MD-2 taper session for front row forwards with high fatigue."
  * **Actions:** `[ Save as Template ]`, `[ Export PDF ]`, `[ Assign to Squad ]`.

### Screen W-06: Match-Week Master Calendar & Dispatch
* **Route:** `/portal/plans/schedule`
* **Purpose:** Distribute the weekly match microcycle across the squad.
* **Layout & Visual Structure:**
  * Multi-week calendar view with unit toggles: `[ Forwards ]` / `[ Backs ]`.
  * Standardized Rugby Microcycle Template:
    * *Monday (MD+2):* Lower-body heavy strength and aerobic flush.
    * *Tuesday (MD-4):* Team contact conditioning and neck stability.
    * *Wednesday:* Active recovery, mobility, and tactical video review.
    * *Thursday (MD-3):* High-speed running, explosive power lifts, and scrum/lineout speed.
    * *Friday (MD-1):* Captain's Run (30-min neuromuscular primer, zero contact).
    * *Saturday (Match Day):* 80-minute match play.
    * *Sunday (MD+1):* Hydrotherapy and wearable recovery sync.
  * Conflict detector flagging players scheduled for back-to-back high-strain days. Primary CTA: "Publish Schedule to Player Devices".

### Screen W-07: Squad Telemetry & Biometric Audit Desk
* **Route:** `/portal/analytics/telemetry`
* **Purpose:** Compare