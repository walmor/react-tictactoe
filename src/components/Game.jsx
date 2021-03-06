import React from 'react';
import PropTypes from 'prop-types';
import About from './About';
import Board from './Board';
import GameHistory from './GameHistory';
import ThemeSelector from './ThemeSelector';
import GameState from './GameState';
import Title from './Title';

const propTypes = {
  container: PropTypes.shape({
    getGameManager() {},
    getThemeManager() {},
  }).isRequired,
};

export default class Game extends React.Component {
  constructor({ container }) {
    super();
    this.game = container.getGameManager(this);
    this.themeManager = container.getThemeManager();
  }

  handleSquareClick = (index) => {
    this.game.move(index);
  };

  handleReset = () => {
    this.game.reset();
  };

  handleSelectGameState = (index) => {
    this.game.selectGameState(index);
  };

  render() {
    const gameState = this.game.getCurrentGameState();
    const history = this.game.getGameHistory();
    const selectedStateIndex = this.game.getCurrentGameIndex();

    return (
      <div className="Game">
        <Title>Tic Tac Toe</Title>
        <Board gameState={gameState} onClick={this.handleSquareClick} />
        <GameState gameState={gameState} />
        <GameHistory
          history={history}
          selectedStateIndex={selectedStateIndex}
          onSelectGameStateClick={this.handleSelectGameState}
          onResetClick={this.handleReset}
        />
        <ThemeSelector themeManager={this.themeManager} />
        <About />
      </div>
    );
  }
}

Game.propTypes = propTypes;
