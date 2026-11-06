'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import '../../../../../styles/coach-portal/athlete-profile.css';

export default function AthleteInspectionPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'biometrics' | 'injuries' | 'workouts'>('biometrics');
  const [contactCleared, setContactCleared] = useState(true);

  return (
    <div className="athlete-container">
      {/* Top Header */}
      <div className="athlete-header">
        <div>
          <span className="athlete-screen-tag">
            [SCREEN W-04] POSITIONAL PROFILE &amp; BIOMETRIC INSPECTION
          </span>
          <div className="athlete-title-row">
            <Link href="/portal/dashboard" className="athlete-back-link">
              ← Squad Roster
            </Link>
            <h1 className="athlete-name">Maro Itoje #4</h1>
            <span
              className={`athlete-status-badge ${
                contactCleared ? 'athlete-status-badge--cleared' : 'athlete-status-badge--critical'
              }`}
            >
              {contactCleared ? '● Full Contact Cleared' : '⚠️ Medical Non-Contact Hold'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
          <button
            type="button"
            onClick={() => setContactCleared(!contactCleared)}
            className="athlete-action-btn"
          >
            {contactCleared ? '🚫 Place on Non-Contact Hold' : '✅ Clear for Contact'}
          </button>
          <Link href="/portal/messages" className="athlete-msg-btn">
            💬 Direct Message
          </Link>
        </div>
      </div>

      {/* Athlete Header Card */}
      <section className="athlete-summary-card">
        <div className="athlete-summary-metric">
          <div className="athlete-metric-label">Positional Unit</div>
          <div className="athlete-metric-value">Forwards • Lock / Second Row</div>
        </div>
        <div className="athlete-summary-metric">
          <div className="athlete-metric-label">Body Mass / Height</div>
          <div className="athlete-metric-value">115 kg • 195 cm (BMI 30.2)</div>
        </div>
        <div className="athlete-summary-metric">
          <div className="athlete-metric-label">HRV (rMSSD) / Baseline</div>
          <div className="athlete-metric-value" style={{ fontFamily: 'var(--font-mono)', color: 'var(--status-cleared)' }}>
            88 ms <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(+8% vs avg)</span>
          </div>
        </div>
        <div className="athlete-summary-metric">
          <div className="athlete-metric-label">Bronco Test (1.2 km)</div>
          <div className="athlete-metric-value" style={{ fontFamily: 'var(--font-mono)' }}>
            4:38 min <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>(Club Top 10%)</span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="athlete-tabs-bar">
        {[
          { key: 'biometrics', label: 'Heart Rate & Strain Telemetry' },
          { key: 'injuries', label: 'Collision & Return-to-Play Log' },
          { key: 'workouts', label: 'Prescribed Rugby Workouts' },
        ].map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActiveTab(t.key as any)}
            className={`athlete-tab-btn ${activeTab === t.key ? 'athlete-tab-btn--active' : ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="athlete-tab-content">
        {activeTab === 'biometrics' && (
          <div>
            <h3 className="athlete-section-title">250Hz Ingestion Curve (Z1 to Z5 Zone Distribution)</h3>
            <div className="athlete-zones-grid">
              <div className="athlete-zone-card">
                <div className="athlete-zone-label">Zone 1 (Recovery)</div>
                <div className="athlete-zone-value">42 mins</div>
              </div>
              <div className="athlete-zone-card">
                <div className="athlete-zone-label">Zone 4 (Threshold)</div>
                <div className="athlete-zone-value" style={{ color: 'var(--accent-secondary)' }}>18 mins</div>
              </div>
              <div className="athlete-zone-card">
                <div className="athlete-zone-label">Zone 5 (Max Capacity)</div>
                <div className="athlete-zone-value" style={{ color: 'var(--accent-primary)' }}>6 mins</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'injuries' && (
          <div>
            <h3 className="athlete-section-title">Return to Play Protocol Tracker</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Last concussion screening: 14 Oct 2026. Neck strength baseline: 42 kg isometric tension (Pass).
            </p>
            <div className="athlete-rtp-banner">
              Stage 6 Complete: Full Contact Scrimmage Permitted
            </div>
          </div>
        )}

        {activeTab === 'workouts' && (
          <div>
            <h3 className="athlete-section-title">Assigned Microcycle Session: MD-2 Explosive Power</h3>
            <ul className="athlete-workout-list">
              <li className="athlete-workout-item">
                <span>Power Clean from Hang</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>4 sets × 3 reps @ 110 kg</span>
              </li>
              <li className="athlete-workout-item">
                <span>Trap Bar Deadlift (Explosive Peak)</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>3 sets × 5 reps @ 180 kg</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
