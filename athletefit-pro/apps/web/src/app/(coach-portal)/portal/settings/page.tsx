'use client';

import React from 'react';

export default function ClubSettingsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {/* Header */}
      <div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>
          [SCREEN W-09] CLUB SETTINGS, STAFF ROLES &amp; API CREDENTIALS
        </span>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Club Staff &amp; System Integrations</h1>
      </div>

      {/* Staff Roles & Permissions Table */}
      <section style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: 'var(--space-md)' }}>Staff Permissions</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-divider)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.5rem' }}>Staff Member</th>
                <th style={{ padding: '0.5rem' }}>Role</th>
                <th style={{ padding: '0.5rem' }}>Permissions</th>
                <th style={{ padding: '0.5rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Kevin Sinfield</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>Head of Performance</td>
                <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>Full System Admin &amp; Schedule Dispatch</td>
                <td style={{ padding: '0.75rem 0.5rem', color: 'var(--status-cleared)' }}>● Active</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-divider)' }}>
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Dr. Jonathan Webb</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>Lead Team Physio</td>
                <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>Injury &amp; Concussion Return-to-Play Authority</td>
                <td style={{ padding: '0.75rem 0.5rem', color: 'var(--status-cleared)' }}>● Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Wearable API Credentials */}
      <section style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: 'var(--space-md)' }}>Wearable Fleet Webhook Endpoints</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-md)' }}>
          <div style={{ padding: '0.875rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 700 }}>WHOOP Cloud API</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>
              /api/wearables/whoop
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--status-cleared)' }}>✓ Webhook Listening</div>
          </div>
          <div style={{ padding: '0.875rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 700 }}>Fitbit Web API</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>
              /api/wearables/fitbit
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--status-cleared)' }}>✓ Webhook Listening</div>
          </div>
          <div style={{ padding: '0.875rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 700 }}>Garmin Connect IQ</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>
              /api/wearables/garmin
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--status-cleared)' }}>✓ Webhook Listening</div>
          </div>
        </div>
      </section>
    </div>
  );
}
