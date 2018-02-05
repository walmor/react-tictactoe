import React from 'react';
import { shallow } from 'enzyme';
import Square from '../Square';
import { PLAYER } from '../../core/TicTacToeState';

function getMockProps(overrides) {
  const props = { value: PLAYER.PlayerOne, isWinnerSquare: false, onClick: jest.fn() };

  return Object.assign(props, overrides);
}

describe('<Square/>', () => {
  describe('when is a winner square', () => {
    const props = getMockProps({ isWinnerSquare: true });

    const wrapper = shallow(<Square {...props} />);

    it('should have the correct class', () => {
      expect(wrapper.hasClass('is-winner')).toBe(true);
    });
  });

  describe('when its a player one square', () => {
    const props = getMockProps({ value: PLAYER.PlayerOne });

    const wrapper = shallow(<Square {...props} />);

    it('should have the correct class', () => {
      expect(wrapper.hasClass('is-playerOne')).toBe(true);
    });
  });

  describe('when its a player two square', () => {
    const props = getMockProps({ value: PLAYER.PlayerTwo });

    const wrapper = shallow(<Square {...props} />);

    it('should have the correct class', () => {
      expect(wrapper.hasClass('is-playerTwo')).toBe(true);
    });
  });

  describe('when clicked', () => {
    const onClick = jest.fn();
    const props = getMockProps({ onClick });

    const wrapper = shallow(<Square {...props} />);
    wrapper.simulate('click');

    it('should call the onClick prop', () => {
      expect(onClick).toBeCalled();
    });
  });
});
