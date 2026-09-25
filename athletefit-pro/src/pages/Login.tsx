import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import '../styles/Login.css';

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
    <div className="login-page">
      <div className="login-header">
        <img className="login-logo" src="/assets/logo.png" alt="AthleteFit Pro" />
        <h2 className="login-title">
          {view === 'signin' ? 'Sign in to your account' : 'Reset your password'}
        </h2>
        <p className="login-subtitle">
          {view === 'signin' ? 'Welcome back to AthleteFit Pro' : 'Provide your email to receive a recovery link'}
        </p>
      </div>

      <div className="login-card-wrapper">
        <div className="login-card">
          
          {authError && (
            <div className="login-error-alert">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {successMessage && (
            <div className="login-success-alert">
              <CheckCircle className="h-5 w-5 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {view === 'signin' ? (
            <form className="login-form" onSubmit={handleLoginSubmit(onLoginSubmit)}>
              <div>
                <label className="login-label">Email address</label>
                <div className="mt-1">
                  <input
                    type="email"
                    {...registerLogin("email")}
                    className="login-input"
                    placeholder="you@example.com"
                  />
                  {loginErrors.email && <p className="login-error-text">{loginErrors.email.message}</p>}
                </div>
              </div>

              <div>
                <div className="login-password-row">
                  <label className="login-label">Password</label>
                  <button
                    type="button"
                    onClick={() => { setView('forgot'); setAuthError(''); setSuccessMessage(''); }}
                    className="login-forgot-btn"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="mt-1">
                  <input
                    type="password"
                    {...registerLogin("password")}
                    className="login-input"
                    placeholder="••••••••"
                  />
                  {loginErrors.password && <p className="login-error-text">{loginErrors.password.message}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="login-submit-btn"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
          ) : (
            <form className="login-form" onSubmit={handleForgotSubmit(onForgotSubmit)}>
              <div>
                <label className="login-label">Email address</label>
                <div className="mt-1">
                  <input
                    type="email"
                    {...registerForgot("email")}
                    className="login-input"
                    placeholder="you@example.com"
                  />
                  {forgotErrors.email && <p className="login-error-text">{forgotErrors.email.message}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="login-submit-btn"
                >
                  {loading ? 'Sending Recovery Link...' : 'Send Recovery Link'}
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => { setView('signin'); setAuthError(''); setSuccessMessage(''); }}
                  className="login-back-btn"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Sign In
                </button>
              </div>
            </form>
          )}

          {view === 'signin' && (
            <div className="login-footer-link-wrap">
              <Link to="/register" className="login-footer-link">
                Don't have an account? Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
