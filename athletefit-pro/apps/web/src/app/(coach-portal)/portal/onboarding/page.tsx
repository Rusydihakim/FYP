'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function OrganizationOnboarding() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [clubName, setClubName] = useState('Vanguard Rugby Football Club');
  const [primarySport, setPrimarySport] = useState('rugby_union');
  const [inviteCode, setInviteCode] = useState('RUGBY-8492');

  const regenerateCode = () => {
    const random = Math.floor(1000 + Math.random() * 9000);
    setInviteCode(`RUGBY-${random}`);
  };

  return (
    <div style={{ maxWidth: '800px', marginInline: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {/* Title */}
      <div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>
          [SCREEN W-02] CLUB SETUP &amp; INVITE PROTOCOL
        </span>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Club &amp; Academy Onboarding</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Configure rugby club profile, assign match-day microcycle defaults, and generate team invite credentials.
        </p>
      </div>

      {/* 3-Step Wizard Navigation */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-divider)', gap: 'var(--space-md)' }}>
        {[
          { num: 1, title: '1. Club Identity' },
          { num: 2, title: '2. Rugby Presets' },
          { num: 3, title: '3. Squad Invite Code' },
        ].map((s) => (
          <button
            key={s.num}
            type="button"
            onClick={() => setStep(s.num as any)}
            style={{
              paddingBlock: '0.75rem',
              border: 'none',
              backgroundColor: 'transparent',
              borderBottom: step === s.num ? '3px solid var(--accent-primary)' : '3px solid transparent',
              color: step === s.num ? 'var(--text-primary)' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)' }}>
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Club Entity Details</h2>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                Official Club / Franchise Name
              </label>
              <input
                type="text"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.625rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-divider)',
                  backgroundColor: 'var(--bg-app)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                Sport Engine Preset
              </label>
              <select
                value={primarySport}
                onChange={(e) => setPrimarySport(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.625rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-divider)',
                  backgroundColor: 'var(--bg-app)',
                  color: 'var(--text-primary)',
                }}
              >
                <option value="rugby_union">Rugby Union (15s — Active Pilot)</option>
                <option value="rugby_league">Rugby League (13s)</option>
                <option value="football">Football / Soccer</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              style={{
                alignSelf: 'flex-start',
                marginTop: 'var(--space-sm)',
                paddingBlock: '0.625rem',
                paddingInline: '1.25rem',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--color-midnight-indigo)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Continue to Rugby Presets ➔
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Default Match Microcycle Preset</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Standard 7-day Rugby Union microcycle model with automated taper and post-match recovery.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-sm)' }}>
              <div style={{ padding: '0.75rem', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-app)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.8125rem' }}>MD-4 (Tuesday)</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>High-Strain Contact &amp; Scrum</div>
              </div>
              <div style={{ padding: '0.75rem', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-app)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.8125rem' }}>MD-2 (Thursday)</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Speed, Lineout &amp; Team Run</div>
              </div>
              <div style={{ padding: '0.75rem', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-app)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--accent-primary)' }}>MD (Saturday)</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>Match Day Kickoff</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(3)}
              style={{
                alignSelf: 'flex-start',
                marginTop: 'var(--space-sm)',
                paddingBlock: '0.625rem',
                paddingInline: '1.25rem',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--color-midnight-indigo)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Generate Squad Credentials ➔
            </button>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', alignItems: 'center', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Squad Mobile Registration Code</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', maxWidth: '480px' }}>
              Share this invite code with squad athletes. When entering this code in their mobile app, they automatically join {clubName}.
            </p>

            <div
              style={{
                paddingBlock: '1rem',
                paddingInline: '2rem',
                backgroundColor: 'var(--bg-app)',
                border: '2px dashed var(--accent-primary)',
                borderRadius: 'var(--radius-lg)',
                fontFamily: 'var(--font-mono)',
                fontSize: '2rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                color: 'var(--accent-primary)',
              }}
            >
              {inviteCode}
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
              <button
                type="button"
                onClick={regenerateCode}
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
                🔄 Regenerate
              </button>

              <Link
                href="/portal/dashboard"
                style={{
                  paddingBlock: '0.5rem',
                  paddingInline: '1.25rem',
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--color-midnight-indigo)',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                Go to Squad Command ➔
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
