import type { SmallBoard as SmallBoardState } from '../game/types';

interface Props {
  board: SmallBoardState;
  boardIndex: number;
  isLegal: boolean;
  onMove: (boardIndex: number, cellIndex: number) => void;
}

function resultLabel(board: SmallBoardState): string | null {
  if (!board.result) return null;
  if ('winner' in board.result) return board.result.winner;
  return 'Draw';
}

export default function SmallBoard({ board, boardIndex, isLegal, onMove }: Props) {
  const label = resultLabel(board);
  return (
    <section className={`small-board ${isLegal ? 'legal' : 'inactive'} ${board.result ? 'finished' : ''}`}>
      <div className="small-board-title">Board {boardIndex + 1}</div>
      <div className="cells" aria-label={`Board ${boardIndex + 1}${isLegal ? ' legal' : ' inactive'}`}>
        {board.cells.map((mark, cellIndex) => (
          <button
            key={cellIndex}
            className="cell"
            onClick={() => onMove(boardIndex, cellIndex)}
            disabled={!isLegal || Boolean(mark) || Boolean(board.result)}
            aria-label={`Board ${boardIndex + 1} cell ${cellIndex + 1}`}
          >
            {mark}
          </button>
        ))}
      </div>
      {label && <div className="board-result">{label}</div>}
    </section>
  );
}
