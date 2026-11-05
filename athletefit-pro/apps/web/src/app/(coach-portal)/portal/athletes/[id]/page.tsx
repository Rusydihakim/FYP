'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AthleteInspectionPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'biometrics' | 'injuries' | 'workouts'>('biometrics');
  const [contactCleared, setContactCleared] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>
            [SCREEN W-04] POSITIONAL PROFILE &amp; BIOMETRIC INSPECTION
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <Link href="/portal/dashboard" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              ← Squad Roster
            </Link>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Maro Itoje #4</h1>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                paddingBlock: '0.2rem',
                paddingInline: '0.6rem',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: contactCleared ? 'color-mix(in oklab, var(--status-cleared), transparent 85%)' : 'color-mix(in oklab, var(--status-critical), transparent 85%)',
                color: contactCleared ? 'var(--status-cleared)' : 'var(--status-critical)',
              }}
            >
              {contactCleared ? '● Full Contact Cleared' : '⚠️ Medical Non-Contact Hold'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
          <button
            type="button"
            onClick={() => setContactCleared(!contactCleared)}
            style={{
              paddingBlock: '0.5rem',
              paddingInline: '0.875rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-divider)',
              backgroundColor: 'var(--bg-surface-elevated)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            {contactCleared ? '🚫 Place on Non-Contact Hold' : '✅ Clear for Contact'}
          </button>
          <Link
            href="/portal/messages"
            style={{
              paddingBlock: '0.5rem',
              paddingInline: '0.875rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--color-midnight-indigo)',
              fontWeight: 700,
              fontSize: '0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            💬 Direct Message
          </Link>
        </div>
      </div>

      {/* Athlete Header Card */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-md)',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-divider)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-lg)',
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Positional Unit</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>Forwards • Lock / Second Row</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Body Mass / Height</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>115 kg • 195 cm (BMI 30.2)</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>HRV (rMSSD) / Baseline</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--status-cleared)' }}>
            88 ms <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(+8% vs avg)</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bronco Test (1.2 km)</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
            4:38 min <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>(Club Top 10%)</span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-xs)', borderBottom: '1px solid var(--border-divider)' }}>
        {[
          { key: 'biometrics', label: 'Heart Rate & Strain Telemetry' },
          { key: 'injuries', label: 'Collision & Return-to-Play Log' },
          { key: 'workouts', label: 'Prescribed Rugby Workouts' },
        ].map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActiveTab(t.key as any)}
            style={{
              paddingBlock: '0.625rem',
              paddingInline: '1rem',
              border: 'none',
              backgroundColor: 'transparent',
              borderBottom: activeTab === t.key ? '3px solid var(--accent-primary)' : '3px solid transparent',
              color: activeTab === t.key ? 'var(--text-primary)' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.8125rem',
              cursor: 'pointer',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)' }}>
        {activeTab === 'biometrics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>250Hz Ingestion Curve (Z1 to Z5 Zone Distribution)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-sm)' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Zone 1 (Recovery)</div>
                <div style={{ fontSize: '1.125rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>42 mins</div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Zone 4 (Threshold)</div>
                <div style={{ fontSize: '1.125rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)' }}>18 mins</div>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Zone 5 (Max Capacity)</div>
                <div style={{ fontSize: '1.125rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>6 mins</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'injuries' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Return to Play Protocol Tracker</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Last concussion screening: 14 Oct 2026. Neck strength baseline: 42 kg isometric tension (Pass).
            </p>
            <div style={{ padding: '0.75rem', backgroundColor: 'color-mix(in oklab, var(--status-cleared), transparent 90%)', borderRadius: 'var(--radius-md)', border: '1px solid var(--status-cleared)' }}>
              <div style={{ fontWeight: 700, color: 'var(--status-cleared)' }}>Stage 6 Complete: Full Contact Scrimmage Permitted</div>
            </div>
          </div>
        )}

        {activeTab === 'workouts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Assigned Microcycle Session: MD-2 Explosive Power</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
              <li style={{ padding: '0.625rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Power Clean from Hang</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>4 sets × 3 reps @ 110 kg</span>
              </li>
              <li style={{ padding: '0.625rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between' }}>
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
