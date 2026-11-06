'use client';

import React, { useState } from 'react';
import '../../../../../styles/coach-portal/plan-builder.css';

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
    <div className="builder-container">
      {/* Header */}
      <div className="builder-header">
        <div>
          <span className="builder-screen-tag">
            [SCREEN W-05] RUGBY PLAN AUTHORING STUDIO
          </span>
          <h1 className="builder-title">Training Plan Studio</h1>
        </div>

        <div>
          <button type="button" className="builder-save-btn">
            💾 Save Rugby Template
          </button>
        </div>
      </div>

      {/* 3-Column Studio Grid */}
      <div className="builder-grid">
        {/* Left Column: ExerciseDB API Library */}
        <section className="builder-card">
          <div className="builder-card-header">
            <h2 className="builder-card-title">ExerciseDB Library</h2>
            <span className="builder-card-meta">Rugby Presets</span>
          </div>

          {/* Category Filter */}
          <div className="builder-categories">
            {['All', 'Scrum & Maul', 'Power', 'Speed', 'Injury Mitigation'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`builder-category-chip ${selectedCategory === cat ? 'builder-category-chip--active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="builder-exercise-list">
            {filteredExercises.map((ex) => (
              <div key={ex.id} className="builder-exercise-item">
                <div>
                  <div className="builder-exercise-name">{ex.name}</div>
                  <div className="builder-exercise-cat">{ex.category}</div>
                </div>
                <button
                  type="button"
                  onClick={() => addExercise(ex)}
                  className="builder-add-btn"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Center Column: Interactive Workout Builder Canvas */}
        <section className="builder-card">
          <div className="builder-card-header">
            <div>
              <h2 className="builder-card-title">Active Session Canvas</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target: MD-2 Explosive Power Block</p>
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--status-cleared)', fontFamily: 'var(--font-mono)' }}>
              Est. Tonnage: 4,250 kg
            </div>
          </div>

          <div className="builder-canvas-list">
            {builderCanvas.map((ex, idx) => (
              <div key={`${ex.id}-${idx}`} className="builder-canvas-item">
                <div className="builder-canvas-left">
                  <span className="builder-canvas-index">0{idx + 1}</span>
                  <div>
                    <div className="builder-canvas-name">{ex.name}</div>
                    <div className="builder-canvas-details">
                      {ex.defaultSets} sets × {ex.defaultReps} reps @ RPE 8.0
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeExercise(idx)}
                  className="builder-remove-btn"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: AI Rugby Assistant / Volume Auditor */}
        <section className="builder-card">
          <div className="builder-auditor-title-row">
            <span>🤖</span>
            <h2 className="builder-card-title">Rugby AI Volume Auditor</h2>
          </div>

          <div className="builder-audit-list">
            <div className="builder-audit-card">
              <div className="builder-audit-heading" style={{ color: 'var(--status-cleared)' }}>
                ✓ MD-2 Taper Compliance
              </div>
              <p className="builder-audit-desc">
                Volume matches -30% taper formula to preserve CNS output ahead of Saturday kickoff.
              </p>
            </div>

            <div className="builder-audit-card">
              <div className="builder-audit-heading" style={{ color: 'var(--accent-secondary)' }}>
                Collision Safety Check
              </div>
              <p className="builder-audit-desc">
                Excluded high-impact contact drills for players currently in RTP hold.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
