import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import logo from '../assets/cyberaries-logo.png';
import { ShieldCheck } from 'lucide-react';

export default function Register() {
  const { registerAdmin } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Admin'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!formData.fullName || !formData.username || !formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Save admin
    registerAdmin({
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: 'Admin'
    });

    // Redirect to login page
    navigate('/login', { state: { registered: true } });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '24px', backgroundColor: 'var(--bg-main)' }}>
      <div className="dashboard-section-card" style={{ width: '560px', padding: '32px', backgroundColor: '#FFFFFF', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img src={logo} alt="CyberAries Logo" style={{ height: '48px', width: 'auto', marginBottom: '12px', objectFit: 'contain' }} />
          <h2 style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>Create Admin Account</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>Cybersecurity Compliance Management Platform</p>
        </div>

        {error && <div className="error-message" style={{ padding: '8px 12px', fontSize: '13px', marginBottom: '16px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-input"
                placeholder="e.g. John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-input"
                placeholder="admin123"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group" style={{ flex: '1.6' }}>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="admin@cyberaries.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ flex: '1' }}>
              <label className="form-label">Role</label>
              <input
                type="text"
                name="role"
                className="form-input"
                value="Admin"
                disabled
                style={{ backgroundColor: 'var(--bg-main)', cursor: 'not-allowed' }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '8px', padding: '10px 20px' }}>
            <ShieldCheck size={16} /> Create Admin Account
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Login here</Link>
        </div>
      </div>
    </div>
  );
}
