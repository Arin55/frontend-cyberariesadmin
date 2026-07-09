import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import logo from '../assets/cyberaries-logo.png';
import heroImg from '../assets/hero.png';
import { LogIn, ShieldAlert, Check } from 'lucide-react';

export default function Login() {
  const { loginAdmin } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

          {/* Soft light-blue glow (#7DD3FC) behind the logo only */}
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
            {/* Circuit Line 1 */}
            <path d="M-50 120 H180 L230 170 V320 L280 370 H450" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 6" />
            <circle cx="180" cy="120" r="3" fill="#FFFFFF" />
            <circle cx="230" cy="170" r="3" fill="#FFFFFF" />
            <circle cx="280" cy="370" r="3" fill="#FFFFFF" />

            {/* Circuit Line 2 */}
            <path d="M450 620 H320 L270 570 V420 L220 370 H-50" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="320" cy="620" r="3" fill="#FFFFFF" />
            <circle cx="270" cy="570" r="3" fill="#FFFFFF" />
            <circle cx="220" cy="370" r="3" fill="#FFFFFF" />

            {/* Hexagon 1 */}
            <polygon points="120,220 150,237 150,272 120,290 90,272 90,237" stroke="#FFFFFF" strokeWidth="1" />
            
            {/* Hexagon 2 */}
            <polygon points="280,480 310,497 310,532 280,550 250,532 250,497" stroke="#FFFFFF" strokeWidth="1" />
            
            {/* Hexagon 3 (Larger) */}
            <polygon points="200,320 250,348 250,405 200,433 150,405 150,348" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Network Connections */}
            <line x1="180" y1="120" x2="120" y2="220" stroke="#FFFFFF" strokeWidth="0.5" />
            <line x1="280" y1="370" x2="200" y2="320" stroke="#FFFFFF" strokeWidth="0.5" />
            <line x1="220" y1="370" x2="280" y2="480" stroke="#FFFFFF" strokeWidth="0.5" />
          </svg>

          {/* Floating low-opacity cybersecurity particles */}
          <div style={{ position: 'absolute', top: '15%', left: '20%', width: '6px', height: '6px', backgroundColor: '#FFFFFF', borderRadius: '50%', opacity: 0.06 }}></div>
          <div style={{ position: 'absolute', top: '45%', left: '75%', width: '8px', height: '8px', backgroundColor: '#FFFFFF', borderRadius: '50%', opacity: 0.04 }}></div>
          <div style={{ position: 'absolute', top: '75%', left: '15%', width: '5px', height: '5px', backgroundColor: '#FFFFFF', borderRadius: '50%', opacity: 0.05 }}></div>
          <div style={{ position: 'absolute', top: '60%', left: '40%', width: '7px', height: '7px', backgroundColor: '#FFFFFF', borderRadius: '50%', opacity: 0.03 }}></div>
        </div>

        <div className="auth-logo-section" style={{ position: 'relative', zIndex: 10 }}>
          <img src={logo} alt="CyberAries Logo" className="auth-logo" style={{ height: '58px', width: 'auto' }} />
        </div>

        <div className="auth-illustration-container">
          {/* Custom SVG Cybersecurity Shield compliance animation graphic */}
          <svg 
            viewBox="0 0 200 200" 
            style={{ width: '180px', height: '180px', marginBottom: '24px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
          >
            {/* Outer Ring */}
            <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="var(--primary)" strokeWidth="3" strokeDasharray="300 200" />
            
            {/* Nodes */}
            <circle cx="100" cy="20" r="6" fill="var(--primary)" />
            <circle cx="20" cy="100" r="6" fill="#10B981" />
            <circle cx="100" cy="180" r="6" fill="#3B82F6" />
            <circle cx="180" cy="100" r="6" fill="#F59E0B" />
            
            {/* Core Shield */}
            <path 
              d="M100 50 L150 70 V115 C150 145 128 165 100 175 C72 165 50 145 50 115 V70 Z" 
              fill="rgba(255,255,255,0.07)" 
              stroke="rgba(255,255,255,0.2)" 
              strokeWidth="2" 
            />
            
            {/* Inner Shield check */}
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
            An enterprise-ready governance, risk management, and cybersecurity alignment system. Monitor compliance standards, assign auditors, and manage risk parameters from a unified center.
          </p>
          
          {/* Also include the hero image from assets */}
          {heroImg && (
            <img 
              src={heroImg} 
              alt="Cybersecurity Hero" 
              style={{ marginTop: '24px', opacity: 0.8, maxHeight: '60px', objectFit: 'contain' }} 
            />
          )}
        </div>

        <div className="auth-footer-text">
          &copy; {new Date().getFullYear()} CyberAries Inc. All rights reserved. Version 1.2.0-Enterprise.
        </div>
      </div>

      {/* Right Column - Enterprise Login Form */}
      <div className="auth-form-section">
        <div className="auth-form-header">
          <h2 className="auth-form-title">Sign In</h2>
          <p className="auth-form-subtitle">
            Enter your administrator credentials below to access the compliance panel.
          </p>
        </div>

        {error && (
          <div className="error-message" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #10B981', color: '#047857', padding: '12px 16px', borderRadius: 'var(--radius-md)', fontSize: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Check size={16} />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
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
            >
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            <LogIn size={18} /> Login to Platform
          </button>

          <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
            <span style={{ padding: '0 12px' }}>or continue with</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }}></div>
          </div>

          <button 
            type="button" 
            className="btn btn-secondary btn-block" 
            onClick={() => alert('Redirecting to Google Enterprise Identity Provider...')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" style={{ display: 'block' }}>
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span>Sign in with Google</span>
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
              Create Account
            </Link>
          </div>
        </form>

        <div style={{ marginTop: '36px', borderTop: '1px solid var(--border-color)', paddingTop: '20px', fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center' }}>
          <span style={{ fontWeight: '600' }}>Tip:</span> For testing purposes, please log in using default username: <code style={{ fontSize: '12px', background: '#F1F5F9', padding: '2px 4px', borderRadius: '4px' }}>admin</code> / password: <code style={{ fontSize: '12px', background: '#F1F5F9', padding: '2px 4px', borderRadius: '4px' }}>password</code>.
        </div>
      </div>
    </div>
  );
}
