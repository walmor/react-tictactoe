import React from 'react';
import PropTypes from 'prop-types';
import { PLAYER } from '../core/TicTacToeState';

const propTypes = {
  value: PropTypes.string,
  isWinnerSquare: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
  value: '',
};

export default function Square({ value, isWinnerSquare, onClick }) {
  const classPrefix = 'Square';
  let className = classPrefix;

  if (value === PLAYER.PlayerOne) {
    className += ' is-playerOne';
  } else if (value === PLAYER.PlayerTwo) {
    className += ' is-playerTwo';
  }

  if (isWinnerSquare) {
    className += ' is-winner';
  }

  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
}

Square.propTypes = propTypes;
Square.defaultProps = defaultProps;
