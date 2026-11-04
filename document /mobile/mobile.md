# AthleteFit Pro — Mobile UI/UX Design Specification (Stitch Edition)

## 1. Design Vision & Core Principles

AthleteFit Pro bridges the gap between amateur fitness enthusiasts and professional-grade training using AI workout personalization and IoT wearable telemetry. This specification establishes a mobile-first, multi-screen blueprint engineered to be simple, energetic, and completely frictionless for first-time users.

### Core Design Principles
* **Energetic Athletic Atmosphere:** High-contrast slate surfaces paired with vibrant Digital Cyan and Cobalt Blue accents to evoke precision, speed, and athletic performance.
* **Frictionless Progressive Disclosure:** Divides onboarding, profile setup, and workout logging into focused, single-action screens rather than cramming multiple forms into an overwhelming single page.
* **Immediate Value Delivery:** Connects wearable sensors and generates an initial baseline workout plan within three minutes of first launch.
* **Glanceable Telemetry:** Translates complex physiological data (heart rate zones, recovery scores, calorie burns) into simple, color-coded widgets and progress rings.

---

## 2. Mobile System Functions

1. **User Authentication & Authorization:** Secure registration, login, and credential management via Supabase Auth.
2. **User Profile Management:** Setup and maintenance of personal details, physical attributes, and athletic preferences.
3. **AI-Driven Workout Recommendation:** Dynamic generation of daily workout plans tailored to user goals, available equipment, and physiological recovery status.
4. **Workout Logging & Session Tracking:** Interactive logging of sets, repetitions, weights, and rest interval timers.
5. **IoT Wearable Synchronization:** Seamless background sync with Apple HealthKit, Android Health Connect, Fitbit Web API, and Garmin Connect IQ SDK.
6. **Progress Dashboards & Biometric Analytics:** Visual trend tracking for strength progress, weekly workout volume, resting heart rate, and sleep quality.
7. **Direct Coach & Support Messaging:** In-app real-time communication for exercise form checks, plan adjustments, and feedback.

---

## 3. First-Time User Data Requirements

To initialize the AI recommendation engine and establish baseline telemetry, the mobile onboarding sequence collects data across structured tiers:

| Data Category | Required Fields | System Purpose & AI Role |
| :--- | :--- | :--- |
| **Account Credentials** | Email, Password, Full Name | Authenticates user identity via Supabase Auth. |
| **Physical Biometrics** | Age, Biological Sex, Height, Weight | Calculates baseline BMI, resting metabolic rate, and maximum heart rate (220 - age). |
| **Fitness Experience** | Experience Tier (Novice, Intermediate, Amateur Athlete) | Calibrates baseline workout volume, movement complexity, and progression pacing. |
| **Primary Goal** | Strength, Cardiovascular Endurance, Speed/Agility, Weight Loss | Directs the recommendation engine's periodization and exercise taxonomy. |
| **Equipment Inventory** | Bodyweight Only, Home Setup (Dumbbells/Bands), Full Commercial Gym | Restricts exercise selection to gear the user actually has on hand. |
| **Schedule & Availability** | Preferred Days (2–6 days/week), Session Length (20–90 min) | Establishes the weekly training split and calendar rest intervals. |
| **Physical Constraints** | Joint Limitations, Chronic Pain, Medical Notes | Excludes contraindicated movements and flags warnings for reviewing coaches. |
| **Wearable Authorization** | HealthKit / Health Connect / Fitbit / WHOOP OAuth Tokens | Streams continuous heart rate, sleep duration, active calories, and steps. |
| **Coach Association** | Optional Coach Invite Code | Links the athlete's account to an assigned trainer. |

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

### 4.2 Universal Biometric Status Palette

