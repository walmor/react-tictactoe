import React from 'react';
import PropTypes from 'prop-types';
import TicTacToeState, { PLAYER } from '../core/TicTacToeState';

const propTypes = {
  gameState: PropTypes.instanceOf(TicTacToeState).isRequired,
};

export default function GameState({ gameState }) {
  let message;
  let className = 'GameState is-';

  if (gameState.hasWinner()) {
    message = `Player ${gameState.getWinner()} won.`;
    className += 'winner';
  } else if (gameState.endedInADraw()) {
    message = 'The game ended in a draw.';
    className += 'draw';
  } else {
    const nextPlayer = gameState.getNextPlayer();
    message = `Next player: ${nextPlayer}`;
    className += nextPlayer === PLAYER.PlayerOne ? 'playerOne' : 'playerTwo';
  }

  return (
    <div className={className}>
      <span>{message}</span>
    </div>
  );
}

GameState.propTypes = propTypes;
