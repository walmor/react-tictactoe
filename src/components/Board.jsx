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
  let count = 0;
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      const key = `${x},${y}`;
      const c = count;

      const props = {
        value: gameState.getValue(c),
        isWinnerSquare: gameState.isWinnerSquare(c),
      };

      squares.push(<Square key={key} onClick={() => onClick(c)} {...props} />);

      count++;
    }
  }

  return (
    <div className="board-wrap">
      <div className="board">{squares}</div>
    </div>
  );
}

Board.propTypes = propTypes;
