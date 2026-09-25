import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import '../../styles/PageLayout.css';

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-layout-root">
      {/* Background ambient lighting */}
      <div className="page-layout-ambient-glow" />
      <Sidebar />
      <div className="page-layout-content-wrapper">
        <Topbar />
        <main className="page-layout-main">
          {children}
        </main>
      </div>
    </div>
  );
}
