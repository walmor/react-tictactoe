import React from 'react';
import ReactDOM from 'react-dom';
import Game from '../components/Game';

it('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Game />, div);
});
