import React, { useState, useCallback } from 'react';
import Board from './Board';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isAIMode, setIsAIMode] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const getAIMove = (squares) => {
    // Simple AI: Look for first empty square
    const emptySquares = squares
      .map((square, index) => (square === null ? index : null))
      .filter(val => val !== null);
    
    if (emptySquares.length === 0) return null;
    
    // Pick random empty square for simple AI
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  };

  const handleClick = useCallback((i) => {
    if (board[i] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // AI's turn
    if (isAIMode && !isXNext) {
      setTimeout(() => {
        const aiMove = getAIMove(newBoard);
        if (aiMove !== null) {
          const aiBoard = newBoard.slice();
          aiBoard[aiMove] = 'O';
          setBoard(aiBoard);
          setIsXNext(true);
        }
      }, 500);
    }
  }, [board, isXNext, isAIMode]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const toggleMode = () => {
    setIsAIMode(!isAIMode);
    resetGame();
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);
  
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <Board squares={board} onClick={handleClick} />
      <div className="controls">
        <button className="btn" onClick={resetGame}>
          Reset Game
        </button>
        <button className="btn secondary" onClick={toggleMode}>
          {isAIMode ? 'Two Player Mode' : 'Play vs AI'}
        </button>
      </div>
      <div className="mode-indicator">
        Current Mode: {isAIMode ? 'vs AI' : 'Two Player'}
      </div>
    </div>
  );
};

export default Game;
