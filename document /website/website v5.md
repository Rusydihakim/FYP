# AthleteFit Pro — Web Portal UI/UX Design Specification (Stitch Edition)
# Scope: Coach Desktop Command Center & Athlete Web Portal Experience
# Architecture: Multi-Sport Core Engine (Pilot Focus: Rugby Squad Management)

## 1. System Vision & Architecture

The AthleteFit Pro Web Portal provides a high-density, multi-screen desktop environment for coaches and athletes. Built on a scalable multi-sport core with active rugby configuration, it delivers deep roster oversight for trainers and comprehensive historical tracking for athletes.

### Core Design Principles
* **Dense yet Scannable:** Employs high-contrast slate surfaces, clear visual hierarchies, and Gradient 04 Volt Lime (`#D8F878`), Orchid (`#E47CB8`), Violet (`#9448B0`), and Deep Indigo (`#332277`) accents to make large datasets and telemetry curves immediately understandable.
* **Modular Multi-Screen Workflows:** Avoids monolithic single-page sprawl by dedicating distinct screens to roster management, exercise authoring, master calendar scheduling, and telemetry diagnostics.
* **Rapid Squad Actionability:** Enables coaching staff to assess team recovery, adjust positional sessions, and dispatch match-week updates to player phones in under two minutes.
* **View-Only Telemetry on Web:** Allows athletes to review performance metrics on desktop while strictly keeping sensor pairing on mobile.

---

## 2. Web Portal Functions

### 2.1 Coach Web Portal Functions
1. **Coach Authentication & Organization Access:** Role-based sign-in (Head Coach, S&C Coach, Medical Staff) via Supabase Auth.
2. **Squad Roster & Positional Management:** Central directory to inspect player readiness, positional depth charts, and injury availability.
3. **Rugby Training Plan Authoring Studio:** Exercise authoring powered by the ExerciseDB API, tailored to scrum/maul power, contact durability, and speed.
4. **Match-Week Master Calendar & Dispatch:** Visual scheduling to distribute match-week microcycles (MD-4 to MD+1) to mobile devices.
5. **IoT Telemetry & Squad Biometric Monitoring:** Deep-dive analytics reviewing synchronized heart rate zones, recovery scores, and high-speed running meters.
6. **Integrated Coach-Athlete Chat Desk:** Split-pane messaging hub with video scrubbing for scrum/tackle analysis and quick-response macros.
7. **System & Integration Diagnostics:** Real-time monitoring of wearable API health (Fitbit, Apple HealthKit, WHOOP, Garmin) and CSV/Excel data export.

### 2.2 Athlete Web Portal Functions (All Mobile Features Except IoT Pairing)
1. **Athlete Web Authentication:** Secure sign-in to the athlete desktop portal via Supabase Auth.
2. **Athlete Web Profile Management:** Full editing of personal details, physical attributes, and playing goals.
3. **AI Workout & Schedule Overview:** Desktop view of today's prescribed rugby session and upcoming match-week microcycle.
4. **Desktop Workout Logger & History Archive:** Comprehensive review of completed sessions, historical tonnage, and exercise logs with manual entry fallback.
5. **Desktop Performance Analytics:** High-resolution charts tracking Bronco test times, high-speed running volumes, and heart rate trends.
6. **Connected Devices Status (View-Only):** Read-only inspection of paired devices (Apple Watch, WHOOP, Fitbit, Garmin), battery levels, and last sync timestamps.
7. **Athlete Web Chat & Video Submission:** Full-screen desktop messaging desk for chatting with coaches and uploading match/training form clips.

---

## 3. Web Data Requirements

### 3.1 Coach & Squad Data Requirements
* **Coach Profile & Credentials:** Full Name, Coaching Role (Head Coach, S&C), Club/Academy Name.
* **Positional Roster Mapping:** Player ID, Positional Unit (Forwards/Backs), Jersey Number, Status.
* **Rugby Workout Parameters:** Exercise Name, Muscle Target, Sets, Reps, % 1RM, RPE, Rest Period.
* **Biometric Threshold Rules:** Max Heart Rate Ceiling, Min Recovery Score, Overtraining Triggers.
* **Wearable API Webhooks:** OAuth Client Secrets, Webhook Subscriptions, Sync Interval Timers.

### 3.2 Athlete Web Data Requirements
* **Athlete Account Identifiers:** Email, Password, Player Profile Details.
* **Historical Exercise Records:** Sets, working tonnage, reps, and RPE logs retrieved from Supabase.
* **Device Telemetry Metadata:** View-only device connection records (Device model, battery %, last sync timestamp).
* **Communication Media:** Attached video clips and coach feedback messages.

---

## 4. Design System & Theme: Gradient 04 (Volt Lime, Orchid, Violet & Deep Indigo)

The portal interface adapts the **Gradient 04** core athletic palette for wide-screen coach and athlete workstations:
* **Volt Lime (`#D8F878`):** High-visibility telemetry lines, active tab indicators, and CTA accents in dark mode.
* **Electric Orchid (`#E47CB8`):** Highlight badges, secondary chart metrics, and recovery status tags.
* **Royal Violet (`#9448B0`):** Light mode primary action buttons, deep table accents, and primary telemetry curve strokes.
* **Deep Indigo (`#332277`):** Desktop canvas foundation in dark mode, elevated card backdrops, and high-contrast typography in light mode.

