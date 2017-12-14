import React from 'react';
import TicTacToeGame from '../core/TicTacToeGame';
import Board from './Board';
import GameHistory from './GameHistory';
import GameState from './GameState';
import Title from './Title';

export default class Game extends React.Component {
  constructor() {
    super();
    this.game = new TicTacToeGame(this);
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
      </div>
    );
  }
}
