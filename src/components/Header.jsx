import React from 'react';
import { Coins, Trophy, AlertTriangle } from 'lucide-react';

export default function Header({ balance, wonPoints }) {
  return (
    <header className="header-container">
      {/* Yellow Disclaimer Banner */}
      <div className="warning-banner">
        <AlertTriangle size={16} style={{ display: 'inline', marginRight: '6px' }} />
        This Game Is Only For Entertainment Purposes – No Real Money Gambling
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="brand-title">
          <span>🦁 CUBECOIN ANIMAL PREDICTION</span>
        </div>

        <div style={{ display: 'flex', gap: '1.25rem' }}>
          {/* Total Balance */}
          <div className="stat-card">
            <Coins size={22} style={{ color: '#fbbf24' }} />
            <div>
              <div className="stat-label">Total Balance</div>
              <div className="stat-value gold">{balance} Cubecoins</div>
            </div>
          </div>

          {/* Won Points */}
          <div className="stat-card">
            <Trophy size={22} style={{ color: '#4ade80' }} />
            <div>
              <div className="stat-label">Won Points</div>
              <div className="stat-value green">{wonPoints}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
