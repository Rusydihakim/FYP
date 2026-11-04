# AthleteFit Pro — Mobile UI/UX Design Specification (Stitch Edition)
# Scope: Athlete Mobile Experience & Coach Mobile Pitch-Side Experience
# Architecture: Multi-Sport Core Engine (Pilot Focus: Rugby Union & League)

## 1. System Vision & Architecture

AthleteFit Pro Mobile provides an integrated athletic performance environment for both players and coaches. Architected as a modular multi-sport platform, the application pairs universal physiological biometric tracking with sport-specific adapters (`rugby.config.ts`), with all training modules currently tailored to **Rugby**.

### Core Design Principles
* **Simple & Focused:** Eliminates cognitive clutter by breaking onboarding and training workflows into sequential, bite-sized screens rather than cramming multiple widgets onto a single page.
* **Energetic Athletic Aesthetic:** Uses the Gradient 04 athletic palette featuring Volt Lime (`#D8F878`), Electric Orchid (`#E47CB8`), Royal Violet (`#9448B0`), and Deep Indigo (`#332277`) over night-purple foundations to inspire energy, speed, and match-day intensity.
* **Role-Based Modularity:** Features distinct navigational shells for athletes and coaches within the same mobile codebase.
* **Immediate Value Delivery:** Connects wearable sensors and generates an initial position-specific rugby plan within three minutes of first launch.

---

## 2. Mobile System Functions

### 2.1 Athlete Mobile Functions
1. **User Registration & Authentication:** Secure sign-up and login via Supabase Auth.
2. **Sport Profile & Position Setup:** Configuration of rugby position (Forwards vs. Backs), experience level, and match day.
3. **AI-Driven Rugby Workout Recommendations:** Adaptive session generation calibrated to position, match countdown, and physiological recovery.
4. **Workout Logging & Session Tracking:** Interactive logging of sets, repetitions, weights, tonnage, and rest intervals.
5. **IoT Wearable Synchronization:** Automated background telemetry sync with Apple HealthKit, Android Health Connect, Fitbit Web API, and Garmin Connect IQ SDK.
6. **Progress Dashboards & Biometric Analytics:** Longitudinal tracking for strength tonnage, repeat sprint ability (Bronco test), resting heart rate, and sleep quality.
7. **Direct Coach Messaging:** In-app real-time communication for video form checks, workout sharing, and recovery feedback.

### 2.2 Coach Mobile Functions (All Web Features Except Registration)
1. **Coach Mobile Authentication:** Secure login and 2FA authentication using organization-provided credentials (self-registration is handled by web admin).
2. **Pitch-Side Squad Command Hub:** Rapid inspection of match countdown, squad availability percentage, and flagged player alerts.
3. **Mobile Squad Roster & Profile Inspection:** On-the-go lookup of individual player biometrics, recovery scores, and injury constraints.
4. **Quick Mobile Plan Builder & Editor:** Floor and pitch-side adjustments of sets, reps, and exercise swaps.
5. **Mobile Master Calendar & Plan Dispatch:** Batch scheduling and instant publication of match-week microcycles (MD-4 to MD+1) to player phones.
6. **Mobile Squad Telemetry Monitor:** Inspection of squad-wide heart rate zone distribution, high-speed running meters, and device sync health.
7. **Coach Communication Desk:** Direct player messaging with video scrubbing for scrum/tackle analysis and quick-response macros.

---

## 3. Data Requirements

### 3.1 Athlete Data Requirements
* **Account Credentials:** Full name, email, and encrypted password.
* **Physical Biometrics:** Age, biological sex, height, weight, and calculated BMI.
* **Sport & Position:** Primary sport (Rugby), positional group (Forwards vs. Backs), and specific position (e.g., Hooker, Fly-Half).
* **Training Context:** Playing level (Amateur to Semi-Pro), match day (Saturday standard), and equipment availability.
* **Safety & Injury Gates:** AC joint history, concussion watch status, and hamstring/groin tightness flags.
* **Wearable Tokens:** OAuth tokens for Apple HealthKit, Health Connect, Fitbit, WHOOP, or Garmin.
* **Coach Connection:** Optional 6-digit coach invite code.

### 3.2 Coach Mobile Data Requirements
* **Coach Credentials:** Staff email, password, and two-factor authentication token.
* **Active Squad Context:** Assigned squad identifier, positional filters, and match schedule.
* **Session Modification Inputs:** Adjusted working weight, modified repetitions, and exercise substitute selection.
* **Evaluation Tags:** Form validation notes, non-contact training tags, and return-to-play clearance flags.

---

## 4. Design System & Theme: Gradient 04 (Volt Lime, Orchid, Violet & Deep Indigo)

