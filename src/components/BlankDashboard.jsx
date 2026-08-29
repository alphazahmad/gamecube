import React from 'react';
import { LogOut, CheckCircle2, Layout, Sparkles, Layers } from 'lucide-react';

export default function BlankDashboard({ user, onLogout }) {
  return (
    <div className="blank-page-container">
      {/* Top Navbar */}
      <nav className="dashboard-nav">
        <div className="user-badge">
          <div className="avatar-circle">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <span className="user-name">Welcome, {user.username}!</span>
            <span className="user-status">
              <span className="status-dot"></span>
              Logged In
            </span>
          </div>
        </div>

        <button className="btn-logout" onClick={onLogout}>
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </nav>

      {/* Main Blank Page Workspace */}
      <main className="blank-content">
        <div className="success-icon-wrapper">
          <CheckCircle2 size={36} />
        </div>
        <h1 className="blank-title">Blank Page Workspace</h1>
        <p className="blank-subtitle">
          You have successfully logged in with username <strong style={{ color: '#818cf8' }}>{user.username}</strong>. 
          This is your clean, ready-to-build blank canvas dashboard.
        </p>

        <div className="blank-canvas-card">
          <Layers size={32} style={{ color: '#475569' }} />
          <p className="canvas-placeholder-text">This page is intentionally blank for your workspace components.</p>
        </div>
      </main>
    </div>
  );
}
