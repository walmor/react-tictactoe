import React from 'react';
import { shallow } from 'enzyme';
import Game from '../Game';
import Board from '../Board';
import GameState from '../GameState';
import GameHistory from '../GameHistory';
import ThemeSelector from '../ThemeSelector';
import TicTacToeGame from '../../core/TicTacToeGame';
import TicTacToeState from '../../core/TicTacToeState';
import ThemeManager from '../../core/ThemeManager';

function gameWrapper(overrides) {
  const container = {
    getGameManager(component) {
      return Object.assign(new TicTacToeGame(component), overrides);
    },
    getThemeManager() {
      return new ThemeManager();
    },
  };

  return shallow(<Game container={container} />);
}

describe('<Game/>', () => {
  it('should render without crashing', () => {
    gameWrapper();
  });

  it('should contain a board component', () => {
    const wrapper = gameWrapper();
    expect(wrapper.find(Board)).toHaveLength(1);
  });

  it('should contain a game state component', () => {
    const wrapper = gameWrapper();
    expect(wrapper.find(GameState)).toHaveLength(1);
  });

  it('should contain a game history component', () => {
    const wrapper = gameWrapper();
    expect(wrapper.find(GameHistory)).toHaveLength(1);
  });

  it('should contain a theme selector component', () => {
    const wrapper = gameWrapper();
    expect(wrapper.find(ThemeSelector)).toHaveLength(1);
  });

  it('should pass correct props to board component', () => {
    const state = new TicTacToeState();
    const move = jest.fn();
    const moveIndex = 1;

    const wrapper = gameWrapper({
      getCurrentGameState() {
        return state;
      },
      move,
    });

    const board = wrapper.find(Board);
    board.props().onClick(moveIndex);

    expect(board.props().gameState).toBe(state);
    expect(move).toBeCalledWith(moveIndex);
  });

  it('should pass correct props to game state component', () => {
    const state = new TicTacToeState();

    const wrapper = gameWrapper({
      getCurrentGameState() {
        return state;
      },
    });

    const gameStateComp = wrapper.find(GameState);
    expect(gameStateComp.props().gameState).toBe(state);
  });

  it('should pass correct props to game history component', () => {
    const history = [new TicTacToeState()];
    const reset = jest.fn();
    const selectGameState = jest.fn();
    const currentIndex = 1;
    const selectIndex = 0;

    const wrapper = gameWrapper({
      getGameHistory() {
        return history;
      },
      getCurrentGameIndex() {
        return currentIndex;
      },
      reset,
      selectGameState,
    });

    const gameHistory = wrapper.find(GameHistory);
    gameHistory.props().onResetClick();
    gameHistory.props().onSelectGameStateClick(selectIndex);

    expect(gameHistory.props().history).toBe(history);
    expect(gameHistory.props().selectedStateIndex).toBe(currentIndex);
    expect(selectGameState).toBeCalledWith(selectIndex);
    expect(reset).toBeCalled();
  });
});
