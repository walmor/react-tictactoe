import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';
import Game from './components/Game';
import TicTacToeGame from './core/TicTacToeGame';

function createGame(component) {
  return new TicTacToeGame(component);
}

ReactDOM.render(<Game createGame={createGame} />, document.getElementById('root'));
registerServiceWorker();
