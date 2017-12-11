import React from 'react';
import PropTypes from 'prop-types';
import TicTacToeState from '../core/TicTacToeState';
import HistoryEntry from './HistoryEntry';

const propTypes = {
  history: PropTypes.arrayOf(PropTypes.instanceOf(TicTacToeState)).isRequired,
  selectedStateIndex: PropTypes.number.isRequired,
  onSelectGameStateClick: PropTypes.func.isRequired,
};

export default function HistoryList({ history, selectedStateIndex, onSelectGameStateClick }) {
  const entries = history.map((state, index) => {
    const isSelected = selectedStateIndex === index;
    const key = `move-#${index + 1}`;

    return (
      <HistoryEntry
        key={key}
        state={state}
        index={index}
        isSelected={isSelected}
        onSelectGameStateClick={onSelectGameStateClick}
      />
    );
  });

  return <ul className="history__list">{entries}</ul>;
}

HistoryList.propTypes = propTypes;
