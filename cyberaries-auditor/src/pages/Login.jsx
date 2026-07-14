import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/cyberaries-logo.png';
import { LogIn, ShieldAlert, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('Password recovery is managed by your CyberAries administrator. Please contact your administrator to reset your password.');
  };

  return (
    <div className="auth-container">
      {/* Left Column - Premium Cybersecurity Branding & Illustration */}
      <div className="auth-sidebar">
        {/* Cyber Theme Decorative Background */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          overflow: 'hidden', 
          pointerEvents: 'none', 
          zIndex: 1,
          maskImage: 'radial-gradient(circle at 60px 60px, transparent 15%, black 60%)',
          WebkitMaskImage: 'radial-gradient(circle at 60px 60px, transparent 15%, black 60%)'
        }}>
          {/* Grid Texture */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
            backgroundSize: '45px 45px',
          }}></div>

          {/* Soft light-blue glow behind the logo */}
          <div style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '280px',
            height: '180px',
            background: 'radial-gradient(circle, rgba(125, 211, 252, 0.35) 0%, rgba(125, 211, 252, 0.1) 50%, transparent 80%)',
            filter: 'blur(10px)',
          }}></div>

          {/* Circuit Lines, Connections, and Hexagons */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07 }} viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-50 120 H180 L230 170 V320 L280 370 H450" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 6" />
            <circle cx="180" cy="120" r="3" fill="#FFFFFF" />
            <circle cx="230" cy="170" r="3" fill="#FFFFFF" />
            <circle cx="280" cy="370" r="3" fill="#FFFFFF" />

            <path d="M450 620 H320 L270 570 V420 L220 370 H-50" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="320" cy="620" r="3" fill="#FFFFFF" />
            <circle cx="270" cy="570" r="3" fill="#FFFFFF" />
            <circle cx="220" cy="370" r="3" fill="#FFFFFF" />

            <polygon points="120,220 150,237 150,272 120,290 90,272 90,237" stroke="#FFFFFF" strokeWidth="1" />
            <polygon points="280,480 310,497 310,532 280,550 250,532 250,497" stroke="#FFFFFF" strokeWidth="1" />
            <polygon points="200,320 250,348 250,405 200,433 150,405 150,348" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" />

            <line x1="180" y1="120" x2="120" y2="220" stroke="#FFFFFF" strokeWidth="0.5" />
            <line x1="280" y1="370" x2="200" y2="320" stroke="#FFFFFF" strokeWidth="0.5" />
            <line x1="220" y1="370" x2="280" y2="480" stroke="#FFFFFF" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="auth-logo-section" style={{ position: 'relative', zIndex: 10 }}>
          <img src={logo} alt="CyberAries Logo" className="auth-logo" style={{ height: '58px', width: 'auto' }} />
        </div>

        <div className="auth-illustration-container">
          <svg 
            viewBox="0 0 200 200" 
            style={{ width: '180px', height: '180px', marginBottom: '24px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
          >
            <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="var(--primary)" strokeWidth="3" strokeDasharray="300 200" />
            
            <circle cx="100" cy="20" r="6" fill="var(--primary)" />
            <circle cx="20" cy="100" r="6" fill="#10B981" />
            <circle cx="100" cy="180" r="6" fill="#3B82F6" />
            <circle cx="180" cy="100" r="6" fill="#F59E0B" />
            
            <path 
              d="M100 50 L150 70 V115 C150 145 128 165 100 175 C72 165 50 145 50 115 V70 Z" 
              fill="rgba(255,255,255,0.07)" 
              stroke="rgba(255,255,255,0.2)" 
              strokeWidth="2" 
            />
            
            <path 
              d="M85 110 L95 120 L120 95" 
              fill="none" 
              stroke="#10B981" 
              strokeWidth="5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>

          <h3 className="auth-intro-title">Ensure Compliance, Protect Assets</h3>
          <p className="auth-intro-subtitle">
            Access the CyberAries Auditor Portal to review evidence, examine AI findings, and compile draft compliance reports for enterprise operations.
          </p>
        </div>

        <div className="auth-footer-text">
          &copy; {new Date().getFullYear()} CyberAries Inc. All rights reserved. Version 1.2.0-Enterprise.
        </div>
      </div>

      {/* Right Column - Auditor Login Form */}
      <div className="auth-form-section">
        <div className="auth-form-header" style={{ marginBottom: '24px' }}>
          <h2 className="auth-form-title">Auditor Portal</h2>
          <p className="auth-form-subtitle">Sign in to access your audit workspace and assignments.</p>
        </div>

        {errorMsg && (
          <div className="error-message" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="rahul.sharma@cyberaries.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="form-group" style={{ position: 'relative', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
              <a 
                href="#forgot-password" 
                onClick={handleForgotPassword} 
                className="forgot-password-link"
                style={{ fontSize: '13px', textDecoration: 'none', color: 'var(--primary)', fontWeight: '500' }}
              >
                Forgot Password?
              </a>
            </div>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                required
                style={{ width: '100%', paddingRight: '40px' }}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-actions" style={{ marginBottom: '20px' }}>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isSubmitting}
              />
              <span>Remember Me</span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
            {isSubmitting ? 'Verifying Credentials...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '36px', borderTop: '1px solid var(--border-color)', paddingTop: '20px', fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center' }}>
          <span style={{ fontWeight: '600' }}>Tip:</span> For testing purposes, please log in using default email: <code style={{ fontSize: '12px', background: '#F1F5F9', padding: '2px 4px', borderRadius: '4px' }}>rahul.sharma@cyberaries.com</code> / password: <code style={{ fontSize: '12px', background: '#F1F5F9', padding: '2px 4px', borderRadius: '4px' }}>Auditor@123</code>.
        </div>
      </div>
    </div>
  );
};

export default Login;
