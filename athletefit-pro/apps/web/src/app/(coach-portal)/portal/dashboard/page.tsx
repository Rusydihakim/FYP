'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import '../../../../styles/coach-portal/dashboard.css';

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
    <div className="dashboard-container">
      {/* Screen Header & Title */}
      <div className="dashboard-header">
        <div>
          <span className="dashboard-screen-tag">
            [SCREEN W-03] DESKTOP SQUAD COMMAND
          </span>
          <h1 className="dashboard-title">
            Match-Day Operational Hub
          </h1>
        </div>

        <div>
          <Link href="/portal/plans/schedule" className="dashboard-schedule-btn">
            <span>📅 Publish MD-2 Schedule</span>
          </Link>
        </div>
      </div>

      {/* Match Countdown Banner */}
      <section className="dashboard-countdown-banner">
        <div className="dashboard-countdown-left">
          <div className="dashboard-countdown-heading">
            <span className="dashboard-countdown-icon">🏉</span>
            <span className="dashboard-countdown-title">
              48 Hours to Kickoff — Game vs. Harlequins
            </span>
          </div>
          <p className="dashboard-countdown-desc">
            Twickenham Stoop • Match Day -2 Taper Active • Contact clearance locked for high-impact drills.
          </p>
        </div>

        <div className="dashboard-countdown-timer">
          <div className="dashboard-countdown-digits">48:14:02</div>
          <div className="dashboard-countdown-label">Countdown to Whistle</div>
        </div>
      </section>

      {/* KPI Ribbon */}
      <section className="dashboard-kpi-grid">
        <div className="dashboard-kpi-card">
          <div className="dashboard-kpi-label">Squad Availability</div>
          <div className="dashboard-kpi-value dashboard-kpi-value--cleared">32 / 35</div>
          <div className="dashboard-kpi-meta">91.4% Cleared for match roster</div>
        </div>

        <div className="dashboard-kpi-card">
          <div className="dashboard-kpi-label">Forwards Unit Readiness</div>
          <div className="dashboard-kpi-value dashboard-kpi-value--accent">88%</div>
          <div className="dashboard-kpi-meta">Pack recovery within optimal range</div>
        </div>

        <div className="dashboard-kpi-card">
          <div className="dashboard-kpi-label">Backs Unit Readiness</div>
          <div className="dashboard-kpi-value dashboard-kpi-value--orchid">92%</div>
          <div className="dashboard-kpi-meta">Sprint readiness high / CNS recovered</div>
        </div>

        <div className="dashboard-kpi-card">
          <div className="dashboard-kpi-label" style={{ color: 'var(--status-critical)' }}>
            Concussion &amp; RTP Hold
          </div>
          <div className="dashboard-kpi-value dashboard-kpi-value--critical">2 Players</div>
          <div className="dashboard-kpi-meta dashboard-kpi-meta--critical">Stage 3 non-contact protocol</div>
        </div>
      </section>

      {/* Squad Roster Table & Positional Unit Filtering */}
      <section className="dashboard-roster-card">
        <div className="dashboard-roster-header">
          <h2 className="dashboard-roster-title">Active Squad Roster &amp; Biometric Readiness</h2>

          {/* Unit Toggle Tabs */}
          <div className="dashboard-unit-toggle">
            {(['All', 'Forwards', 'Backs'] as const).map((unit) => (
              <button
                key={unit}
                type="button"
                onClick={() => setFilterUnit(unit)}
                className={`dashboard-unit-btn ${filterUnit === unit ? 'dashboard-unit-btn--active' : ''}`}
              >
                {unit}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Table */}
        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th className="dashboard-th">Jersey</th>
                <th className="dashboard-th">Player</th>
                <th className="dashboard-th">Unit / Position</th>
                <th className="dashboard-th">Readiness</th>
                <th className="dashboard-th">Status</th>
                <th className="dashboard-th">Last HSR</th>
                <th className="dashboard-th" style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player) => (
                <tr key={player.id}>
                  <td className="dashboard-td" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    #{player.jersey}
                  </td>
                  <td className="dashboard-td">
                    <Link href={`/portal/athletes/${player.id}`} className="dashboard-player-link">
                      {player.name}
                    </Link>
                  </td>
                  <td className="dashboard-td" style={{ color: 'var(--text-muted)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{player.unit}:</span> {player.position}
                  </td>
                  <td className="dashboard-td" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
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
                  <td className="dashboard-td">
                    <span
                      className={`dashboard-status-pill ${
                        player.status === 'cleared'
                          ? 'dashboard-status-pill--cleared'
                          : player.status === 'modified'
                          ? 'dashboard-status-pill--modified'
                          : 'dashboard-status-pill--critical'
                      }`}
                    >
                      ● {player.status}
                    </span>
                  </td>
                  <td className="dashboard-td" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {player.lastHSR}
                  </td>
                  <td className="dashboard-td" style={{ textAlign: 'right' }}>
                    <Link href={`/portal/athletes/${player.id}`} className="dashboard-inspect-btn">
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
