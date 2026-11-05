'use client';

import React from 'react';

export default function AthleteAnalyticsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {/* Title */}
      <div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>
          [SCREEN AW-04] PERFORMANCE ANALYTICS &amp; RUGBY METRICS
        </span>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Athletic Progress &amp; Bronco Trends</h1>
      </div>

      {/* Metrics Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
        <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>1.2 KM BRONCO TEST TIME</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', marginBlock: '0.25rem' }}>
            4:38 min
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--status-cleared)' }}>+14 seconds improvement since pre-season</div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>CUMULATIVE TONNAGE (4 WEEKS)</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)', marginBlock: '0.25rem' }}>
            48,200 kg
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target microcycle progression on track</div>
        </div>
      </section>

      {/* Visual Chart Card */}
      <section style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
          High-Speed Running (HSR &gt; 5.5 m/s) Volume
        </h2>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>
          Weekly meters logged across match-days and training runs
        </p>

        <div
          style={{
            height: '200px',
            backgroundColor: 'var(--bg-app)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-divider)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="var(--color-volt-lime)"
              strokeWidth="3"
              points="20,160 120,140 220,90 320,110 420,60 520,70"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}
