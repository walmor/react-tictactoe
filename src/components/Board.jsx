import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import TicTacToeState from '../core/TicTacToeState';

const propTypes = {
  gameState: PropTypes.instanceOf(TicTacToeState).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default function Board({ gameState, onClick }) {
  const squares = [];
  for (let x = 0; x < 9; x++) {
    const key = x.toString();

    const props = {
      value: gameState.getValue(x),
      isWinnerSquare: gameState.isWinnerSquare(x),
    };

    squares.push(<Square key={key} onClick={() => onClick(x)} {...props} />);
  }

  let boardClass = 'Board';
  if (gameState.isGameOver()) {
    boardClass += ' is-gameover';
  }

  return (
    <div className={boardClass}>
      <div className="Board-grid">{squares}</div>
    </div>
  );
}

Board.propTypes = propTypes;
