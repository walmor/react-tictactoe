const PLAYER = { X: 'X', O: 'O' };

export default class TicTacToeState {
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

  getValue(index) {
    return this.getBoard()[index];
  }

  getNextPlayer() {
    const player = this.getPlayer();

    if (!player) return PLAYER.X;

    return player === PLAYER.X ? PLAYER.O : PLAYER.X;
  }

  hasWinner() {
    return typeof this.getWin() !== 'undefined';
  }

  getWinner() {
    if (this.hasWinner()) {
      return this.getWin().winner;
    }

    return false;
  }

  endedInADraw() {
    if (this.getWin()) return false;
    return this.isBoardCompleted();
  }

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

  isMoveValid(index) {
    if (this.hasWinner() || this.getValue(index)) {
      return false;
    }

    return true;
  }

  printBoard() {
    let print = '';

    for (let i = 0; i < 9; i++) {
      print += this.getValue(i) || '_';
      print += i % 3 < 2 ? ' | ' : '\n';
    }

    return print;
  }

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

  createNewBoardState(previousState) {
    const index = this.getLocation();
    const newBoard = previousState.getBoard().slice(0);
    newBoard[index] = this.getPlayer();

    return newBoard;
  }

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

  static createInitialBoardState() {
    return new Array(9);
  }
}
