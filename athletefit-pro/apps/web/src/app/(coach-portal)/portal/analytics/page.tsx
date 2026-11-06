'use client';

import React from 'react';
import '../../../../styles/coach-portal/analytics.css';

export default function SquadTelemetryAnalyticsPage() {
  return (
    <div className="analytics-container">
      {/* Header */}
      <div className="analytics-header">
        <div>
          <span className="analytics-screen-tag">
            [SCREEN W-07] SQUAD TELEMETRY &amp; BIOMETRIC AUDIT DESK
          </span>
          <h1 className="analytics-title">Squad Biometric Analytics</h1>
        </div>

        <button type="button" className="analytics-export-btn">
          📥 Export CSV / Sports Science Audit
        </button>
      </div>

      {/* Comparative Telemetry Overlay Canvas */}
      <section className="analytics-card">
        <div className="analytics-card-header">
          <div>
            <h2 className="analytics-card-title">
              High-Speed Running (HSR &gt; 5.5 m/s) vs. Heart Rate Recovery
            </h2>
            <p className="analytics-card-subtitle">
              Multi-Player Overlay (Forwards Pack vs Backline Engine)
            </p>
          </div>
          <div className="analytics-legend">
            <span className="analytics-legend--backline">● Backline Avg (720m)</span>
            <span className="analytics-legend--forwards">● Forwards Pack Avg (380m)</span>
          </div>
        </div>

        {/* Mock Visual Waveform Graphic */}
        <div className="analytics-waveform-box">
          <svg className="analytics-waveform-svg" viewBox="0 0 800 240" preserveAspectRatio="none">
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
      <section className="analytics-card">
        <h2 className="analytics-card-title">IoT Wearable Fleet Health</h2>
        <div className="analytics-fleet-grid">
          <div className="analytics-fleet-card">
            <div className="analytics-fleet-name">WHOOP 4.0 Fleet</div>
            <div className="analytics-fleet-count analytics-fleet-count--cleared">18 / 18 Active</div>
            <div className="analytics-fleet-meta">Last sync: 4 mins ago</div>
          </div>
          <div className="analytics-fleet-card">
            <div className="analytics-fleet-name">Apple Watch Ultra</div>
            <div className="analytics-fleet-count analytics-fleet-count--cleared">12 / 12 Active</div>
            <div className="analytics-fleet-meta">HealthKit Pod Sync OK</div>
          </div>
          <div className="analytics-fleet-card">
            <div className="analytics-fleet-name">Garmin HRM-Pro</div>
            <div className="analytics-fleet-count analytics-fleet-count--modified">4 Active / 1 Stale</div>
            <div className="analytics-fleet-meta analytics-fleet-meta--alert">Sync reminder queued</div>
          </div>
        </div>
      </section>
    </div>
  );
}
