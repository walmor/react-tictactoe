import React from 'react';
import { shallow } from 'enzyme';
import GameState from '../GameState';
import TicTacToeState, { PLAYER } from '../../core/TicTacToeState';

function getMockProps(overrides) {
  const props = {
    gameState: new TicTacToeState(),
  };

  return Object.assign(props, overrides);
}

describe('<GameState/>', () => {
  describe('when the game has a winner', () => {
    const winner = PLAYER.PlayerOne;
    const gameState = new TicTacToeState();
    gameState.hasWinner = () => true;
    gameState.getWinner = () => winner;
    const props = getMockProps({ gameState });

    const wrapper = shallow(<GameState {...props} />);

    it('should have the correct class', () => {
      expect(wrapper.hasClass('is-winner')).toBe(true);
    });

    it('should indicate the winner', () => {
      expect(wrapper.find('span').text()).toBe(`Player ${winner} won.`);
    });
  });

  describe('when the game ended in a draw', () => {
    const gameState = new TicTacToeState();
    gameState.endedInADraw = () => true;
    const props = getMockProps({ gameState });

    const wrapper = shallow(<GameState {...props} />);

    it('should have the correct class', () => {
      expect(wrapper.hasClass('is-draw')).toBe(true);
    });

    it('should have a proper message', () => {
      expect(wrapper.find('span').text()).toContain('draw');
    });
  });

  describe('when player one is next', () => {
    const gameState = new TicTacToeState();
    gameState.getNextPlayer = () => PLAYER.PlayerOne;
    const props = getMockProps({ gameState });

    const wrapper = shallow(<GameState {...props} />);

    it('should have the correct class', () => {
      expect(wrapper.hasClass('is-playerOne')).toBe(true);
    });

    it('should indicate the next player', () => {
      expect(wrapper.find('span').text()).toBe(`Next player: ${PLAYER.PlayerOne}`);
    });
  });

  describe('when player two is next', () => {
    const gameState = new TicTacToeState();
    gameState.getNextPlayer = () => PLAYER.PlayerTwo;
    const props = getMockProps({ gameState });

    const wrapper = shallow(<GameState {...props} />);

    it('should have the correct class', () => {
      expect(wrapper.hasClass('is-playerTwo')).toBe(true);
    });

    it('should indicate the next player', () => {
      expect(wrapper.find('span').text()).toBe(`Next player: ${PLAYER.PlayerTwo}`);
    });
  });
});
