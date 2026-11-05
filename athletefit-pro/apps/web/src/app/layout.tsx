import React from 'react';
import '../styles/globals.css';

export const metadata = {
  title: 'AthleteFit Pro — Elite Rugby Telemetry & Performance Portal',
  description:
    'Direct synaptic bridge between high-performance coaching staff, sports science diagnostics, and squad match-day readiness.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body>{children}</body>
    </html>
  );
}
