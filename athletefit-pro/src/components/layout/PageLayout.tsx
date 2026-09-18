import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050811] text-[#EEF3FA] selection:bg-cyan-500 selection:text-black font-sans relative">
      {/* Background ambient lighting */}
      <div className="fixed top-0 left-64 right-0 h-[400px] bg-gradient-to-b from-cyan-500/8 via-blue-600/5 to-transparent blur-[120px] pointer-events-none -z-10" />
      <Sidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
