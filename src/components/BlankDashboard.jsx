import React from 'react';
import { LogOut, UserCheck } from 'lucide-react';

export default function BlankDashboard({ user, onLogout, children }) {
  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <nav className="dashboard-nav" style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0.75rem 1.5rem' }}>
        <div className="user-badge">
          <div className="avatar-circle">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <span className="user-name">Welcome, {user.username}!</span>
            <span className="user-status">
              <span className="status-dot"></span>
              <UserCheck size={12} style={{ display: 'inline', marginRight: '3px' }} />
              Authenticated Session
            </span>
          </div>
        </div>

        <button className="btn-logout" onClick={onLogout}>
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </nav>

      {/* Main Game Interface */}
      <div style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  );
}
