import React from 'react';

export default function ChipPanel({ chips, activeChip, onSelectChip, side }) {
  return (
    <div className="chip-panel">
      <span className="panel-label">{side === 'left' ? 'Chips' : 'High Chips'}</span>
      {chips.map((value) => (
        <button
          key={value}
          className={`chip-btn chip-${value} ${activeChip === value ? 'active' : ''}`}
          onClick={() => onSelectChip(value)}
          title={`Select ${value} Cubecoin chip`}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
