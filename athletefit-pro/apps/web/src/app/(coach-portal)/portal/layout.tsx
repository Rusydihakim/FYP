'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CoachPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const navItems = [
    { label: 'Dashboard', href: '/portal/dashboard', icon: '📊' },
    { label: 'Squad Roster', href: '/portal/athletes/p-itoje', icon: '👥' },
    { label: 'Plan Builder', href: '/portal/plans/builder', icon: '⚡' },
    { label: 'Match Schedule', href: '/portal/plans/schedule', icon: '📅' },
    { label: 'Telemetry Audit', href: '/portal/analytics', icon: '📈' },
    { label: 'Video & Chat', href: '/portal/messages', icon: '💬' },
    { label: 'Club Settings', href: '/portal/settings', icon: '⚙️' },
  ];

  return (
    <div className="portal-shell">
      {/* Left Navigation Sidebar */}
      <aside
        className="portal-sidebar"
        style={{
          width: isSidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
          transition: 'width 200ms ease',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {/* Brand Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingInline: 'var(--space-xs)',
              paddingBlock: 'var(--space-xs)',
              borderBottom: '1px solid var(--border-divider)',
            }}
          >
            <Link
              href="/portal/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--accent-primary)',
                  boxShadow: '0 0 10px var(--accent-primary)',
                }}
              />
              {!isSidebarCollapsed && (
                <span>
                  AthleteFit<span style={{ color: 'var(--accent-primary)' }}>PRO</span>
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              aria-label="Toggle navigation sidebar"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              {isSidebarCollapsed ? '▶' : '◀'}
            </button>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Coach Portal navigation">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/portal/dashboard' && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-sm)',
                        paddingBlock: '0.625rem',
                        paddingInline: 'var(--space-sm)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.875rem',
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                        backgroundColor: isActive
                          ? 'color-mix(in oklab, var(--accent-primary), transparent 85%)'
                          : 'transparent',
                        borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
                        transition: 'background-color 150ms ease, color 150ms ease',
                      }}
                    >
                      <span aria-hidden="true" style={{ fontSize: '1.125rem' }}>{item.icon}</span>
                      {!isSidebarCollapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Coach Profile Card & Logout */}
        <div
          style={{
            borderTop: '1px solid var(--border-divider)',
            paddingBlockStart: 'var(--space-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-xs)',
          }}
        >
          {!isSidebarCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--accent-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  color: 'var(--color-midnight-indigo)',
                }}
              >
                KS
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  Kevin Sinfield
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                  Head of Performance
                </div>
              </div>
            </div>
          )}
          <Link
            href="/login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
              gap: 'var(--space-xs)',
              fontSize: '0.75rem',
              color: 'var(--status-critical)',
              paddingBlock: '4px',
              paddingInline: 'var(--space-xs)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <span aria-hidden="true">🚪</span>
            {!isSidebarCollapsed && <span>Switch / Exit Portal</span>}
          </Link>
        </div>
      </aside>

      {/* Main Column */}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Sticky Top Header Bar */}
        <header className="portal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-xs)',
                backgroundColor: 'var(--bg-app)',
                border: '1px solid var(--border-divider)',
                borderRadius: 'var(--radius-pill)',
                paddingBlock: '0.25rem',
                paddingInline: '0.75rem',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              <span>🏉</span>
              <span>MD-2 vs Harlequins RFC</span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>Taper Active</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                backgroundColor: 'color-mix(in oklab, var(--status-critical), transparent 90%)',
                border: '1px solid var(--status-critical)',
                borderRadius: 'var(--radius-pill)',
                paddingBlock: '0.25rem',
                paddingInline: '0.625rem',
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: 'var(--status-critical)',
              }}
            >
              <span>⚠️</span>
              <span>2 Players RTP Hold</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <Link
              href="/portal/onboarding"
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-divider)',
                paddingBlock: '0.3125rem',
                paddingInline: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)',
              }}
            >
              + Club Setup
            </Link>
            <div
              style={{
                fontSize: '0.6875rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--status-cleared)',
                backgroundColor: 'color-mix(in oklab, var(--status-cleared), transparent 90%)',
                paddingBlock: '0.25rem',
                paddingInline: '0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--status-cleared)',
              }}
            >
              ● 250Hz Sync OK
            </div>
          </div>
        </header>

        {/* Responsive High-Density Workspace Grid */}
        <main className="portal-workspace">{children}</main>
      </div>
    </div>
  );
}
