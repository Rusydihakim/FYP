'use client';

import React, { useState } from 'react';
import '../../../../styles/coach-portal/messages.css';

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
    <div className="messages-container">
      {/* Header */}
      <div className="messages-header">
        <span className="messages-screen-tag">
          [SCREEN W-08] COACH COMMUNICATION &amp; VIDEO REVIEW HUB
        </span>
        <h1 className="messages-title">Squad Video &amp; Feedback Desk</h1>
      </div>

      {/* Split-Pane Chat & Video Scrubbing Layout */}
      <div className="messages-grid">
        {/* Left: Player Roster Messages */}
        <section className="messages-card">
          <h2 className="messages-card-title">Squad Threads</h2>
          <div className="messages-threads-list">
            {['Maro Itoje', 'Ellis Genge', 'Marcus Smith', 'Tommy Freeman'].map((player) => (
              <button
                key={player}
                type="button"
                onClick={() => setSelectedPlayer(player)}
                className={`messages-player-btn ${selectedPlayer === player ? 'messages-player-btn--active' : ''}`}
              >
                {player}
              </button>
            ))}
          </div>
        </section>

        {/* Center: Conversation & Video Scrubbing */}
        <section className="messages-card messages-chat-card">
          <div>
            <div className="messages-chat-header">
              <h2 className="messages-chat-title">Thread: {selectedPlayer}</h2>
              <span className="messages-chat-status">● Connected</span>
            </div>

            {/* Video Scrub Mock */}
            <div className="messages-video-mock">
              <span className="messages-video-icon">📹</span>
              <span className="messages-video-desc">
                Scrum Engagement Clip (1080p 60fps) — Frame 01:24
              </span>
            </div>

            {/* Message History */}
            <div className="messages-history">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`messages-bubble ${m.sender === 'coach' ? 'messages-bubble--coach' : 'messages-bubble--athlete'}`}
                >
                  <p>{m.text}</p>
                  <span className="messages-time">{m.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSend} className="messages-form">
            <input
              type="text"
              placeholder={`Send instructions or macro to ${selectedPlayer}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="messages-input"
            />
            <button type="submit" className="messages-send-btn">
              Send
            </button>
          </form>
        </section>

        {/* Right: Quick Player Context Card */}
        <section className="messages-card">
          <h2 className="messages-card-title">Player Context</h2>
          <div className="messages-context-list">
            <div className="messages-context-item">
              <span className="messages-context-label">Readiness Score: </span>
              <strong>94% (Optimal)</strong>
            </div>
            <div className="messages-context-item">
              <span className="messages-context-label">Contact Status: </span>
              <strong>Full Clearance</strong>
            </div>
            <div className="messages-context-item">
              <span className="messages-context-label">Target Microcycle: </span>
              <strong>MD-2 Taper</strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
