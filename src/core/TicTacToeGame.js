import TicTacToeState from './TicTacToeState';
import HistoryManager from './HistoryManager';

export default class TicTaeToeGame {
  constructor(component) {
    this.historyManager = new HistoryManager(component);
  }

  /**
   * Computes a player move
   * @param {number} index The square index where the move should be computed.
   */
  move(index) {
    const currentGameState = this.historyManager.getCurrentGameState();

    if (!currentGameState.isMoveValid(index)) {
      return;
    }

    const newGameState = new TicTacToeState(index, currentGameState);

    this.historyManager.pushNewGameState(newGameState);
  }

  /**
   * Returns the current game state.
   */
  getCurrentGameState() {
    return this.historyManager.getCurrentGameState();
  }

  /**
   * Returns the current game state index.
   */
  getCurrentGameIndex() {
    return this.historyManager.getCurrentGameIndex();
  }

  /**
   * Returns the whole game history.
   */
  getGameHistory() {
    return this.historyManager.getGameHistory();
  }

  /**
   * Select the current game state.
   * @param {number} index - The index of the game state to move to.
   */
  selectGameState(index) {
    this.historyManager.selectGameState(index);
  }

  /**
   * Reset the game to its initial state.
   */
  reset() {
    this.historyManager.reset();
  }
}
