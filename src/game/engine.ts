export type Player = 'X' | 'O';
export type Cell = Player | null;
export type BoardResult = Player | 'draw' | null;

export interface SmallBoardState {
  cells: Cell[];
  winner: BoardResult;
}

export interface GameState {
  smallBoards: SmallBoardState[];
  largeBoard: BoardResult[];
  currentPlayer: Player;
  nextBoard: number | null;
  gameWinner: BoardResult;
  message: string;
}

export type MoveResult =
  | { accepted: true; state: GameState }
  | { accepted: false; state: GameState; reason: 'game-over' | 'illegal-board' | 'occupied-cell' | 'finished-board' };

const WINS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function createInitialState(): GameState {
  return {
    smallBoards: Array.from({ length: 9 }, () => ({ cells: Array<Cell>(9).fill(null), winner: null })),
    largeBoard: Array<BoardResult>(9).fill(null),
    currentPlayer: 'X',
    nextBoard: null,
    gameWinner: null,
    message: 'X starts. Play anywhere.',
  };
}

export function resetGame(_state?: GameState): GameState {
  return createInitialState();
}

export function getLegalBoards(state: GameState): number[] {
  if (state.gameWinner) return [];
  if (state.nextBoard !== null && isBoardPlayable(state, state.nextBoard)) return [state.nextBoard];
  return state.smallBoards
    .map((board, index) => (board.winner === null && board.cells.some((cell) => cell === null) ? index : -1))
    .filter((index) => index >= 0);
}

export function playMove(state: GameState, boardIndex: number, cellIndex: number): MoveResult {
  if (state.gameWinner) return { accepted: false, state, reason: 'game-over' };
  const board = state.smallBoards[boardIndex];
  if (!board) return { accepted: false, state, reason: 'illegal-board' };
  if (!getLegalBoards(state).includes(boardIndex)) return { accepted: false, state, reason: 'illegal-board' };
  if (board.winner !== null) return { accepted: false, state, reason: 'finished-board' };
  if (board.cells[cellIndex] !== null) return { accepted: false, state, reason: 'occupied-cell' };

  const smallBoards = state.smallBoards.map((small, index) =>
    index === boardIndex ? { ...small, cells: small.cells.map((cell, i) => (i === cellIndex ? state.currentPlayer : cell)) } : small,
  );

  const changedBoard = smallBoards[boardIndex];
  const smallWinner = calculateResult(changedBoard.cells);
  if (smallWinner) changedBoard.winner = smallWinner;

  const largeBoard = smallBoards.map((small) => small.winner);
  const gameWinner = calculateResult(largeBoard);
  const nextPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
  const destinationPlayable = !gameWinner && isSmallBoardPlayable(smallBoards[cellIndex]);
  const nextBoard = destinationPlayable ? cellIndex : null;

  const nextState: GameState = {
    smallBoards,
    largeBoard,
    currentPlayer: gameWinner ? state.currentPlayer : nextPlayer,
    nextBoard,
    gameWinner,
    message: makeMessage(gameWinner, nextPlayer, nextBoard),
  };

  return { accepted: true, state: nextState };
}

function isBoardPlayable(state: GameState, boardIndex: number): boolean {
  return isSmallBoardPlayable(state.smallBoards[boardIndex]);
}

function isSmallBoardPlayable(board: SmallBoardState): boolean {
  return board.winner === null && board.cells.some((cell) => cell === null);
}

function calculateResult(cells: BoardResult[]): BoardResult {
  for (const [a, b, c] of WINS) {
    if (cells[a] && cells[a] !== 'draw' && cells[a] === cells[b] && cells[a] === cells[c]) return cells[a];
  }
  return cells.every((cell) => cell !== null) ? 'draw' : null;
}

function makeMessage(gameWinner: BoardResult, nextPlayer: Player, nextBoard: number | null): string {
  if (gameWinner === 'draw') return 'Game drawn. Reset to play again.';
  if (gameWinner) return `${gameWinner} wins the game!`;
  if (nextBoard === null) return `${nextPlayer} to move. Play in any unfinished board.`;
  return `${nextPlayer} to move. Play board ${nextBoard + 1}.`;
}
