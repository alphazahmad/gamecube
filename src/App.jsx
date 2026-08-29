import React, { useState, useEffect, useRef } from 'react';
import LoginPage from './components/LoginPage';
import BlankDashboard from './components/BlankDashboard';
import Header from './components/Header';
import ChipPanel from './components/ChipPanel';
import AnimalCard from './components/AnimalCard';
import BottomControls from './components/BottomControls';
import ResultModal from './components/ResultModal';

// 10 Animal Cards (1 to 10)
const ANIMALS = [
  { id: 1, name: 'Lion', emoji: '🦁' },
  { id: 2, name: 'Tiger', emoji: '🐯' },
  { id: 3, name: 'Cat', emoji: '🐱' },
  { id: 4, name: 'Peacock', emoji: '🦚' },
  { id: 5, name: 'Panda', emoji: '🐼' },
  { id: 6, name: 'Elephant', emoji: '🐘' },
  { id: 7, name: 'Rooster', emoji: '🐓' },
  { id: 8, name: 'Horse', emoji: '🐎' },
  { id: 9, name: 'Dog', emoji: '🐕' },
  { id: 10, name: 'Monkey', emoji: '🐵' },
];

// 5 chip removed -> starts from 10
const LEFT_CHIPS = [10, 30, 40, 50];
const RIGHT_CHIPS = [100, 200, 500, 1000];

