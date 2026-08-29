import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      // Requirements: username = demo, password = password
      if (username.trim() === 'demo' && password === 'password') {
        setIsSubmitting(false);
        onLoginSuccess({ username: 'demo' });
      } else {
        setIsSubmitting(false);
        setErrorMessage('Invalid username or password. Use demo / password');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    }, 400);
  };

  const handleQuickFill = () => {
    setUsername('demo');
    setPassword('password');
    setErrorMessage('');
  };

  return (
    <div className={`glass-card ${isShaking ? 'shake-animation' : ''}`}>
      {/* Brand & Title */}
      <div className="card-header">
        <div className="brand-badge">
          <ShieldCheck size={16} />
          <span>Secure Authentication</span>
        </div>
        <h1 className="card-title">Welcome Back</h1>
        <p className="card-subtitle">Please enter your details to sign in</p>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="alert-box alert-danger">
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label className="form-label" htmlFor="username">Username</label>
          <div className="input-wrapper">
            <input
              id="username"
              type="text"
              className="form-input"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
            <User className="input-icon" size={18} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <div className="input-wrapper">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="form-input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <Lock className="input-icon" size={18} />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn-submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Logging in...</span>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      {/* Demo Credentials Helper */}
      <div className="demo-credentials-box">
        <div className="demo-title">
          <span>Demo Credentials</span>
          <button type="button" className="btn-quick-fill" onClick={handleQuickFill}>
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
            Auto Fill
          </button>
        </div>
        <div className="demo-pills">
          <div className="credential-pill">
            <span className="pill-label">Username</span>
            <span>demo</span>
          </div>
          <div className="credential-pill">
            <span className="pill-label">Password</span>
            <span>password</span>
          </div>
        </div>
      </div>
    </div>
  );
}
