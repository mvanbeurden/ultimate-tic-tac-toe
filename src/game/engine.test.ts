import { describe, expect, test } from 'vitest';
import { createInitialState, getLegalBoards, playMove, resetGame, type GameState } from './engine';

function allowAny(state: GameState): GameState {
  return { ...state, nextBoard: null };
}

describe('Ultimate Tic-Tac-Toe engine', () => {
  test('initial state has X to move and all boards legal', () => {
    const state = createInitialState();
    expect(state.currentPlayer).toBe('X');
    expect(getLegalBoards(state)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  test('a move sends the next player to the matching board', () => {
    const result = playMove(createInitialState(), 4, 2);
    expect(result.accepted).toBe(true);
    expect(result.state.currentPlayer).toBe('O');
    expect(result.state.nextBoard).toBe(2);
    expect(getLegalBoards(result.state)).toEqual([2]);
  });

  test('occupied cells are rejected without changing turn', () => {
    const first = playMove(createInitialState(), 4, 4).state;
    const second = playMove(first, 4, 4);
    expect(second.accepted).toBe(false);
    if (second.accepted) throw new Error('expected occupied cell rejection');
    expect(second.state).toBe(first);
    expect(second.reason).toBe('occupied-cell');
  });

  test('illegal boards are rejected without changing turn', () => {
    const first = playMove(createInitialState(), 4, 2).state;
    const second = playMove(first, 1, 0);
    expect(second.accepted).toBe(false);
    if (second.accepted) throw new Error('expected illegal board rejection');
    expect(second.state).toBe(first);
    expect(second.reason).toBe('illegal-board');
  });

  test('small board wins are detected', () => {
    let state = createInitialState();
    state = allowAny(playMove(state, 4, 0).state);
    state = allowAny(playMove(state, 0, 3).state);
    state = allowAny(playMove(state, 4, 1).state);
    state = allowAny(playMove(state, 1, 4).state);
    state = playMove(state, 4, 2).state;
    expect(state.smallBoards[4].winner).toBe('X');
    expect(state.largeBoard[4]).toBe('X');
  });

  test('won destination boards allow any unfinished board', () => {
    let state = createInitialState();
    state.smallBoards[2].winner = 'O';
    state.largeBoard[2] = 'O';
    state = playMove(state, 4, 2).state;
    expect(state.nextBoard).toBe(null);
    expect(getLegalBoards(state)).toContain(0);
    expect(getLegalBoards(state)).toContain(4);
    expect(getLegalBoards(state)).not.toContain(2);
  });

  test('large board wins are detected', () => {
    let state = createInitialState();
    state.smallBoards[0].winner = 'X';
    state.smallBoards[1].winner = 'X';
    state.smallBoards[2].cells = ['X', 'X', null, 'O', 'O', null, null, null, null];
    state.largeBoard = ['X', 'X', null, null, null, null, null, null, null];
    state = allowAny(state);
    const result = playMove(state, 2, 2).state;
    expect(result.gameWinner).toBe('X');
  });

  test('reset returns to initial state', () => {
    const moved = playMove(createInitialState(), 4, 2).state;
    expect(resetGame(moved)).toEqual(createInitialState());
  });
});
