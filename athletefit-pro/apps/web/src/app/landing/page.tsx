import React from 'react';
import Link from 'next/link';
import '../../styles/landing.css';

export const metadata = {
  title: 'AthleteFit Pro — High-Performance Rugby Telemetry & Athletic Command',
  description:
    'Synaptic athletic intelligence platform bridging IoT wearable telemetry, match-week rugby periodization, and squad readiness diagnostics.',
};

export default function LandingPage() {
  return (
    <div className="landing-wrapper">
      {/* Ambient Radial Refraction Glows */}
      <div className="landing-glow-hero" aria-hidden="true" />
      <div className="landing-glow-accent" aria-hidden="true" />

      {/* Top Navigation Bar */}
      <nav className="landing-navbar">
        <Link href="/landing" className="landing-brand">
          <img
            src="/assets/logo.jpg"
            alt="AthleteFit Pro Logo"
            className="landing-brand-logo"
          />
          <span>
            AthleteFit<span className="landing-brand-accent">PRO</span>
          </span>
        </Link>

        <div className="landing-nav-actions">
          <Link href="/portal/onboarding" className="landing-nav-btn landing-nav-btn--ghost">
            <span>🏛️ Club Onboarding</span>
          </Link>
          <Link href="/login" className="landing-nav-btn landing-nav-btn--primary">
            <span>Unified Access ➔</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="landing-hero">
        <div className="landing-pill">
          <span className="landing-pulse-emerald" aria-hidden="true" />
          <span>VANGUARD RFC BIO-LAB • 250Hz LIVE TELEMETRY</span>
        </div>

        <h1 className="landing-headline">
          Elevate Your Performance with{' '}
          <span className="landing-headline-gradient">Athletic Intelligence</span>
        </h1>

        <p className="landing-subheadline">
          The direct synaptic bridge between high-performance coaching staff, sports science
          diagnostics, and squad match-day readiness.
        </p>

        <div className="landing-hero-actions">
          <Link href="/login" className="landing-btn-hero landing-btn-hero--primary">
            <span>Launch Unified Portal</span>
            <span aria-hidden="true">➔</span>
          </Link>

          <Link href="/portal/onboarding" className="landing-btn-hero landing-btn-hero--secondary">
            <span>Register New Club / Academy</span>
          </Link>
        </div>
      </header>

      {/* Live Telemetry Showcase Frame */}
      <section className="landing-showcase">
        <div className="landing-showcase-frame">
          <div className="landing-showcase-header">
            <div>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                MATCH-DAY -2 TELEMETRY MATRIX
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Squad Readiness &amp; Neuromuscular Buffer</h2>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--status-cleared)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              ● 32/35 SQUAD CLEARED (91.4%)
            </div>
          </div>

          <div className="landing-stats-grid">
            <div className="landing-stat-card">
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Forwards Unit Recovery</span>
              <span className="landing-stat-val" style={{ color: 'var(--accent-primary)' }}>88% Optimal</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pack recovery within optimal range</span>
            </div>

            <div className="landing-stat-card">
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Backs Unit Readiness</span>
              <span className="landing-stat-val" style={{ color: 'var(--accent-secondary)' }}>92% High</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sprint readiness high / CNS recovered</span>
            </div>

            <div className="landing-stat-card">
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>IoT Wearable Fleet</span>
              <span className="landing-stat-val" style={{ color: 'var(--status-cleared)' }}>99.98% Live</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>WHOOP, Garmin &amp; Apple Health synced</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Feature Grid */}
      <section className="landing-features-section">
        <div className="landing-section-header">
          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            ENGINE CAPABILITIES
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Engineered for High-Collision Demands</h2>
        </div>

        <div className="landing-features-grid">
          <div className="landing-feature-card">
            <div className="landing-feature-icon">⚡</div>
            <h3 className="landing-feature-title">250Hz Real-Time Ingestion</h3>
            <p className="landing-feature-desc">
              Direct telemetry bridges for Apple HealthKit, WHOOP 4.0, Garmin Connect IQ, and Android Health Connect with automated outlier filtering.
            </p>
          </div>

          <div className="landing-feature-card">
            <div className="landing-feature-icon">📅</div>
            <h3 className="landing-feature-title">Match-Week Periodization</h3>
            <p className="landing-feature-desc">
              Automated microcycle templates scaling workload from heavy contact (MD-4) to explosive taper (MD-2) and post-match regenerative pools (MD+1).
            </p>
          </div>

          <div className="landing-feature-card">
            <div className="landing-feature-icon">🛡️</div>
            <h3 className="landing-feature-title">Concussion &amp; Return-to-Play Gates</h3>
            <p className="landing-feature-desc">
              Strict 6-stage medical safety checks instantly lock non-contact protocols across athlete apps when severe collision strain is detected.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
            <img src="/assets/logo.jpg" alt="Logo" style={{ width: '20px', height: '20px', borderRadius: '4px' }} />
            <span>AthleteFit Pro © 2026. All rights reserved.</span>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
            <Link href="/login" style={{ color: 'var(--text-muted)' }}>Unified Sign-In</Link>
            <Link href="/portal/onboarding" style={{ color: 'var(--text-muted)' }}>Club Provisioning</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
