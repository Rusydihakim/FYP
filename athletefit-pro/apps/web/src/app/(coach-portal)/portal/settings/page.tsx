'use client';

import React from 'react';
import '../../../../styles/coach-portal/settings.css';

export default function ClubSettingsPage() {
  return (
    <div className="settings-container">
      {/* Header */}
      <div className="settings-header">
        <span className="settings-screen-tag">
          [SCREEN W-09] CLUB SETTINGS, STAFF ROLES &amp; API CREDENTIALS
        </span>
        <h1 className="settings-title">Club Staff &amp; System Integrations</h1>
      </div>

      {/* Staff Roles & Permissions Table */}
      <section className="settings-card">
        <h2 className="settings-card-title">Staff Permissions</h2>
        <div className="settings-table-wrapper">
          <table className="settings-table">
            <thead>
              <tr>
                <th className="settings-th">Staff Member</th>
                <th className="settings-th">Role</th>
                <th className="settings-th">Permissions</th>
                <th className="settings-th">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="settings-td settings-td--name">Kevin Sinfield</td>
                <td className="settings-td">Head of Performance</td>
                <td className="settings-td settings-td--desc">Full System Admin &amp; Schedule Dispatch</td>
                <td className="settings-td settings-td--status">● Active</td>
              </tr>
              <tr>
                <td className="settings-td settings-td--name">Dr. Jonathan Webb</td>
                <td className="settings-td">Lead Team Physio</td>
                <td className="settings-td settings-td--desc">Injury &amp; Concussion Return-to-Play Authority</td>
                <td className="settings-td settings-td--status">● Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Wearable API Credentials */}
      <section className="settings-card">
        <h2 className="settings-card-title">Wearable Fleet Webhook Endpoints</h2>
        <div className="settings-integrations-grid">
          <div className="settings-integration-card">
            <div className="settings-integration-name">WHOOP Cloud API</div>
            <div className="settings-integration-endpoint">/api/wearables/whoop</div>
            <div className="settings-integration-status">✓ Webhook Listening</div>
          </div>
          <div className="settings-integration-card">
            <div className="settings-integration-name">Fitbit Web API</div>
            <div className="settings-integration-endpoint">/api/wearables/fitbit</div>
            <div className="settings-integration-status">✓ Webhook Listening</div>
          </div>
          <div className="settings-integration-card">
            <div className="settings-integration-name">Garmin Connect IQ</div>
            <div className="settings-integration-endpoint">/api/wearables/garmin</div>
            <div className="settings-integration-status">✓ Webhook Listening</div>
          </div>
        </div>
      </section>
    </div>
  );
}
