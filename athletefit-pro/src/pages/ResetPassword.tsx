import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, AlertCircle } from 'lucide-react';
import '../styles/ResetPassword.css';

const resetSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetForm = z.infer<typeof resetSchema>;

export default function ResetPassword() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ResetForm>({
    resolver: zodResolver(resetSchema)
  });

  const onSubmit = async (data: ResetForm) => {
    setLoading(true);
    setError('');
    const { error: resetErr } = await updatePassword(data.password);
    if (resetErr) {
      setError(resetErr.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-header">
        <img className="reset-password-logo" src="/assets/logo.png" alt="AthleteFit Pro" />
        <h2 className="reset-password-title">Reset Your Password</h2>
        <p className="reset-password-subtitle">
          Enter your new password below to secure your account.
        </p>
      </div>

      <div className="reset-password-card-wrapper">
        <div className="reset-password-card">
          {success ? (
            <div className="reset-password-success-box">
              <div className="reset-password-success-icon-wrap">
                <CheckCircle className="reset-password-success-icon" />
              </div>
              <h3 className="reset-password-success-title">Password Updated Successfully</h3>
              <p className="reset-password-success-text">
                Your password has been successfully updated. You are being redirected to the sign-in page...
              </p>
              <div className="mt-4">
                <Link
                  to="/login"
                  className="reset-password-success-link"
                >
                  Go to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form className="reset-password-form" onSubmit={handleSubmit(onSubmit)}>
              {error && (
                <div className="reset-password-error-alert">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="reset-password-field-label">New Password</label>
                <div className="mt-1">
                  <input
                    type="password"
                    {...register("password")}
                    className="reset-password-input"
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="reset-password-field-error">{errors.password.message}</p>}
                </div>
              </div>

              <div>
                <label className="reset-password-field-label">Confirm New Password</label>
                <div className="mt-1">
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    className="reset-password-input"
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <p className="reset-password-field-error">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="reset-password-submit-btn"
                >
                  {loading ? 'Updating Password...' : 'Reset Password'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
