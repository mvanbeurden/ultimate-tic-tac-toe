import { describe, expect, it } from 'vitest';
import { createInitialState, getLegalBoardIndexes, playMove } from './engine';

const cell = (boardIndex: number, cellIndex: number) => ({ boardIndex, cellIndex });

describe('Ultimate Tic-Tac-Toe engine', () => {
  it('starts with X to move and all boards legal', () => {
    const state = createInitialState();
    expect(state.currentPlayer).toBe('X');
    expect(getLegalBoardIndexes(state)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(state.gameResult).toBeNull();
  });

  it('sends the next player to the board matching the chosen cell', () => {
    const state = playMove(createInitialState(), cell(4, 0));
    expect(state.currentPlayer).toBe('O');
    expect(state.nextBoardIndex).toBe(0);
    expect(getLegalBoardIndexes(state)).toEqual([0]);
  });

  it('rejects occupied cells and illegal boards without changing turns', () => {
    const first = playMove(createInitialState(), cell(4, 0));
    const occupied = playMove(first, cell(4, 0));
    const illegalBoard = playMove(first, cell(1, 1));
    expect(occupied).toEqual(first);
    expect(illegalBoard).toEqual(first);
  });

  it('claims a small board when a player gets three in a row', () => {
    const state = createInitialState();
    state.boards[3].cells = ['X', 'X', null, null, null, null, null, null, null];
    state.nextBoardIndex = 3;
    const won = playMove(state, cell(3, 2));
    expect(won.boards[3].result).toEqual({ winner: 'X' });
  });

  it('allows any unfinished board when sent to a finished board', () => {
    const state = createInitialState();
    state.boards[3].result = { winner: 'X' };
    const next = playMove(state, cell(0, 3));
    expect(next.nextBoardIndex).toBeNull();
    expect(getLegalBoardIndexes(next)).toEqual([0, 1, 2, 4, 5, 6, 7, 8]);
  });

  it('declares a large-board winner when a player claims three small boards in a row', () => {
    const state = createInitialState();
    state.boards[0].result = { winner: 'X' };
    state.boards[1].result = { winner: 'X' };
    state.boards[2].cells = ['X', 'X', null, null, null, null, null, null, null];
    state.nextBoardIndex = 2;
    const won = playMove(state, cell(2, 2));
    expect(won.gameResult).toEqual({ winner: 'X' });
  });
});
