'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../../../../styles/coach-portal/onboarding.css';

interface CredentialOption {
  id: string;
  code: string;
  title: string;
  verified: boolean;
  checked: boolean;
}

export default function OrganizationOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [orgName, setOrgName] = useState('Vanguard Rugby Football Club');
  const [sportCategory, setSportCategory] = useState('Rugby Union (15s & 7s)');
  const [coachTitle, setCoachTitle] = useState('Head of Strength & Conditioning / Rugby Performance');
  const [measurementUnit, setMeasurementUnit] = useState<'metric' | 'imperial'>('metric');
  const [restInterval, setRestInterval] = useState<'60s' | '90s' | '120s'>('90s');
  const [squadCode, setSquadCode] = useState('RUGBY-8492');
  const [copied, setCopied] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  const [credentials, setCredentials] = useState<CredentialOption[]>([
    {
      id: 'cscs',
      code: 'CSCS®',
      title: 'NSCA Certified Strength & Conditioning Specialist',
      verified: true,
      checked: true,
    },
    {
      id: 'usatf',
      code: 'USATF L3',
      title: 'USA Track & Field Master Coach / High Performance',
      verified: true,
      checked: true,
    },
    {
      id: 'nasm',
      code: 'NASM-PES',
      title: 'Performance Enhancement Specialist',
      verified: false,
      checked: false,
    },
  ]);

  const toggleCredential = (id: string) => {
    setCredentials((prev) =>
      prev.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c))
    );
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(squadCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2500);
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3);
    } else {
      router.push('/portal/dashboard');
    }
  };

  return (
    <div className="onboarding-wrapper">
      {/* Background Refraction Radial Glows */}
      <div className="onboarding-glow-top" aria-hidden="true" />
      <div className="onboarding-glow-side" aria-hidden="true" />

      <div className="onboarding-container">
        {/* Breadcrumb Meta & System Indicator */}
        <header className="onboarding-header">
          <div className="onboarding-header-brand">
            <div className="onboarding-brand-icon">
              <img src="/assets/logo.jpg" alt="AthleteFit Pro Logo" />
            </div>
            <div>
              <div className="onboarding-breadcrumb-meta">
                <span className="onboarding-meta-accent">AthleteFit Pro Web Engine</span>
                <span className="onboarding-meta-divider">•</span>
                <span className="onboarding-meta-sub">Tenant Provisioning</span>
              </div>
              <h1 className="onboarding-title">
                Organization &amp; Performance Onboarding
              </h1>
            </div>
          </div>

          {/* Telemetry Engine Heartbeat Status */}
          <div className="onboarding-status-pill">
            <span className="onboarding-pulse-dot" aria-hidden="true" />
            <span className="onboarding-status-engine">Supabase Engine Online</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span className="onboarding-status-node">Node ID: US-EAST-04</span>
          </div>
        </header>

        {/* Step Navigation Tracker */}
        <nav aria-label="Onboarding Progress" className="onboarding-stepper">
          <div className="onboarding-stepper-grid">
            {/* Step 1 */}
            <button
              type="button"
              className="onboarding-step-card"
              data-active={currentStep === 1}
              data-completed={currentStep > 1}
              onClick={() => setCurrentStep(1)}
            >
              <div className="onboarding-step-badge">
                {currentStep > 1 ? '✓' : '01'}
              </div>
              <div className="onboarding-step-info">
                <span className="onboarding-step-meta">
                  {currentStep === 1 ? 'Step 1 — Active' : currentStep > 1 ? 'Step 1 — Done' : 'Step 1'}
                </span>
                <span className="onboarding-step-title">Academy &amp; Profile</span>
              </div>
              <span className="onboarding-step-icon" aria-hidden="true">
                ➔
              </span>
            </button>

            {/* Step 2 */}
            <button
              type="button"
              className="onboarding-step-card"
              data-active={currentStep === 2}
              data-completed={currentStep > 2}
              onClick={() => setCurrentStep(2)}
            >
              <div className="onboarding-step-badge">
                {currentStep > 2 ? '✓' : '02'}
              </div>
              <div className="onboarding-step-info">
                <span className="onboarding-step-meta">
                  {currentStep === 2 ? 'Step 2 — Active' : currentStep > 2 ? 'Step 2 — Done' : 'Step 2 — Upcoming'}
                </span>
                <span className="onboarding-step-title">Training Presets</span>
              </div>
              <span className="onboarding-step-icon" aria-hidden="true">
                {currentStep >= 2 ? '➔' : '🔒'}
              </span>
            </button>

            {/* Step 3 */}
            <button
              type="button"
              className="onboarding-step-card"
              data-active={currentStep === 3}
              data-completed={false}
              onClick={() => setCurrentStep(3)}
            >
              <div className="onboarding-step-badge">03</div>
              <div className="onboarding-step-info">
                <span className="onboarding-step-meta">
                  {currentStep === 3 ? 'Step 3 — Active' : 'Step 3 — Upcoming'}
                </span>
                <span className="onboarding-step-title">Squad &amp; Athlete Invite</span>
              </div>
              <span className="onboarding-step-icon" aria-hidden="true">
                📱
              </span>
            </button>
          </div>
        </nav>

        {/* Main Interactive Wizard Canvas (Bento 8 / 4 Grid) */}
        <div className="onboarding-grid">
          {/* Left Column: Primary Wizard Configuration (8 Columns) */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {/* Core Organization Block */}
            <div className="onboarding-card">
              <div className="onboarding-card-header">
                <div className="onboarding-tag-group">
                  <span className="onboarding-tag-pill" aria-hidden="true" />
                  <span className="onboarding-tag-text">Workspace Entity Setup</span>
                </div>
                <h2 className="onboarding-card-title">
                  {currentStep === 1
                    ? 'Coaching Organization Profile'
                    : currentStep === 2
                    ? 'Telemetry & Prescribed Rugby Microcycles'
                    : 'Finalize Squad Invite Credentials'}
                </h2>
                <p className="onboarding-card-sub">
                  {currentStep === 1
                    ? 'Enter your athletic program brand credentials. These will brand your athlete telemetry apps and dispatched workouts.'
                    : currentStep === 2
                    ? 'Define how training stress is measured and how weekly match microcycles (MD-4 to MD+1) are structured.'
                    : 'Dispatch invite tokens and QR authentication passes to players to bind their mobile devices to your roster.'}
                </p>
              </div>

              {/* Form Fields Matrix */}
              <div className="onboarding-form-fields">
                {currentStep === 1 && (
                  <>
                    {/* Club / Academy Name Field */}
                    <div className="onboarding-field">
                      <div className="onboarding-label-row">
                        <label htmlFor="orgName">
                          Club / Team / Institution Name{' '}
                          <span className="onboarding-required-star">*</span>
                        </label>
                        <span className="onboarding-sublabel">Public Roster Identifier</span>
                      </div>
                      <div className="onboarding-input-wrap">
                        <span className="onboarding-input-icon" aria-hidden="true">
                          🏉
                        </span>
                        <input
                          id="orgName"
                          type="text"
                          className="onboarding-input"
                          value={orgName}
                          onChange={(e) => setOrgName(e.target.value)}
                          placeholder="e.g. Vanguard Rugby Football Club"
                          required
                        />
                      </div>
                    </div>

                    {/* Two-Column: Sport Category & Coach Title */}
                    <div className="onboarding-two-col">
                      <div className="onboarding-field">
                        <div className="onboarding-label-row">
                          <label htmlFor="sportCategory">
                            Primary Sport / Discipline{' '}
                            <span className="onboarding-required-star">*</span>
                          </label>
                        </div>
                        <div className="onboarding-input-wrap">
                          <span className="onboarding-input-icon" aria-hidden="true">
                            ⚡
                          </span>
                          <select
                            id="sportCategory"
                            className="onboarding-input onboarding-select"
                            value={sportCategory}
                            onChange={(e) => setSportCategory(e.target.value)}
                          >
                            <option value="Rugby Union (15s & 7s)">Rugby Union (15s &amp; 7s)</option>
                            <option value="Rugby League (Super League / Championship)">Rugby League (Super League / Championship)</option>
                            <option value="High-Performance Contact Sports">High-Performance Contact Sports</option>
                            <option value="Strength & Conditioning (Elite Rugby Academy)">Strength &amp; Conditioning (Elite Rugby Academy)</option>
                          </select>
                          <span className="onboarding-select-arrow" aria-hidden="true">
                            ▼
                          </span>
                        </div>
                      </div>

                      <div className="onboarding-field">
                        <div className="onboarding-label-row">
                          <label htmlFor="coachTitle">
                            Coaching Role / Title{' '}
                            <span className="onboarding-required-star">*</span>
                          </label>
                        </div>
                        <div className="onboarding-input-wrap">
                          <span className="onboarding-input-icon" aria-hidden="true">
                            🪪
                          </span>
                          <input
                            id="coachTitle"
                            type="text"
                            className="onboarding-input"
                            value={coachTitle}
                            onChange={(e) => setCoachTitle(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Academy Logo Upload Dropzone */}
                    <div className="onboarding-field">
                      <div className="onboarding-label-row">
                        <span>Academy Crest or Team Logo</span>
                        <span className="onboarding-sublabel">PNG, SVG or WEBP (Max 4MB)</span>
                      </div>
                      <div className="onboarding-dropzone">
                        <div className="onboarding-dropzone-thumb">
                          <img src="/assets/logo.jpg" alt="Active Crest Preview" />
                        </div>
                        <div className="onboarding-dropzone-info">
                          <div className="onboarding-dropzone-main">
                            AthleteFit Pro Official Crest Active
                          </div>
                          <div className="onboarding-dropzone-sub">
                            High-res crests automatically format onto athlete mobile cards and live session boards.
                          </div>
                        </div>
                        <button type="button" className="onboarding-dropzone-btn">
                          Change Logo
                        </button>
                      </div>
                    </div>

                    {/* Certification Selector */}
                    <div className="onboarding-field">
                      <div className="onboarding-label-row">
                        <span>Accreditation &amp; Coaching Credentials</span>
                        <span className="onboarding-sublabel">Multi-Select Enabled</span>
                      </div>
                      <div className="onboarding-credentials-grid">
                        {credentials.map((cred) => (
                          <div
                            key={cred.id}
                            className="onboarding-credential-card"
                            data-checked={cred.checked}
                            onClick={() => toggleCredential(cred.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggleCredential(cred.id);
                              }
                            }}
                          >
                            <div className="onboarding-cred-header">
                              <span className="onboarding-cred-code">{cred.code}</span>
                              <span className="onboarding-cred-check">
                                {cred.checked ? '✓' : ''}
                              </span>
                            </div>
                            <span className="onboarding-cred-desc">{cred.title}</span>
                            <div
                              className="onboarding-cred-status"
                              style={{
                                color: cred.verified ? 'var(--status-cleared)' : 'var(--text-muted)',
                              }}
                            >
                              <span>●</span>
                              <span>{cred.verified ? 'Verified Database Ready' : 'Optional Credential'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    <div className="onboarding-field">
                      <label className="onboarding-label-row">
                        <span>Standard Rugby Union Weekly Cycle</span>
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-sm)' }}>
                        <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-md)' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.8125rem' }}>MD-4 (Tuesday)</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>High-Strain Contact &amp; Scrum</div>
                        </div>
                        <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-md)' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.8125rem' }}>MD-2 (Thursday)</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Explosive Power &amp; Team Run</div>
                        </div>
                        <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-app)', border: '1px solid var(--accent-primary)', borderRadius: 'var(--radius-md)' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--accent-primary)' }}>MD (Saturday)</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Match Day Kickoff</div>
                        </div>
                      </div>
                    </div>

                    <div className="onboarding-two-col">
                      <div className="onboarding-field">
                        <label className="onboarding-label-row">
                          <span>Default Rest Period</span>
                        </label>
                        <div className="onboarding-interval-grid">
                          {(['60s', '90s', '120s'] as const).map((interval) => (
                            <button
                              key={interval}
                              type="button"
                              className="onboarding-interval-pill"
                              data-active={restInterval === interval}
                              onClick={() => setRestInterval(interval)}
                            >
                              {interval}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="onboarding-field">
                        <label className="onboarding-label-row">
                          <span>Measurement Standard</span>
                        </label>
                        <div className="onboarding-segmented-switch">
                          <button
                            type="button"
                            className="onboarding-segmented-btn"
                            data-active={measurementUnit === 'metric'}
                            onClick={() => setMeasurementUnit('metric')}
                          >
                            Metric (kg/km)
                          </button>
                          <button
                            type="button"
                            className="onboarding-segmented-btn"
                            data-active={measurementUnit === 'imperial'}
                            onClick={() => setMeasurementUnit('imperial')}
                          >
                            Imperial (lbs/mi)
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', alignItems: 'center', textAlign: 'center', paddingBlock: 'var(--space-md)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Squad Mobile Registration Code</h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', maxWidth: '480px' }}>
                      Share this invite code with squad athletes. When entering this code in their mobile app, they automatically bind to {orgName}.
                    </p>
                    <div className="onboarding-squad-code" style={{ fontSize: '2.25rem', padding: '0.75rem 2rem', border: '2px dashed var(--accent-primary)', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-app)' }}>
                      {squadCode}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Micro Diagnostic: Wearable Ingestion Engine Readiness */}
            <div className="onboarding-diag-banner">
              <div className="onboarding-diag-left">
                <div className="onboarding-diag-icon" aria-hidden="true">
                  📡
                </div>
                <div>
                  <div className="onboarding-diag-title">
                    IoT Data Layer Ready for Ingestion
                  </div>
                  <div className="onboarding-diag-sub">
                    WHOOP 4.0, Garmin Connect IQ, Apple HealthKit &amp; Fitbit sync modules primed.
                  </div>
                </div>
              </div>
              <div className="onboarding-diag-badge">
                ✓ 4/4 Endpoints Verified
              </div>
            </div>
          </section>

          {/* Right Column: Step 2 & 3 Interactive Previews (4 Columns) */}
          <aside className="onboarding-aside">
            {/* Step 2 Preview: Training Presets Card */}
            <div className="onboarding-card">
              <div className="onboarding-top-line" aria-hidden="true" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="onboarding-preview-tag">Step 2 Preview</span>
                <span className="onboarding-preview-badge">Default Applied</span>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Telemetry &amp; Unit Presets</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {/* Measurement Units */}
                <div className="onboarding-unit-box">
                  <div className="onboarding-unit-header">
                    <span>System Measurement Units</span>
                    <span className="onboarding-unit-val">
                      {measurementUnit === 'metric' ? 'Metric (kg / km)' : 'Imperial (lbs / mi)'}
                    </span>
                  </div>
                  <div className="onboarding-segmented-switch">
                    <button
                      type="button"
                      className="onboarding-segmented-btn"
                      data-active={measurementUnit === 'metric'}
                      onClick={() => setMeasurementUnit('metric')}
                    >
                      Metric (kg / km)
                    </button>
                    <button
                      type="button"
                      className="onboarding-segmented-btn"
                      data-active={measurementUnit === 'imperial'}
                      onClick={() => setMeasurementUnit('imperial')}
                    >
                      Imperial (lbs / mi)
                    </button>
                  </div>
                </div>

                {/* Rest Intervals */}
                <div className="onboarding-unit-box">
                  <div className="onboarding-unit-header">
                    <span>Scrum / Contact Rest Interval</span>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Rugby S&amp;C Default</span>
                  </div>
                  <div className="onboarding-interval-grid">
                    {(['60s', '90s', '120s'] as const).map((interval) => (
                      <button
                        key={interval}
                        type="button"
                        className="onboarding-interval-pill"
                        data-active={restInterval === interval}
                        onClick={() => setRestInterval(interval)}
                      >
                        {interval}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Microcycle & Collision Load */}
                <div className="onboarding-unit-box">
                  <div className="onboarding-unit-header">
                    <span>Microcycle &amp; Collision Load</span>
                    <span>🏉</span>
                  </div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
                    Saturday Match-Day (MD-4 to MD+1)
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                    Karvonen HR zones calibrated with GPS PlayerLoad and high-impact collision/contact tracking.
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 Preview: First Athlete Invite Generator Card */}
            <div className="onboarding-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="onboarding-preview-tag">Step 3 Preview</span>
                <span style={{ fontSize: '0.6875rem', color: 'var(--status-cleared)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span className="onboarding-pulse-dot" aria-hidden="true" />
                  Auto-Generated
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Athlete Squad Onboarding</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Athletes use this squad token to bind their AthleteFit mobile apps directly to your roster.
                </p>
              </div>

              {/* Passcode Display & QR Graphic Box */}
              <div className="onboarding-invite-box">
                {/* 6-Digit Squad Code Token */}
                <div className="onboarding-code-banner">
                  <span className="onboarding-squad-code">{squadCode}</span>
                  <button
                    type="button"
                    className="onboarding-copy-btn"
                    data-copied={copied}
                    onClick={handleCopyCode}
                  >
                    <span>{copied ? '✓ Copied' : '📋 Copy'}</span>
                  </button>
                </div>

                {/* SVG QR Code */}
                <div className="onboarding-qr-frame">
                  <svg fill="currentColor" viewBox="0 0 100 100">
                    {/* QR Finder Top-Left */}
                    <rect x="10" y="10" width="24" height="24" rx="2" />
                    <rect x="14" y="14" width="16" height="16" fill="#F1F5F9" />
                    <rect x="18" y="18" width="8" height="8" />
                    {/* QR Finder Top-Right */}
                    <rect x="66" y="10" width="24" height="24" rx="2" />
                    <rect x="70" y="14" width="16" height="16" fill="#F1F5F9" />
                    <rect x="74" y="18" width="8" height="8" />
                    {/* QR Finder Bottom-Left */}
                    <rect x="10" y="66" width="24" height="24" rx="2" />
                    <rect x="14" y="70" width="16" height="16" fill="#F1F5F9" />
                    <rect x="18" y="74" width="8" height="8" />
                    {/* Synthetic Data Matrix Points */}
                    <rect x="42" y="12" width="6" height="6" />
                    <rect x="52" y="12" width="6" height="6" />
                    <rect x="42" y="24" width="6" height="12" />
                    <rect x="52" y="28" width="8" height="6" />
                    <rect x="12" y="44" width="6" height="6" />
                    <rect x="22" y="44" width="12" height="6" />
                    <rect x="40" y="44" width="8" height="8" />
                    <rect x="54" y="42" width="6" height="12" />
                    <rect x="66" y="44" width="10" height="6" />
                    <rect x="82" y="42" width="6" height="8" />
                    <rect x="12" y="54" width="8" height="6" />
                    <rect x="26" y="54" width="8" height="6" />
                    <rect x="42" y="58" width="10" height="6" />
                    <rect x="60" y="58" width="6" height="12" />
                    <rect x="74" y="54" width="14" height="6" />
                    <rect x="42" y="70" width="8" height="8" />
                    <rect x="56" y="74" width="10" height="6" />
                    <rect x="70" y="68" width="6" height="12" />
                    <rect x="82" y="72" width="8" height="16" />
                    <rect x="42" y="84" width="14" height="6" />
                    <rect x="62" y="86" width="8" height="4" />
                  </svg>
                </div>
                <span className="onboarding-qr-caption">
                  Scan with AthleteFit Mobile to join Rugby Squad Roster
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Action Footer Toolbar */}
        <footer className="onboarding-footer">
          <div className="onboarding-draft-group">
            <button
              type="button"
              className="onboarding-draft-btn"
              onClick={handleSaveDraft}
            >
              <span aria-hidden="true">💾</span>
              <span>{draftSaved ? 'Draft Saved to Vault!' : 'Save Draft'}</span>
            </button>
            <span className="onboarding-draft-sub">
              {draftSaved ? '✓ Encrypted locally in memory' : 'Draft saved automatically 2 minutes ago to local vault'}
            </span>
          </div>

          <div className="onboarding-footer-actions">
            <Link href="/portal/dashboard" className="onboarding-skip-link">
              Skip to Dashboard
            </Link>
            <button
              type="button"
              className="onboarding-primary-btn"
              onClick={handleNextStep}
            >
              <span>
                {currentStep === 1
                  ? 'Next: Configure Training Presets'
                  : currentStep === 2
                  ? 'Next: Generate Squad Invite'
                  : 'Complete Setup & Launch Dashboard'}
              </span>
              <span aria-hidden="true">➔</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
