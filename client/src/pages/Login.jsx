import React, { useState } from 'react';
import { useClient } from '../context/ClientContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield } from 'lucide-react';

export default function Login() {
  const { login } = useClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please use sarah@aether.io and password.');
    }
  };

  return (
    <div className="auth-container">
      {/* Left Panel Illustration */}
      <div className="auth-sidebar">
        <div className="auth-logo-section">
          <img src="/assets/logos/cyberaries-logo.png" alt="CyberAries Logo" className="auth-logo" style={{ height: '48px', width: 'auto' }} />
        </div>
        
        <div className="auth-illustration-container">
          <h2 className="auth-intro-title">Compliance Simplified for SaaS</h2>
          <p className="auth-intro-subtitle">
            Upload policies, submit evidence records, communicate directly with your compliance auditor, and track your certification phase progress in one unified portal.
          </p>
        </div>
        
        <div className="auth-footer-text">
          &copy; 2026 CyberAries QA Team. Version 1.2.0-Enterprise.
        </div>
      </div>

      {/* Right Panel Form */}
      <div className="auth-form-section">
        <div className="auth-mobile-logo">
          <img src="/assets/logos/cyberaries-logo.png" alt="CyberAries Logo" style={{ height: '48px', width: 'auto' }} />
        </div>

        <div className="auth-form-header">
          <h2 className="auth-form-title">Client Portal Access</h2>
          <p className="auth-form-subtitle">Enter your corporate credentials to manage audits.</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Corporate Email Address</label>
            <input 
              type="text" 
              className="form-input" 
              required 
              placeholder="e.g. sarah@aether.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label">Account Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              className="form-input" 
              required 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '16px',
                top: '38px',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="form-actions">
            <label className="checkbox-container">
              <input type="checkbox" defaultChecked />
              <span>Remember this session</span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Secure Portal Login &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}
