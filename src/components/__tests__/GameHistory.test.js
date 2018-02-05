import React from 'react';
import { shallow } from 'enzyme';
import GameHistory from '../GameHistory';
import Button from '../Button';
import HistoryList from '../HistoryList';
import TicTacToeState from '../../core/TicTacToeState';

function getMockProps(overrides) {
  const props = {
    history: [],
    onResetClick: jest.fn(),
    selectedStateIndex: 0,
    onSelectGameStateClick: jest.fn(),
  };

  return Object.assign(props, overrides);
}

describe('<GameHistory/>', () => {
  describe('when there is no history entries', () => {
    const props = getMockProps();
    const wrapper = shallow(<GameHistory {...props} />);

    it('should not render the reset button', () => {
      expect(wrapper.find(Button).exists()).toBe(false);
    });

    it('should not render the history list', () => {
      expect(wrapper.find(HistoryList).exists()).toBe(false);
    });

    it('should render a text saying the history is empty', () => {
      expect(wrapper.find('p').text()).toContain('No moves');
    });
  });

  describe('when there is history entries', () => {
    const props = getMockProps({ history: [new TicTacToeState()] });
    const wrapper = shallow(<GameHistory {...props} />);

    it('should render the reset button', () => {
      expect(wrapper.find(Button).exists()).toBe(true);
    });

    it('should render the history list', () => {
      expect(wrapper.find(HistoryList).exists()).toBe(true);
    });
  });
});
