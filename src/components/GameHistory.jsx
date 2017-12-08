import React from 'react';
import PropTypes from 'prop-types';
import HistoryList from './HistoryList';
import TicTacToeState from '../core/TicTacToeState';

const propTypes = {
  history: PropTypes.arrayOf(PropTypes.instanceOf(TicTacToeState)).isRequired,
  onResetClick: PropTypes.func.isRequired,
};

export default function GameHistory(props) {
  const { history, onResetClick } = props;

  const body = (() => {
    if (history && history.length > 0) {
      return (
        <div>
          <button className="btn-reset" onClick={onResetClick}>
            reset game
          </button>
          <HistoryList {...props} />
        </div>
      );
    }
    return <p>No moves yet. Letʼs play!</p>;
  })();

  return (
    <div className="history">
      <h2 className="subtitle">Moves history</h2>
      {body}
    </div>
  );
}

GameHistory.propTypes = propTypes;
