import React from 'react';
import { Timer, Trash2, Undo2, Zap } from 'lucide-react';

export default function BottomControls({
  timeLeft,
  onCancelAllBids,
  onRevertLastBet,
  onBetOddNumbers,
  onBetEvenNumbers,
  hasActiveBets,
  hasBetHistory,
  isLocked
}) {
  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <footer className="bottom-panel">
      {/* Yellow Large Timer */}
      <div className="timer-container">
        <Timer className="timer-icon" size={26} />
        <div>
          <div className="timer-label">Round Ends In</div>
          <div className="timer-display">{formatTime(timeLeft)}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="action-buttons">
        <button
          className="btn-action btn-revert"
          onClick={onRevertLastBet}
          disabled={!hasBetHistory || isLocked}
          title="Revert your last placed bet action"
        >
          <Undo2 size={18} />
          <span>Revert Last Bet</span>
        </button>

        <button
          className="btn-action btn-cancel"
          onClick={onCancelAllBids}
          disabled={!hasActiveBets || isLocked}
        >
          <Trash2 size={18} />
          <span>Cancel All Bids</span>
        </button>

        <button
          className="btn-action btn-odd"
          onClick={onBetOddNumbers}
          disabled={isLocked}
        >
          <Zap size={18} />
          <span>Odd Numbers</span>
        </button>

        <button
          className="btn-action btn-even"
          onClick={onBetEvenNumbers}
          disabled={isLocked}
        >
          <Zap size={18} />
          <span>Even Numbers</span>
        </button>
      </div>
    </footer>
  );
}
