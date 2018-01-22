const PLAYER = { None: '', PlayerOne: 'X', PlayerTwo: 'O' };

/**
 * Represents the game state at a given moment
 */
class TicTacToeState {
  constructor(index, previousState) {
    let board;
    let player;
    let location;
    let win;

    this.getBoard = () => board;
    this.getPlayer = () => player;
    this.getLocation = () => location;
    this.getWin = () => win;

    if (arguments.length === 0) {
      board = TicTacToeState.createInitialBoardState();
    } else {
      location = index;
      player = previousState.getNextPlayer();
      board = this.createNewBoardState(previousState);
      win = this.checkWinner();
    }
  }

  /**
   * Gets the value present on the square with the specified index.
   * @param {number} index
   */
  getValue(index) {
    return this.getBoard()[index];
  }

  /**
   * Gets the next player.
   */
  getNextPlayer() {
    const player = this.getPlayer();

    if (!player) return PLAYER.PlayerOne;

    return player === PLAYER.PlayerOne ? PLAYER.PlayerTwo : PLAYER.PlayerOne;
  }

  /**
   * Determines whether the game has a winner or not.
   */
  hasWinner() {
    return typeof this.getWin() !== 'undefined';
  }

  /**
   * Returns the winner if there is one, otherwise, returns false.
   */
  getWinner() {
    if (this.hasWinner()) {
      return this.getWin().winner;
    }

    return false;
  }

  /**
   * Determines whether the game ended in a draw.
   */
  endedInADraw() {
    if (this.getWin()) return false;
    return this.isBoardCompleted();
  }

  /**
   * Determines whether the game is over.
   */
  isGameOver() {
    return this.hasWinner() || this.endedInADraw();
  }

  /**
   * Determines whether a square is part of a winner line.
   * @param {number} index The square index to be checked.
   */
  isWinnerSquare(index) {
    const win = this.getWin();

    if (!this.hasWinner() || !win.squares) {
      return false;
    }

    const { squares } = win;

    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === index) {
        return true;
      }
    }

    return false;
  }

  /**
   * Determines whether a move is valid.
   * @param {number} index The square index to verify the move.
   */
  isMoveValid(index) {
    if (this.hasWinner() || this.getValue(index)) {
      return false;
    }

    return true;
  }

  /**
   * Returns a string with a graphical representation of the board.
   * Only used for debug purpose.
   * */
  printBoard() {
    let print = '';

    for (let i = 0; i < 9; i++) {
      print += this.getValue(i) || '_';
      print += i % 3 < 2 ? ' | ' : '\n';
    }

    return print;
  }

  /** Determines whether all the squares are filled. */
  isBoardCompleted() {
    const board = this.getBoard();

    if (!board) {
      return false;
    }

    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        return false;
      }
    }

    return true;
  }

  /**
   * Create a new board state based on the previous state.
   * @param previousState
   * @private
   */
  createNewBoardState(previousState) {
    const index = this.getLocation();
    const newBoard = previousState.getBoard().slice(0);
    newBoard[index] = this.getPlayer();

    return newBoard;
  }

  /**
   * Verify the board to see if there is a winner.
   * @private
   */
  checkWinner() {
    const board = this.getBoard();

    const lines = [
      // rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const player = board[lines[i][0]];

      if (player && player === board[lines[i][1]] && player === board[lines[i][2]]) {
        return {
          winner: player,
          squares: lines[i],
        };
      }
    }

    return undefined;
  }

  /**
   * Create the initial board state
   * @private
   */
  static createInitialBoardState() {
    return new Array(9);
  }
}

export { TicTacToeState as default, PLAYER };
