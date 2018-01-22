import TicTacToeState from './TicTacToeState';

export default class HistoryManager {
  constructor(component) {
    this.initialGameState = new TicTacToeState();

    /**
     * Gets the history component current state.
     */
    this.getComponentState = () => component.state;

    /**
     * Sets the history components current state.
     * @param newState The new state to be set.
     */
    this.setComponentState = (newState) => {
      component.setState(newState);
    };

    component.state = HistoryManager.getInitialAppState();
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
      return this.initialGameState;
    }

    return appState.gameHistory[appState.currentIndex];
  }

  /**
   * Pushes a new state into the end of the history collection. If the current index is
   * in the middle of the history collection, the subsequent entries will be removed before
   * the new state be pushed.
   * @param newGameState The new state to be pushed into the history.
   */
  pushNewGameState(newGameState) {
    const appState = this.getAppState();

    appState.gameHistory = appState.gameHistory || [];

    if (appState.currentIndex < appState.gameHistory.length - 1) {
      appState.gameHistory = appState.gameHistory.slice(0, appState.currentIndex + 1);
    }

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
    this.setInitialAppState();
  }

  /**
   * Gets the app state or initialize it if it isn't yet defined.
   */
  getAppState() {
    let appState = this.getComponentState();

    if (!appState) {
      appState = this.setInitialAppState();
    }

    return appState;
  }

  /**
   * Sets the app state.
   * @param changedAppState The changed state to be set.
   */
  setAppState(changedAppState) {
    const newAppState = { ...changedAppState };
    this.setComponentState(newAppState);
  }

  /**
   * Sets and returns the initial app state.
   */
  setInitialAppState() {
    const appState = HistoryManager.getInitialAppState();
    this.setComponentState(appState);
    return appState;
  }

  /** Creates the initial app state */
  static getInitialAppState() {
    return {
      currentIndex: -1,
      gameHistory: [],
    };
  }
}
