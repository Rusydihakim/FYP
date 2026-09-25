import { Link } from 'react-router-dom';
import {
  Zap,
  Play,
  Star,
  ArrowRight,
  Activity,
  Eye,
  Sliders,
  Watch,
  Database,
  ShieldCheck,
  Heart,
  Droplets,
  Scale,
  Radio,
  Sparkles,
  ChevronRight,
  Smartphone
} from 'lucide-react';
import '../styles/Landing.css';

export default function Landing() {

  return (
    <div className="landing-page-root">
      {/* Dynamic Background Glows */}
      <div className="landing-glow-top" />
      <div className="landing-glow-mid" />
      <div className="landing-glow-bottom" />

      {/* ──────────────── 1. NAVBAR ──────────────── */}
      <header className="landing-navbar">
        <div className="landing-navbar-inner">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="landing-brand-logo-glow">
              <div className="landing-brand-logo-inner">
                <Zap className="landing-brand-logo-icon" />
              </div>
            </div>
            <span className="landing-brand-text">
              ATHLETEFIT<span className="text-cyan-400">PRO</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#athletes" className="hover:text-cyan-400 transition-colors">Athletes</a>
            <a href="#hardware" className="hover:text-cyan-400 transition-colors">Hardware</a>
            <a href="#diagnostics" className="hover:text-cyan-400 transition-colors">Workouts</a>
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-sm font-semibold text-gray-300 hover:text-white px-3 py-2 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="relative group overflow-hidden rounded-lg p-[1px] focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-green-400 rounded-lg group-hover:opacity-100 transition-opacity" />
              <span className="relative block px-5 py-2 rounded-[7px] bg-[#0A1324] text-xs font-bold uppercase tracking-wider text-cyan-300 group-hover:bg-opacity-80 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                Get Started
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* ──────────────── 2. HERO SECTION ──────────────── */}
      <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-4xl mx-auto">
          {/* Pill Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>NEXT-GEN ATHLETIC INTELLIGENCE</span>
            <span className="text-gray-500">•</span>
            <span className="text-green-400 font-semibold">v4.2 Engine Live</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.1] mb-6">
            Elevate Your Performance with <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-green-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.3)]">
              Real-Time AI Coaching
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 font-normal leading-relaxed mb-10">
            Precision biomechanics, sub-millimeter 3D computer vision posture validation, and adaptive load regulation engineered for elite competitors and high-demand training labs.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-green-300 shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(74,222,128,0.5)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <Zap className="h-4 w-4 fill-slate-950 text-slate-950" />
              <span>START TRAINING NOW</span>
            </Link>

            <a
              href="#diagnostics"
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-sm text-gray-200 bg-[#0B1528] hover:bg-[#101F3B] border border-[#1E2E4A] hover:border-cyan-500/50 transition-all flex items-center justify-center space-x-2"
            >
              <Play className="h-4 w-4 text-cyan-400 fill-cyan-400" />
              <span>Watch Telemetry Demo</span>
              <span className="text-xs font-mono text-gray-500 bg-black/40 px-1.5 py-0.5 rounded ml-1">1:42</span>
            </a>
          </div>

          {/* Trust Ratings */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-gray-400 font-medium">
            <div className="flex items-center space-x-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white ml-1">4.95/5</span>
              <span>FROM 12,400+ REVIEWS</span>
            </div>
            <span className="hidden sm:inline text-gray-600">•</span>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-green-400" />
              <span>Trusted by <strong className="text-white">50,000+ Athletes</strong> across 42 Olympic & Pro disciplines</span>
            </div>
          </div>
        </div>

        {/* ──────────────── 3. TELEMETRY COCKPIT DASHBOARD MOCKUP ──────────────── */}
        <div id="athletes" className="max-w-6xl mx-auto mt-16">
          <div className="relative rounded-2xl p-1 bg-gradient-to-b from-cyan-500/30 via-[#16233B]/60 to-[#0B1222] shadow-[0_0_70px_rgba(6,182,212,0.15)]">
            <div className="bg-[#070D1C] rounded-[15px] p-4 sm:p-6 border border-[#162744] overflow-hidden">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

                {/* Left Card: Athlete Profile & Zone Tracker */}
                <div className="bg-[#0A1326] border border-[#182846] rounded-xl p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono mb-3">
                      <span className="text-gray-400">ATHLETE ID</span>
                      <span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 font-bold">ACTIVE PRO</span>
                    </div>

                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px]">
                        <div className="h-full w-full rounded-full bg-[#0D1930] flex items-center justify-center font-bold text-sm text-cyan-300">
                          AH
                        </div>
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-white">Afiq Hakim</h4>
                        <p className="text-[11px] text-gray-400">Level 92 • Elite Tier Plus</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-left">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Weekly Target</span>
                        <span className="text-cyan-300 font-mono font-semibold">3/4 Completed</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#14233D] rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Zone 4 Threshold Metric */}
                  <div className="bg-[#080E1C] border border-[#162642] rounded-lg p-3 text-left">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-mono uppercase text-gray-400 flex items-center">
                        <Heart className="h-3 w-3 text-red-400 mr-1 fill-red-400" /> ZONE 4 THRESHOLD
                      </span>
                      <span className="text-[10px] text-green-400 font-mono">BLE 5.2 • 100Hz</span>
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-display font-extrabold text-white">128</span>
                      <span className="text-xs text-gray-400">BPM</span>
                      <span className="text-[10px] text-green-400 font-mono ml-auto">94% Retention</span>
                    </div>

                    {/* Waveform Sparkline SVG */}
                    <div className="mt-2 h-10 w-full">
                      <svg viewBox="0 0 200 40" className="w-full h-full stroke-cyan-400 fill-none" strokeWidth="2" strokeLinecap="round">
                        <path d="M0,25 Q15,28 30,22 T60,18 T90,28 T110,8 T130,32 T150,15 T170,22 T200,16" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Right Card: Readiness Index Gauge & Schedule */}
                <div className="bg-[#0A1326] border border-[#182846] rounded-xl p-5 flex flex-col justify-between space-y-4 text-left">
                  <div>
                    <div className="text-xs font-mono uppercase text-gray-400 mb-3">READINESS READOUT</div>

                    {/* Radial Dial */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative h-18 w-18 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#132440"
                            strokeWidth="3.5"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="url(#dialGradient)"
                            strokeWidth="3.5"
                            strokeDasharray="78, 100"
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient id="dialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#22D3EE" />
                              <stop offset="100%" stopColor="#4ADE80" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-lg font-bold font-display text-white">78%</span>
                          <span className="text-[8px] font-mono text-green-400 uppercase">PEAK</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-gray-400 leading-tight">
                        Heart rate variability & sleep indicators confirm peak Central Nervous System readiness.
                      </p>
                    </div>

                    {/* Active Schedule */}
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono uppercase text-gray-400">ACTIVE SCHEDULE</div>

                      <div className="bg-[#080E1C] p-2 rounded-lg border border-[#162744] flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          <span className="text-white font-medium">Squat Session 2024</span>
                        </div>
                        <span className="text-[10px] font-mono text-green-400">98%</span>
                      </div>

                      <div className="bg-[#080E1C] p-2 rounded-lg border border-[#162744] flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span className="text-white font-medium">Polar H10 Cleanse</span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-400">DONE</span>
                      </div>

                      <div className="bg-[#080E1C] p-2 rounded-lg border border-[#162744] flex items-center justify-between text-xs opacity-70">
                        <div className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                          <span className="text-gray-300">Hill Reps Speed Test</span>
                        </div>
                        <span className="text-[10px] font-mono text-gray-500">18:00</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-2.5 px-3 bg-[#11203D] hover:bg-[#16294D] border border-cyan-500/30 text-cyan-300 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center justify-center space-x-1 cursor-pointer">
                    <span>EXPORT SESSION TELEMETRY</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 4. BIOMECHANICAL FRAMEWORK (FEATURES) ──────────────── */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>BIOMECHANICAL FRAMEWORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Engineered for Sub-Millimeter Biomechanical Precision
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-gray-400 font-normal leading-relaxed text-left">
            Traditional fitness trackers log after-the-fact metrics. AthleteFit Pro processes sensor data at 60Hz on edge, actively preventing injury while optimizing velocity.
          </p>
        </div>

        {/* 4 Core Framework Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-[#0A1324] border border-[#162540] hover:border-cyan-500/50 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] flex flex-col justify-between text-left group">
            <div>
              <div className="h-12 w-12 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-3">Computer Vision AI Coach</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Markerless 3D skeletal mobility tracking. Analyzes joint angles at 60 frames per second directly through your device camera.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#132037] flex items-center justify-between text-xs font-mono text-cyan-400">
              <span>60HZ SPORT TRACKING</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0A1324] border border-[#162540] hover:border-green-500/50 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(74,222,128,0.15)] flex flex-col justify-between text-left group">
            <div>
              <div className="h-12 w-12 rounded-xl bg-green-950/70 border border-green-500/30 flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
                <Sliders className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-3">Adaptive Load Regulation</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Algorithms instantly modulate set volume, rest periods, and tempo in response to intra-set velocity degradation and neuromuscular fatigue.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#132037] flex items-center justify-between text-xs font-mono text-green-400">
              <span>AUTONOMOUS PROGRESSION</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0A1324] border border-[#162540] hover:border-blue-500/50 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] flex flex-col justify-between text-left group">
            <div>
              <div className="h-12 w-12 rounded-xl bg-blue-950/70 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <Watch className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-3">Hardware Ecosystem</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Low-latency zero-configuration pairing with Apple Watch, Garmin, WHOOP 4.0, Polar H10, and smart wireless force plates.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#132037] flex items-center justify-between text-xs font-mono text-blue-400">
              <span>BLE 5.2 / ANT+ SYNC</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#0A1324] border border-[#162540] hover:border-cyan-500/50 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] flex flex-col justify-between text-left group">
            <div>
              <div className="h-12 w-12 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-3">Elite Longitudinal Data</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Bar-speed velocity profiling, power output curves, and force vectors stored securely across multi-year career training cycles.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#132037] flex items-center justify-between text-xs font-mono text-cyan-400">
              <span>RESEARCH GRADE DATASET</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 5. DIAGNOSTICS & FORM BREAKDOWN SHOWCASE ──────────────── */}
      <section id="diagnostics" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#070E1E] border border-[#152542] rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left Column: Visual Lifter HUD Preview */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#1C3154] bg-[#030712] aspect-[4/3] flex items-center justify-center">
                {/* Visual HUD Graphic */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050C1B] via-transparent to-[#050C1B]/80 z-10" />

                {/* Silhouette / Target Mesh representation */}
                <div className="relative z-0 w-full h-full flex items-center justify-center">
                  <div className="w-52 h-72 border-2 border-dashed border-cyan-500/40 rounded-3xl flex flex-col items-center justify-center p-4 relative">
                    <span className="absolute top-2 left-2 text-[9px] font-mono text-cyan-400">TRACKING_ID: #882</span>
                    <span className="absolute top-2 right-2 text-[9px] font-mono text-green-400">FIDELITY: 99.2%</span>

                    <div className="w-16 h-16 rounded-full border border-cyan-400 flex items-center justify-center mb-2">
                      <Eye className="h-6 w-6 text-cyan-300 animate-pulse" />
                    </div>
                    <div className="w-28 h-32 border border-green-400/60 rounded-xl relative flex items-center justify-center">
                      <div className="absolute w-full h-0.5 bg-green-400/40 top-1/2 -translate-y-1/2" />
                      <div className="absolute h-full w-0.5 bg-cyan-400/40 left-1/2 -translate-x-1/2" />
                      <span className="text-[10px] font-mono text-white bg-black/60 px-1 rounded">VECTOR LOCK</span>
                    </div>

                    <div className="w-full flex justify-between text-[8px] font-mono text-gray-400 mt-3">
                      <span>X: 0.042m</span>
                      <span>Y: 1.108m</span>
                      <span>Z: 0.892m</span>
                    </div>
                  </div>
                </div>

                {/* Floating AI Feedback Badge */}
                <div className="absolute bottom-6 left-6 right-6 z-20 bg-[#0A162D]/95 border border-cyan-500/40 p-3.5 rounded-xl backdrop-blur-md shadow-lg text-left">
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-cyan-400 uppercase mb-1">
                    <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                    <span>AI REAL-TIME CORRECTION</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-white">
                    "Drive through your mid-foot. Protect hip angle on the ascent to maintain lumbar stability."
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Copy & Diagnostic Bars */}
            <div className="lg:col-span-6 text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
                <Activity className="h-3.5 w-3.5" />
                <span>RAPID-REACTION DIAGNOSTICS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 leading-tight">
                Form Breakdown Faster Than Human Perception
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                AthleteFit Pro detects micro-deviations in barbell trajectory and vector torque faster than even seasoned elite coaches can track with the naked eye.
              </p>

              {/* Progress Metrics */}
              <div className="space-y-4 mb-8">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-gray-300">Posture & Spine Neutrality</span>
                    <span className="text-green-400 font-bold">94% (OPTIMAL)</span>
                  </div>
                  <div className="w-full h-2 bg-[#101F3B] rounded-full overflow-hidden">
                    <div className="h-full w-[94%] bg-gradient-to-r from-cyan-400 to-green-400 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-gray-300">Strength Curve Efficiency</span>
                    <span className="text-cyan-400 font-bold">88% (GOOD)</span>
                  </div>
                  <div className="w-full h-2 bg-[#101F3B] rounded-full overflow-hidden">
                    <div className="h-full w-[88%] bg-cyan-400 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-gray-300">Explosive Symmetry</span>
                    <span className="text-amber-400 font-bold">81% (BALANCED)</span>
                  </div>
                  <div className="w-full h-2 bg-[#101F3B] rounded-full overflow-hidden">
                    <div className="h-full w-[81%] bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Validation Box */}
              <div className="bg-[#0B152B] border border-[#192C4E] rounded-xl p-4 flex items-start space-x-3">
                <ShieldCheck className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-400 leading-relaxed">
                  <strong className="text-white">Third-party validated methodology:</strong> Certified biomechanical fidelity benchmarked by Olympic powerlifters and collegiate athletic directors.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────── 6. HARDWARE ECOSYSTEM BRIDGE ──────────────── */}
      <section id="hardware" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
            UNITED HARDWARE BRIDGE
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-4">
            Synchronize Your Entire Athletic Stack in Milliseconds
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Auto-detects and synthesizes continuous feeds from the wearable and diagnostic devices you already trust.
          </p>
        </div>

        {/* 4 Device Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Device 1 */}
          <div className="bg-[#0A1324] border border-[#162540] p-6 rounded-2xl text-left flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <Watch className="h-7 w-7 text-cyan-400" />
                <span className="text-[10px] font-mono text-green-400 bg-green-950/60 border border-green-500/30 px-2 py-0.5 rounded">LIVE SYNC</span>
              </div>
              <h4 className="text-lg font-bold font-display text-white">Apple Watch Ultra</h4>
              <p className="text-xs text-gray-400 mt-1">
                Continuous 100Hz IMU accelerometry, HRV tracking, and workout duration logs.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#13223B] flex justify-between text-[11px] font-mono text-gray-400">
              <span>Status</span>
              <span className="text-cyan-400">CONNECTED • 2ms</span>
            </div>
          </div>

          {/* Device 2 */}
          <div className="bg-[#0A1324] border border-[#162540] p-6 rounded-2xl text-left flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <Heart className="h-7 w-7 text-red-400" />
                <span className="text-[10px] font-mono text-green-400 bg-green-950/60 border border-green-500/30 px-2 py-0.5 rounded">LIVE ECG</span>
              </div>
              <h4 className="text-lg font-bold font-display text-white">Polar H10 Sensor</h4>
              <p className="text-xs text-gray-400 mt-1">
                Clinical-grade microvolt ECG telemetry with zero-drop broadcast capability.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#13223B] flex justify-between text-[11px] font-mono text-gray-400">
              <span>Status</span>
              <span className="text-cyan-400">CONNECTED • 1ms</span>
            </div>
          </div>

          {/* Device 3 */}
          <div className="bg-[#0A1324] border border-[#162540] p-6 rounded-2xl text-left flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <Droplets className="h-7 w-7 text-blue-400" />
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">BLE DATA</span>
              </div>
              <h4 className="text-lg font-bold font-display text-white">Smart Hydration Pro</h4>
              <p className="text-xs text-gray-400 mt-1">
                Real-time sodium and sweat rate balance tracking through connected sensor pods.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#13223B] flex justify-between text-[11px] font-mono text-gray-400">
              <span>Volume</span>
              <span className="text-white">1,400 ml / 2,100 ml</span>
            </div>
          </div>

          {/* Device 4 */}
          <div className="bg-[#0A1324] border border-[#162540] p-6 rounded-2xl text-left flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <Scale className="h-7 w-7 text-purple-400" />
                <span className="text-[10px] font-mono text-green-400 bg-green-950/60 border border-green-500/30 px-2 py-0.5 rounded">AUTO SYNC</span>
              </div>
              <h4 className="text-lg font-bold font-display text-white">Bio-Scan Scale Gen 3</h4>
              <p className="text-xs text-gray-400 mt-1">
                Multi-segmental bioelectrical impedance body composition & water mass analysis.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#13223B] flex justify-between text-[11px] font-mono text-gray-400">
              <span>Last Sync</span>
              <span className="text-white">Today, 06:45 AM</span>
            </div>
          </div>
        </div>

        {/* Polling Protocol Banner */}
        <div className="bg-[#070D1A] border border-[#162642] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center space-x-3">
            <Radio className="h-5 w-5 text-cyan-400 shrink-0" />
            <p className="text-xs sm:text-sm text-gray-300">
              <strong className="text-white">Universal BLE/ANT+ Polling Protocol.</strong> Compatible with Garmin Connect, Apple HealthKit, Strava, and TrainingPeaks exports.
            </p>
          </div>
          <Link
            to="/register"
            className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 hover:text-white bg-[#10203D] hover:bg-[#162B54] px-4 py-2.5 rounded-lg border border-cyan-500/30 transition-colors shrink-0"
          >
            EXPLORE HARDWARE
          </Link>
        </div>
      </section>


      {/* ──────────────── 8. TESTIMONIALS ──────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Review 1 */}
          <div className="bg-[#091326] border border-[#162744] p-6 rounded-2xl text-left flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-300 italic leading-relaxed mb-6">
                "The AI velocity feedback helped me add 18kg to my deadlift without back flare-ups. It's literally like having an Olympic biomechanics team standing right beside you."
              </p>
            </div>
            <div className="flex items-center space-x-3 pt-4 border-t border-[#13223B]">
              <div className="h-10 w-10 rounded-full bg-cyan-900/60 border border-cyan-500/40 flex items-center justify-center font-bold text-xs text-cyan-300">
                MA
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">Marcus Aurelius</h5>
                <p className="text-[11px] text-gray-400">Head Of Strength, Apex Athletics</p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-[#091326] border border-[#162744] p-6 rounded-2xl text-left flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-300 italic leading-relaxed mb-6">
                "The computer vision correction flagged a subtle 2-degree pelvic shift during my bottom squat pause that cleared chronic patellar tendonitis within 3 weeks."
              </p>
            </div>
            <div className="flex items-center space-x-3 pt-4 border-t border-[#13223B]">
              <div className="h-10 w-10 rounded-full bg-green-900/60 border border-green-500/40 flex items-center justify-center font-bold text-xs text-green-300">
                ER
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">Elena Rostova</h5>
                <p className="text-[11px] text-gray-400">Olympic Weightlifting Competitor</p>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-[#091326] border border-[#162744] p-6 rounded-2xl text-left flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-300 italic leading-relaxed mb-6">
                "Managing 40 collegiate rugby players was complete chaos until AthleteFit Pro gave us real-time readiness flags and autonomous training modulations."
              </p>
            </div>
            <div className="flex items-center space-x-3 pt-4 border-t border-[#13223B]">
              <div className="h-10 w-10 rounded-full bg-blue-900/60 border border-blue-500/40 flex items-center justify-center font-bold text-xs text-blue-300">
                SB
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">Coach Sam Bennett</h5>
                <p className="text-[11px] text-gray-400">Head Coach, NCAA Division 1</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 9. BOTTOM CTA BANNER ──────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-cyan-500/50 via-green-400/40 to-blue-500/50 shadow-[0_0_60px_rgba(6,182,212,0.2)]">
          <div className="bg-[#070D1C] rounded-[22px] px-6 sm:px-12 py-16 text-center">

            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-6">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>TAKE YOUR TRAINING TO THE 99TH PERCENTILE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-4 max-w-2xl mx-auto">
              Ready to Train with Elite Scientific Precision?
            </h2>

            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto mb-10 leading-relaxed">
              Join over 50,000 athletes who have upgraded to real-time AI coaching and autonomous systemic programming.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-green-400 hover:from-cyan-300 hover:to-green-300 shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center space-x-2"
              >
                <Zap className="h-4 w-4 fill-slate-950 text-slate-950" />
                <span>JOIN ATHLETEFIT PRO</span>
              </Link>

              <Link
                to="/register"
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-sm text-gray-200 bg-[#0B1528] hover:bg-[#101F3B] border border-[#1E2E4A] transition-colors flex items-center justify-center space-x-2"
              >
                <span>Book a Lab Demo</span>
                <ChevronRight className="h-4 w-4 text-cyan-400" />
              </Link>
            </div>

            {/* Mobile Store Badges & Compliance */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-mono pt-6 border-t border-[#13223B]">
              <div className="flex items-center space-x-2 bg-[#091224] border border-[#162744] px-3.5 py-1.5 rounded-lg">
                <Smartphone className="h-4 w-4 text-cyan-400" />
                <span>Available on <strong>Apple App Store</strong></span>
              </div>
              <div className="flex items-center space-x-2 bg-[#091224] border border-[#162744] px-3.5 py-1.5 rounded-lg">
                <Smartphone className="h-4 w-4 text-green-400" />
                <span>Get it on <strong>Google Play</strong></span>
              </div>
              <div className="flex items-center space-x-1.5 text-gray-400">
                <ShieldCheck className="h-4 w-4 text-green-400" />
                <span>SSL Certified & HIPAA Compliant Data Privacy</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────── 10. FOOTER ──────────────── */}
      <footer className="bg-[#03060E] border-t border-[#121E33] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#121E33]">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-green-400 p-[1px]">
                <div className="h-full w-full bg-[#080D1A] rounded-[11px] flex items-center justify-center">
                  <Zap className="h-4 w-4 text-cyan-400 fill-cyan-400" />
                </div>
              </div>
              <span className="font-display text-2xl font-bold tracking-wider text-white">
                ATHLETEFIT<span className="text-cyan-400">PRO</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Precision athletic conditioning, intelligent adaptive recovery, and computer vision biomechanics engineered for the modern elite athlete.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <span className="text-[11px] font-mono text-gray-400 bg-[#081224] border border-[#162744] px-3 py-1.5 rounded">
                iOS App Store
              </span>
              <span className="text-[11px] font-mono text-gray-400 bg-[#081224] border border-[#162744] px-3 py-1.5 rounded">
                Google Play
              </span>
            </div>
          </div>

          {/* Architecture Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              ARCHITECTURE
            </div>
            <ul className="space-y-2 text-xs text-gray-400 font-medium">
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Adaptive Engine</a></li>
              <li><a href="#diagnostics" className="hover:text-cyan-400 transition-colors">Muscle Clock</a></li>
              <li><a href="#hardware" className="hover:text-cyan-400 transition-colors">Biometric Sync</a></li>
              <li><a href="#athletes" className="hover:text-cyan-400 transition-colors">Fatigue Profiling</a></li>
            </ul>
          </div>

          {/* Newsletter / Updates */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              INTELLIGENCE BRIEFING
            </div>
            <p className="text-xs text-gray-400">
              Subscribe for monthly physiological benchmarks and firmware updates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="athlete@domain.com"
                className="w-full bg-[#081224] border border-[#162744] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition-colors shrink-0"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 AthleteFit Pro Technologies Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-400 transition-colors">System Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
