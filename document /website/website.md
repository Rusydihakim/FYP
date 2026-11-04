# AthleteFit Pro — Coach Web Portal UI/UX Design Specification (Stitch Edition)

## 1. Design Vision & Portal Principles

The AthleteFit Pro web portal serves coaches, athletic trainers, and administrators. It translates incoming IoT wearable data and AI workout logs from athlete mobile devices into clear, high-density desktop dashboards.

### Core Portal Principles
* **Energetic & Data-Centric Atmosphere:** High-contrast slate backgrounds paired with Digital Cyan and Cobalt accents to keep complex analytics, telemetry curves, and tables glanceable and engaging.
* **Modular Multi-Screen Workflows:** Avoids monolithic, cluttered screens by separating roster review, plan building, scheduling, and live telemetry into dedicated, focused views.
* **Rapid Actionability:** Enables trainers to review an entire team's recovery status, adjust a workout plan, and dispatch updates to athlete phones in under two minutes.
* **Frictionless Coach Onboarding:** Provides pre-populated template routines and automated wearable verification so new coaches can begin managing athletes immediately.

---

## 2. Web Portal Functions

1. **Coach Authentication & Organization Access:** Role-based sign-in (Head Coach, Assistant Trainer, Administrator) with two-factor authentication via Supabase Auth.
2. **Athlete Roster & Profile Management:** Central directory to inspect athlete biometrics, training adherence, and injury constraints.
3. **Training Plan Authoring Studio:** Exercise creation and program structuring powered by the ExerciseDB API and AI volume recommendations.
4. **Calendar Scheduling & Batch Plan Assignment:** Visual dispatch system to schedule workouts across individual athletes or entire training squads.
5. **IoT Telemetry & Biometric Monitoring:** Deep-dive analytics reviewing synchronized heart rate zones, recovery scores, and sleep trends.
6. **Integrated Coach-Athlete Chat Desk:** Split-pane messaging hub with workout video review and quick-action response macros.
7. **System & Integration Diagnostics:** Real-time monitoring of wearable API health (Fitbit, Apple HealthKit, WHOOP, Garmin) and CSV/Excel data export.

---

## 3. Coach & Portal Data Requirements

The web portal manages data across three operational layers:

| Data Category | Required Fields | System Purpose & Role |
| :--- | :--- | :--- |
| **Coach Profile & Credentials** | Full Name, Professional Title, Certifications, Club/Academy Name | Authenticates coaching credentials and brands athlete invitation links. |
| **Athlete Assignment Data** | Athlete ID, Assigned Program, Squad/Group Tag, Access Permissions | Maps athletes to specific coaches and controls roster visibility. |
| **Workout Creation Parameters** | Exercise Name, Target Muscle, Sets, Reps, % 1RM / Weight, RPE, Rest Period | Formulates the technical workout blocks stored in Supabase. |
| **Biometric Threshold Rules** | Max Heart Rate Ceiling, Min Recovery Score, Overtraining Warning Triggers | Configures automatic alerts flagging high-strain or fatigued athletes. |
| **Wearable API Webhooks** | OAuth Client Secrets, Webhook Subscriptions, Sync Interval Timers | Manages server-to-server data ingestion from WHOOP, Fitbit, and Garmin. |

---

## 4. Design System & Theme: Category 2 (Digital Cyan & Cobalt)

### 4.1 Core Color Tokens (Desktop Optimized)

| UI Token | Light Mode Hex | Dark Mode Hex | Portal Interface Role |
| :--- | :--- | :--- | :--- |
| **Primary Accent** | `#0284C7` (Cobalt Sky) | `#38BDF8` (Digital Cyan) | Primary action buttons, active tab indicators, telemetry line charts |
| **Secondary Accent** | `#6366F1` (Indigo Glow) | `#818CF8` (Soft Violet) | AI recommendation chips, secondary filters, calendar badges |
| **App Background** | `#F8FAFC` (Slate Canvas) | `#0A0E1A` (Deep Tech Navy) | Base dashboard background behind cards and tables |
| **Card / Surface** | `#FFFFFF` (Pure White) | `#131C2E` (Elevated Navy) | Data tables, athlete profile panels, builder canvas |
| **Primary Text** | `#0F172A` (Midnight Slate) | `#F1F5F9` (Ice White) | Page titles, athlete names, numerical KPI values (`28 Active`) |
| **Muted Text** | `#64748B` (Cool Slate) | `#8CA3BA` (Muted Steel) | Column headers, axis labels, sensor timestamps, unit tags |
| **Border / Divider** | `#E2E8F0` (Border Gray) | `#1E293B` (Border Navy) | Table gridlines, card borders, modal separators |

### 4.2 Biometric Status & Alert Indicators

