import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';
import Game from './components/Game';
import TicTacToeGame from './core/TicTacToeGame';
import ThemeManager from './core/ThemeManager';

const container = (function createContainer() {
  let gameManager;
  let themeManager;

  return {
    getGameManager(component) {
      if (!gameManager) gameManager = new TicTacToeGame(component);
      return gameManager;
    },
    getThemeManager() {
      if (!themeManager) themeManager = new ThemeManager();
      return themeManager;
    },
  };
}());

ReactDOM.render(<Game container={container} />, document.getElementById('root'));
registerServiceWorker();
