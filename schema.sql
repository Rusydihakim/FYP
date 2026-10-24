-- =============================================================================
-- AthleteFit Pro Database Schema (PostgreSQL / Supabase)
-- Multi-Sport Performance Engine with Rugby Pilot Configuration
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------------------------
-- ENUMS & CUSTOM TYPES
-- -----------------------------------------------------------------------------
CREATE TYPE user_role AS ENUM ('athlete', 'coach', 'head_coach', 'physio', 'admin');
CREATE TYPE biological_sex AS ENUM ('male', 'female', 'other');
CREATE TYPE sport_code AS ENUM ('rugby_union', 'rugby_league', 'football', 'basketball', 'general_fitness');
CREATE TYPE positional_unit AS ENUM ('forwards', 'backs', 'neutral');
CREATE TYPE training_level AS ENUM ('novice', 'intermediate', 'amateur_club', 'semi_pro', 'representative');
CREATE TYPE readiness_state AS ENUM ('optimal', 'attention', 'critical_hold');
CREATE TYPE session_status AS ENUM ('scheduled', 'in_progress', 'completed', 'skipped');
CREATE TYPE wearable_provider AS ENUM ('apple_health', 'whoop', 'fitbit', 'garmin', 'health_connect');
CREATE TYPE message_type AS ENUM ('text', 'video_form_check', 'workout_share', 'coach_macro');

-- -----------------------------------------------------------------------------
-- MODULE 1: ORGANIZATIONS, ROLES & SQUADS
-- -----------------------------------------------------------------------------

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    crest_url TEXT,
    primary_sport sport_code DEFAULT 'rugby_union',
    invite_code VARCHAR(12) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role user_role DEFAULT 'athlete',
    preferred_theme VARCHAR(10) DEFAULT 'dark',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE organization_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'athlete',
    is_active BOOLEAN DEFAULT TRUE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, user_id)
);

CREATE TABLE squads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- e.g., 'First XV', 'Academy Squad', 'Forwards Unit'
    unit_type positional_unit DEFAULT 'neutral',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE squad_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    squad_id UUID NOT NULL REFERENCES squads(id) ON DELETE CASCADE,
    athlete_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    jersey_number INTEGER,
    position_title VARCHAR(50), -- e.g., 'Loosehead Prop', 'Fly-Half'
    is_active BOOLEAN DEFAULT TRUE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(squad_id, athlete_id)
);

-- -----------------------------------------------------------------------------
-- MODULE 2: ATHLETE PROFILES, BIOMETRICS & SAFETY
-- -----------------------------------------------------------------------------

CREATE TABLE athlete_profiles (
    user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    birth_date DATE NOT NULL,
    sex biological_sex NOT NULL,
    height_cm NUMERIC(5,2) NOT NULL,
    weight_kg NUMERIC(5,2) NOT NULL,
    bmi NUMERIC(4,2) GENERATED ALWAYS AS (weight_kg / ((height_cm / 100.0) ^ 2)) STORED,
    baseline_max_hr INTEGER GENERATED ALWAYS AS (220 - EXTRACT(YEAR FROM AGE(birth_date))::INTEGER) STORED,
    sport_id sport_code DEFAULT 'rugby_union',
    position_group positional_unit NOT NULL DEFAULT 'backs',
    primary_position VARCHAR(50) NOT NULL, -- 'Hooker', 'Flanker', 'Inside Center'
    playing_tier training_level DEFAULT 'amateur_club',
    equipment_access TEXT[] DEFAULT ARRAY['bodyweight'],
    match_day_default VARCHAR(20) DEFAULT 'Saturday',
    weekly_frequency INTEGER DEFAULT 4,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE athlete_injuries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    athlete_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    injury_name VARCHAR(150) NOT NULL, -- 'AC Joint Sprain', 'Hamstring Strain'
    body_part VARCHAR(100) NOT NULL,
    is_concussion BOOLEAN DEFAULT FALSE,
    contact_cleared BOOLEAN DEFAULT FALSE,
    rtp_stage VARCHAR(50) DEFAULT 'Stage 1: Rest', -- Return to play stage
    notes TEXT,
    reported_at TIMESTAMPTZ DEFAULT NOW(),
    cleared_at TIMESTAMPTZ
);

