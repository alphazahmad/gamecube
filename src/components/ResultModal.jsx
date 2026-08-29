import React from 'react';
import { Trophy, Frown } from 'lucide-react';

export default function ResultModal({ resultData }) {
  if (!resultData) return null;

  const { winningCard, multiplier, wonAmount } = resultData;
  const isWinner = wonAmount > 0;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="multiplier-tag">{multiplier}x MULTIPLIER!</div>
        
        <div className="modal-emoji">{winningCard.emoji}</div>
        
        <h2 className="modal-title">
          #{winningCard.id} {winningCard.name.toUpperCase()} WINS!
        </h2>

        {isWinner ? (
          <div className="modal-result-amount">
            <Trophy size={24} style={{ display: 'inline', marginRight: '8px', color: '#fbbf24' }} />
            <span>YOU WON +{wonAmount} CUBECOINS!</span>
          </div>
        ) : (
          <div className="modal-result-amount no-win">
            <Frown size={22} style={{ display: 'inline', marginRight: '6px' }} />
            <span>Better Luck Next Round!</span>
          </div>
        )}
      </div>
    </div>
  );
}
