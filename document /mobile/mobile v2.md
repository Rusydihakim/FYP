# AthleteFit Pro — Mobile UI/UX Design Specification (Rugby Edition)

## 1. Design Vision & Core Principles

AthleteFit Pro Mobile delivers tailored rugby athletic development to club, university, and amateur players. It combines AI program adaptation with IoT sensor telemetry to optimize collision readiness, repeat sprint ability, and match-day peaking.

### Core Design Principles
* **Energetic Athletic Atmosphere:** High-contrast slate surfaces paired with vibrant Digital Cyan and Cobalt Blue accents to convey speed, impact, and athletic precision.
* **Frictionless Progressive Disclosure:** Divides onboarding, positional profiling, and workout logging into bite-sized screens rather than overwhelming the player with a single dense form.
* **Immediate Value Delivery:** Connects wearable sensors and generates an initial position-specific rugby program within three minutes of first launch.
* **Glanceable Telemetry:** Translates complex physiological data (heart rate zones, recovery scores, calorie burns) into clear, color-coded widgets and progress rings.

---

## 2. Mobile System Functions

1. **User Authentication & Authorization:** Secure registration, login, and credential management via Supabase Auth.
2. **Rugby Profile Management:** Setup and maintenance of positional attributes, physical metrics, and playing level.
3. **AI-Driven Rugby Workout Recommendation:** Automated generation of daily training sessions calibrated to player position, match schedule, and physiological readiness.
4. **Workout Logging & Session Tracking:** Interactive logging of sets, repetitions, working tonnage, and rest intervals.
5. **IoT Wearable Synchronization:** Background data ingestion from Apple HealthKit, Android Health Connect, Fitbit Web API, and Garmin Connect IQ SDK.
6. **Progress Dashboards & Biometric Analytics:** Visual trend tracking for strength progress, weekly workout volume, resting heart rate, and sleep quality.
7. **Direct Coach & Support Messaging:** In-app real-time communication for video form checks, plan adjustments, and recovery feedback.

---

## 3. First-Time Player Data Requirements

| Data Category | Required Fields | System Purpose & AI Role |
| :--- | :--- | :--- |
| **Account Credentials** | Email, Password, Full Name | Authenticates player identity via Supabase Auth. |
| **Physical Biometrics** | Age, Biological Sex, Height, Weight | Computes baseline BMI, resting metabolic rate, and maximum heart rate ($220 - \text{age}$). |
| **Playing Position** | Prop, Hooker, Lock, Back Row, Halves, Center, Outside Back | Segregates training between Forward pack demands and Backline speed profiles. |
| **Playing Level** | Club Amateur, University/Collegiate, Semi-Pro, Representative | Calibrates baseline workout volume, movement complexity, and collision tolerance. |
| **Primary Rugby Target** | Contact Durability, Repeat Sprint Speed, Scrum Power, Engine/RSA | Directs whether workouts emphasize heavy strength, sprint mechanics, or aerobic capacity. |
| **Match-Day Schedule** | Primary Match Day (e.g., Saturday), Training Days (e.g., Tue/Thu) | Generates the automated match-week microcycle (MD-4 through MD+1). |
| **Equipment Inventory** | Bodyweight Only, Home Setup (Dumbbells/Bands), Full Commercial Gym | Restricts exercise selection to available gym and field gear. |
| **Injury & Safety History** | AC Joint Issues, Concussion History, Hamstring/Groin Tightness | Enforces automatic safety gates, neck isometric minimums, and load caps. |
| **Wearable Authorization** | HealthKit / Health Connect / Fitbit / WHOOP OAuth Tokens | Streams continuous heart rate, sleep duration, active calories, and steps. |
| **Coach Link Code** | Optional 6-Digit Coach Invite Code | Links the player's account to an assigned coach's roster. |

---

## 4. Design System & Theme: Category 2 (Digital Cyan & Cobalt)

### 4.1 Core Color Tokens

| UI Token | Light Mode Hex | Dark Mode Hex | Interface Application & Roles |
| :--- | :--- | :--- | :--- |
| **Primary Accent** | `#0284C7` (Cobalt Sky) | `#38BDF8` (Digital Cyan) | Primary action buttons, active tab indicators, progress rings, telemetry lines |
| **Secondary Accent** | `#6366F1` (Indigo Glow) | `#818CF8` (Soft Violet) | AI recommendation badges, secondary buttons, recovery trend lines |
| **App Background** | `#F8FAFC` (Slate Canvas) | `#0A0E1A` (Deep Tech Navy) | Root application canvas and screen backdrop |
| **Card / Surface** | `#FFFFFF` (Pure White) | `#131C2E` (Elevated Navy) | Workout cards, analytics tiles, input containers, bottom sheets |
| **Primary Text** | `#0F172A` (Midnight Slate) | `#F1F5F9` (Ice White) | Primary headings, workout titles, key metric numbers (`142 bpm`) |
| **Muted Text** | `#64748B` (Cool Slate) | `#8CA3BA` (Muted Steel) | Captions, axis labels, timestamps, measurement units (`reps`, `kg`, `kcal`) |
| **Border / Divider** | `#E2E8F0` (Border Gray) | `#1E293B` (Border Navy) | Card strokes, input outlines, table dividers, graph gridlines |

