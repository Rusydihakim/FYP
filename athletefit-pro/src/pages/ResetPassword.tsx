import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, AlertCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src="/assets/logo.png" alt="AthleteFit Pro" />
        <h2 className="mt-6 text-center text-3xl font-display text-text">Reset Your Password</h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Enter your new password below to secure your account.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-border">
          {success ? (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-lg font-medium text-text">Password Updated Successfully</h3>
              <p className="text-sm text-gray-400">
                Your password has been successfully updated. You are being redirected to the sign-in page...
              </p>
              <div className="mt-4">
                <Link
                  to="/login"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-bg bg-green-500 rounded-md hover:bg-green-400 transition"
                >
                  Go to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-950/30 border border-red-500/30 text-danger rounded-md text-sm">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300">New Password</label>
                <div className="mt-1">
                  <input
                    type="password"
                    {...register("password")}
                    className="appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm bg-surface2 text-text placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="mt-1 text-sm text-danger">{errors.password.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Confirm New Password</label>
                <div className="mt-1">
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    className="appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm bg-surface2 text-text placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-danger">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-bg bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition"
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