export default function App() {
  // Auth State
  const [user, setUser] = useState(null);

  // Balance & Won Points state with localStorage persistence
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('cubecoin_balance');
    return saved !== null ? parseInt(saved, 10) : 500;
  });

  const [wonPoints, setWonPoints] = useState(() => {
    const saved = localStorage.getItem('cubecoin_won_points');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  // Save to localStorage whenever balance or wonPoints update
  useEffect(() => {
    localStorage.setItem('cubecoin_balance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('cubecoin_won_points', wonPoints.toString());
  }, [wonPoints]);

  // Selected Active Chip (Default 10)
  const [activeChip, setActiveChip] = useState(10);

  // Bets object mapping card id (1-10) to total bet amount on that card
  const [bets, setBets] = useState({});

  // History stack for Revert Last Bet action
  const [betHistory, setBetHistory] = useState([]);

  // Countdown timer in seconds (starts at 60 = 01:00)
  const [timeLeft, setTimeLeft] = useState(60);

  // Game locked state during round resolution
  const [isLocked, setIsLocked] = useState(false);

  // Result modal state
  const [resultModal, setResultModal] = useState(null);

  // Winning card highlight ID
  const [winningCardId, setWinningCardId] = useState(null);

  const betsRef = useRef(bets);
  const balanceRef = useRef(balance);

  useEffect(() => {
    betsRef.current = bets;
    balanceRef.current = balance;
  }, [bets, balance]);

  // Timer Countdown Effect (1 minute = 60s)
  useEffect(() => {
    if (!user || isLocked) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleRoundEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [user, isLocked]);

  // Handle Placing a Bet on a Card
  const handlePlaceBet = (cardId) => {
    if (isLocked) return;

    if (balance < activeChip) {
      alert("Insufficient balance! You don't have enough Cubecoins for this chip.");
      return;
    }

    setBalance((prev) => prev - activeChip);
    setBets((prev) => ({
      ...prev,
      [cardId]: (prev[cardId] || 0) + activeChip,
    }));

    // Record action for Revert Last Bet
    setBetHistory((prev) => [
      ...prev,
      { betsPlaced: [{ cardId, amount: activeChip }] }
    ]);
  };

  // Quick Bet: Odd Numbers (Cards 1, 3, 5, 7, 9)
  const handleBetOddNumbers = () => {
    if (isLocked) return;
    const oddCardIds = [1, 3, 5, 7, 9];
    const totalCost = activeChip * oddCardIds.length;

    if (balance < totalCost) {
      alert(`Insufficient balance! Placing on all 5 Odd cards costs ${totalCost} Cubecoins.`);
      return;
    }

    setBalance((prev) => prev - totalCost);
    setBets((prev) => {
      const updated = { ...prev };
      oddCardIds.forEach((id) => {
        updated[id] = (updated[id] || 0) + activeChip;
      });
      return updated;
    });

    const betsPlaced = oddCardIds.map((cardId) => ({ cardId, amount: activeChip }));
    setBetHistory((prev) => [...prev, { betsPlaced }]);
  };

  // Quick Bet: Even Numbers (Cards 2, 4, 6, 8, 10)
  const handleBetEvenNumbers = () => {
    if (isLocked) return;
    const evenCardIds = [2, 4, 6, 8, 10];
    const totalCost = activeChip * evenCardIds.length;

    if (balance < totalCost) {
      alert(`Insufficient balance! Placing on all 5 Even cards costs ${totalCost} Cubecoins.`);
      return;
    }

    setBalance((prev) => prev - totalCost);
    setBets((prev) => {
      const updated = { ...prev };
      evenCardIds.forEach((id) => {
        updated[id] = (updated[id] || 0) + activeChip;
      });
      return updated;
    });

    const betsPlaced = evenCardIds.map((cardId) => ({ cardId, amount: activeChip }));
    setBetHistory((prev) => [...prev, { betsPlaced }]);
  };

  // Revert Last Bet (Undo last bet action)
  const handleRevertLastBet = () => {
    if (isLocked || betHistory.length === 0) return;

    const lastAction = betHistory[betHistory.length - 1];
    let refundTotal = 0;

    setBets((prev) => {
      const updated = { ...prev };
      lastAction.betsPlaced.forEach(({ cardId, amount }) => {
        refundTotal += amount;
        if (updated[cardId]) {
          updated[cardId] = Math.max(0, updated[cardId] - amount);
          if (updated[cardId] === 0) delete updated[cardId];
        }
      });
      return updated;
    });

    setBalance((prev) => prev + refundTotal);
    setBetHistory((prev) => prev.slice(0, -1));
  };

  // Cancel All Bids (Refund all active bets back to total balance)
  const handleCancelAllBids = () => {
    if (isLocked) return;
    const totalBetSum = Object.values(bets).reduce((sum, val) => sum + val, 0);
    if (totalBetSum > 0) {
      setBalance((prev) => prev + totalBetSum);
      setBets({});
      setBetHistory([]);
    }
  };

  // Round Resolution when Timer Hits 00:00 (Fixed 2x Multiplier)
  const handleRoundEnd = () => {
    setIsLocked(true);

    // Randomly select winning card (1-10)
    const winningId = Math.floor(Math.random() * 10) + 1;
    const winningCard = ANIMALS.find((a) => a.id === winningId);
    setWinningCardId(winningId);

    // Fixed Multiplier: 2x
    const multiplier = 2;

    // Calculate winnings (2x payout for bet on winning card)
    const userBetOnWinner = betsRef.current[winningId] || 0;
    const wonAmount = userBetOnWinner * multiplier;

    if (wonAmount > 0) {
      setBalance((prev) => prev + wonAmount);
      setWonPoints((prev) => prev + wonAmount);
    }

    // Show Result Modal for 3 seconds
    setResultModal({
      winningCard,
      multiplier,
      wonAmount,
    });

    setTimeout(() => {
      setResultModal(null);
      setWinningCardId(null);
      setBets({});
      setBetHistory([]);
      setTimeLeft(60);
      setIsLocked(false);
    }, 3000);
  };

  const hasActiveBets = Object.values(bets).some((val) => val > 0);
  const hasBetHistory = betHistory.length > 0;

  // Unauthenticated -> Show Login Screen
  if (!user) {
    return (
      <div className="app-container">
        <div className="ambient-glow ambient-glow-1"></div>
        <div className="ambient-glow ambient-glow-2"></div>
        <LoginPage onLoginSuccess={setUser} />
      </div>
    );
  }

  // Authenticated -> Show Game Dashboard
  return (
    <div className="app-container" style={{ minHeight: '100vh' }}>
      <div className="ambient-glow ambient-glow-1"></div>
      <div className="ambient-glow ambient-glow-2"></div>

      <BlankDashboard user={user} onLogout={() => setUser(null)}>
        <div className="game-layout">
          {/* Result Modal Popup */}
          <ResultModal resultData={resultModal} />

          {/* Top Header */}
          <Header balance={balance} wonPoints={wonPoints} />

          {/* Main Playing Arena */}
          <main className="main-arena">
            {/* Left Side Chips (10, 30, 40, 50) */}
            <ChipPanel
              side="left"
              chips={LEFT_CHIPS}
              activeChip={activeChip}
              onSelectChip={setActiveChip}
            />

            {/* Center 2x5 Grid of Animal Cards */}
            <div className="cards-grid">
              {ANIMALS.map((card) => (
                <AnimalCard
                  key={card.id}
                  card={card}
                  betAmount={bets[card.id] || 0}
                  isWinning={winningCardId === card.id}
                  onPlaceBet={handlePlaceBet}
                  isLocked={isLocked}
                />
              ))}
            </div>

            {/* Right Side Chips (100, 200, 500, 1000) */}
            <ChipPanel
              side="right"
              chips={RIGHT_CHIPS}
              activeChip={activeChip}
              onSelectChip={setActiveChip}
            />
          </main>

          {/* Bottom Control Bar */}
          <BottomControls
            timeLeft={timeLeft}
            onCancelAllBids={handleCancelAllBids}
            onRevertLastBet={handleRevertLastBet}
            onBetOddNumbers={handleBetOddNumbers}
            onBetEvenNumbers={handleBetEvenNumbers}
            hasActiveBets={hasActiveBets}
            hasBetHistory={hasBetHistory}
            isLocked={isLocked}
          />
        </div>
      </BlankDashboard>
    </div>
  );
}