| Telemetry State | Light Mode | Dark Mode | Interface Use Case |
| :--- | :--- | :--- | :--- |
| **Zone 1: Warm-Up / Recovery** | `#0284C7` | `#38BDF8` | Resting heart rate, warm-up intervals, low strain |
| **Zones 2–3: Aerobic / Optimal** | `#16A34A` | `#4ADE80` | Target aerobic training zone, optimal pace, successful sync |
| **Zone 4: Threshold / Anaerobic** | `#EA580C` | `#FB923C` | High intensity intervals, heart rate spikes |
| **Zone 5: Maximum Effort** | `#DC2626` | `#F87171` | Peak exertion warnings, sync error alerts |
| **Wearable Connected** | `#059669` | `#34D399` | Active IoT sensor connection |
| **Wearable Disconnected** | `#64748B` | `#94A3B8` | Device offline, seeking Bluetooth/API connection |

### 4.3 Typography Scale
* **Display Bold (32pt / 38pt line-height):** Welcome headers, key metric milestones.
* **Heading 1 (24pt / 30pt line-height):** Screen titles, workout module headers.
* **Heading 2 (18pt / 24pt line-height):** Card titles, section headers.
* **Body Regular (15pt / 22pt line-height):** Descriptions, instructions, coach messages.
* **Metric Bold (20pt / 24pt line-height):** Heart rate numbers, calorie counts, timers.
* **Caption / Label (12pt / 16pt line-height):** Timestamps, sensor indicators, badge text.

---

## 5. Mobile Application: Page-by-Page Specifications

### Screen M-01: Splash & Welcome Gateway
* **Route:** `/welcome`
* **Purpose:** Introduce the athlete to AthleteFit Pro with an energetic, modern first impression.
* **Layout & Visual Structure:**
  * Dark Mode Navy canvas (`#0A0E1A`) with glowing Digital Cyan pulse waves representing real-time telemetry.
  * Headline: "AthleteFit Pro — Smart Training. Real-Time Telemetry."
  * Sticky bottom buttons: "Get Started" (Primary Solid Cyan) and "Log In" (Ghost border).

### Screen M-02: Authentication (Login & Sign-Up)
* **Route:** `/auth/login` and `/auth/register`
* **Purpose:** Deliver frictionless account creation without clutter.
* **Layout & Visual Structure:**
  * Segmented pill control: `[ Sign Up ]` / `[ Log In ]`.
  * Clean input fields with floating labels: Email Address and Password.
  * One-tap social buttons: Apple ID and Google Account.
  * Reassurance footnote: "Your biometric and personal data is encrypted and private."

### Screen M-03: Onboarding Step 1 — Personal Baseline
* **Route:** `/onboarding/step-1`
* **Purpose:** Collect essential physiological measurements without overwhelming the user.
* **Layout & Visual Structure:**
  * Progress indicator: `● ○ ○ ○ ○` (Step 1 of 5).
  * Header: "Let's dial in your baseline metrics."
  * Large interactive pickers:
    * Age picker (Years).
    * Biological Sex selector (segmented pill: Male / Female / Prefer not to say).
    * Height & Weight twin-picker with instant unit toggle (`kg/cm` vs. `lbs/in`).
    * Real-time computed BMI indicator chip with a subtle green/cyan status tint.
  * Sticky bottom CTA: "Continue".

### Screen M-04: Onboarding Step 2 — Goal & Athletic Level
* **Route:** `/onboarding/step-2`
* **Purpose:** Capture user targets and fitness background.
* **Layout & Visual Structure:**
  * Progress indicator: `● ● ○ ○ ○` (Step 2 of 5).
  * Header: "What is your primary training target?"
  * Selectable visual cards with high-contrast icons:
    * `[ ⚡ Build Strength & Muscle ]`
    * `[ 🏃 Improve Cardiovascular Endurance ]`
    * `[ 🔥 Athletic Conditioning & Fat Loss ]`
    * `[ 🎯 General Health & Mobility ]`
  * Athletic tier selector below: Novice, Intermediate, or Amateur Athlete.