The visual system is derived from the **Gradient 04** core athletic palette:
* **Volt Lime (`#D8F878`):** High-visibility athletic accent for active CTAs, timers, and telemetry rings in dark mode.
* **Electric Orchid (`#E47CB8`):** Dynamic secondary accent for AI recommendation badges, heart rate zones, and recovery pills.
* **Royal Violet (`#9448B0`):** Strong contrast primary brand color in light mode and telemetry curve lines.
* **Deep Indigo (`#332277`):** Foundation dark canvas anchor, elevated card surfaces, and high-contrast light mode typography.

### 4.1 Core Color Tokens

| UI Token | Light Mode Hex | Dark Mode Hex | Interface Role & Application |
| :--- | :--- | :--- | :--- |
| **Primary Accent** | `#9448B0` (Royal Violet) | `#D8F878` (Volt Lime) | Primary action buttons, active tab indicators, match countdown rings |
| **Secondary Accent** | `#E47CB8` (Electric Orchid) | `#E47CB8` (Electric Orchid) | AI recommendation badges, secondary buttons, recovery trend curves |
| **Tertiary Accent** | `#332277` (Deep Indigo) | `#9448B0` (Royal Violet) | Chart comparison lines, progress bars, active chip borders |
| **App Background** | `#FAF8FD` (Soft Lilac Canvas) | `#160E33` (Night Indigo) | Root mobile canvas and background backdrop |
| **Card / Surface** | `#FFFFFF` (Pure White) | `#251852` (Elevated Indigo) | Workout cards, analytics tiles, input containers, bottom sheets |
| **Primary Text** | `#1E1545` (Midnight Indigo) | `#F5F2FC` (Ice Lilac) | Primary headings, workout titles, key metric numbers (`142 bpm`) |
| **Muted Text** | `#695696` (Slate Violet) | `#A898D0` (Muted Lavender) | Captions, axis labels, timestamps, measurement units (`reps`, `kg`, `kcal`) |
| **Border / Divider** | `#E6DCF5` (Soft Lilac Border) | `#422D85` (Border Purple) | Card strokes, input outlines, table dividers, graph gridlines |
| **Signature Gradient** | `linear-gradient(135deg, #D8F878, #E47CB8, #9448B0, #332277)` | Hero readiness banners, match-countdown cards, achievement badges |

### 4.2 Biometric & Squad Status Palette

| Telemetry State | Light Mode | Dark Mode | Interface Use Case |
| :--- | :--- | :--- | :--- |
| **Zone 1: Warm-Up / Recovery** | `#38BDF8` | `#38BDF8` | Resting heart rate, warm-up intervals, low strain |
| **Zones 2–3: Aerobic / Optimal** | `#16A34A` | `#4ADE80` | Target aerobic training zone, optimal pace, healthy sync |
| **Zone 4: Threshold / Anaerobic** | `#EA580C` | `#FB923C` | High intensity intervals, heart rate spikes, fatigue warnings |
| **Zone 5: Maximum Effort** | `#DC2626` | `#F87171` | Peak exertion warnings, sync error alerts, concussion flags |
| **Wearable Connected** | `#059669` | `#34D399` | Active IoT sensor connection |
| **Wearable Disconnected** | `#64748B` | `#94A3B8` | Device offline, seeking Bluetooth/API connection |

---
## 5. Mobile Application Screen Specifications

### Part A: Athlete Mobile Experience

#### Screen M-01: Splash & Welcome Gateway (`/welcome`)
* **Purpose:** Introduce the player with an energetic, modern impression.
* **Layout:** Night Indigo canvas (`#160E33`) with glowing Volt Lime (`#D8F878`) and Orchid (`#E47CB8`) pulse waves representing real-time telemetry. Headline: "AthleteFit Pro — Rugby Performance & Telemetry." Buttons: "Get Started" (Volt Lime `#D8F878` with `#1E1545` text) and "Log In" (Ghost border `#422D85`).

#### Screen M-02: Authentication (`/auth/login`, `/auth/register`)
* **Purpose:** Frictionless registration without unnecessary friction.
* **Layout:** Segmented pill toggle: `[ Sign Up ]` / `[ Log In ]`. Clean inputs for Email and Password, one-tap Apple/Google logins, and privacy reassurance footnote.

#### Screen M-03: Onboarding Step 1 — Personal Baseline (`/onboarding/step-1`)
* **Purpose:** Capture fundamental anthropometric parameters.
* **Layout:** Progress indicator: `● ○ ○ ○ ○` (Step 1 of 5). Tactile pickers for Age, Biological Sex, Height, and Weight with instant metric/imperial toggle and live computed BMI chip.

