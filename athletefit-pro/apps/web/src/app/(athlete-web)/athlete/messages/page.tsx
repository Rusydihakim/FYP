'use client';

import React, { useState } from 'react';

export default function AthleteMessagesPage() {
  const [messages, setMessages] = useState([
    { sender: 'coach', text: 'Maro, check your hip height on the scrum cadence drills today. Frame 01:24 shows 4 degrees drift.', time: '09:15 AM' },
    { sender: 'athlete', text: 'Understood coach. Reviewed the clip with scrum physio, keeping core locked.', time: '09:32 AM' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setMessages([...messages, { sender: 'athlete', text: inputMessage, time: 'Just now' }]);
    setInputMessage('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      {/* Title */}
      <div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 600 }}>
          [SCREEN AW-06] ATHLETE WEB CHAT &amp; VIDEO SUBMISSION
        </span>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Coach Direct Communication</h1>
      </div>

      {/* 2-Column Desktop Messaging */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(360px, 2fr) minmax(260px, 1fr)', gap: 'var(--space-md)', minHeight: '500px' }}>
        {/* Chat Stream */}
        <section style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ borderBottom: '1px solid var(--border-divider)', paddingBottom: '0.5rem', marginBottom: 'var(--space-md)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700 }}>Kevin Sinfield (Head of Performance)</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--status-cleared)' }}>● Online</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: m.sender === 'athlete' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    padding: '0.625rem 0.875rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: m.sender === 'athlete' ? 'var(--accent-primary)' : 'var(--bg-app)',
                    color: m.sender === 'athlete' ? 'var(--color-midnight-indigo)' : 'var(--text-primary)',
                    fontSize: '0.8125rem',
                  }}
                >
                  <p>{m.text}</p>
                  <span style={{ fontSize: '0.625rem', opacity: 0.8, display: 'block', marginTop: '0.25rem' }}>{m.time}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSend} style={{ display: 'flex', gap: 'var(--space-xs)', marginTop: 'var(--space-md)' }}>
            <input
              type="text"
              placeholder="Ask coach or attach scrum video..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
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

        {/* Video Upload & Current Plan Context */}
        <section style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-divider)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-md)' }}>
          <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>Video Submission</h2>
          <div
            style={{
              padding: '1.5rem',
              backgroundColor: 'var(--bg-app)',
              border: '2px dashed var(--border-divider)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ fontSize: '1.75rem' }}>📹</span>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Drop training form video here</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>MP4, MOV up to 250MB</div>
          </div>
        </section>
      </div>
    </div>
  );
}