### Screen M-05: Onboarding Step 3 — Equipment & Schedule Split
* **Route:** `/onboarding/step-3`
* **Purpose:** Ensure suggested workouts only demand accessible equipment.
* **Layout & Visual Structure:**
  * Progress indicator: `● ● ● ○ ○` (Step 3 of 5).
  * Header: "Where and how do you train?"
  * Multi-select equipment chips:
    * `[✓ Bodyweight Only]` `[✓ Dumbbells]` `[ Resistance Bands ]` `[ Barbell & Plates ]` `[ Full Gym ]`.
  * Weekly frequency selector: Interactive dial for 2, 3, 4, 5, or 6 days per week.
  * Target workout duration: Segmented control (`20 min`, `45 min`, `60 min`).

### Screen M-06: Onboarding Step 4 — Wearable & IoT Sensor Connection
* **Route:** `/onboarding/step-4`
* **Purpose:** Authorize real-time biometric tracking with one tap.
* **Layout & Visual Structure:**
  * Progress indicator: `● ● ● ● ○` (Step 4 of 5).
  * Header: "Connect Your Wearables."
  * Provider Integration Cards with live status badges:
    * **Apple Health / HealthKit:** `[ Connect Apple Health ]`
    * **Android Health Connect:** `[ Connect Health Connect ]`
    * **Fitbit API:** `[ Connect Fitbit ]`
    * **WHOOP API:** `[ Connect WHOOP ]`
    * **Garmin Connect IQ:** `[ Connect Garmin ]`
  * Action: "Skip for now" link for users without devices; primary "Continue" button once connected.

### Screen M-07: Onboarding Step 5 — Coach Link & Final Setup
* **Route:** `/onboarding/step-5`
* **Purpose:** Optionally pair with a human coach and build the initial AI program.
* **Layout & Visual Structure:**
  * Progress indicator: `● ● ● ● ●` (Step 5 of 5).
  * Header: "Training with a Coach?"
  * Clean text input: "Enter 6-digit Coach Invite Code (Optional)".
  * Primary Button: "Generate My AI Plan 🚀".
  * Calibrating screen animation: "Analyzing baseline... Calibrating heart rate zones... Plan ready!"

### Screen M-08: Main Dashboard (Today's Training & Live Telemetry)
* **Route:** `/app/home`
* **Purpose:** Daily command hub highlighting today's workout and physical recovery.
* **Layout & Visual Structure:**
  * **Top Bar:** Athlete greeting, current date, and wearable sync badge (`● Synced 2m ago` in Cyan `#38BDF8`).
  * **Daily Readiness Hero Card:**
    * Circular recovery ring with recovery score (e.g., `88% Readiness — Prime for High Intensity`).
    * Metric pills: Resting HR (`56 bpm`), Sleep (`7h 42m`), Calorie Goal (`450 / 650 kcal`).
  * **Today's Recommended Workout Card:**
    * Energetic card banner: "Upper Body Hypertrophy & Aerobic Flush".
    * Duration and exercise count: `45 Mins • 6 Exercises • AI Adapted`.
    * Large Primary CTA: "Start Workout ➔" in solid Digital Cyan.
  * **Weekly Calendar Strip:** 7-day pill strip showing completed, rest, and scheduled days.
  * **Bottom Navigation Bar:** `[ Home ]` `[ Workouts ]` `[ Analytics ]` `[ Messages ]` `[ Profile ]`.

### Screen M-09: Workout Execution & Live Biometric Logger
* **Route:** `/app/workout/active`
* **Purpose:** Guide the athlete during active exercise with real-time biometric feedback.
* **Layout & Visual Structure:**
  * High-contrast, glare-free dark UI designed for active gym use.
  * **Live Biometric Ribbon (Top):** Current heart rate (`152 bpm`), dynamic heart rate zone tag (`Zone 4: Anaerobic` in `#FB923C`), active calories burned.
  * **Current Exercise Card:**
    * Exercise name with video looping thumbnail (e.g., "Barbell Incline Press").
    * Set Tracker: `Set 2 of 4 • Target: 10 reps @ 60 kg`.
    * Interactive numeric steppers for Reps and Weight.
    * Quick completion button: `[ ✓ Complete Set ]`.
  * **Smart Rest Timer:** Automated countdown ring that initiates between sets, with haptic alerts when rest expires.
  * **End Workout Button:** Sticky bottom button prompting session summary.

