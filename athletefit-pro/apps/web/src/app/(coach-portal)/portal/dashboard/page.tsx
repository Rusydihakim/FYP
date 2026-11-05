'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface SquadPlayer {
  id: string;
  name: string;
  jersey: number;
  unit: 'Forwards' | 'Backs';
  position: string;
  readiness: number;
  status: 'cleared' | 'modified' | 'critical';
  wearableStatus: 'live' | 'stale';
  lastHSR: string;
}

const DEMO_SQUAD: SquadPlayer[] = [
  { id: 'p-itoje', name: 'Maro Itoje', jersey: 4, unit: 'Forwards', position: 'Lock / Second Row', readiness: 94, status: 'cleared', wearableStatus: 'live', lastHSR: '482m' },
  { id: 'p-genge', name: 'Ellis Genge', jersey: 1, unit: 'Forwards', position: 'Loosehead Prop', readiness: 86, status: 'cleared', wearableStatus: 'live', lastHSR: '290m' },
  { id: 'p-curry', name: 'Tom Curry', jersey: 7, unit: 'Forwards', position: 'Openside Flanker', readiness: 68, status: 'modified', wearableStatus: 'live', lastHSR: '610m' },
  { id: 'p-smith', name: 'Marcus Smith', jersey: 10, unit: 'Backs', position: 'Fly-half', readiness: 96, status: 'cleared', wearableStatus: 'live', lastHSR: '740m' },
  { id: 'p-lawrence', name: 'Ollie Lawrence', jersey: 12, unit: 'Backs', position: 'Inside Centre', readiness: 42, status: 'critical', wearableStatus: 'live', lastHSR: '180m' },
  { id: 'p-freeman', name: 'Tommy Freeman', jersey: 14, unit: 'Backs', position: 'Right Wing', readiness: 91, status: 'cleared', wearableStatus: 'live', lastHSR: '820m' },
];

export default function SquadCommandDashboard() {
  const [filterUnit, setFilterUnit] = useState<'All' | 'Forwards' | 'Backs'>('All');

  const filteredPlayers = DEMO_SQUAD.filter(
    (p) => filterUnit === 'All' || p.unit === filterUnit
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {/* Screen Header & Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>
            [SCREEN W-03] DESKTOP SQUAD COMMAND
          </span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Match-Day Operational Hub
          </h1>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
          <Link
            href="/portal/plans/schedule"
            style={{
              paddingBlock: '0.5rem',
              paddingInline: '1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--color-midnight-indigo)',
              fontWeight: 700,
              fontSize: '0.875rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>📅 Publish MD-2 Schedule</span>
          </Link>
        </div>
      </div>

      {/* Match Countdown Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, color-mix(in oklab, var(--color-volt-lime), transparent 85%), color-mix(in oklab, var(--color-electric-orchid), transparent 85%))',
          border: '1px solid var(--border-divider)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-md)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🏉</span>
            <span style={{ fontWeight: 800, fontSize: '1.125rem', textTransform: 'uppercase' }}>
              48 Hours to Kickoff — Game vs. Harlequins
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Twickenham Stoop • Match Day -2 Taper Active • Contact clearance locked for high-impact drills.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>
              48:14:02
            </div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Countdown to Whistle
            </div>
          </div>
        </div>
      </section>

      {/* KPI Ribbon */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-md)',
        }}
      >
        <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Squad Availability
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--status-cleared)', marginBlock: '0.25rem' }}>
            32 / 35
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>91.4% Cleared for match roster</div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Forwards Unit Readiness
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--accent-primary)', marginBlock: '0.25rem' }}>
            88%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pack recovery within optimal range</div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Backs Unit Readiness
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--accent-secondary)', marginBlock: '0.25rem' }}>
            92%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sprint readiness high / CNS recovered</div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-md)', padding: 'var(--space-md)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--status-critical)', fontWeight: 600, textTransform: 'uppercase' }}>
            Concussion &amp; RTP Hold
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--status-critical)', marginBlock: '0.25rem' }}>
            2 Players
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--status-critical)' }}>Stage 3 non-contact protocol</div>
        </div>
      </section>

      {/* Squad Roster Table & Positional Unit Filtering */}
      <section style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Active Squad Roster &amp; Biometric Readiness</h2>

          {/* Unit Toggle Tabs */}
          <div style={{ display: 'inline-flex', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-md)', padding: '3px' }}>
            {(['All', 'Forwards', 'Backs'] as const).map((unit) => (
              <button
                key={unit}
                type="button"
                onClick={() => setFilterUnit(unit)}
                style={{
                  paddingBlock: '0.3125rem',
                  paddingInline: '0.875rem',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: filterUnit === unit ? 'var(--bg-surface-elevated)' : 'transparent',
                  color: filterUnit === unit ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                {unit}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ inlineSize: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-divider)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.75rem' }}>Jersey</th>
                <th style={{ padding: '0.75rem' }}>Player</th>
                <th style={{ padding: '0.75rem' }}>Unit / Position</th>
                <th style={{ padding: '0.75rem' }}>Readiness</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Last HSR</th>
                <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player) => (
                <tr key={player.id} style={{ borderBottom: '1px solid var(--border-divider)' }}>
                  <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    #{player.jersey}
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>
                    <Link href={`/portal/athletes/${player.id}`} style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}>
                      {player.name}
                    </Link>
                  </td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{player.unit}:</span> {player.position}
                  </td>
                  <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    <span
                      style={{
                        color:
                          player.readiness >= 80
                            ? 'var(--status-cleared)'
                            : player.readiness >= 50
                            ? 'var(--status-modified)'
                            : 'var(--status-critical)',
                      }}
                    >
                      {player.readiness}%
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        paddingBlock: '0.1875rem',
                        paddingInline: '0.5rem',
                        borderRadius: 'var(--radius-pill)',
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        backgroundColor:
                          player.status === 'cleared'
                            ? 'color-mix(in oklab, var(--status-cleared), transparent 85%)'
                            : player.status === 'modified'
                            ? 'color-mix(in oklab, var(--status-modified), transparent 85%)'
                            : 'color-mix(in oklab, var(--status-critical), transparent 85%)',
                        color:
                          player.status === 'cleared'
                            ? 'var(--status-cleared)'
                            : player.status === 'modified'
                            ? 'var(--status-modified)'
                            : 'var(--status-critical)',
                      }}
                    >
                      ● {player.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {player.lastHSR}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    <Link
                      href={`/portal/athletes/${player.id}`}
                      style={{
                        paddingBlock: '0.25rem',
                        paddingInline: '0.625rem',
                        backgroundColor: 'var(--bg-app)',
                        border: '1px solid var(--border-divider)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      Inspect →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
