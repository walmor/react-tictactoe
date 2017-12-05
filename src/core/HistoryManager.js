import TicTacToeState from './TicTacToeState';

export default class HistoryManager {
  constructor(component) {
    this.initialGameState = new TicTacToeState();

    this.getComponentState = () => component.state;

    this.setComponentState = (newState) => {
      component.setState(newState);
    };

    component.state = HistoryManager.getInitialAppState();
  }

  getGameHistory() {
    return this.getAppState().gameHistory;
  }

  getCurrentGameIndex() {
    return this.getAppState().currentIndex;
  }

  getCurrentGameState() {
    const appState = this.getAppState();

    if (appState.currentIndex < 0) {
      return this.initialGameState;
    }

    return appState.gameHistory[appState.currentIndex];
  }

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

  selectGameState(index) {
    const appState = this.getAppState();
    appState.currentIndex = index;
    this.setAppState(appState);
  }

  reset() {
    this.setInitialAppState();
  }

  getAppState() {
    let appState = this.getComponentState();

    if (!appState) {
      appState = this.setInitialAppState();
    }

    return appState;
  }

  setAppState(changedAppState) {
    const newAppState = { ...changedAppState };
    this.setComponentState(newAppState);
  }

  setInitialAppState() {
    const appState = HistoryManager.getInitialAppState();
    this.setComponentState(appState);
    return appState;
  }

  static getInitialAppState() {
    return {
      currentIndex: -1,
      gameHistory: [],
    };
  }
}
