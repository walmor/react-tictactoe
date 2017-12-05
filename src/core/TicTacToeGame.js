import TicTacToeState from './TicTacToeState';
import HistoryManager from './HistoryManager';

export default class TicTaeToeGame {
  constructor(component) {
    this.historyManager = new HistoryManager(component);
  }

  move(index) {
    const currentGameState = this.historyManager.getCurrentGameState();

    if (!currentGameState.isMoveValid(index)) {
      return;
    }

    const newGameState = new TicTacToeState(index, currentGameState);

    this.historyManager.pushNewGameState(newGameState);
  }

  getCurrentGameState() {
    return this.historyManager.getCurrentGameState();
  }

  getCurrentGameIndex() {
    return this.historyManager.getCurrentGameIndex();
  }

  getGameHistory() {
    return this.historyManager.getGameHistory();
  }

  selectGameState(index) {
    this.historyManager.selectGameState(index);
  }

  reset() {
    this.historyManager.reset();
  }
}