### Screen M-10: Post-Workout Summary & Achievement Screen
* **Route:** `/app/workout/summary`
* **Purpose:** Provide positive reinforcement, effort analytics, and sync confirmation.
* **Layout & Visual Structure:**
  * Energetic celebration badge: "Workout Complete! ⚡".
  * Summary Metric Grid: Total Time (`48:12`), Average HR (`144 bpm`), Peak HR (`178 bpm`), Volume Lifted (`6,240 kg`), Calories (`412 kcal`).
  * Heart Rate Zone Bar: Stacked horizontal bar chart showing minutes spent across Zones 1 through 5.
  * Coach note input box: "Add a quick note for your coach..."
  * Primary Action: "Save & Return to Dashboard".

### Screen M-11: Performance Analytics & Wearable Telemetry
* **Route:** `/app/analytics`
* **Purpose:** Deep dive into physiological trends and long-term athletic progression.
* **Layout & Visual Structure:**
  * Timeframe selector: `[ 7D ]` `[ 1M ]` `[ 3M ]` `[ 1Y ]`.
  * Metric Cards with interactive trend lines:
    * Weekly Workout Consistency & Volume.
    * Resting Heart Rate Progression (trending downward).
    * Sleep Duration vs. Training Strain correlation chart.
  * IoT Device Health Drawer: Shows connected devices, battery percentage, and manual "Force Sync" button.

### Screen M-12: Coach & Support Direct Chat
* **Route:** `/app/messages`
* **Purpose:** Direct communication channel for workout form checks and coach guidance.
* **Layout & Visual Structure:**
  * Dedicated chat thread with trainer or AI training assistant.
  * Quick-share action buttons: `[ Share Latest Workout ]`, `[ Send Form Video ]`, `[ Log Pain/Discomfort ]`.
  * Clean chat bubbles: Light surface for athlete, Cobalt Blue tint for coach responses.
  * Status indicator: "Coach verified your last workout • 1h ago".

### Screen M-13: Athlete Profile & Device Settings
* **Route:** `/app/profile`
* **Purpose:** Manage account settings, equipment updates, and wearable connections.
* **Layout & Visual Structure:**
  * User avatar, tier badge (`Amateur Athlete`), and current streak counter (`🔥 14 Days`).
  * Menu List:
    * My Physical Profile & BMI Calculator.
    * Equipment & Gym Setup.
    * Connected Wearable Accounts (Apple Health, WHOOP, Fitbit).
    * Linked Coach Details & Code.
    * Dark / Light Theme Toggle.

---

## 6. UX Flow & Edge Case Handling

### 6.1 Complete Athlete Journey
`Welcome (M-01)` ➔ `Sign Up (M-02)` ➔ `Baseline Metrics (M-03)` ➔ `Goals (M-04)` ➔ `Equipment (M-05)` ➔ `Wearables (M-06)` ➔ `Coach Code (M-07)` ➔ `Instant Dashboard & Plan Ready (M-08)` ➔ `Live Active Workout (M-09)` ➔ `Post-Workout Summary (M-10)`.

### 6.2 Edge Cases & Safety Guardrails
* **Wearable Disconnected / Bluetooth Off:** An unobtrusive banner states "Wearable offline. Workouts will be logged using estimated caloric models," with manual fallback entry for duration and perceived exertion (RPE).
* **Offline Workout Logging:** The mobile app caches set completions and sensor samples locally via SQLite/async storage, syncing automatically once connectivity returns.
* **Incomplete Onboarding:** Onboarding state caches at each step; returning users resume directly at their unfinished step with a friendly greeting.
* **Heart Rate Safety Alert:** If continuous pulse exceeds $220 - \text{age}$ for over two minutes, the active workout screen turns amber with an alert prompting an immediate rest interval.