### 4.1 Core Color Tokens (Desktop Optimized)

| UI Token | Light Mode Hex | Dark Mode Hex | Portal Interface Role |
| :--- | :--- | :--- | :--- |
| **Primary Accent** | `#9448B0` (Royal Violet) | `#D8F878` (Volt Lime) | Primary action buttons, active tab indicators, telemetry line charts |
| **Secondary Accent** | `#E47CB8` (Electric Orchid) | `#E47CB8` (Electric Orchid) | AI recommendation chips, secondary filters, calendar badges |
| **Tertiary Accent** | `#332277` (Deep Indigo) | `#9448B0` (Royal Violet) | Squad comparative curves, secondary table lines, active borders |
| **App Background** | `#FAF8FD` (Soft Lilac Canvas) | `#160E33` (Night Indigo) | Base dashboard background behind cards and tables |
| **Card / Surface** | `#FFFFFF` (Pure White) | `#251852` (Elevated Indigo) | Data tables, player profile panels, builder canvas |
| **Primary Text** | `#1E1545` (Midnight Indigo) | `#F5F2FC` (Ice Lilac) | Page titles, player names, numerical KPI values (`28 Active`) |
| **Muted Text** | `#695696` (Slate Violet) | `#A898D0` (Muted Lavender) | Column headers, axis labels, sensor timestamps, unit tags |
| **Border / Divider** | `#E6DCF5` (Soft Lilac Border) | `#422D85` (Border Purple) | Table gridlines, card borders, modal separators |
| **Signature Gradient** | `linear-gradient(135deg, #D8F878, #E47CB8, #9448B0, #332277)` | Hero command cards, match-day countdown banners, report headers |

### 4.2 Squad Readiness & Alert Indicators

| State | Light Mode | Dark Mode | Portal Use Case |
| :--- | :--- | :--- | :--- |
| **Cleared / Ready** | `#16A34A` | `#4ADE80` | High recovery score (>80%), full contact cleared, healthy sync |
| **Modified / Attention** | `#EA580C` | `#FB923C` | Moderate fatigue (50–79% recovery), non-contact training only |
| **Medical Hold / Critical** | `#DC2626` | `#F87171` | Severe strain (<50% recovery), concussion protocol, injury hold |
| **Wearable Online** | `#059669` | `#34D399` | IoT device syncing within last 15 minutes |
| **Wearable Stale** | `#64748B` | `#94A3B8` | Device offline or waiting for player mobile sync |

---
## 5. Web Portal Screen Specifications

### Part A: Coach Web Portal Screens

#### Layout Scaffold
* **Left Navigation Sidebar (Collapsible, 260px):** Club crest, coach profile, navigation (`Dashboard`, `Squad Roster`, `Plan Builder`, `Match Schedule`, `Telemetry`, `Messages`, `Settings`).
* **Top Header Bar (64px):** Global player search (`Cmd + K`), medical alert bell with unread count, theme switcher, and coach profile dropdown.
* **Main Workspace Grid:** Responsive high-density data canvas.

#### Screen W-01: Coach Login & 2FA Authentication (`/portal/login`)
* **Purpose:** Secure authentication for coaching and medical staff.
* **Layout:** Split-screen layout: Left hero displaying squad telemetry curves; right panel housing email, password, and two-factor SMS/authenticator code inputs.

#### Screen W-02: Organization & Club Onboarding (`/portal/onboarding`)
* **Purpose:** Configure rugby club details and generate squad invite credentials.
* **Layout:** Three-step setup: Club/Academy details, default match microcycle presets (Saturday match-day standard), and squad invite code generator (produces 6-digit code and printable QR code).

#### Screen W-03: Squad Command Dashboard (`/portal/dashboard`)
* **Purpose:** Daily team readiness and match-countdown operational hub.
* **Layout:** Match Countdown Banner ("48 Hours to Kickoff — Game vs. Harlequins • Match Day -2 Taper Active"). KPI Ribbon: Available Players (`32 / 35 Cleared`), Forwards Unit Readiness (`88% Green`), Backs Unit Readiness (`92% Green`), and Concussion Protocol Watch (`2 Players in Return-to-Play`). Live activity feed and searchable squad roster table.

#### Screen W-04: Athlete Directory & Positional Inspection (`/portal/athletes/[id]`)
* **Purpose:** Detailed inspection of an individual player's biometrics and match readiness.
* **Layout:** Player Header Card (avatar, jersey number, position, biometrics). Interactive Telemetry Tabs: Heart Rate & Strain, Recovery & Sleep, and Collision & Durability Log. Action bar: `[ Modify Today's Workout ]`, `[ Place on Non-Contact Hold ]`, `[ Send Direct Message ]`.

