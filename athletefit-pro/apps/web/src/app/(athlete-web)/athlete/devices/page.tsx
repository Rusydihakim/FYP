'use client';

import React from 'react';

export default function AthleteDevicesPage() {
  const devices = [
    { name: 'Apple Watch Ultra 2', provider: 'Apple HealthKit', battery: '84%', lastSync: '12 mins ago', status: 'online' },
    { name: 'WHOOP 4.0 Bicep Band', provider: 'WHOOP Cloud API', battery: '92%', lastSync: '4 mins ago', status: 'online' },
    { name: 'Garmin HRM-Pro Plus', provider: 'Garmin Connect IQ', battery: '100%', lastSync: 'Yesterday (Match Run)', status: 'offline' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {/* Title */}
      <div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>
          [SCREEN AW-05] CONNECTED DEVICES STATUS (VIEW ONLY)
        </span>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>My Connected Wearables</h1>
      </div>

      {/* Mandatory Mobile App Advisory Banner */}
      <div
        style={{
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'color-mix(in oklab, var(--accent-secondary), transparent 88%)',
          border: '1px solid var(--accent-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-sm)',
        }}
      >
        <span style={{ fontSize: '1.25rem' }}>📱</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Device Pairing via Mobile Only</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            To pair, calibrate, or configure a new sensor pod, please open the <strong>AthleteFit Pro Mobile App</strong> on your smartphone.
          </div>
        </div>
      </div>

      {/* Device Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
        {devices.map((d) => (
          <div
            key={d.name}
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-divider)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-sm)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '1rem' }}>{d.name}</span>
              <span
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: d.status === 'online' ? 'var(--status-cleared)' : 'var(--text-muted)',
                }}
              >
                ● {d.status === 'online' ? 'Active' : 'Standby'}
              </span>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Provider: {d.provider}</div>

            <div style={{ borderTop: '1px solid var(--border-divider)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <span>Battery: <strong>{d.battery}</strong></span>
              <span>Sync: <strong>{d.lastSync}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
