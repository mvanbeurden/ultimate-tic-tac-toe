import type { BoardResult, GameResult, GameState, Move, Player, SmallBoard } from './types';

const WIN_LINES = [
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
    boards: Array.from({ length: 9 }, createSmallBoard),
    currentPlayer: 'X',
    nextBoardIndex: null,
    gameResult: null,
    message: 'X starts. Play anywhere.',
  };
}

function createSmallBoard(): SmallBoard {
  return { cells: Array.from({ length: 9 }, () => null), result: null };
}

export function getLegalBoardIndexes(state: GameState): number[] {
  if (state.gameResult) return [];
  if (state.nextBoardIndex !== null && !state.boards[state.nextBoardIndex].result) {
    return [state.nextBoardIndex];
  }
  return state.boards.flatMap((board, index) => (board.result ? [] : [index]));
}

export function playMove(state: GameState, move: Move): GameState {
  if (!isValidIndex(move.boardIndex) || !isValidIndex(move.cellIndex) || state.gameResult) return state;

  const legalBoards = getLegalBoardIndexes(state);
  if (!legalBoards.includes(move.boardIndex)) return state;

  const board = state.boards[move.boardIndex];
  if (board.result || board.cells[move.cellIndex]) return state;

  const boards = state.boards.map((candidate, index) =>
    index === move.boardIndex
      ? { ...candidate, cells: replaceAt(candidate.cells, move.cellIndex, state.currentPlayer) }
      : { ...candidate, cells: [...candidate.cells] },
  );

  boards[move.boardIndex].result = evaluateCells(boards[move.boardIndex].cells);
  const gameResult = evaluateLargeBoard(boards);
  const nextPlayer = otherPlayer(state.currentPlayer);
  const rawNextBoard = move.cellIndex;
  const nextBoardIndex = boards[rawNextBoard].result ? null : rawNextBoard;

  return {
    boards,
    currentPlayer: gameResult ? state.currentPlayer : nextPlayer,
    nextBoardIndex: gameResult ? null : nextBoardIndex,
    gameResult,
    message: buildMessage(gameResult, nextPlayer, nextBoardIndex),
  };
}

function isValidIndex(index: number): boolean {
  return Number.isInteger(index) && index >= 0 && index < 9;
}

function replaceAt<T>(items: T[], index: number, value: T): T[] {
  const next = [...items];
  next[index] = value;
  return next;
}

function otherPlayer(player: Player): Player {
  return player === 'X' ? 'O' : 'X';
}

function evaluateCells(cells: (Player | null)[]): BoardResult {
  const winner = findWinner(cells);
  if (winner) return { winner };
  if (cells.every(Boolean)) return { draw: true };
  return null;
}

function evaluateLargeBoard(boards: SmallBoard[]): GameResult {
  const largeCells = boards.map((board) => (board.result && 'winner' in board.result ? board.result.winner : null));
  const winner = findWinner(largeCells);
  if (winner) return { winner };
  if (boards.every((board) => board.result)) return { draw: true };
  return null;
}

function findWinner(cells: (Player | null)[]): Player | null {
  for (const [a, b, c] of WIN_LINES) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) return cells[a];
  }
  return null;
}

function buildMessage(gameResult: GameResult, nextPlayer: Player, nextBoardIndex: number | null): string {
  if (gameResult) {
    if ('winner' in gameResult) return `${gameResult.winner} wins the game!`;
    return 'The game is a draw.';
  }
  if (nextBoardIndex === null) return `${nextPlayer} to move. Play any unfinished board.`;
  return `${nextPlayer} to move. Play board ${nextBoardIndex + 1}.`;
}