| Telemetry State | Light Mode | Dark Mode | Portal Use Case |
| :--- | :--- | :--- | :--- |
| **Optimal / Ready** | `#16A34A` | `#4ADE80` | High recovery score (>80%), plan on schedule, healthy sync |
| **Attention / Moderate** | `#EA580C` | `#FB923C` | Moderate fatigue (50–79% recovery), missed scheduled session |
| **Critical Alert** | `#DC2626` | `#F87171` | Severe strain (<50% recovery), heart rate threshold exceeded |
| **Wearable Online** | `#059669` | `#34D399` | IoT device syncing within last 15 minutes |
| **Wearable Stale** | `#64748B` | `#94A3B8` | Device offline or waiting for athlete mobile sync |

---

## 5. Web Portal: Page-by-Page Specifications

### Desktop Shell & Layout Scaffold
* **Left Sidebar (Width: 260px, Collapsible):** Brand logo, coach status card, primary navigation (`Dashboard`, `Athletes`, `Plan Builder`, `Schedule`, `Telemetry`, `Messages`, `Settings`).
* **Top Header Bar (Height: 64px):** Global athlete search input (`Cmd + K`), system alert bell with badge count, theme switcher, and coach profile dropdown.
* **Main Canvas (Fluid Grid):** Padded workspace container supporting responsive desktop and tablet layouts.

---

### Screen W-01: Coach Login & Two-Factor Authentication
* **Route:** `/portal/login`
* **Purpose:** Provide secure, professional authentication for coaching staff.
* **Layout & Visual Structure:**
  * Two-column split: Left hero displaying dynamic biometric graph visualizations; right panel hosting authentication form.
  * Inputs: Professional Email, Password, Remember Device checkbox.
  * Two-Factor Authentication modal: 6-digit numeric input with SMS or authenticator app integration.
  * Fast-action link: "Register Your Coaching Organization".

---

### Screen W-02: Organization & Coach Profile Onboarding
* **Route:** `/portal/onboarding`
* **Purpose:** Collect coaching credentials and set up the organization's athlete roster workspace.
* **Layout & Visual Structure:**
  * Three-step wizard:
    * **Step 1:** Coaching Organization details (Club Name, Sport/Discipline, Academy Logo).
    * **Step 2:** Default Training Presets (Metric vs. Imperial, default rest periods, heart rate zone model).
    * **Step 3:** First Athlete Invite (Generates a 6-digit team invite code and shareable QR code for the mobile app).
  * Primary Action: "Launch Coach Dashboard ➔".

---

### Screen W-03: Team Command Dashboard
* **Route:** `/portal/dashboard`
* **Purpose:** High-level operational command center showing real-time roster activity and alerts.
* **Layout & Visual Structure:**
  * **Top KPI Ribbon (4 Metric Cards):**
    * Total Active Athletes (`28`).
    * Today's Workout Completion Rate (`19 / 28 Completed • 68%`).
    * Telemetry Sync Health (`96.4% Online`).
    * Active Alerts (`2 Athletes Flagged for Overtraining`).
  * **Critical Alert Banner (Conditional):** Amber/red notification card highlighting athletes with recovery scores below 50% or abnormal resting heart rate spikes.
  * **Live Activity Feed (Right Column):** Stream of real-time athlete actions (e.g., "Marcus finished Upper Body Hypertrophy 4m ago", "Elena's WHOOP synced sleep data").
  * **Today's Roster Table (Main Column):**
    * Columns: Athlete Name, Assigned Plan, Status Pill (`Completed`, `In Progress`, `Pending`, `Rest Day`), Recovery Score Ring, and Quick Action buttons (`View`, `Message`).

---

### Screen W-04: Athlete Directory & Detailed Inspection
* **Route:** `/portal/athletes` and `/portal/athletes/[id]`
* **Purpose:** Deep-dive inspection of an individual athlete's historical performance and biometrics.
* **Layout & Visual Structure:**
  * **Athlete Header Card:** Avatar, age, height, weight, BMI, primary athletic goal, and connected wearable badge (`Fitbit Sense 2 • Synced 12m ago`).
  * **Interactive Biometric Tabs:**
    * **Heart Rate & Strain Tab:** Daily resting heart rate trend line and percentage of time spent in Zones 1 through 5.
    * **Recovery & Sleep Tab:** Overlay comparing nightly sleep duration against perceived training readiness.
    * **Workout History Tab:** Comprehensive log of completed sets, weights, reps, and RPE ratings.
  * **Quick Adjust Actions:** Sticky header buttons: `[ Modify Today's Workout ]`, `[ Assign Deload Week ]`, `[ Send Direct Message ]`.

---

