import React from 'react';
import PropTypes from 'prop-types';
import HistoryList from './HistoryList';
import TicTacToeState from '../core/TicTacToeState';
import Button from './Button';
import Subtitle from './Subtitle';

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
          <Button onClick={onResetClick} cssClass="u-sizeFill u-marginBottom">
            reset game
          </Button>
          <HistoryList {...props} />
        </div>
      );
    }
    return <p>No moves yet. Letʼs play!</p>;
  })();

  return (
    <div className="u-marginBottom">
      <Subtitle>Moves history</Subtitle>
      {body}
    </div>
  );
}

GameHistory.propTypes = propTypes;