#### Screen W-05: Rugby Training Plan Authoring Studio (`/portal/plans/builder`)
* **Purpose:** Drag-and-drop workout creation with integrated rugby exercise databases and AI tools.
* **Layout:** Three-column studio: Left column (ExerciseDB API library filtered by Scrum & Maul, Power, Speed, and Injury Mitigation), Center column (interactive drag-and-drop workout canvas with live tonnage badge), and Right column (AI Rugby Assistant volume auditor).

#### Screen W-06: Match-Week Master Calendar & Dispatch (`/portal/plans/schedule`)
* **Purpose:** Distribute the weekly match microcycle across the squad.
* **Layout:** Multi-week calendar view with unit toggles: `[ Forwards ]` / `[ Backs ]`. Standardized Rugby Microcycle Template (MD-4 to MD+1). Conflict detector flagging players scheduled for back-to-back high-strain days. Primary CTA: "Publish Schedule to Player Devices".

#### Screen W-07: Squad Telemetry & Biometric Audit Desk (`/portal/analytics/telemetry`)
* **Purpose:** Compare player workloads, monitor device health, and export performance data.
* **Layout:** Comparative chart canvas (multi-player line overlay comparing heart rate recovery curves and high-speed running meters), Device Sync Health Table, and CSV/Excel data export drawer.

#### Screen W-08: Coach Communication & Video Review Hub (`/portal/messages`)
* **Purpose:** Centralized desk to manage player inquiries and review scrum/tackle form videos.
* **Layout:** Split-pane chat layout: Player list with injury alert tags on left; active conversation thread in center; player context card (recent workout stats and recovery score) on right. Video playback interface with frame-by-frame scrubbing.

#### Screen W-09: Club Settings, Staff Roles & API Credentials (`/portal/settings`)
* **Purpose:** Manage staff permissions, API integrations, and alert thresholds.
* **Layout:** Staff permissions table (Head Coach, S&C Assistant, Team Physio), API configuration panel for Fitbit, WHOOP, Apple HealthKit, and Garmin, and automated alert threshold sliders.

---

### Part B: Athlete Web Portal Screens

#### Screen AW-01: Athlete Web Login & Portal Access (`/athlete/login`)
* **Purpose:** Desktop authentication for athletes.
* **Layout:** Minimalist split-screen with an athletic telemetry hero graphic on the left and standard email/password authentication on the right.

#### Screen AW-02: Athlete Web Training Hub (`/athlete/dashboard`)
* **Purpose:** Expansive desktop overview of daily training, match readiness, and coach notes.
* **Layout:** Hero Banner: Match-day countdown (`MD-3`) with primary CTA: `[ View Today's Session Details ]`. Readiness Grid: Large circular recovery score ring, resting heart rate graph, and sleep quality cards. Coach Note Panel: Highlighted card displaying tactical notes or video feedback from the coach.

#### Screen AW-03: Athlete Web Workout Logger & History Archive (`/athlete/workouts`)
* **Purpose:** In-depth review of completed sessions, historical tonnage, and exercise logs.
* **Layout:** Full calendar view of completed workouts, collapsible tables showing exercise sets, weights, reps, and RPE, with desktop manual entry fallbacks for off-phone logging.

#### Screen AW-04: Performance Analytics & Rugby Metrics (`/athlete/analytics`)
* **Purpose:** High-resolution charts tracking long-term athletic development.
* **Layout:** Interactive trend charts showing Bronco Test progression, volume tonnage across training blocks, high-speed running distances, and heart rate recovery curves.

#### Screen AW-05: Connected Devices Status — View Only (`/athlete/devices`)
* **Purpose:** Transparent status check of connected wearables without browser-based pairing.
* **Layout:** Informational cards displaying paired devices (Apple Health, WHOOP, Fitbit, Garmin), battery percentages, last sync timestamps, and an advisory banner: *"To pair or calibrate a new wearable, please use the AthleteFit Pro Mobile App on your smartphone."*

#### Screen AW-06: Athlete Web Chat & Video Feedback Desk (`/athlete/messages`)
* **Purpose:** Large-screen communication hub for messaging trainers and uploading form videos.
* **Layout:** Two-column desktop layout with chat history on the left, video attachment previewer in the center, and current workout assignment context in the right sidebar.

---

## 6. Web Portal UX Flow & Edge Cases

### 6.1 Coach & Athlete Web Workflows
* **Coach Workflow:** Login (W-01) ➔ Review Squad Readiness (W-03) ➔ Inspect Player (W-04) ➔ Build/Adjust Session (W-05) ➔ Dispatch to Squad (W-06) ➔ Review Video in Chat (W-08).
* **Athlete Web Workflow:** Login (AW-01) ➔ Review Match-Day Readiness (AW-02) ➔ Inspect Assigned Plan (AW-03) ➔ Study Analytics (AW-04) ➔ Message Coach (AW-06).

### 6.2 Edge Cases & Safeguards
* **Stale Wearable Data Warning:** Players without syncs in over 24 hours receive an amber badge with a "Send Sync Reminder" push button.
* **Simultaneous Schedule Edits:** Conflict modal displays side-by-side versions if two coaches edit the same player's schedule concurrently.
* **Offline Network Safeguard:** Changes cache locally via IndexedDB during connectivity dropouts, syncing automatically once reconnected.