#### Screen M-04: Onboarding Step 2 — Position & Focus (`/onboarding/step-2`)
* **Purpose:** Segment player by positional demands.
* **Layout:** Progress indicator: `● ● ○ ○ ○` (Step 2 of 5). Positional toggle: `[ 🏉 Forwards Pack ]` vs. `[ ⚡ Backline ]`. Four focus cards: "Scrum & Maul Dominance", "Breakaway Acceleration & Top Speed", "Tackle Power & Durability", and "80-Minute Match Engine".

#### Screen M-05: Onboarding Step 3 — Equipment & Schedule (`/onboarding/step-3`)
* **Purpose:** Map training sessions to the weekly match schedule.
* **Layout:** Progress indicator: `● ● ● ○ ○` (Step 3 of 5). Multi-select gear chips (`Bodyweight`, `Dumbbells`, `Barbell/Plates`, `Full Gym`). Primary Match Day selector (Saturday default) and weekly training frequency dial (2 to 5 days).

#### Screen M-06: Onboarding Step 4 — Wearable Connection (`/onboarding/step-4`)
* **Purpose:** Authorize real-time telemetry tracking with one tap.
* **Layout:** Progress indicator: `● ● ● ● ○` (Step 4 of 5). Integration cards with live status badges: Apple Health, Android Health Connect, Fitbit, WHOOP, and Garmin Connect IQ. Skip option for players without devices.

#### Screen M-07: Onboarding Step 5 — Coach Link & Plan Gen (`/onboarding/step-5`)
* **Purpose:** Link to a rugby club coach and build the first tailored program.
* **Layout:** Progress indicator: `● ● ● ● ●` (Step 5 of 5). Input for 6-digit coach invite code. Primary button: "Generate My Rugby Plan 🚀". Calibrating animation: "Configuring positional volume... Calibrating heart rate zones... Plan ready!"

