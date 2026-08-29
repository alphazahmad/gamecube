import React from 'react';

export default function AnimalCard({ card, betAmount, isWinning, onPlaceBet, isLocked }) {
  const hasBet = betAmount > 0;

  return (
    <div
      className={`animal-card ${hasBet ? 'has-bet' : ''} ${isWinning ? 'winning-card' : ''}`}
      onClick={() => !isLocked && onPlaceBet(card.id)}
    >
      <div className="card-number-badge">#{card.id}</div>
      <div className="emoji-display">{card.emoji}</div>
      <div className="animal-name">{card.name}</div>
      <div className="bet-badge">
        {hasBet ? `${betAmount} CC` : 'No Bet'}
      </div>
    </div>
  );
}
