import React from 'react';
import PropTypes from 'prop-types';
import TicTacToeState from '../core/TicTacToeState';

const propTypes = {
  state: PropTypes.instanceOf(TicTacToeState).isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelectGameStateClick: PropTypes.func.isRequired,
};

export default function HistoryEntry({
  state, index, isSelected, onSelectGameStateClick,
}) {
  const className = `history__entry${isSelected ? '--selected' : ''}`;
  const loc = state.getLocation();
  const message = `Move #${index + 1}: Player ${state.getPlayer()} on square [${loc}]`;

  return (
    <li className={className}>
      <button onClick={() => onSelectGameStateClick(index)}>{message}</button>
    </li>
  );
}

HistoryEntry.propTypes = propTypes;
