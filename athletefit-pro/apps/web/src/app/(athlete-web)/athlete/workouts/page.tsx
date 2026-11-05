'use client';

import React, { useState } from 'react';

export default function AthleteWorkoutsPage() {
  const [exercises, setExercises] = useState([
    { id: '1', name: 'Hang Power Clean', sets: 4, reps: 3, weight: 110, rpe: 8, completed: true },
    { id: '2', name: 'Trap Bar Jump Shrug', sets: 3, reps: 5, weight: 140, rpe: 7.5, completed: false },
    { id: '3', name: 'Nordic Hamstring Drop', sets: 3, reps: 6, weight: 0, rpe: 8.5, completed: false },
  ]);

  const toggleSet = (idx: number) => {
    const next = [...exercises];
    next[idx].completed = !next[idx].completed;
    setExercises(next);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>
            [SCREEN AW-03] WORKOUT LOGGER &amp; TONNAGE ARCHIVE
          </span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>MD-2 Explosive Power Logger</h1>
        </div>

        <div style={{ fontSize: '0.875rem', fontFamily: 'var(--font-mono)', color: 'var(--status-cleared)', fontWeight: 700 }}>
          Session Volume: 3,420 kg
        </div>
      </div>

      {/* Exercise Table with Checkboxes */}
      <section style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: 'var(--space-md)' }}>Prescribed Exercise Sets</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
          {exercises.map((ex, idx) => (
            <div
              key={ex.id}
              style={{
                padding: '1rem',
                backgroundColor: ex.completed ? 'color-mix(in oklab, var(--status-cleared), transparent 92%)' : 'var(--bg-app)',
                border: ex.completed ? '1px solid var(--status-cleared)' : '1px solid var(--border-divider)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--space-sm)',
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{ex.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Target: {ex.sets} Sets × {ex.reps} Reps @ {ex.weight > 0 ? `${ex.weight} kg` : 'Bodyweight'} (RPE {ex.rpe})
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <button
                  type="button"
                  onClick={() => toggleSet(idx)}
                  style={{
                    paddingBlock: '0.375rem',
                    paddingInline: '0.875rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: ex.completed ? 'var(--status-cleared)' : 'var(--bg-surface-elevated)',
                    color: ex.completed ? 'var(--color-midnight-indigo)' : 'var(--text-primary)',
                    border: '1px solid var(--border-divider)',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                  }}
                >
                  {ex.completed ? '✓ Completed' : 'Mark Done'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
