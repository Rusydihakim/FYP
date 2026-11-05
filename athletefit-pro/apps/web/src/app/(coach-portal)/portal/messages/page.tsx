'use client';

import React, { useState } from 'react';

export default function CoachMessagesPage() {
  const [selectedPlayer, setSelectedPlayer] = useState('Maro Itoje');
  const [messages, setMessages] = useState([
    { sender: 'coach', text: 'Maro, check your hip height on the scrum cadence drills today. Frame 01:24 shows 4 degrees drift.', time: '09:15 AM' },
    { sender: 'athlete', text: 'Understood coach. Reviewed the clip with scrum physio, keeping core locked.', time: '09:32 AM' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages([...messages, { sender: 'coach', text: inputText, time: 'Just now' }]);
    setInputText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {/* Header */}
      <div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>
          [SCREEN W-08] COACH COMMUNICATION &amp; VIDEO REVIEW HUB
        </span>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Squad Video &amp; Feedback Desk</h1>
      </div>

      {/* Split-Pane Chat & Video Scrubbing Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(240px, 1fr) minmax(400px, 2fr) minmax(260px, 1fr)',
          gap: 'var(--space-md)',
          minHeight: '600px',
        }}
      >
        {/* Left: Player Roster Messages */}
        <section style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-md)' }}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>Squad Threads</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            {['Maro Itoje', 'Ellis Genge', 'Marcus Smith', 'Tommy Freeman'].map((player) => (
              <button
                key={player}
                type="button"
                onClick={() => setSelectedPlayer(player)}
                style={{
                  padding: '0.625rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-divider)',
                  backgroundColor: selectedPlayer === player ? 'var(--bg-surface-elevated)' : 'transparent',
                  color: selectedPlayer === player ? 'var(--accent-primary)' : 'var(--text-primary)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                }}
              >
                {player}
              </button>
            ))}
          </div>
        </section>

        {/* Center: Conversation & Video Scrubbing */}
        <section style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ borderBottom: '1px solid var(--border-divider)', paddingBottom: '0.5rem', marginBottom: 'var(--space-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>Thread: {selectedPlayer}</h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--status-cleared)' }}>● Connected</span>
            </div>

            {/* Video Scrub Mock */}
            <div
              style={{
                height: '180px',
                backgroundColor: 'var(--bg-app)',
                borderRadius: 'var(--radius-md)',
                border: '1px dashed var(--border-divider)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-md)',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>📹</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Scrum Engagement Clip (1080p 60fps) — Frame 01:24
              </span>
            </div>

            {/* Message History */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: m.sender === 'coach' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    padding: '0.625rem 0.875rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: m.sender === 'coach' ? 'var(--accent-primary)' : 'var(--bg-app)',
                    color: m.sender === 'coach' ? 'var(--color-midnight-indigo)' : 'var(--text-primary)',
                    fontSize: '0.8125rem',
                  }}
                >
                  <p>{m.text}</p>
                  <span style={{ fontSize: '0.625rem', opacity: 0.8, display: 'block', marginTop: '0.25rem' }}>{m.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSend} style={{ display: 'flex', gap: 'var(--space-xs)', marginTop: 'var(--space-md)' }}>
            <input
              type="text"
              placeholder={`Send instructions or macro to ${selectedPlayer}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flex: 1,
                padding: '0.625rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-divider)',
                backgroundColor: 'var(--bg-app)',
                color: 'var(--text-primary)',
                fontSize: '0.8125rem',
              }}
            />
            <button
              type="submit"
              style={{
                paddingBlock: '0.625rem',
                paddingInline: '1rem',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--color-midnight-indigo)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontWeight: 700,
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              Send
            </button>
          </form>
        </section>

        {/* Right: Quick Player Context Card */}
        <section style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-md)' }}>
          <h2 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>Player Context</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', fontSize: '0.8125rem' }}>
            <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Readiness Score:</span> 94% (Optimal)
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Contact Status:</span> Full Clearance
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Target Microcycle:</span> MD-2 Taper
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
