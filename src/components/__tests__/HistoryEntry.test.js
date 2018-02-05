import React from 'react';
import { shallow } from 'enzyme';
import HistoryEntry from '../HistoryEntry';
import TicTacToeState from '../../core/TicTacToeState';

function getMockProps(overrides) {
  const props = {
    state: new TicTacToeState(),
    index: 0,
    isSelected: false,
    onSelectGameStateClick: jest.fn(),
  };

  return Object.assign(props, overrides);
}

describe('<HistoryEntry/>', () => {
  describe('message', () => {
    const location = 0;
    const moveNumber = 1;
    const state = new TicTacToeState(location, new TicTacToeState());
    const player = state.getPlayer();

    const props = getMockProps({ state });

    const wrapper = shallow(<HistoryEntry {...props} />);

    const message = wrapper.find('button').text();

    it('should contain the move number', () => {
      expect(message).toContain(`#${moveNumber}`);
    });

    it('should contain the player', () => {
      expect(message).toContain(player);
    });

    it('should contain the move location', () => {
      expect(message).toContain(location);
    });
  });

  describe('when the entry is selected', () => {
    const props = getMockProps({ isSelected: true });

    const wrapper = shallow(<HistoryEntry {...props} />);

    it('should have the correct class', () => {
      expect(wrapper.hasClass('is-selected')).toBe(true);
    });
  });

  describe('when clicked', () => {
    const onSelectGameStateClick = jest.fn();
    const props = getMockProps({ onSelectGameStateClick });

    const wrapper = shallow(<HistoryEntry {...props} />);
    wrapper.find('button').simulate('click');

    it('should call the onSelectGameStateClick prop', () => {
      expect(onSelectGameStateClick).toBeCalled();
    });
  });
});
