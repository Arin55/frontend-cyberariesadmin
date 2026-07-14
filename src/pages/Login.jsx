import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import logo from '../assets/cyberaries-logo.png';
import { LogIn, ShieldAlert, Check, User, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const { loginAdmin } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(
    location.state?.registered ? 'Account created successfully! Please log in.' : ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    const successLogin = loginAdmin(username, password);
    if (successLogin) {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card-redesign">
        {/* Logo centered inside card */}
        <div className="auth-logo-container">
          <img src={logo} alt="CyberAries Logo" className="auth-logo-img" />
        </div>

        <div className="auth-card-header">
          <h2 className="auth-card-title">Admin Portal</h2>
          <p className="auth-card-subtitle">Manage compliance standards, companies, and auditor registry.</p>
        </div>

        {error && (
          <div className="error-message" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', fontSize: '13px', marginBottom: '16px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', borderRadius: '8px' }}>
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #10B981', color: '#047857', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Check size={16} />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label className="form-label" style={{ fontSize: '13px', fontWeight: '600', color: '#64748B' }}>Username</label>
            <div className="auth-input-wrapper">
              <input
                type="text"
                className="auth-input-field"
                placeholder="e.g. admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <User size={16} className="auth-input-icon" />
            </div>
          </div>

          <div className="auth-input-group">
            <label className="form-label" style={{ fontSize: '13px', fontWeight: '600', color: '#64748B' }}>Password</label>
            <div className="auth-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="auth-input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock size={16} className="auth-input-icon" />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '13px' }}>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember Me</span>
            </label>
            
            <Link 
              to="/forgot-password" 
              className="forgot-password-link"
              style={{ color: '#E53935', fontWeight: '600', textDecoration: 'none' }}
            >
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="auth-btn-primary">
            <LogIn size={18} /> Sign In
          </button>

          <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
            <span style={{ padding: '0 12px', color: '#64748B' }}>or continue with</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
          </div>

          <button 
            type="button" 
            className="btn btn-secondary btn-block" 
            onClick={() => alert('Redirecting to Google Enterprise Identity Provider...')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '11px', borderRadius: '10px', fontSize: '14.5px' }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" style={{ display: 'block' }}>
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span>Sign in with Google</span>
          </button>

          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '13.5px', color: '#64748B' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#E53935', fontWeight: '600', textDecoration: 'none' }}>
              Create Account
            </Link>
          </div>
        </form>

        <div style={{ marginTop: '28px', borderTop: '1px solid var(--border-color)', paddingTop: '20px', fontSize: '12px', color: '#64748B', textAlign: 'center' }}>
          <span style={{ fontWeight: '600' }}>Testing Account:</span> <code style={{ fontSize: '11px', background: '#F1F5F9', padding: '2px 4px', borderRadius: '4px' }}>admin</code> / <code style={{ fontSize: '11px', background: '#F1F5F9', padding: '2px 4px', borderRadius: '4px' }}>password</code>
        </div>
      </div>
    </div>
  );
}
