import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const forgotSchema = z.object({
  email: z.string().email("Invalid email address")
});

type LoginForm = z.infer<typeof loginSchema>;
type ForgotForm = z.infer<typeof forgotSchema>;

export default function Login() {
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [view, setView] = useState<'signin' | 'forgot'>('signin');
  const [authError, setAuthError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { register: registerLogin, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

  const { register: registerForgot, handleSubmit: handleForgotSubmit, formState: { errors: forgotErrors } } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema)
  });

  const onLoginSubmit = async (data: LoginForm) => {
    setLoading(true);
    setAuthError('');
    const { error } = await signIn(data.email, data.password);
    if (error) {
      setAuthError(error.message);
    } else {
      navigate('/dashboard'); // ProtectedRoute will redirect if coach/admin
    }
    setLoading(false);
  };

  const onForgotSubmit = async (data: ForgotForm) => {
    setLoading(true);
    setAuthError('');
    setSuccessMessage('');
    const { error } = await resetPassword(data.email);
    if (error) {
      setAuthError(error.message);
    } else {
      setSuccessMessage("We've sent a password reset link to your email. Please check your inbox!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src="/assets/logo.png" alt="AthleteFit Pro" />
        <h2 className="mt-6 text-center text-3xl font-display text-text font-bold">
          {view === 'signin' ? 'Sign in to your account' : 'Reset your password'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          {view === 'signin' ? 'Welcome back to AthleteFit Pro' : 'Provide your email to receive a recovery link'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-border">
          
          {authError && (
            <div className="mb-6 flex items-center gap-2 p-3 bg-red-950/30 border border-red-500/30 text-danger rounded-md text-sm">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 flex items-center gap-2 p-3 bg-green-950/30 border border-green-500/30 text-green-400 rounded-md text-sm">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {view === 'signin' ? (
            <form className="space-y-6" onSubmit={handleLoginSubmit(onLoginSubmit)}>
              <div>
                <label className="block text-sm font-medium text-gray-300">Email address</label>
                <div className="mt-1">
                  <input
                    type="email"
                    {...registerLogin("email")}
                    className="appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm bg-surface2 text-text placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="you@example.com"
                  />
                  {loginErrors.email && <p className="mt-1 text-sm text-danger">{loginErrors.email.message}</p>}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-300">Password</label>
                  <button
                    type="button"
                    onClick={() => { setView('forgot'); setAuthError(''); setSuccessMessage(''); }}
                    className="text-sm font-medium text-green-500 hover:text-green-400 transition"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="mt-1">
                  <input
                    type="password"
                    {...registerLogin("password")}
                    className="appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm bg-surface2 text-text placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="••••••••"
                  />
                  {loginErrors.password && <p className="mt-1 text-sm text-danger">{loginErrors.password.message}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-bg bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition font-semibold"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleForgotSubmit(onForgotSubmit)}>
              <div>
                <label className="block text-sm font-medium text-gray-300">Email address</label>
                <div className="mt-1">
                  <input
                    type="email"
                    {...registerForgot("email")}
                    className="appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm bg-surface2 text-text placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="you@example.com"
                  />
                  {forgotErrors.email && <p className="mt-1 text-sm text-danger">{forgotErrors.email.message}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-bg bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition font-semibold"
                >
                  {loading ? 'Sending Recovery Link...' : 'Send Recovery Link'}
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => { setView('signin'); setAuthError(''); setSuccessMessage(''); }}
                  className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Sign In
                </button>
              </div>
            </form>
          )}

          {view === 'signin' && (
            <div className="mt-6 text-center">
              <Link to="/register" className="font-medium text-green-500 hover:text-green-400 transition">
                Don't have an account? Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
