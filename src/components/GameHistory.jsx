import React from 'react';
import PropTypes from 'prop-types';
import TicTacToeState from '../core/TicTacToeState';

const propTypes = {
  history: PropTypes.arrayOf(PropTypes.instanceOf(TicTacToeState)).isRequired,
  selectedStateIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default function GameHistory({ history, selectedStateIndex, onClick }) {
  const entries = history.map((entry, index) => {
    const className = selectedStateIndex === index ? 'selected' : '';
    const loc = entry.getLocation();
    const key = `move-#${index + 1}`;
    const message = `Move #${index + 1}: Player ${entry.getPlayer()} on [${loc}]`;

    return (
      <li key={key} className={className}>
        <button onClick={() => onClick(index)}>{message}</button>
      </li>
    );
  });

  return <ul className="history">{entries}</ul>;
}

GameHistory.propTypes = propTypes;
