'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AthleteWebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navLinks = [
    { label: 'Training Hub', href: '/athlete/dashboard', icon: '⚡' },
    { label: 'Workouts & History', href: '/athlete/workouts', icon: '🏋️' },
    { label: 'Performance Analytics', href: '/athlete/analytics', icon: '📈' },
    { label: 'My Devices (View-Only)', href: '/athlete/devices', icon: '⌚' },
    { label: 'Coach Messages', href: '/athlete/messages', icon: '💬' },
  ];

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: 'var(--bg-app)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Athlete Navigation Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          height: '64px',
          backgroundColor: 'color-mix(in oklab, var(--bg-surface), transparent 8%)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-divider)',
          paddingInline: 'var(--space-xl)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
          <Link
            href="/athlete/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-xs)',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <img
              src="/assets/logo.jpg"
              alt="AthleteFit Pro Logo"
              style={{
                width: '30px',
                height: '30px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 0 8px color-mix(in oklab, var(--accent-primary), transparent 50%)',
              }}
            />
            <span>
              AthleteFit<span style={{ color: 'var(--accent-primary)' }}>PRO</span>
            </span>
            <span
              style={{
                fontSize: '0.6875rem',
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'var(--bg-surface-elevated)',
                paddingBlock: '2px',
                paddingInline: '6px',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--accent-primary)',
              }}
            >
              ATHLETE
            </span>
          </Link>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', gap: 'var(--space-xs)' }}>
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    paddingBlock: '0.375rem',
                    paddingInline: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8125rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                    backgroundColor: isActive
                      ? 'color-mix(in oklab, var(--accent-primary), transparent 88%)'
                      : 'transparent',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    transition: 'all 150ms ease',
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Athlete Identity & Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700 }}>Maro Itoje</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--status-cleared)', fontFamily: 'var(--font-mono)' }}>
              Readiness: 94% (Cleared)
            </div>
          </div>
          <Link
            href="/login"
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-divider)',
              paddingBlock: '0.25rem',
              paddingInline: '0.625rem',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            Exit ➔
          </Link>
        </div>
      </header>

      {/* Main Workspace */}
      <main style={{ flex: 1, paddingBlock: 'var(--space-xl)', paddingInline: 'var(--space-xl)', maxWidth: '1400px', marginInline: 'auto', width: '100%', boxSizing: 'border-box' }}>
        {children}
      </main>
    </div>
  );
}
