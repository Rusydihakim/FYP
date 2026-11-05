'use client';

import React from 'react';

export default function SquadTelemetryAnalyticsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>
            [SCREEN W-07] SQUAD TELEMETRY &amp; BIOMETRIC AUDIT DESK
          </span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Squad Biometric Analytics</h1>
        </div>

        <button
          type="button"
          style={{
            paddingBlock: '0.5rem',
            paddingInline: '1rem',
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-divider)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            fontWeight: 600,
            fontSize: '0.75rem',
            cursor: 'pointer',
          }}
        >
          📥 Export CSV / Sports Science Audit
        </button>
      </div>

      {/* Comparative Telemetry Overlay Canvas */}
      <section style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>High-Speed Running (HSR &gt; 5.5 m/s) vs. Heart Rate Recovery</h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Multi-Player Overlay (Forwards Pack vs Backline Engine)</p>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-sm)', fontSize: '0.75rem' }}>
            <span style={{ color: 'var(--accent-primary)' }}>● Backline Avg (720m)</span>
            <span style={{ color: 'var(--accent-secondary)' }}>● Forwards Pack Avg (380m)</span>
          </div>
        </div>

        {/* Mock Visual Waveform Graphic */}
        <div
          style={{
            height: '240px',
            backgroundColor: 'var(--bg-app)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-divider)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 800 240" preserveAspectRatio="none" style={{ opacity: 0.85 }}>
            <path
              d="M0,180 Q100,60 200,120 T400,90 T600,150 T800,40"
              fill="none"
              stroke="var(--color-volt-lime)"
              strokeWidth="3"
            />
            <path
              d="M0,200 Q150,140 300,170 T500,120 T700,180 T800,110"
              fill="none"
              stroke="var(--color-electric-orchid)"
              strokeWidth="2.5"
              strokeDasharray="4,4"
            />
          </svg>
        </div>
      </section>

      {/* Device Health & API Ingestion Stream */}
      <section style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: 'var(--space-md)' }}>IoT Wearable Fleet Health</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
          <div style={{ padding: '0.875rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>WHOOP 4.0 Fleet</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--status-cleared)' }}>18 / 18 Active</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Last sync: 4 mins ago</div>
          </div>
          <div style={{ padding: '0.875rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Apple Watch Ultra</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--status-cleared)' }}>12 / 12 Active</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>HealthKit Pod Sync OK</div>
          </div>
          <div style={{ padding: '0.875rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Garmin HRM-Pro</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--status-modified)' }}>4 Active / 1 Stale</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--status-modified)' }}>Sync reminder queued</div>
          </div>
        </div>
      </section>
    </div>
  );
}
