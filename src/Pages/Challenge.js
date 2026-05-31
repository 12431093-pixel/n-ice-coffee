import React, { useState, useEffect } from 'react';

const Challenge = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    let countdownEngine = null;
    if (isActive && timeLeft > 0) {
      countdownEngine = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setGameWon(true);
    }
    return () => clearInterval(countdownEngine);
  }, [isActive, timeLeft]);

  const handleStartGame = () => {
    setTimeLeft(30);
    setGameWon(false);
    setHasFailed(false);
    setIsActive(true);
  };

  const handleGiveUp = () => {
    setIsActive(false);
    setHasFailed(true);
  };

  return (
    <div className="container my-5 py-4">
      <div className="card p-5 border-0 shadow mx-auto text-center bg-white" style={{ maxWidth: '650px' }}>
        <h2 className="fw-bold text-danger mb-3">🔥 The N-Ice 30-Second Challenge Arena 🔥</h2>
        <p className="text-muted px-3">
          Rules are absolute: Click start, secure your hot espresso brew, and finish it before the timer runs dry! Successful speed runs unlock premium discounts.
        </p>

        <div className={`display-1 fw-bold my-4 p-3 rounded bg-light border ${isActive ? 'text-danger border-danger' : 'text-dark'}`}>
          {timeLeft}s
        </div>

        <div className="d-grid gap-3">
          {!isActive && !gameWon && (
            <button className="btn btn-danger btn-lg fw-bold py-3 shadow-sm" onClick={handleStartGame}>
              {hasFailed ? 'Try Again' : 'Initiate Countdown'}
            </button>
          )}

          {isActive && (
            <button className="btn btn-outline-secondary btn-lg" onClick={handleGiveUp}>
              Surrender / Stop Timer
            </button>
          )}
        </div>

        {isActive && (
          <div className="alert alert-warning mt-4 fw-bold p-3">
            ☕ Clock ticking down! Finish the hot coffee safely now!
          </div>
        )}

        {hasFailed && (
          <div className="alert alert-secondary mt-4 p-3 border-2">
            😢 Too hot to handle? Rest up, cool your palate, and try again when you are ready.
          </div>
        )}

        {gameWon && (
          <div className="alert alert-success mt-4 p-4 border-2 shadow-sm text-start">
            <h4 className="fw-bold text-success text-center mb-2">🎉 Victory Confirmed! 🎉</h4>
            <p className="text-muted text-center small mb-3">Show this generated authentication voucher to your server bar barista:</p>
            <div className="bg-dark text-white font-monospace text-center py-2 px-3 rounded fs-4 fw-bold">
              N-ICE-CHAMP-15
            </div>
            <p className="text-center text-muted small mt-2 mb-0">Unlocks a 15% flat markdown rate on orders across the next 3 months.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenge;
