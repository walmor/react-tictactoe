import React from 'react';
import { shallow } from 'enzyme';
import HistoryList from '../HistoryList';
import TicTacToeState from '../../core/TicTacToeState';
import HistoryEntry from '../HistoryEntry';

function getMockProps(overrides) {
  const firstState = new TicTacToeState();
  const secondState = new TicTacToeState(0, firstState);
  const thirdState = new TicTacToeState(1, secondState);

  const props = {
    history: [firstState, secondState, thirdState],
    selectedStateIndex: 0,
    onSelectGameStateClick: jest.fn(),
  };

  return Object.assign(props, overrides);
}

describe('<HistoryList/>', () => {
  it('should render all history entries', () => {
    const props = getMockProps();

    const wrapper = shallow(<HistoryList {...props} />);

    expect(wrapper.find(HistoryEntry)).toHaveLength(props.history.length);
  });

  it('should identify a selected entry', () => {
    const selectedStateIndex = 1;
    const props = getMockProps({ selectedStateIndex });

    const wrapper = shallow(<HistoryList {...props} />);

    expect(wrapper
      .find(HistoryEntry)
      .at(selectedStateIndex)
      .props().isSelected).toBe(true);
  });

  it('should pass the correct props to HistoryEntry', () => {
    const props = getMockProps();
    const { history } = props;

    const wrapper = shallow(<HistoryList {...props} />);

    wrapper.find(HistoryEntry).forEach((entry, i) => {
      expect(entry.props().state).toBe(history[i]);
      expect(entry.props().index).toBe(i);
      expect(entry.props().onSelectGameStateClick).toBe(props.onSelectGameStateClick);
    });
  });
});
