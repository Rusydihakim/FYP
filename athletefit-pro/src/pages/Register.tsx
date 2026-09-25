import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import '../styles/Register.css';

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
    <div className="register-page">
      <div className="register-header">
        <img className="register-logo" src="/assets/logo.png" alt="AthleteFit Pro" />
        <h2 className="register-title">Create your account</h2>
      </div>

      <div className="register-card-wrapper">
        <div className="register-card">
          <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            {authError && <div className="register-error-alert">{authError}</div>}
            
            <div>
              <label className="register-label">Full Name</label>
              <div className="mt-1">
                <input
                  type="text"
                  {...register("fullName")}
                  className="register-input"
                />
                {errors.fullName && <p className="register-error-text">{errors.fullName.message}</p>}
              </div>
            </div>

            <div>
              <label className="register-label">Email address</label>
              <div className="mt-1">
                <input
                  type="email"
                  {...register("email")}
                  className="register-input"
                />
                {errors.email && <p className="register-error-text">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label className="register-label">Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  {...register("password")}
                  className="register-input"
                />
                {errors.password && <p className="register-error-text">{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <label className="register-label">Role</label>
              <div className="mt-1">
                <select
                  {...register("role")}
                  className="register-select"
                >
                  <option value="Athlete">Athlete</option>
                  <option value="Coach">Coach</option>
                </select>
                {errors.role && <p className="register-error-text">{errors.role.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit" disabled={loading}
                className="register-submit-btn"
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
            </div>
          </form>

          <div className="register-footer">
            <Link to="/login" className="register-footer-link">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
