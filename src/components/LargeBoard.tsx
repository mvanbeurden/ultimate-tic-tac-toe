import type { GameState } from '../game/types';
import SmallBoard from './SmallBoard';

interface Props {
  state: GameState;
  legalBoards: number[];
  onMove: (boardIndex: number, cellIndex: number) => void;
}

export default function LargeBoard({ state, legalBoards, onMove }: Props) {
  return (
    <div className="large-board" aria-label="Ultimate tic-tac-toe board">
      {state.boards.map((board, index) => (
        <SmallBoard
          key={index}
          board={board}
          boardIndex={index}
          isLegal={legalBoards.includes(index)}
          onMove={onMove}
        />
      ))}
    </div>
  );
}
