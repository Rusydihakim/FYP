'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function MatchSchedulePage() {
  const [selectedUnit, setSelectedUnit] = useState<'All' | 'Forwards' | 'Backs'>('Forwards');
  const [isDispatched, setIsDispatched] = useState(false);

  const days = [
    { code: 'MD-4', day: 'Tuesday', focus: 'Heavy Contact & Scrum Drive', volume: 'High (85%)', unit: 'Forwards' },
    { code: 'MD-3', day: 'Wednesday', focus: 'Active Recovery & Biometric Reset', volume: 'Low (30%)', unit: 'All' },
    { code: 'MD-2', day: 'Thursday', focus: 'Explosive Power & Team Run', volume: 'Medium (65%)', unit: 'All' },
    { code: 'MD-1', day: 'Friday', focus: 'Captain’s Run & Tactical Walkthrough', volume: 'Low (25%)', unit: 'All' },
    { code: 'MD', day: 'Saturday', focus: 'Match Day vs. Harlequins (Twickenham)', volume: 'Max (100%)', unit: 'Match 23' },
    { code: 'MD+1', day: 'Sunday', focus: 'Cryotherapy & Pool Recovery', volume: 'Regen (15%)', unit: 'All' },
  ];

  const handleDispatch = () => {
    setIsDispatched(true);
    setTimeout(() => setIsDispatched(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>
            [SCREEN W-06] MATCH-WEEK MASTER CALENDAR &amp; DISPATCH
          </span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Weekly Rugby Microcycle</h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          {/* Unit Toggle */}
          <div style={{ display: 'inline-flex', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-md)', padding: '2px' }}>
            {(['All', 'Forwards', 'Backs'] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setSelectedUnit(u)}
                style={{
                  paddingBlock: '0.3125rem',
                  paddingInline: '0.75rem',
                  border: 'none',
                  backgroundColor: selectedUnit === u ? 'var(--bg-surface-elevated)' : 'transparent',
                  color: selectedUnit === u ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                {u}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleDispatch}
            style={{
              paddingBlock: '0.5rem',
              paddingInline: '1.25rem',
              backgroundColor: isDispatched ? 'var(--status-cleared)' : 'var(--accent-primary)',
              color: 'var(--color-midnight-indigo)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'background-color 200ms ease',
            }}
          >
            {isDispatched ? '✓ Dispatched to Squad Phones!' : '📲 Publish Schedule to Squad Devices'}
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-md)' }}>
        {days.map((d) => (
          <div
            key={d.code}
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: d.code === 'MD-2' ? '2px solid var(--accent-primary)' : '1px solid var(--border-divider)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-md)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 'var(--space-md)',
              position: 'relative',
            }}
          >
            {d.code === 'MD-2' && (
              <span
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '12px',
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--color-midnight-indigo)',
                  fontSize: '0.625rem',
                  fontWeight: 800,
                  paddingBlock: '2px',
                  paddingInline: '8px',
                  borderRadius: 'var(--radius-pill)',
                  textTransform: 'uppercase',
                }}
              >
                Today Active
              </span>
            )}

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.125rem', color: 'var(--accent-secondary)' }}>
                  {d.code}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{d.day}</span>
              </div>
              <div style={{ marginTop: '0.5rem', fontWeight: 700, fontSize: '0.9375rem' }}>
                {d.focus}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-divider)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>Volume: {d.volume}</span>
              <span>Unit: {d.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
