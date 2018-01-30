import TicTacToeState from './TicTacToeState';

const INITIAL_STATE = {
  currentIndex: -1,
  gameHistory: [],
};

function cloneState(state) {
  const clonedState = { ...state };
  clonedState.gameHistory = state.gameHistory.slice(0);
  return clonedState;
}

function isValidState(state) {
  if (!state) return false;

  if (typeof state.currentIndex === 'undefined') return false;
  if (typeof state.gameHistory === 'undefined') return false;

  if (!Number.isInteger(state.currentIndex)) return false;
  if (!(state.gameHistory instanceof Array)) return false;

  if (state.currentIndex >= state.gameHistory.length) return false;

  return true;
}

export default class TicTacToeGame {
  constructor(component) {
    this.getAppState = () => (isValidState(component.state) ? component.state : INITIAL_STATE);

    this.setAppState = (changedState) => {
      component.setState(changedState);
    };

    component.state = INITIAL_STATE;
  }

  /**
   * Gets the whole game history with all moves.
   */
  getGameHistory() {
    return this.getAppState().gameHistory;
  }

  /**
   * Gets the index of the current game state.
   */
  getCurrentGameIndex() {
    return this.getAppState().currentIndex;
  }

  /**
   * Gets the current game state.
   */
  getCurrentGameState() {
    const appState = this.getAppState();

    if (appState.currentIndex < 0) {
      return new TicTacToeState();
    }

    return appState.gameHistory[appState.currentIndex];
  }

  /**
   * Computes a player move
   * @param {number} index The square index where the move should be computed.
   */
  move(index) {
    const currentGameState = this.getCurrentGameState();

    if (!currentGameState.isMoveValid(index)) {
      return;
    }

    const appState = cloneState(this.getAppState());

    if (appState.currentIndex < appState.gameHistory.length - 1) {
      appState.gameHistory = appState.gameHistory.slice(0, appState.currentIndex + 1);
    }

    const newGameState = new TicTacToeState(index, currentGameState);

    appState.gameHistory.push(newGameState);
    appState.currentIndex = appState.gameHistory.length - 1;

    this.setAppState(appState);
  }

  /**
   * Select the current game state.
   * @param {number} index - The index of the game state to move to.
   */
  selectGameState(index) {
    const appState = this.getAppState();
    appState.currentIndex = index;
    this.setAppState(appState);
  }

  /**
   * Reset the game to its initial state.
   */
  reset() {
    this.setAppState(INITIAL_STATE);
  }

  static getInitialState() {
    return INITIAL_STATE;
  }
}