-- -----------------------------------------------------------------------------
-- MODULE 3: WEARABLES, TELEMETRY & RECOVERY LOGS
-- -----------------------------------------------------------------------------

CREATE TABLE wearable_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    provider wearable_provider NOT NULL,
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    token_expires_at TIMESTAMPTZ,
    last_synced_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE(user_id, provider)
);

CREATE TABLE daily_readiness_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    athlete_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    recovery_score INTEGER CHECK (recovery_score BETWEEN 0 AND 100),
    resting_heart_rate INTEGER,
    hrv_rmssd NUMERIC(6,2),
    sleep_minutes INTEGER,
    deep_sleep_minutes INTEGER,
    collision_soreness_score INTEGER CHECK (collision_soreness_score BETWEEN 1 AND 10),
    readiness_status readiness_state DEFAULT 'optimal',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(athlete_id, log_date)
);

CREATE TABLE athlete_telemetry_samples (
    id BIGSERIAL PRIMARY KEY,
    athlete_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    recorded_at TIMESTAMPTZ NOT NULL,
    heart_rate INTEGER,
    hr_zone INTEGER CHECK (hr_zone BETWEEN 1 AND 5),
    calories_burned NUMERIC(6,2),
    speed_mps NUMERIC(4,2), -- meters per second
    distance_meters NUMERIC(8,2),
    provider wearable_provider DEFAULT 'apple_health'
);

CREATE TABLE rugby_benchmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    athlete_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    test_type VARCHAR(100) NOT NULL, -- 'Bronco 1.2km', '10m Sprint', '40m Sprint'
    result_seconds NUMERIC(6,2),
    recorded_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- MODULE 4: EXERCISE CATALOG & TAXONOMY
-- -----------------------------------------------------------------------------

