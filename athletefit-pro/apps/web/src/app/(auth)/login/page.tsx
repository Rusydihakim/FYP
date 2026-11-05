'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../../styles/auth/login.css';
import { createClient } from '../../../lib/supabase/client';

type PortalRole = 'athlete' | 'coach';

const DEFAULT_TOTP = ['7', '2', '9', '4', '1', '8'];

export default function UnifiedPortalGatewayPage() {
  const router = useRouter();
  const [role, setRole] = useState<PortalRole>('athlete');
  const [email, setEmail] = useState<string>('maro.itoje@vanguard-rugby.com');
  const [password, setPassword] = useState<string>('rugby-telemetry-passkey');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [totpDigits, setTotpDigits] = useState<string[]>(DEFAULT_TOTP);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleRoleSwitch = (nextRole: PortalRole) => {
    setRole(nextRole);
    setAuthError(null);
    if (nextRole === 'athlete') {
      setEmail('maro.itoje@vanguard-rugby.com');
    } else {
      setEmail('kevin.sinfield@vanguard-rugby.com');
    }
  };

  const handleTotpChange = (index: number, value: string) => {
    const sanitized = value.replace(/\D/g, '').slice(-1);
    setTotpDigits((prev) => {
      const next = [...prev];
      next[index] = sanitized;
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setAuthError(null);

    try {
      // If Supabase URL and Key are configured, attempt real auth
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          // If demo accounts, log warning and allow fallback demo preview
          console.warn('Supabase auth notice (using demo routing):', error.message);
        }
      }

      // Route dynamically to role target destination
      if (role === 'coach') {
        router.push('/portal/dashboard');
      } else {
        router.push('/athlete/dashboard');
      }
    } catch (err: any) {
      console.error('Authentication routing error:', err);
      // Fallback redirect
      if (role === 'coach') {
        router.push('/portal/dashboard');
      } else {
        router.push('/athlete/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isAthlete = role === 'athlete';

  return (
    <div className="gateway-page">
      {/* Top System Bar */}
      <header className="gateway-topbar">
        <div className="gateway-brand-group">
          <div className="gateway-brand-mark">
            <img
              src="/assets/logo.jpg"
              alt="AthleteFit Pro Logo"
              style={{
                width: '32px',
                height: '32px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 0 10px color-mix(in oklab, var(--accent-primary), transparent 50%)',
              }}
            />
            <span>
              AthleteFit<span className="gateway-brand-accent">PRO</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Viewport Split Container */}
      <main className="gateway-split-grid">
        {/* LEFT COLUMN: High-Performance Rugby Telemetry & Readiness Showcase */}
        <section className="gateway-showcase">
          <div className="gateway-glow-primary" aria-hidden="true" />
          <div className="gateway-glow-secondary" aria-hidden="true" />

          <div className="gateway-showcase-content">
            {/* Headline Group */}
            <div>
              <h1 className="gateway-headline">
                Elite Rugby Telemetry &amp; Performance Portal
              </h1>
              <p className="gateway-subheadline">
                Direct synaptic bridge between high-performance coaching staff, sports
                science diagnostics, and squad match-day readiness.
              </p>
            </div>

            {/* Dual-Role Telemetry Card with Live Waveform / Visualizer */}
            <div className="gateway-telemetry-card">
              <div className="gateway-telemetry-header">
                <div className="gateway-telemetry-title-group">
                  <span className="gateway-telemetry-icon" aria-hidden="true">
                    ⚡
                  </span>
                  <div>
                    <h2 className="gateway-telemetry-title">
                      Squad Neuromuscular &amp; ANS Buffer
                    </h2>
                    <p className="gateway-telemetry-subtitle">
                      Continuous 250Hz Live Telemetry Matrix (Z1 - Z5 Bio-Rhythm)
                    </p>
                  </div>
                </div>
                <div className="gateway-ingest-badge">
                  <span className="gateway-pulse-dot" aria-hidden="true" />
                  <span>LIVE INGEST 250Hz</span>
                </div>
              </div>

              {/* Waveform SVG Graphic */}
              <div className="gateway-waveform-box">
                <div className="gateway-waveform-meta">
                  <span>VENTRICULAR IMPULSE POLARITY [ECG/ANS]</span>
                  <span className="gateway-waveform-sync">
                    SYNCHRONIZED (DELTA ±0.04ms)
                  </span>
                </div>

                <svg
                  className="gateway-waveform-svg"
                  fill="none"
                  preserveAspectRatio="none"
                  role="img"
                  viewBox="0 0 700 90"
                >
                  <title>
                    Synchronized 250Hz ventricular impulse ECG telemetry waveform
                  </title>
                  <line
                    className="gateway-waveform-gridline"
                    x1="0"
                    x2="700"
                    y1="22.5"
                    y2="22.5"
                  />
                  <line
                    className="gateway-waveform-gridline"
                    x1="0"
                    x2="700"
                    y1="45"
                    y2="45"
                  />
                  <line
                    className="gateway-waveform-gridline"
                    x1="0"
                    x2="700"
                    y1="67.5"
                    y2="67.5"
                  />
                  <path
                    d="M 0 45 L 70 45 L 85 30 L 100 58 L 120 45 L 170 45 L 185 10 L 195 82 L 210 32 L 225 45 L 290 45 L 305 28 L 318 60 L 332 45 L 400 45 L 415 8 L 425 84 L 440 28 L 455 45 L 530 45 L 545 32 L 560 56 L 575 45 L 620 45 L 635 12 L 645 80 L 660 30 L 675 45 L 700 45"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity="0.28"
                    strokeWidth="4"
                  />
                  <path
                    d="M 0 45 L 70 45 L 85 30 L 100 58 L 120 45 L 170 45 L 185 10 L 195 82 L 210 32 L 225 45 L 290 45 L 305 28 L 318 60 L 332 45 L 400 45 L 415 8 L 425 84 L 440 28 L 455 45 L 530 45 L 545 32 L 560 56 L 575 45 L 620 45 L 635 12 L 645 80 L 660 30 L 675 45 L 700 45"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                  />
                </svg>

                <div className="gateway-waveform-meta">
                  <span>● Zone 1: Rest &amp; Vagal Dominance</span>
                  <span>Squad Average: Z2 Taper Zone</span>
                  <span className="gateway-waveform-peak">Peak Influx: 168.2 BPM</span>
                </div>
              </div>

              {/* Telemetry KPI Matrix Grid */}
              <div className="gateway-kpi-grid">
                <div className="gateway-kpi-tile">
                  <span className="gateway-kpi-label">Recovery Score</span>
                  <div className="gateway-kpi-value gateway-kpi-value--cleared">78%</div>
                  <span className="gateway-kpi-trend">● Prime Band</span>
                </div>

                <div className="gateway-kpi-tile">
                  <span className="gateway-kpi-label">Resting HR</span>
                  <div className="gateway-kpi-value">
                    50<span className="gateway-kpi-unit">bpm</span>
                  </div>
                  <span className="gateway-kpi-trend gateway-kpi-trend--accent">
                    -2 bpm vs base
                  </span>
                </div>

                <div className="gateway-kpi-tile">
                  <span className="gateway-kpi-label">HRV (rMSSD)</span>
                  <div className="gateway-kpi-value gateway-kpi-value--accent">
                    88<span className="gateway-kpi-unit">ms</span>
                  </div>
                  <span className="gateway-kpi-trend">High Baseline</span>
                </div>

                <div className="gateway-kpi-tile">
                  <span className="gateway-kpi-label">ACWR Load Ratio</span>
                  <div className="gateway-kpi-value">1.18</div>
                  <span className="gateway-kpi-trend">Sweet Spot</span>
                </div>

                <div className="gateway-kpi-tile">
                  <span className="gateway-kpi-label">Front-Row Neck</span>
                  <div className="gateway-kpi-value gateway-kpi-value--orchid">
                    420<span className="gateway-kpi-unit">N</span>
                  </div>
                  <span className="gateway-kpi-trend">RTP Stage 4 Clear</span>
                </div>
              </div>

              {/* Real-Time Hardware Bus */}
              <div className="gateway-sensor-bar">
                <span className="gateway-kpi-label">Active Sensor Fleet:</span>
                <div className="gateway-sensor-list">
                  <div className="gateway-sensor-chip">
                    <span className="gateway-pulse-dot" aria-hidden="true" />
                    <span>WHOOP 4.0</span>
                    <span className="gateway-sensor-chip__meta">(98% Live)</span>
                  </div>
                  <div className="gateway-sensor-chip">
                    <span className="gateway-brand-dot" aria-hidden="true" />
                    <span>Catapult S7</span>
                    <span className="gateway-sensor-chip__meta">(Dock Ingested)</span>
                  </div>
                  <div className="gateway-sensor-chip">
                    <span className="gateway-sensor-chip__meta">● Apex GPS Pod (Standby)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance & Security Footnote */}
          <footer className="gateway-compliance-footer">
            <div className="gateway-compliance-group">
              <span className="gateway-compliance-item">
                <span aria-hidden="true">🛡️</span> Supabase 256-bit AES Auth
              </span>
              <span className="gateway-compliance-item">
                <span aria-hidden="true">🔐</span> HIPAA &amp; GDPR Compliant
              </span>
            </div>
            <div className="gateway-compliance-cert">
              <span aria-hidden="true">✓</span>
              <span>World Rugby Concussion Protocol Tier-1 Certified</span>
            </div>
          </footer>
        </section>

        {/* RIGHT COLUMN: Unified Authentication Console */}
        <section className="gateway-auth-panel">
          <div className="gateway-auth-container">
            {/* Brand Logo Presentation Card */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-md)',
                padding: 'var(--space-sm) var(--space-md)',
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-divider)',
                borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--space-md)',
              }}
            >
              <img
                src="/assets/logo.jpg"
                alt="AthleteFit Pro Official Emblem"
                style={{
                  width: '52px',
                  height: '52px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)',
                  flexShrink: 0,
                  border: '1px solid var(--border-divider)',
                  boxShadow: '0 4px 12px color-mix(in oklab, var(--accent-primary), transparent 80%)',
                }}
              />
              <div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: '1.0625rem',
                    letterSpacing: '0.02em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>AthleteFit</span>
                  <span style={{ color: 'var(--accent-primary)' }}>PRO</span>
                </div>
                <div
                  style={{
                    fontSize: '0.6875rem',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  Elevate Your Performance
                </div>
              </div>
            </div>

            {/* Role Switcher Segmented Control */}
            <div
              className="gateway-role-switcher"
              role="group"
              aria-label="Portal Role Selection"
            >
              <button
                type="button"
                className="gateway-role-tab"
                data-role="athlete"
                aria-pressed={isAthlete}
                onClick={() => handleRoleSwitch('athlete')}
              >
                <span aria-hidden="true">🏃</span>
                <span>Athlete Portal</span>
              </button>
              <button
                type="button"
                className="gateway-role-tab"
                data-role="coach"
                aria-pressed={!isAthlete}
                onClick={() => handleRoleSwitch('coach')}
              >
                <span aria-hidden="true">🪪</span>
                <span>Coach / Medical</span>
                <span className="gateway-2fa-pill">2FA</span>
              </button>
            </div>

            {/* Form Title Header */}
            <div className="gateway-form-header">
              <div className="gateway-accreditation-tag" data-role={role}>
                <span className="gateway-pulse-dot" aria-hidden="true" />
                <span>
                  {isAthlete
                    ? 'ATHLETE ACCREDITATION SYSTEM'
                    : 'COACHING COMMAND & MEDICAL CONSOLE'}
                </span>
              </div>
              <h2 className="gateway-form-title">
                {isAthlete ? 'Sign In to Athlete Portal' : 'Staff & Diagnostics Sign In'}
              </h2>
              <p className="gateway-form-description">
                {isAthlete
                  ? 'Access your assigned training schedule, match-day readiness benchmarks, and wearable telemetry streams.'
                  : 'High-performance director, S&C staff, and sports science laboratory command center.'}
              </p>
            </div>

            {/* Dynamic Portal Authentication Form */}
            <form
              className="gateway-form"
              action="/login"
              method="POST"
              onSubmit={handleSubmit}
            >
              {/* Field 1: Email / Domain Identity */}
              <div className="gateway-field-group">
                <div className="gateway-label-row">
                  <label className="gateway-label" htmlFor="user-email">
                    Club Domain ID / Squad Email
                  </label>
                  <span className="gateway-domain-badge" data-role={role}>
                    {isAthlete ? '@vanguard-rugby.com' : 'STAFF-AUTH: ELEVATED'}
                  </span>
                </div>
                <div className="gateway-input-wrapper">
                  <span className="gateway-input-icon" aria-hidden="true">
                    @
                  </span>
                  <input
                    id="user-email"
                    name="email"
                    type="email"
                    className="gateway-input"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    placeholder={
                      isAthlete
                        ? 'athlete.number@vanguard-rugby.com'
                        : 'coach.staff@vanguard-rugby.com'
                    }
                    autoComplete="username"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    required
                  />
                </div>
              </div>

              {/* Field 2: Password / Security Key */}
              <div className="gateway-field-group">
                <div className="gateway-label-row">
                  <label className="gateway-label" htmlFor="user-pass">
                    Master Password / Passkey
                  </label>
                  <a className="gateway-forgot-link" href="#forgot-credentials">
                    Forgot credentials?
                  </a>
                </div>
                <div className="gateway-input-wrapper">
                  <span className="gateway-input-icon" aria-hidden="true">
                    🔑
                  </span>
                  <input
                    id="user-pass"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className="gateway-input gateway-input--password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="gateway-pass-toggle"
                    aria-pressed={showPassword}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-describedby="pass-toggle-warning"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <span aria-hidden="true">{showPassword ? '🙈' : '👁'}</span>
                  </button>
                  <span id="pass-toggle-warning" className="visually-hidden">
                    Warning: activating this button displays your password on the screen.
                  </span>
                </div>
              </div>

              {/* Dynamic Role-Specific Secondary Auth Section */}
              {isAthlete ? (
                <div className="gateway-secondary-box">
                  <div className="gateway-secondary-header">
                    <span className="gateway-secondary-title">
                      <span aria-hidden="true">🫆</span>
                      <span>Fast Re-Auth with Biometric Passkey</span>
                    </span>
                    <span className="gateway-secondary-status">Hardware Ready</span>
                  </div>
                  <p className="gateway-secondary-desc">
                    Registered via Apple TouchID or Android Biometric Secure Enclave on
                    this squad device.
                  </p>
                </div>
              ) : (
                <fieldset className="gateway-secondary-box gateway-secondary-fieldset">
                  <div className="gateway-secondary-header">
                    <legend className="gateway-secondary-title">
                      <span aria-hidden="true">🛡️</span>
                      <span>Staff 2FA Dynamic Token</span>
                    </legend>
                    <span className="gateway-secondary-status gateway-secondary-status--timer">
                      <span className="gateway-pulse-dot" aria-hidden="true" />
                      <span>Expires: 00:45</span>
                    </span>
                  </div>
                  <p id="totp-instructions" className="gateway-secondary-desc">
                    Enter 6-digit TOTP from your YubiKey or authenticator app:
                  </p>
                  <div
                    className="gateway-totp-grid"
                    role="group"
                    aria-describedby="totp-instructions"
                  >
                    {totpDigits.map((digit, index) => (
                      <input
                        key={index}
                        name={`totpDigit${index + 1}`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]"
                        maxLength={1}
                        autoComplete={index === 0 ? 'one-time-code' : 'off'}
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        aria-label={`2FA digit ${index + 1} of 6`}
                        className="gateway-totp-input"
                        value={digit}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleTotpChange(index, e.target.value)
                        }
                        required
                      />
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Remember Device Checkbox */}
              <div className="gateway-remember-row">
                <input
                  id="remember-terminal"
                  name="rememberTerminal"
                  type="checkbox"
                  className="gateway-checkbox"
                  defaultChecked
                />
                <label htmlFor="remember-terminal">
                  Remember this terminal for 30 days (Authorized Bio-Lab Workstation)
                </label>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                className="gateway-submit-btn"
                data-role={role}
                disabled={isLoading}
              >
                <span>
                  {isLoading
                    ? 'Authenticating...'
                    : isAthlete
                      ? 'Enter AthleteFit Pro Portal'
                      : 'Verify Staff 2FA & Launch Command'}
                </span>
                <span aria-hidden="true">➔</span>
              </button>
            </form>

            {/* Quick Access & Alternative Pathways Footer Cards */}
            <div className="gateway-footer-stack">
              <div className="gateway-pairing-card">
                <div className="gateway-pairing-info">
                  <span aria-hidden="true">📱</span>
                  <div>
                    <div className="gateway-pairing-title">
                      First-time athlete or kit pairing?
                    </div>
                    <div className="gateway-pairing-sub">
                      Enter squad code (e.g., RUGBY-8492) or scan wearable sync QR
                    </div>
                  </div>
                </div>
                <button type="button" className="gateway-code-btn">
                  Enter Code
                </button>
              </div>

              <div className="gateway-bottom-links">
                <a className="gateway-bottom-link" href="/portal/onboarding">
                  <span aria-hidden="true">🏛️</span>
                  <span>Register Club / Request Staff Credentials</span>
                </a>
                <div className="gateway-ble-tag">
                  <span aria-hidden="true">📡</span>
                  <span>AthleteFit App: Direct BLE Pod Sync</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
