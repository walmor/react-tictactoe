import TicTacToeState, { PLAYER } from '../TicTacToeState';

describe('The TicTacToeState instance', () => {
  describe('when representing the initial state', () => {
    const state = new TicTacToeState();

    it('should have a board with 9 positions', () => {
      expect(state.getBoard()).toHaveLength(9);
    });

    it('should have an empty board', () => {
      const board = state.getBoard();
      let allUndefined = true;

      for (let i = 0; i < board.length; i++) {
        if (board[i]) {
          allUndefined = false;
          break;
        }
      }

      expect(allUndefined).toBe(true);
    });

    it('should not state that board is completed', () => {
      expect(state.isBoardCompleted()).toBe(false);
    });

    it('should not set a player', () => {
      expect(state.getPlayer()).toBeNull();
    });

    it('should have the next player set as player one', () => {
      expect(state.getNextPlayer()).toBe(PLAYER.PlayerOne);
    });

    it('should not have location', () => {
      expect(state.getLocation()).toBeNull();
    });

    it('should not have winner', () => {
      expect(state.hasWinner()).toBe(false);
      expect(state.getWinner()).toBeNull();
    });

    it('should not state game over', () => {
      expect(state.isGameOver()).toBe(false);
    });

    it('should not state game ending in a draw', () => {
      expect(state.endedInADraw()).toBe(false);
    });

    it('should accept any valid move', () => {
      for (let i = 0; i < 9; i++) {
        expect(state.isMoveValid(i)).toBe(true);
      }
    });

    it('should not accept any out of range move', () => {
      expect(state.isMoveValid(-1)).toBe(false);
      expect(state.isMoveValid(9)).toBe(false);
    });
  });

  describe('when representing a first move', () => {
    const moveIndex = 0;
    const state = new TicTacToeState(moveIndex, new TicTacToeState());

    it('should have a board with one filled position', () => {
      const board = state.getBoard();
      let restUndefined = true;

      for (let i = moveIndex + 1; i < board.length; i++) {
        if (board[i]) {
          restUndefined = false;
          break;
        }
      }

      expect(board[moveIndex]).toBeTruthy();
      expect(restUndefined).toBe(true);
    });

    it('should return the correct position value', () => {
      expect(state.getValue(moveIndex)).toBe(PLAYER.PlayerOne);
    });

    it('should not state that board is completed', () => {
      expect(state.isBoardCompleted()).toBe(false);
    });

    it('should set the player as player one', () => {
      expect(state.getPlayer()).toBe(PLAYER.PlayerOne);
    });

    it('should have the next player set as player two', () => {
      expect(state.getNextPlayer()).toBe(PLAYER.PlayerTwo);
    });

    it('should point to the correct location', () => {
      expect(state.getLocation()).toBe(moveIndex);
    });

    it('should not have winner', () => {
      expect(state.hasWinner()).toBe(false);
      expect(state.getWinner()).toBeNull();
    });

    it('should not state game over', () => {
      expect(state.isGameOver()).toBe(false);
    });

    it('should not state game ending in a draw', () => {
      expect(state.endedInADraw()).toBe(false);
    });

    it('should accept any valid move', () => {
      for (let i = moveIndex + 1; i < 9; i++) {
        expect(state.isMoveValid(i)).toBe(true);
      }
    });

    it('should not accept a move on a filled position', () => {
      expect(state.isMoveValid(moveIndex)).toBe(false);
    });
  });

  describe('when representing a second move', () => {
    const firstMoveIndex = 0;
    const secondMoveIndex = 1;
    const initialState = new TicTacToeState();
    const firstMoveState = new TicTacToeState(firstMoveIndex, initialState);
    const state = new TicTacToeState(secondMoveIndex, firstMoveState);

    it('should have a board with two filled positions', () => {
      const board = state.getBoard();
      let restUndefined = true;

      for (let i = secondMoveIndex + 1; i < board.length; i++) {
        if (board[i]) {
          restUndefined = false;
          break;
        }
      }

      expect(board[firstMoveIndex]).toBeTruthy();
      expect(board[secondMoveIndex]).toBeTruthy();
      expect(restUndefined).toBe(true);
    });

    it('should return the correct position value', () => {
      expect(state.getValue(secondMoveIndex)).toBe(PLAYER.PlayerTwo);
    });

    it('should not state that board is completed', () => {
      expect(state.isBoardCompleted()).toBe(false);
    });

    it('should set the player as player two', () => {
      expect(state.getPlayer()).toBe(PLAYER.PlayerTwo);
    });

    it('should have the next player set as player one', () => {
      expect(state.getNextPlayer()).toBe(PLAYER.PlayerOne);
    });

    it('should point to the correct location', () => {
      expect(state.getLocation()).toBe(secondMoveIndex);
    });

    it('should not have winner', () => {
      expect(state.hasWinner()).toBe(false);
      expect(state.getWinner()).toBeNull();
    });

    it('should not state game over', () => {
      expect(state.isGameOver()).toBe(false);
    });

    it('should not state game ending in a draw', () => {
      expect(state.endedInADraw()).toBe(false);
    });

    it('should accept any valid move', () => {
      for (let i = secondMoveIndex + 1; i < 9; i++) {
        expect(state.isMoveValid(i)).toBe(true);
      }
    });

    it('should not accept a move on a filled position', () => {
      expect(state.isMoveValid(firstMoveIndex)).toBe(false);
      expect(state.isMoveValid(secondMoveIndex)).toBe(false);
    });
  });

  describe('when representing a win state', () => {
    const x = PLAYER.PlayerOne;
    const o = PLAYER.PlayerTwo;

    const previousState = {
      getNextPlayer: () => PLAYER.PlayerOne,
      getBoard: () => [o, x, o, x, o, o, x, x, undefined],
    };

    const moveIndex = 8;
    const state = new TicTacToeState(moveIndex, previousState);

    it('should have a board with all filled positions', () => {
      const board = state.getBoard();
      let allFilled = true;

      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          allFilled = false;
          break;
        }
      }

      expect(allFilled).toBe(true);
    });

    it('should state that board is completed', () => {
      expect(state.isBoardCompleted()).toBe(true);
    });

    it('should have winner', () => {
      expect(state.hasWinner()).toBe(true);
      expect(state.getWinner()).not.toBeNull();
    });

    it('should indicate the winner', () => {
      const winner = state.getWinner();
      expect(winner).toBe(PLAYER.PlayerOne);
    });

    it('should indicate the winner squares', () => {
      for (let i = 0; i < 6; i++) {
        expect(state.isWinnerSquare(i)).toBe(false);
      }

      expect(state.isWinnerSquare(6)).toBe(true);
      expect(state.isWinnerSquare(7)).toBe(true);
      expect(state.isWinnerSquare(8)).toBe(true);
    });

    it('should state game over', () => {
      expect(state.isGameOver()).toBe(true);
    });

    it('should not state game ending in a draw', () => {
      expect(state.endedInADraw()).toBe(false);
    });

    it('should not accept any move', () => {
      for (let i = 0; i < 9; i++) {
        expect(state.isMoveValid(i)).toBe(false);
      }
    });
  });

  describe('when representing a draw state', () => {
    const x = PLAYER.PlayerOne;
    const o = PLAYER.PlayerTwo;

    const previousState = {
      getNextPlayer: () => PLAYER.PlayerOne,
      getBoard: () => [o, x, x, x, o, o, x, o, undefined],
    };

    const moveIndex = 8;
    const state = new TicTacToeState(moveIndex, previousState);

    it('should have a board with all filled positions', () => {
      const board = state.getBoard();
      let allFilled = true;

      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          allFilled = false;
          break;
        }
      }

      expect(allFilled).toBe(true);
    });

    it('should state that board is completed', () => {
      expect(state.isBoardCompleted()).toBe(true);
    });

    it('should not have winner', () => {
      expect(state.hasWinner()).toBe(false);
      expect(state.getWinner()).toBeNull();
    });

    it('should state game over', () => {
      expect(state.isGameOver()).toBe(true);
    });

    it('should state game ending in a draw', () => {
      expect(state.endedInADraw()).toBe(true);
    });

    it('should not accept any move', () => {
      for (let i = 0; i < 9; i++) {
        expect(state.isMoveValid(i)).toBe(false);
      }
    });
  });

  describe('when representing a win state', () => {
    function getWinState(positions, player) {
      const [first, second, third] = positions;

      const board = new Array(9);
      board[first] = player;
      board[second] = player;

      const previousState = {
        getNextPlayer: () => player,
        getBoard: () => board,
      };

      return new TicTacToeState(third, previousState);
    }

    function assertWinner(state, player) {
      expect(state.hasWinner()).toBe(true);
      expect(state.getWinner()).toBe(player);
    }

    function assertWinnerSquares(state, positions) {
      const [first, second, third] = positions;

      expect(state.isWinnerSquare(first)).toBe(true);
      expect(state.isWinnerSquare(second)).toBe(true);
      expect(state.isWinnerSquare(third)).toBe(true);

      for (let i = 0; i < 9; i++) {
        if (positions.indexOf(i) === -1) {
          expect(state.isWinnerSquare(i)).toBe(false);
        }
      }
    }

    describe('on row one', () => {
      const rowOne = [0, 1, 2];
      const player = PLAYER.PlayerOne;
      const state = getWinState(rowOne, player);

      it('should indicate the winner', () => {
        assertWinner(state, player);
      });

      it('should indicate the winner squares', () => {
        assertWinnerSquares(state, rowOne);
      });
    });

    describe('on row two', () => {
      const rowTwo = [3, 4, 5];
      const player = PLAYER.PlayerTwo;
      const state = getWinState(rowTwo, player);

      it('should indicate the winner', () => {
        assertWinner(state, player);
      });

      it('should indicate the winner squares', () => {
        assertWinnerSquares(state, rowTwo);
      });
    });

    describe('on row three', () => {
      const rowThree = [6, 7, 8];
      const player = PLAYER.PlayerOne;
      const state = getWinState(rowThree, player);

      it('should indicate the winner', () => {
        assertWinner(state, player);
      });

      it('should indicate the winner squares', () => {
        assertWinnerSquares(state, rowThree);
      });
    });

    describe('on column one', () => {
      const colOne = [0, 3, 6];
      const player = PLAYER.PlayerTwo;
      const state = getWinState(colOne, player);

      it('should indicate the winner', () => {
        assertWinner(state, player);
      });

      it('should indicate the winner squares', () => {
        assertWinnerSquares(state, colOne);
      });
    });

    describe('on column two', () => {
      const colTwo = [1, 4, 7];
      const player = PLAYER.PlayerOne;
      const state = getWinState(colTwo, player);

      it('should indicate the winner', () => {
        assertWinner(state, player);
      });

      it('should indicate the winner squares', () => {
        assertWinnerSquares(state, colTwo);
      });
    });

    describe('on column three', () => {
      const colThree = [2, 5, 8];
      const player = PLAYER.PlayerTwo;
      const state = getWinState(colThree, player);

      it('should indicate the winner', () => {
        assertWinner(state, player);
      });

      it('should indicate the winner squares', () => {
        assertWinnerSquares(state, colThree);
      });
    });

    describe('on diagonal one', () => {
      const diagOne = [0, 4, 8];
      const player = PLAYER.PlayerOne;
      const state = getWinState(diagOne, player);

      it('should indicate the winner', () => {
        assertWinner(state, player);
      });

      it('should indicate the winner squares', () => {
        assertWinnerSquares(state, diagOne);
      });
    });

    describe('on diagonal two', () => {
      const diagTwo = [2, 4, 6];
      const player = PLAYER.PlayerTwo;
      const state = getWinState(diagTwo, player);

      it('should indicate the winner', () => {
        assertWinner(state, player);
      });

      it('should indicate the winner squares', () => {
        assertWinnerSquares(state, diagTwo);
      });
    });
  });
});
