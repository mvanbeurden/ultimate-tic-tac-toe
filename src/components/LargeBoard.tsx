import type { GameState } from '../game/engine';
import { SmallBoard } from './SmallBoard';

interface Props {
  game: GameState;
  legalBoards: number[];
  onCellClick: (boardIndex: number, cellIndex: number) => void;
}

export function LargeBoard({ game, legalBoards, onCellClick }: Props) {
  return (
    <section className="large-board" aria-label="Ultimate Tic-Tac-Toe board">
      {game.smallBoards.map((board, index) => (
        <SmallBoard
          key={index}
          board={board}
          boardIndex={index}
          isLegal={legalBoards.includes(index)}
          onCellClick={onCellClick}
        />
      ))}
    </section>
  );
}