CREATE TABLE exercise_catalog (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'Scrum & Maul Engine', 'Contact Durability', 'Speed & Agility'
    primary_muscles TEXT[] NOT NULL,
    secondary_muscles TEXT[],
    equipment_required TEXT[] NOT NULL,
    sports_applicable sport_code[] DEFAULT ARRAY['rugby_union'::sport_code],
    positional_bias positional_unit DEFAULT 'neutral',
    video_url TEXT,
    thumbnail_url TEXT,
    external_api_id VARCHAR(100), -- ExerciseDB reference ID
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- MODULE 5: TRAINING PLANS & MATCH-WEEK MICROCYCLES
-- -----------------------------------------------------------------------------

CREATE TABLE training_programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    created_by UUID REFERENCES profiles(id),
    title VARCHAR(255) NOT NULL,
    sport_type sport_code DEFAULT 'rugby_union',
    target_tier training_level DEFAULT 'amateur_club',
    is_template BOOLEAN DEFAULT FALSE,
    duration_weeks INTEGER DEFAULT 6,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE workout_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    program_id UUID NOT NULL REFERENCES training_programs(id) ON DELETE CASCADE,
    microcycle_day VARCHAR(20) NOT NULL, -- 'MD-4', 'MD-3', 'MD-2', 'MD-1', 'MD+1'
    day_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL, -- 'Backline Velocity & Power'
    focus_pillar VARCHAR(100) NOT NULL, -- 'Repeat Sprint Ability'
    target_unit positional_unit DEFAULT 'neutral',
    estimated_duration_min INTEGER DEFAULT 60,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE workout_template_exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workout_template_id UUID NOT NULL REFERENCES workout_templates(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES exercise_catalog(id) ON DELETE RESTRICT,
    exercise_order INTEGER NOT NULL,
    target_sets INTEGER NOT NULL,
    target_reps VARCHAR(50) NOT NULL, -- '10 reps', '4 reps @ 85% 1RM', '30s hold'
    target_rpe NUMERIC(3,1), -- Rate of Perceived Exertion (1.0 to 10.0)
    pct_one_rep_max NUMERIC(4,1),
    rest_interval_seconds INTEGER DEFAULT 90,
    coach_instructions TEXT
);

-- -----------------------------------------------------------------------------
-- MODULE 6: WORKOUT EXECUTION & TONNAGE LOGS
-- -----------------------------------------------------------------------------

CREATE TABLE scheduled_workouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    squad_id UUID REFERENCES squads(id) ON DELETE CASCADE,
    athlete_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    workout_template_id UUID NOT NULL REFERENCES workout_templates(id) ON DELETE CASCADE,
    scheduled_date DATE NOT NULL,
    microcycle_day VARCHAR(20) NOT NULL,
    status session_status DEFAULT 'scheduled',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE workout_execution_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scheduled_workout_id UUID REFERENCES scheduled_workouts(id) ON DELETE SET NULL,
    athlete_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    started_at TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ,
    duration_seconds INTEGER,
    total_tonnage_kg NUMERIC(10,2) DEFAULT 0,
    avg_heart_rate INTEGER,
    peak_heart_rate INTEGER,
    zone5_duration_seconds INTEGER DEFAULT 0,
    high_speed_running_meters NUMERIC(8,2) DEFAULT 0,
    athlete_feedback TEXT,
    coach_verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE workout_set_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    execution_log_id UUID NOT NULL REFERENCES workout_execution_logs(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES exercise_catalog(id) ON DELETE RESTRICT,
    set_number INTEGER NOT NULL,
    weight_kg NUMERIC(6,2) DEFAULT 0,
    reps_completed INTEGER NOT NULL,
    rpe_rating NUMERIC(3,1),
    rest_taken_seconds INTEGER,
    is_completed BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- MODULE 7: MESSAGING, FORM VIDEOS & FEEDBACK
-- -----------------------------------------------------------------------------

CREATE TABLE chat_threads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    athlete_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    coach_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    last_message_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(athlete_id, coach_id)
);

CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    thread_id UUID NOT NULL REFERENCES chat_threads(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    message_text TEXT NOT NULL,
    msg_type message_type DEFAULT 'text',
    attachment_video_url TEXT,
    video_timestamp_sec NUMERIC(6,2),
    related_execution_id UUID REFERENCES workout_execution_logs(id) ON DELETE SET NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- PERFORMANCE INDEXES
-- -----------------------------------------------------------------------------
CREATE INDEX idx_telemetry_athlete_time ON athlete_telemetry_samples (athlete_id, recorded_at DESC);
CREATE INDEX idx_readiness_athlete_date ON daily_readiness_logs (athlete_id, log_date DESC);
CREATE INDEX idx_scheduled_athlete_date ON scheduled_workouts (athlete_id, scheduled_date);
CREATE INDEX idx_execution_athlete ON workout_execution_logs (athlete_id, started_at DESC);
CREATE INDEX idx_set_logs_execution ON workout_set_logs (execution_log_id);
CREATE INDEX idx_chat_thread_time ON chat_messages (thread_id, created_at ASC);
CREATE INDEX idx_squad_members_athlete ON squad_members (athlete_id);

-- -----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE athlete_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_readiness_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE athlete_telemetry_samples ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_execution_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Athlete Access: Can read and edit their own profiles and telemetry
CREATE POLICY athlete_self_manage ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY athlete_profile_self ON athlete_profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY athlete_readiness_self ON daily_readiness_logs FOR ALL USING (auth.uid() = athlete_id);
CREATE POLICY athlete_telemetry_self ON athlete_telemetry_samples FOR ALL USING (auth.uid() = athlete_id);
CREATE POLICY athlete_execution_self ON workout_execution_logs FOR ALL USING (auth.uid() = athlete_id);

-- Coach Access: Can read athlete records belonging to the same organization
CREATE POLICY coach_view_roster ON athlete_profiles FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM organization_members coach_mem
        JOIN organization_members ath_mem ON coach_mem.organization_id = ath_mem.organization_id
        WHERE coach_mem.user_id = auth.uid()
          AND ath_mem.user_id = athlete_profiles.user_id
          AND coach_mem.role IN ('coach', 'head_coach', 'admin')
    )
);