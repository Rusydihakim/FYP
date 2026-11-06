'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '../../../../styles/coach-portal/layout.css';

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
        }}
      >
        <div className="portal-sidebar-inner">
          {/* Brand Header */}
          <div className="portal-brand-header">
            <Link href="/portal/dashboard" className="portal-brand-link">
              <img
                src="/assets/logo.jpg"
                alt="AthleteFit Pro Logo"
                className="portal-brand-logo"
              />
              {!isSidebarCollapsed && (
                <span>
                  AthleteFit<span className="portal-brand-accent">PRO</span>
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              aria-label="Toggle navigation sidebar"
              className="portal-sidebar-toggle"
            >
              {isSidebarCollapsed ? '▶' : '◀'}
            </button>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Coach Portal navigation">
            <ul className="portal-nav-list">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/portal/dashboard' && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`portal-nav-link ${isActive ? 'portal-nav-link--active' : ''}`}
                    >
                      <span aria-hidden="true" className="portal-nav-icon">{item.icon}</span>
                      {!isSidebarCollapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Coach Profile Card & Logout */}
        <div className="portal-profile-card">
          {!isSidebarCollapsed && (
            <div className="portal-profile-row">
              <div className="portal-avatar">KS</div>
              <div className="portal-profile-info">
                <div className="portal-profile-name">Kevin Sinfield</div>
                <div className="portal-profile-role">Head of Performance</div>
              </div>
            </div>
          )}
          <Link
            href="/login"
            className="portal-logout-link"
            style={{ justifyContent: isSidebarCollapsed ? 'center' : 'flex-start' }}
          >
            <span aria-hidden="true">🚪</span>
            {!isSidebarCollapsed && <span>Switch / Exit Portal</span>}
          </Link>
        </div>
      </aside>

      {/* Main Column */}
      <div className="portal-main-col">
        {/* Sticky Top Header Bar */}
        <header className="portal-header">
          <div className="portal-header-left">
            <div className="portal-match-badge">
              <span>🏉</span>
              <span>MD-2 vs Harlequins RFC</span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span className="portal-match-badge__accent">Taper Active</span>
            </div>

            <div className="portal-alert-badge">
              <span>⚠️</span>
              <span>2 Players RTP Hold</span>
            </div>
          </div>

          <div className="portal-header-right">
            <Link href="/portal/onboarding" className="portal-setup-btn">
              + Club Setup
            </Link>
            <div className="portal-sync-badge">
              ● 250Hz Sync OK
            </div>
          </div>
        </header>

        {/* Responsive Workspace Grid */}
        <main className="portal-workspace">{children}</main>
      </div>
    </div>
  );
}
