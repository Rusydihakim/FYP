export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-4 max-w-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          System Initialized
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          AthleteFit <span className="text-cyan-400">Pro</span>
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Clean starter template ready for development. Begin building your components and routes.
        </p>
      </div>
    </div>
  );
}
