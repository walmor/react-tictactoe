import React from 'react';
import { shallow } from 'enzyme';
import Board from '../Board';
import TicTacToeState from '../../core/TicTacToeState';
import Square from '../../components/Square';

function getMockProps(overrides) {
  const gameState = new TicTacToeState();
  const props = {
    gameState,
    onClick: jest.fn(),
  };

  return Object.assign(props, overrides);
}

describe('<Board/>', () => {
  it('should render nine squares', () => {
    const props = getMockProps();

    const wrapper = shallow(<Board {...props} />);

    expect(wrapper.find(Square)).toHaveLength(9);
  });

  it('should pass correct props to squares', () => {
    const state = new TicTacToeState();
    state.getValue = i => (i % 2 === 0 ? 'X' : 'O');

    const props = getMockProps({
      gameState: state,
    });

    const wrapper = shallow(<Board {...props} />);

    wrapper.find(Square).forEach((square, i) => {
      expect(square.props().value).toEqual(props.gameState.getValue(i));
      expect(square.props().isWinnerSquare).toEqual(props.gameState.isWinnerSquare(i));
    });
  });

  it('should set the game over class', () => {
    const state = new TicTacToeState();
    state.isGameOver = () => true;

    const props = getMockProps({
      gameState: state,
    });

    const wrapper = shallow(<Board {...props} />);
    expect(wrapper.hasClass('is-gameover')).toBe(true);
  });
});