### 4.2 Biometric Status Palette

| Telemetry State | Light Mode | Dark Mode | Interface Use Case |
| :--- | :--- | :--- | :--- |
| **Zone 1: Warm-Up / Recovery** | `#0284C7` | `#38BDF8` | Resting heart rate, warm-up intervals, low strain |
| **Zones 2–3: Aerobic / Optimal** | `#16A34A` | `#4ADE80` | Target aerobic training zone, optimal pace, successful sync |
| **Zone 4: Threshold / Anaerobic** | `#EA580C` | `#FB923C` | High intensity intervals, heart rate spikes |
| **Zone 5: Maximum Effort** | `#DC2626` | `#F87171` | Peak exertion warnings, sync error alerts |
| **Wearable Connected** | `#059669` | `#34D399` | Active IoT sensor connection |
| **Wearable Disconnected** | `#64748B` | `#94A3B8` | Device offline, seeking Bluetooth/API connection |

---

## 5. Mobile Application: Page-by-Page Specifications

### Screen M-01: Splash & Welcome Gateway
* **Route:** `/welcome`
* **Purpose:** Introduce the player with an energetic rugby aesthetic.
* **Layout & Visual Structure:** Dark Mode Navy canvas (`#0A0E1A`) with glowing Digital Cyan pulse waves representing real-time telemetry. Bold title: "AthleteFit Pro — Rugby Performance & Telemetry." Sticky bottom CTAs: "Get Started" (Primary Solid Cyan) and "Log In" (Ghost border).

### Screen M-02: Authentication (Login & Sign-Up)
* **Route:** `/auth/login` and `/auth/register`
* **Purpose:** Frictionless registration without unnecessary steps.
* **Layout & Visual Structure:** Segmented pill toggle: `[ Sign Up ]` / `[ Log In ]`. Clean inputs for Email and Password, one-tap Apple/Google logins, and privacy reassurance footnote.

### Screen M-03: Onboarding Step 1 — Personal Baseline & Biometrics
* **Route:** `/onboarding/step-1`
* **Purpose:** Capture fundamental anthropometric parameters.
* **Layout & Visual Structure:** Progress indicator: `● ○ ○ ○ ○` (Step 1 of 5). Tactile sliders for Age, Biological Sex, Height, and Weight with instant metric/imperial toggle and live computed BMI chip.

### Screen M-04: Onboarding Step 2 — Position & Rugby Focus
* **Route:** `/onboarding/step-2`
* **Purpose:** Categorize player by positional demands.
* **Layout & Visual Structure:** Progress indicator: `● ● ○ ○ ○` (Step 2 of 5). Header: "Select Your Position & Focus." Positional toggle: `[ 🏉 Forwards Pack ]` vs. `[ ⚡ Backline ]`. Four selectable focus cards: "Scrum & Maul Dominance", "Breakaway Acceleration & Top Speed", "Tackle Power & Durability", and "80-Minute Match Engine".

### Screen M-05: Onboarding Step 3 — Equipment & Match-Week Split
* **Route:** `/onboarding/step-3`
* **Purpose:** Map training sessions to the team's weekly match schedule.
* **Layout & Visual Structure:** Progress indicator: `● ● ● ○ ○` (Step 3 of 5). Multi-select gear chips (`Bodyweight`, `Dumbbells`, `Barbell/Plates`, `Full Gym`). Primary Match Day selector (Saturday default) and weekly training frequency dial (2 to 5 days).

### Screen M-06: Onboarding Step 4 — Wearable & IoT Sensor Connection
* **Route:** `/onboarding/step-4`
* **Purpose:** Authorize real-time telemetry tracking with one tap.
* **Layout & Visual Structure:** Progress indicator: `● ● ● ● ○` (Step 4 of 5). Integration cards with live status chips: Apple Health, Android Health Connect, Fitbit, WHOOP, and Garmin Connect IQ. Skip option for players without devices.

### Screen M-07: Onboarding Step 5 — Coach Link & Plan Generation
* **Route:** `/onboarding/step-5`
* **Purpose:** Link to a rugby club trainer and build the first tailored program.
* **Layout & Visual Structure:** Progress indicator: `● ● ● ● ●` (Step 5 of 5). Input for 6-digit coach invite code. Primary button: "Generate My Rugby Plan 🚀". Lottie animation: "Analyzing positional demands... Calibrating heart rate zones... Plan ready!"

