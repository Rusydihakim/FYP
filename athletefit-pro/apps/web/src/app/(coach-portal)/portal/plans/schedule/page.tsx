'use client';

import React, { useState } from 'react';
import '../../../../../styles/coach-portal/plan-schedule.css';

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
    <div className="schedule-container">
      {/* Header */}
      <div className="schedule-header">
        <div>
          <span className="schedule-screen-tag">
            [SCREEN W-06] MATCH-WEEK MASTER CALENDAR &amp; DISPATCH
          </span>
          <h1 className="schedule-title">Weekly Rugby Microcycle</h1>
        </div>

        <div className="schedule-actions">
          {/* Unit Toggle */}
          <div className="schedule-unit-toggle">
            {(['All', 'Forwards', 'Backs'] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setSelectedUnit(u)}
                className={`schedule-unit-btn ${selectedUnit === u ? 'schedule-unit-btn--active' : ''}`}
              >
                {u}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleDispatch}
            className={`schedule-dispatch-btn ${isDispatched ? 'schedule-dispatch-btn--dispatched' : ''}`}
          >
            {isDispatched ? '✓ Dispatched to Squad Phones!' : '📲 Publish Schedule to Squad Devices'}
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="schedule-grid">
        {days.map((d) => (
          <div
            key={d.code}
            className={`schedule-day-card ${d.code === 'MD-2' ? 'schedule-day-card--active' : ''}`}
          >
            {d.code === 'MD-2' && (
              <span className="schedule-active-tag">
                Today Active
              </span>
            )}

            <div>
              <div className="schedule-day-header">
                <span className="schedule-day-code">
                  {d.code}
                </span>
                <span className="schedule-day-name">{d.day}</span>
              </div>
              <div className="schedule-day-focus">
                {d.focus}
              </div>
            </div>

            <div className="schedule-day-footer">
              <span>Volume: {d.volume}</span>
              <span>Unit: {d.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
