import TicTacToeGame from '../TicTacToeGame';
import TicTacToeState from '../TicTacToeState';

jest.mock('../TicTacToeState');

function getMockComponent() {
  const mockComp = {
    state: null,
  };

  const getState = jest.fn(() => mockComp.state);
  const setState = jest.fn((state) => {
    mockComp.state = state;
  });

  mockComp.getState = getState;
  mockComp.setState = setState;

  return mockComp;
}

beforeEach(() => {
  TicTacToeState.mockClear();
});

describe('The TicTacToeGame instance', () => {
  describe('when initialized', () => {
    const component = getMockComponent();
    const game = new TicTacToeGame(component);

    it('should have an empty history', () => {
      const history = game.getGameHistory();
      expect(history).not.toBeNull();
      expect(history).toHaveLength(0);
      expect(history).toBeInstanceOf(Array);
    });

    it('should have the current index equal to -1', () => {
      const index = game.getCurrentGameIndex();
      expect(index).toEqual(-1);
    });

    it('should set the initial game state', () => {
      const state = game.getCurrentGameState();
      expect(state).not.toBeNull();
      expect(state).toBeInstanceOf(TicTacToeState);
    });

    it('should set the component initial state', () => {
      expect(component.state).toBe(TicTacToeGame.getInitialState());
    });
  });

  describe('when processing a valid move', () => {
    const component = getMockComponent();

    function runValidMove() {
      TicTacToeState.prototype.isMoveValid = () => true;

      const game = new TicTacToeGame(component);
      game.move(0);
      return game;
    }

    it('should increase the current index', () => {
      const game = runValidMove();
      expect(game.getCurrentGameIndex()).toBe(0);
    });

    it('should push the state into history', () => {
      const game = runValidMove();
      expect(game.getGameHistory()).toHaveLength(1);
    });

    it('should create a TicTacToeState instance', () => {
      const game = runValidMove();
      const state = game.getCurrentGameState();
      expect(state).toBeInstanceOf(TicTacToeState);
    });

    it('should have the current state pointing to the last state', () => {
      const game = runValidMove();

      const currentState = game.getCurrentGameState();
      const history = game.getGameHistory();
      const lastState = history[history.length - 1];

      expect(currentState).toEqual(lastState);
    });

    it('should update the component state', () => {
      runValidMove();
      expect(component.setState).toBeCalled();
    });
  });

  describe('when processing an invalid move', () => {
    const component = getMockComponent();

    function runInvalidMove() {
      TicTacToeState.prototype.isMoveValid = () => false;

      const game = new TicTacToeGame(component);
      game.move(0);
      return game;
    }

    it('should not increase the current index', () => {
      const game = runInvalidMove();
      expect(game.getCurrentGameIndex()).toBe(-1);
    });

    it('should not push the state into history', () => {
      const game = runInvalidMove();
      expect(game.getGameHistory()).toHaveLength(0);
    });

    it('should not change the current state', () => {
      const game = runInvalidMove();
      expect(game.getAppState()).toBe(TicTacToeGame.getInitialState());
    });

    it('should not update the component state', () => {
      expect(component.setState).not.toBeCalled();
    });
  });

  describe('when resetting the game', () => {
    const component = getMockComponent();

    function procesMovesAndReset() {
      TicTacToeState.prototype.isMoveValid = () => false;

      const game = new TicTacToeGame(component);

      game.move(0);
      game.move(1);
      game.move(2);
      game.reset();

      return game;
    }

    it('should have an empty history', () => {
      const game = procesMovesAndReset();
      const history = game.getGameHistory();
      expect(history).not.toBeNull();
      expect(history).toHaveLength(0);
      expect(history).toBeInstanceOf(Array);
    });

    it('should have the current index equal to -1', () => {
      const game = procesMovesAndReset();
      const index = game.getCurrentGameIndex();
      expect(index).toEqual(-1);
    });

    it('should be set to the initial game state', () => {
      const game = procesMovesAndReset();
      const state = game.getCurrentGameState();
      expect(state).not.toBeNull();
      expect(TicTacToeState).toBeCalledWith();
    });

    it('should reset to the initial app state', () => {
      procesMovesAndReset();
      expect(component.state).toBe(TicTacToeGame.getInitialState());
    });

    it('should update the component state', () => {
      procesMovesAndReset();
      expect(component.setState).toBeCalled();
    });
  });

  describe('when changing the current state', () => {
    const component = getMockComponent();
    const numberOfMoves = 3;
    const changeToIndex = 1;

    function changeGameState() {
      TicTacToeState.prototype.isMoveValid = () => true;

      const game = new TicTacToeGame(component);

      for (let i = 0; i < numberOfMoves; i++) {
        game.move(i);
      }

      game.selectGameState(changeToIndex);

      return game;
    }

    it('should change the current index', () => {
      const game = changeGameState();
      expect(game.getCurrentGameIndex()).toBe(changeToIndex);
    });

    it('should change the current game state', () => {
      const game = changeGameState();
      const selectedState = game.getGameHistory()[changeToIndex];
      expect(game.getCurrentGameState()).toBe(selectedState);
    });

    it('should not push a new state into history', () => {
      const game = changeGameState();
      expect(game.getGameHistory()).toHaveLength(numberOfMoves);
    });

    it('should update the component state', () => {
      expect(component.setState).toBeCalled();
    });
  });

  describe('when processing a valid move after changing the state', () => {
    const component = getMockComponent();
    const numberOfMoves = 4;
    const changeToIndex = 1;

    function moveAfterChangeGameState() {
      TicTacToeState.prototype.isMoveValid = () => true;

      const game = new TicTacToeGame(component);

      for (let i = 0; i < numberOfMoves; i++) {
        game.move(i);
      }

      game.selectGameState(changeToIndex);

      game.move(numberOfMoves + 1);

      return game;
    }

    it('should insert a new game state', () => {
      const game = moveAfterChangeGameState();
      expect(game.getCurrentGameIndex()).toBe(changeToIndex + 1);
    });

    it('should remove subsquent states', () => {
      const game = moveAfterChangeGameState();
      expect(game.getGameHistory()).toHaveLength(changeToIndex + 2);
    });
  });

  describe('when the component state gets messed up from outside', () => {
    const component = getMockComponent();

    function runSomeValidMoves() {
      TicTacToeState.prototype.isMoveValid = () => true;

      const game = new TicTacToeGame(component);

      for (let i = 0; i < 3; i++) {
        game.move(i);
      }

      return game;
    }

    const tests = [
      { name: 'undefined', invalidState: undefined },
      { name: 'null', invalidState: null },
      { name: 'empty object', invalidState: {} },
      { name: 'undefined gameHistory', invalidState: { currentIndex: 0 } },
      { name: 'undefined currentIndex', invalidState: { gameHistory: [] } },
      { name: 'non numeric currentIndex', invalidState: { currentIndex: 'abc', gameHistory: [] } },
      {
        name: 'gameHistory is not an Array',
        invalidState: { currentIndex: 0, gameHistory: 'abc' },
      },
      {
        name: 'currentIndex is greater then gameHistory length',
        invalidState: { currentIndex: 100, gameHistory: [] },
      },
    ];

    tests.forEach((test) => {
      it(`should reset to the initial state (state = ${test.name})`, () => {
        const game = runSomeValidMoves();
        component.state = test.invalidState;
        expect(game.getAppState()).toBe(TicTacToeGame.getInitialState());
      });
    });
  });
});
