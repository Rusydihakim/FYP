import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';

import { PageLayout } from '../components/layout/PageLayout';

import CoachDashboard from '../pages/coach/CoachDashboard';
import Athletes from '../pages/coach/Athletes';
import AthleteDetail from '../pages/coach/AthleteDetail';
import Plans from '../pages/coach/Plans';
import PlanBuilder from '../pages/coach/PlanBuilder';
import Assign from '../pages/coach/Assign';
import Progress from '../pages/coach/Progress';
import Reports from '../pages/coach/Reports';
import CoachMessages from '../pages/coach/CoachMessages';

import AthleteDashboard from '../pages/athlete/Dashboard';
import Workouts from '../pages/athlete/Workouts';
import Analytics from '../pages/athlete/Analytics';
import Wearable from '../pages/athlete/Wearable';
import AthleteMessages from '../pages/athlete/AthleteMessages';

import AdminDashboard from '../pages/admin/AdminDashboard';
import Users from '../pages/admin/Users';
import Settings from '../pages/admin/Settings';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard/*" element={
        <ProtectedRoute allowedRoles={['Athlete']}>
          <PageLayout>
            <Routes>
              <Route path="/" element={<AthleteDashboard />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/wearable" element={<Wearable />} />
              <Route path="/messages" element={<AthleteMessages />} />
            </Routes>
          </PageLayout>
        </ProtectedRoute>
      } />

      <Route path="/coach/*" element={
        <ProtectedRoute allowedRoles={['Coach']}>
          <PageLayout>
            <Routes>
              <Route path="/" element={<CoachDashboard />} />
              <Route path="/athletes" element={<Athletes />} />
              <Route path="/athletes/:id" element={<AthleteDetail />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/plans/new" element={<PlanBuilder />} />
              <Route path="/plans/:id/edit" element={<PlanBuilder />} />
              <Route path="/assign" element={<Assign />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/messages" element={<CoachMessages />} />
            </Routes>
          </PageLayout>
        </ProtectedRoute>
      } />

      <Route path="/admin/*" element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <PageLayout>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </PageLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}
