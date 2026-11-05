'use client';

import React from 'react';
import Link from 'next/link';

export default function AthleteTrainingHub() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {/* Title */}
      <div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>
          [SCREEN AW-02] ATHLETE WEB TRAINING HUB
        </span>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Welcome Back, Maro</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Vanguard RFC • Match Day -2 Taper Active • Kickoff in 48 Hours vs Harlequins.
        </p>
      </div>

      {/* Hero Session & Readiness Split */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-md)' }}>
        {/* Readiness Circular Ring Card */}
        <section style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '9999px',
              border: '8px solid var(--status-cleared)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--status-cleared)' }}>
              94%
            </span>
            <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Optimal</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Full Contact Cleared</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              HRV baseline is +8% above standard, resting heart rate 46 bpm. CNS is recovered for explosive sprint taper.
            </p>
          </div>
        </section>

        {/* Today's Prescribed Session Card */}
        <section style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)', fontWeight: 700 }}>
                TODAY’S SCHEDULED WORKOUT
              </span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--accent-primary)', fontWeight: 600 }}>MD-2 Power Block</span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Explosive Power &amp; Hang Cleans</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              4 Sets Hang Power Clean + 3 Sets Trap Bar Peak Drive. Target RPE 8.0.
            </p>
          </div>

          <Link
            href="/athlete/workouts"
            style={{
              alignSelf: 'flex-start',
              marginTop: 'var(--space-md)',
              paddingBlock: '0.5rem',
              paddingInline: '1rem',
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--color-midnight-indigo)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.8125rem',
            }}
          >
            Open Workout Logger ➔
          </Link>
        </section>
      </div>

      {/* Coach Note Panel */}
      <section style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-xs)' }}>
          <span>📋</span>
          <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>Coach Tactical Note (Kevin Sinfield)</h2>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          "Focus on crisp hip extension during the clean phase today. Keep total session under 45 minutes to protect Saturday energy reserves."
        </p>
      </section>
    </div>
  );
}
