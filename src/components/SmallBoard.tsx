import type { SmallBoardState } from '../game/engine';

interface Props {
  board: SmallBoardState;
  boardIndex: number;
  isLegal: boolean;
  onCellClick: (boardIndex: number, cellIndex: number) => void;
}

export function SmallBoard({ board, boardIndex, isLegal, onCellClick }: Props) {
  const classes = ['small-board', isLegal ? 'legal' : 'inactive', board.winner ? 'finished' : ''].join(' ');
  return (
    <div className={classes} aria-label={`Board ${boardIndex + 1}`}>
      {board.cells.map((cell, cellIndex) => (
        <button
          key={cellIndex}
          className="cell"
          onClick={() => onCellClick(boardIndex, cellIndex)}
          aria-label={`Board ${boardIndex + 1} cell ${cellIndex + 1}`}
          disabled={!isLegal || board.winner !== null || cell !== null}
        >
          {cell ?? ''}
        </button>
      ))}
      {board.winner && <div className={`overlay ${board.winner === 'draw' ? 'draw' : ''}`}>{board.winner === 'draw' ? 'Draw' : board.winner}</div>}
    </div>
  );
}
