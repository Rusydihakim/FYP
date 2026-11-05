'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface ExerciseItem {
  id: string;
  name: string;
  category: 'Scrum & Maul' | 'Power' | 'Speed' | 'Injury Mitigation';
  defaultSets: number;
  defaultReps: number;
}

const EXERCISE_DB: ExerciseItem[] = [
  { id: 'ex-1', name: 'Barbell Box Squat (Max Force)', category: 'Scrum & Maul', defaultSets: 5, defaultReps: 3 },
  { id: 'ex-2', name: 'Heavy Sled Push (Low Angle Drive)', category: 'Scrum & Maul', defaultSets: 4, defaultReps: 20 },
  { id: 'ex-3', name: 'Power Clean from Hang', category: 'Power', defaultSets: 4, defaultReps: 3 },
  { id: 'ex-4', name: 'Trap Bar Jump Shrug', category: 'Power', defaultSets: 3, defaultReps: 5 },
  { id: 'ex-5', name: 'Bronco Shuttle Interval', category: 'Speed', defaultSets: 3, defaultReps: 1 },
  { id: 'ex-6', name: 'Nordic Hamstring Curl', category: 'Injury Mitigation', defaultSets: 3, defaultReps: 6 },
  { id: 'ex-7', name: 'Iron Neck 4-Way Resistance', category: 'Injury Mitigation', defaultSets: 3, defaultReps: 10 },
];

export default function PlanBuilderPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [builderCanvas, setBuilderCanvas] = useState<ExerciseItem[]>([
    EXERCISE_DB[0],
    EXERCISE_DB[2],
  ]);

  const addExercise = (ex: ExerciseItem) => {
    setBuilderCanvas([...builderCanvas, ex]);
  };

  const removeExercise = (idx: number) => {
    setBuilderCanvas(builderCanvas.filter((_, i) => i !== idx));
  };

  const filteredExercises = EXERCISE_DB.filter(
    (ex) => selectedCategory === 'All' || ex.category === selectedCategory
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>
            [SCREEN W-05] RUGBY PLAN AUTHORING STUDIO
          </span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Training Plan Studio</h1>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
          <button
            type="button"
            style={{
              paddingBlock: '0.5rem',
              paddingInline: '1rem',
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--color-midnight-indigo)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            💾 Save Rugby Template
          </button>
        </div>
      </div>

      {/* 3-Column Studio Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 1fr) minmax(360px, 1.4fr) minmax(260px, 0.9fr)',
          gap: 'var(--space-md)',
          alignItems: 'start',
        }}
      >
        {/* Left Column: ExerciseDB API Library */}
        <section style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>ExerciseDB Library</h2>
            <span style={{ fontSize: '0.6875rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>Rugby Presets</span>
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: 'var(--space-md)' }}>
            {['All', 'Scrum & Maul', 'Power', 'Speed', 'Injury Mitigation'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  paddingBlock: '0.2rem',
                  paddingInline: '0.5rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--border-divider)',
                  backgroundColor: selectedCategory === cat ? 'var(--accent-secondary)' : 'var(--bg-app)',
                  color: selectedCategory === cat ? 'var(--color-midnight-indigo)' : 'var(--text-muted)',
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            {filteredExercises.map((ex) => (
              <div
                key={ex.id}
                style={{
                  padding: '0.625rem',
                  backgroundColor: 'var(--bg-app)',
                  border: '1px solid var(--border-divider)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{ex.name}</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{ex.category}</div>
                </div>
                <button
                  type="button"
                  onClick={() => addExercise(ex)}
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-divider)',
                    borderRadius: 'var(--radius-sm)',
                    paddingBlock: '0.25rem',
                    paddingInline: '0.5rem',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Center Column: Interactive Workout Builder Canvas */}
        <section style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
            <div>
              <h2 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Active Session Canvas</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target: MD-2 Explosive Power Block</p>
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--status-cleared)', fontFamily: 'var(--font-mono)' }}>
              Est. Tonnage: 4,250 kg
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {builderCanvas.map((ex, idx) => (
              <div
                key={`${ex.id}-${idx}`}
                style={{
                  padding: '0.875rem',
                  backgroundColor: 'var(--bg-app)',
                  border: '1px solid var(--border-divider)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)' }}>0{idx + 1}</span>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>{ex.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {ex.defaultSets} sets × {ex.defaultReps} reps @ RPE 8.0
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeExercise(idx)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'var(--status-critical)',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: AI Rugby Assistant / Volume Auditor */}
        <section style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: 'var(--space-sm)' }}>
            <span>🤖</span>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700 }}>Rugby AI Volume Auditor</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', fontSize: '0.8125rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 600, color: 'var(--status-cleared)' }}>✓ MD-2 Taper Compliance</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Volume matches -30% taper formula to preserve CNS output ahead of Saturday kickoff.
              </p>
            </div>

            <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 600, color: 'var(--accent-secondary)' }}>Collision Safety Check</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Excluded high-impact contact drills for players currently in RTP hold.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
