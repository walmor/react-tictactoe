import React from 'react';
import PropTypes from 'prop-types';
import TicTacToeState from '../core/TicTacToeState';

const propTypes = {
  gameState: PropTypes.instanceOf(TicTacToeState).isRequired,
  onResetClick: PropTypes.func.isRequired,
};

export default function GameState({ gameState, onResetClick }) {
  let message;

  if (gameState.hasWinner()) {
    message = `Player ${gameState.getWinner()} won.`;
  } else if (gameState.endedInADraw()) {
    message = 'The game ended in a draw.';
  } else {
    message = `Next player: ${gameState.getNextPlayer()}`;
  }

  return (
    <div className="message">
      <span>{message}</span>
      <button onClick={onResetClick}>Reset</button>
    </div>
  );
}

GameState.propTypes = propTypes;