### Screen M-08: Main Dashboard (Match-Week Microcycle View)
* **Route:** `/app/home`
* **Purpose:** Daily hub anchored to the upcoming match day.
* **Layout & Visual Structure:**
  * Top bar: Player greeting, current date, and wearable sync badge (`● Synced 2m ago`).
  * Microcycle Banner: "Match Day -3: High-Velocity Power & Sprint Speed • Game vs. Harlequins in 3 Days".
  * Daily Readiness Card: Circular recovery ring, resting HR (`52 bpm`), sleep (`7h 55m`), and collision soreness score.
  * Today's Workout Card: "Backline Power & Repeat Sprint Intervals (MD-3) • 50 Mins • 5 Blocks • AI Adjusted".
  * Primary CTA: "Begin Rugby Session ➔" in solid Digital Cyan.
  * Match-Week Calendar Strip: Displays MD-4 (Heavy Load), MD-3 (Power/Speed), MD-2 (Taper), MD-1 (Captain's Run), MD (Match Day), MD+1 (Recovery Flush).
  * Bottom navigation: `[ Home ]` `[ Workouts ]` `[ Analytics ]` `[ Messages ]` `[ Profile ]`.

### Screen M-09: Workout Execution & Live Biometric Logger
* **Route:** `/app/workout/active`
* **Purpose:** Real-time gym and field tracking with live sensor feedback.
* **Layout & Visual Structure:**
  * High-contrast dark gym UI. Live biometric ribbon showing current HR (`168 bpm`), zone badge (`Zone 5: Max Effort`), and calories.
  * Current Exercise Module: Video thumbnail for "Trap Bar Deadlift Jumps" or "Heavy Sled Drive", set tracker (`Set 3 of 4 • 4 reps @ 85% 1RM`), and 4-way isometric neck hold sub-set.
  * Integrated sprint repeat timer for anaerobic conditioning. End session button.

### Screen M-10: Post-Workout Summary & Match Readiness
* **Route:** `/app/workout/summary`
* **Purpose:** Reinforce effort with rugby-specific performance metrics.
* **Layout & Visual Structure:** Celebration badge: "Rugby Session Complete! 🏉⚡". Metrics: Total Tonnage Lifted (`7,420 kg`), Repeat Sprint Average (`4.82s / 40m`), High-Speed Running Distance (`680m > 5.5 m/s`), Peak HR (`184 bpm`), and Time in Zone 5 (`8m 14s`). Action: "Save & Return to Dashboard".

### Screen M-11: Performance Analytics & Rugby Telemetry
* **Route:** `/app/analytics`
* **Purpose:** Long-term physiological tracking across the rugby season.
* **Layout & Visual Structure:** Timeframe filters (`7D`, `1M`, `Season`). Interactive charts for Bronco Aerobic Test Progression, weekly high-speed running volume, resting heart rate trends, and device connection health drawer.

### Screen M-12: Coach & Squad Direct Chat
* **Route:** `/app/messages`
* **Purpose:** Direct communication with coaching staff for video review and pain checks.
* **Layout & Visual Structure:** Dedicated thread with head coach. Quick actions: `[ Share Latest Workout ]`, `[ Send Tackle Form Video ]`, `[ Log Joint Pain ]`. Verification badge: "Coach verified your last workout • 1h ago".

### Screen M-13: Player Profile & Device Settings
* **Route:** `/app/profile`
* **Purpose:** Account management, positional changes, and wearable connections.
* **Layout & Visual Structure:** Player avatar, position badge (`Flanker / Back Row`), active training streak (`🔥 18 Days`), linked club code, and dark/light mode toggle.

---

## 6. Mobile UX Flow & Safety Guardrails

### 6.1 Complete Player Journey
`Welcome (M-01)` ➔ `Sign Up (M-02)` ➔ `Biometrics (M-03)` ➔ `Position (M-04)` ➔ `Match Schedule (M-05)` ➔ `Wearables (M-06)` ➔ `Coach Code (M-07)` ➔ `Match-Day Dashboard (M-08)` ➔ `Live Active Session (M-09)` ➔ `Summary & Feedback (M-10)`.

### 6.2 Safety Guardrails & Edge Cases
* **Concussion & Collision Safety Gate:** If a player logs head impact discomfort or extreme neck soreness, contact exercises are locked out and an immediate alert is dispatched to the team coach.
* **Offline Workout Logging:** Gym and pitch sessions record offline via SQLite, automatically syncing when connectivity returns.
* **Heart Rate Safety Alert:** Continuous pulse exceeding $220 - \text{age}$ for over two minutes triggers an amber warning requiring a mandatory rest interval.