#### Screen M-08: Athlete Main Dashboard (`/app/home`)
* **Purpose:** Daily hub anchored to the upcoming match day.
* **Layout:**
  * Top bar: Player greeting, current date, and wearable sync badge (`● Synced 2m ago` in Volt Lime `#D8F878`).
  * Microcycle Banner: "Match Day -3: High-Velocity Power & Sprint Speed • Game vs. Harlequins in 3 Days".
  * Daily Readiness Card: Circular recovery ring, resting HR (`52 bpm`), sleep (`7h 55m`), and collision soreness score.
  * Today's Workout Card: "Backline Power & Repeat Sprint Intervals (MD-3) • 50 Mins • 5 Blocks • AI Adjusted".
  * Primary CTA: "Begin Rugby Session ➔" in Volt Lime `#D8F878` (Dark) / Royal Violet `#9448B0` (Light).
  * Match-Week Calendar Strip: Displays MD-4 (Heavy Load), MD-3 (Power/Speed), MD-2 (Taper), MD-1 (Captain's Run), MD (Match Day), MD+1 (Recovery Flush).
  * Bottom navigation: `[ Home ]` `[ Workouts ]` `[ Analytics ]` `[ Messages ]` `[ Profile ]`.

#### Screen M-09: Workout Execution & Biometric Logger (`/app/workout/active`)
* **Purpose:** Real-time gym and field tracking with live sensor feedback.
* **Layout:** High-contrast dark gym UI. Live biometric ribbon showing current HR (`168 bpm`), zone badge (`Zone 5: Max Effort`), and calories. Current Exercise Module: Video thumbnail for "Trap Bar Deadlift Jumps", set tracker (`Set 3 of 4 • 4 reps @ 85% 1RM`), and 4-way isometric neck hold sub-set. Integrated sprint repeat timer for anaerobic conditioning.

#### Screen M-10: Post-Workout Summary (`/app/workout/summary`)
* **Purpose:** Summarize effort with rugby-specific performance metrics.
* **Layout:** Celebration badge: "Rugby Session Complete! 🏉⚡". Metrics: Total Tonnage Lifted (`7,420 kg`), Repeat Sprint Average (`4.82s / 40m`), High-Speed Running Distance (`680m > 5.5 m/s`), Peak HR (`184 bpm`), and Time in Zone 5 (`8m 14s`). Action: "Save & Return to Dashboard".

#### Screen M-11: Performance Analytics (`/app/analytics`)
* **Purpose:** Longitudinal physiological tracking across the rugby season.
* **Layout:** Timeframe filters (`7D`, `1M`, `Season`). Interactive charts for Bronco Aerobic Test Progression, weekly high-speed running volume, resting heart rate trends, and device connection health drawer.

#### Screen M-12: Coach & Squad Direct Chat (`/app/messages`)
* **Purpose:** Direct communication channel for video review and pain checks.
* **Layout:** Dedicated thread with head coach. Quick actions: `[ Share Latest Workout ]`, `[ Send Tackle Form Video ]`, `[ Log Joint Pain ]`. Verification badge: "Coach verified your last workout • 1h ago".

#### Screen M-13: Athlete Profile & Settings (`/app/profile`)
* **Purpose:** Account management, positional changes, and wearable connections.
* **Layout:** Player avatar, position badge (`Flanker / Back Row`), active training streak (`🔥 18 Days`), linked club code, and dark/light mode toggle.

---

### Part B: Coach Mobile Experience (Pitch-Side & Gym Floor)

#### Screen CM-01: Coach Mobile Login & 2FA (`/coach/login`)
* **Purpose:** Fast, secure coach authentication without self-registration overhead.
* **Layout:** Dark Navy card with Club ID, Coach Email, Password, and 6-digit authenticator code inputs, supported by Face ID / biometric login.

#### Screen CM-02: Pitch-Side Squad Command Hub (`/coach/dashboard`)
* **Purpose:** Glanceable sideline operational status.
* **Layout:**
  * Match Countdown Banner: "MD-2 vs. Harlequins — 48h to Kickoff".
  * KPI Metric Grid: `32 Cleared`, `88% Forwards Ready`, `92% Backs Ready`, `2 Concussion Protocol Holds`.
  * Flagged Player Alert Strip: Highlighting athletes with recovery scores < 50% or abnormal resting heart rate spikes.
  * Bottom Coach Navigation: `[ Squad Hub ]` `[ Roster ]` `[ Plan Editor ]` `[ Telemetry ]` `[ Chat ]`.

#### Screen CM-03: Mobile Squad Roster (`/coach/roster`)
* **Purpose:** Instant player inspection from the gym floor or pitch.
* **Layout:** Segmented filter (`All`, `Forwards`, `Backs`), searchable player list cards showing photo, jersey number, position, recovery score ring, and action sheet trigger: `[ View Telemetry ]`, `[ Modify Workout ]`, `[ Message ]`.

#### Screen CM-04: Mobile Quick Plan Editor (`/coach/plans/editor`)
* **Purpose:** Rapid set/rep/weight adjustments during active training.
* **Layout:** Compact list of today's scheduled exercises, quick stepper buttons (`+2.5 kg`, `-5 kg`, `+1 rep`), and one-tap exercise substitution button linking to the ExerciseDB search modal.

#### Screen CM-05: Mobile Calendar & Plan Dispatch (`/coach/schedule`)
* **Purpose:** Fast scheduling and microcycle publication.
* **Layout:** Horizontal 7-day match-week pill selector (`MD-4` to `MD+1`), positional batch assignment buttons (`Apply to Forwards` / `Apply to Backs`), and a sticky "Publish to Squad" button.

#### Screen CM-06: Mobile Squad Telemetry Monitor (`/coach/telemetry`)
* **Purpose:** On-the-go inspection of squad physiological strain and wearable health.
* **Layout:** Stacked horizontal bar cards showing heart rate zone distributions across squad units, high-speed running meters, and wearable sync health dots (Green = Online, Gray = Stale).

#### Screen CM-07: Coach Communication Desk (`/coach/messages`)
* **Purpose:** Sideline messaging and video review.
* **Layout:** Unread thread list, full-screen chat with video thumbnail scrubbing for tackle form checks, and quick-reply action chips (`"Form Approved"`, `"Take Non-Contact Day"`).

---

## 6. Mobile UX Flow & Safety Guardrails

### 6.1 Athlete & Coach User Journeys
* **Athlete Daily Flow:** Open App ➔ Review Readiness on Dashboard (M-08) ➔ Launch Session (M-09) ➔ Log Sets & Live HR ➔ Summary & Feedback (M-10).
* **Coach Sideline Flow:** Open Coach Mobile (CM-01) ➔ Review Squad Alerts (CM-02) ➔ Inspect Flagged Player (CM-03) ➔ Adjust Session (CM-04) ➔ Dispatch Update to Mobile.

### 6.2 Safety Guardrails
* **Concussion & Collision Safety Gate:** Logging head impact discomfort or severe neck pain automatically disables contact drills and alerts the coach.
* **Offline Workout Logging:** Field and gym sessions cache locally in SQLite, automatically syncing when connectivity returns.
* **Heart Rate Safety Alert:** Continuous pulse exceeding 220 - age for over two minutes triggers an amber warning requiring a mandatory rest interval.
