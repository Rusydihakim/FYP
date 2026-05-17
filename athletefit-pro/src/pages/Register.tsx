import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(['Athlete', 'Coach'])
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'Athlete' }
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    setAuthError('');
    const { error } = await signUp(data.email, data.password, data.fullName, data.role);
    if (error) {
      setAuthError(error.message);
    } else {
      navigate('/dashboard'); // Or show success message since email confirmation might be needed
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src="/assets/logo.png" alt="AthleteFit Pro" />
        <h2 className="mt-6 text-center text-3xl font-display text-text">Create your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-border">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {authError && <div className="text-danger text-sm">{authError}</div>}
            
            <div>
              <label className="block text-sm font-medium text-gray-300">Full Name</label>
              <div className="mt-1">
                <input
                  type="text"
                  {...register("fullName")}
                  className="appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm bg-surface2 text-text placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                {errors.fullName && <p className="mt-1 text-sm text-danger">{errors.fullName.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Email address</label>
              <div className="mt-1">
                <input
                  type="email"
                  {...register("email")}
                  className="appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm bg-surface2 text-text placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                {errors.email && <p className="mt-1 text-sm text-danger">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  {...register("password")}
                  className="appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm bg-surface2 text-text placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                {errors.password && <p className="mt-1 text-sm text-danger">{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Role</label>
              <div className="mt-1">
                <select
                  {...register("role")}
                  className="block w-full px-3 py-2 border border-border rounded-md shadow-sm bg-surface2 text-text focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  <option value="Athlete">Athlete</option>
                  <option value="Coach">Coach</option>
                </select>
                {errors.role && <p className="mt-1 text-sm text-danger">{errors.role.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit" disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-bg bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="font-medium text-green-500 hover:text-green-400">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
