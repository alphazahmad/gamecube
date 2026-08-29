import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck, Play } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      if (username.trim() === 'demo' && password === 'password') {
        setIsSubmitting(false);
        onLoginSuccess({ username: 'demo' });
      } else {
        setIsSubmitting(false);
        setErrorMessage('Invalid username or password. Use demo / password');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    }, 200);
  };

  const handleQuickPlay = () => {
    setUsername('demo');
    setPassword('password');
    setIsSubmitting(true);
    setTimeout(() => {
      onLoginSuccess({ username: 'demo' });
    }, 200);
  };

  return (
    <div className={`glass-card ${isShaking ? 'shake-animation' : ''}`}>
      {/* Brand & Title */}
      <div className="card-header">
        <div className="brand-badge">
          <ShieldCheck size={16} />
          <span>Cubecoin Gaming Hub</span>
        </div>
        <h1 className="card-title">Welcome Back</h1>
        <p className="card-subtitle">Sign in to play Cubecoin Animal Prediction</p>
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

        {/* Primary 1-Click Game Launch Button */}
        <button type="submit" className="btn-submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Starting Game...</span>
          ) : (
            <>
              <span>Sign In & Start Game</span>
              <Play size={18} fill="currentColor" />
            </>
          )}
        </button>
      </form>

      {/* Demo Credentials Helper */}
      <div className="demo-credentials-box">
        <div className="demo-title">
          <span>Demo Credentials</span>
          <button type="button" className="btn-quick-fill" onClick={handleQuickPlay}>
            ⚡ Instant Play
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
