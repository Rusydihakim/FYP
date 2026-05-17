import { Link } from 'react-router-dom';
import { Activity, Brain, Users } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/assets/logo.png" alt="AthleteFit Pro" className="h-10 w-auto" />
        </div>
        <div className="flex space-x-4">
          <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 font-medium">Log In</Link>
          <Link to="/register" className="bg-green-500 text-bg hover:bg-green-400 px-4 py-2 rounded-lg font-semibold transition-colors">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">
            <span className="text-text">Train Smarter. </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Perform Better.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto mb-10">
            The all-in-one platform for athletes and coaches. AI-powered workouts, real-time wearable sync, and actionable performance insights.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register" className="bg-green-500 text-bg hover:bg-green-400 px-8 py-4 rounded-lg font-bold text-lg transition-colors">Start Training</Link>
            <Link to="/register" className="border border-blue-500 text-blue-400 hover:bg-blue-500/10 px-8 py-4 rounded-lg font-bold text-lg transition-colors">For Coaches</Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-surface py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-surface2 p-8 rounded-2xl border border-border">
              <Brain className="h-12 w-12 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4 font-display">AI Workout Plans</h3>
              <p className="text-gray-400">Generate personalized, data-driven training regimens based on your unique profile, goals, and recovery metrics.</p>
            </div>
            <div className="bg-surface2 p-8 rounded-2xl border border-border">
              <Activity className="h-12 w-12 text-green-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4 font-display">Wearable Sync</h3>
              <p className="text-gray-400">Connect your Fitbit to sync heart rate, sleep, and activity data. Let the platform adapt your load based on real fatigue.</p>
            </div>
            <div className="bg-surface2 p-8 rounded-2xl border border-border">
              <Users className="h-12 w-12 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4 font-display">Coach Portal</h3>
              <p className="text-gray-400">Manage multiple athletes, assign dynamic routines, and monitor compliance from a single powerful dashboard.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-bg py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>&copy; 2026 AthleteFit Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
