import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Props {
  children: React.ReactNode;
  allowedRoles?: Array<'Athlete' | 'Coach' | 'Admin'>;
}

export function ProtectedRoute({ children, allowedRoles }: Props) {
  const { user, profile, loading } = useAuth();

  if (loading) return <div className="min-h-screen bg-bg flex items-center justify-center">
    <div className="text-gray-300 text-sm">Loading...</div>
  </div>;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && profile && !allowedRoles.includes(profile.role))
    return <Navigate to={profile.role === 'Coach' ? '/coach' : '/dashboard'} replace />;

  return <>{children}</>;
}