### Screen W-05: Training Plan Authoring Studio
* **Route:** `/portal/plans/builder`
* **Purpose:** Drag-and-drop workout creation studio with integrated exercise databases and AI recommendations.
* **Layout & Visual Structure:**
  * **Left Column (Exercise Library Browser):**
    * Search bar with filter chips: Muscle Group (Chest, Back, Legs), Equipment (Dumbbell, Barbell, Machine, Bodyweight), and Difficulty.
    * Draggable exercise cards powered by the ExerciseDB API integration with animated preview GIFs.
  * **Center Column (Interactive Workout Builder Canvas):**
    * Routine hierarchy: Week > Day > Exercise Block > Sets/Reps/Weight/RPE/Rest.
    * Drag-and-drop reordering of exercises with automatic rest interval inserts.
    * Volume summary badge: Live total calculated volume (`8,450 kg total load`).
  * **Right Column (AI Assistant & Volume Auditor):**
    * Real-time workload analysis: Flags muscle group imbalances (e.g., "Warning: Push volume exceeds pull volume by 40%").
    * AI Prompt suggestions: "Adjust volume for an intermediate athlete returning from a minor joint injury."
  * **Canvas Actions:** `[ Save as Template ]`, `[ Export PDF ]`, `[ Assign to Athlete ]`.

---

### Screen W-06: Plan Calendar & Batch Scheduling
* **Route:** `/portal/plans/schedule`
* **Purpose:** Multi-week master calendar to schedule and dispatch workouts to mobile devices.
* **Layout & Visual Structure:**
  * View toggles: `[ Day ]` `[ Week ]` `[ Month ]`.
  * Multi-athlete selector: Assign workout blocks to individual athletes, selected squads, or the entire roster.
  * Drag-and-drop calendar matrix: Drag saved workout templates directly onto calendar days.
  * Rest day and recovery conflict detection: Flags when an athlete has more than 3 consecutive high-strain sessions.
  * Primary Action: "Publish Schedule to Mobile Devices" (triggers mobile app push notifications).

---

### Screen W-07: Telemetry & Biometric Audit Desk
* **Route:** `/portal/analytics/telemetry`
* **Purpose:** Validate sensor data accuracy, compare athlete workloads, and export scientific training logs.
* **Layout & Visual Structure:**
  * **Comparative Chart Canvas:**
    * Multi-athlete line overlay comparing heart rate recovery curves across squad members.
    * Weekly training load vs. recovery score correlation scatter plot.
  * **Device Sync Health Table:**
    * Columns: Athlete, Device Provider (Apple Health, WHOOP, Fitbit, Garmin), Last Sync Timestamp, Battery Level, Sync Status.
  * **Data Export Drawer:**
    * Date range selector with CSV and Excel export formats for external sports science analysis.

---

### Screen W-08: Coach Communication & Review Hub
* **Route:** `/portal/messages`
* **Purpose:** Centralized desk to manage athlete questions, review form check videos, and deliver feedback.
* **Layout & Visual Structure:**
  * Split-pane communication layout:
    * **Left Pane (Athlete Thread List):** Unread badges, last message preview, and athlete recovery indicator dot.
    * **Center Pane (Active Conversation):** Full chat history supporting text, workout links, and video playback with scrubbing controls.
    * **Right Pane (Context Sidebar):** Displays the selected athlete's current training plan, last workout completion date, and recent heart rate stats without leaving the chat.
  * **Quick Feedback Macros:** One-click automated responses:
    * `[ "Form verified. Keep this weight for next session." ]`
    * `[ "High fatigue detected. Take an active recovery walk today." ]`
    * `[ "Reduce working weight by 10% to preserve form." ]`

---

### Screen W-09: Organization, Team Roles & System Settings
* **Route:** `/portal/settings`
* **Purpose:** Manage staff permissions, wearable API credentials, and coaching preferences.
* **Layout & Visual Structure:**
  * **Staff Management Table:** Add assistant trainers and assign athlete group permissions.
  * **API Configuration Panel:** Status indicators and credential keys for Fitbit API, WHOOP Developer API, Apple HealthKit services, and Garmin Connect IQ.
  * **Notification & Alert Thresholds:** Sliders to configure when automated overtraining emails and push alerts trigger.

---

## 6. Web Portal UX Flow & Edge Cases

### 6.1 Core Coach Workflow
`Coach Login (W-01)` ➔ `Review Morning Readiness on Dashboard (W-03)` ➔ `Inspect Flagged Athlete (W-04)` ➔ `Adjust Workout in Builder (W-05)` ➔ `Dispatch Update to Mobile (W-06)` ➔ `Send Feedback via Chat (W-08)`.

### 6.2 Web Edge Cases & Error Handling
* **Stale Wearable Data Warning:** When an athlete's wearable has not synced in over 24 hours, the portal displays a gray status badge with a "Request Manual Sync" action button that sends a mobile push reminder.
* **Concurrent Training Plan Edits:** If two trainers modify the same athlete's schedule simultaneously, the portal displays a conflict resolution modal showing both versions before saving.
* **Offline Network Safeguard:** If the coach loses internet access while building a routine, all changes are cached locally in the browser's IndexedDB, with an alert bar: "Offline — changes will sync once connection returns."